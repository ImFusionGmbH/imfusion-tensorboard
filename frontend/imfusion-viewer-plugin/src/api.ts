// Typed fetch wrappers for the imfusion_viewer TensorBoard plugin backend.
//
// All paths are relative (`./cases`, `./layer_data`, …) so this works both in
// local dev (proxied by Vite, see vite.config.ts) and when served by
// TensorBoard core under `/data/plugin/imfusion_viewer/...`.

import { inflate } from 'pako';

/** Normalized, lowercase layer kind. */
export type LayerKind = 'volume' | 'mask' | 'mesh' | 'image';

export interface LayerMeta {
  /** Steps this layer was actually written at (may differ per layer). */
  steps: number[];
  layer_name: string;
  kind: LayerKind;
  file_extension: string;
  zlib_compressed: boolean;
  display_name: string;
  /** RGBA, each channel in [0, 1]. */
  default_color: [number, number, number, number];
  /** [0, 1] */
  default_opacity: number;
  default_visible: boolean;
  order: number;
  /** Opaque, forward-compatible per-layer JSON config string; see `maskLabels`. */
  json_extra: string;
  /** Parsed from `json_extra`'s `labels` map; `null` means legacy single-value mask. */
  maskLabels: Record<string, string> | null;
  /** Foreground pixel value for a legacy single-value mask (default 1). */
  legacyLabelValue: number;
}

export interface CaseMeta {
  layers: LayerMeta[];
  steps: number[];
}

/** run -> case_name -> CaseMeta */
export type CasesResponse = Record<string, Record<string, CaseMeta>>;

// `maskLabels`/`legacyLabelValue` are derived client-side from `json_extra`;
// `default_color` is widened since older event files can carry 3-float RGB.
interface RawLayerMeta extends Omit<LayerMeta, 'kind' | 'maskLabels' | 'legacyLabelValue' | 'default_color'> {
  kind: string;
  default_color: number[];
}

interface RawCaseMeta {
  layers: RawLayerMeta[];
  steps: number[];
}

type RawCasesResponse = Record<string, Record<string, RawCaseMeta>>;

/** Normalizes the backend's protobuf enum name (e.g. "IMAGE_2D") to a lowercase `LayerKind`. */
function normalizeKind(raw: string): LayerKind {
  const lower = raw.toLowerCase();
  if (lower.startsWith('volume')) return 'volume';
  if (lower.startsWith('mask')) return 'mask';
  if (lower.startsWith('mesh')) return 'mesh';
  if (lower.startsWith('image')) return 'image';
  console.warn(`imfusion_viewer: unrecognized layer kind "${raw}", treating as "volume"`);
  return 'volume';
}

/** Parses `json_extra` into a label-value -> name map, or `null` if absent/malformed. */
function parseMaskLabels(jsonExtra: string): Record<string, string> | null {
  try {
    const parsed: unknown = JSON.parse(jsonExtra || '{}');
    const labels = parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>).labels : null;
    return labels && typeof labels === 'object' ? (labels as Record<string, string>) : null;
  } catch {
    console.warn(`imfusion_viewer: malformed json_extra, ignoring label map: ${jsonExtra}`);
    return null;
  }
}

/** Pads a legacy 3-float RGB color to opaque RGBA (embind rejects a short vec4). */
function toRgba(color: number[]): [number, number, number, number] {
  const [r = 1, g = 1, b = 1, a = 1] = color;
  return [r, g, b, a];
}

/** Parses `json_extra`'s `labelValue` for the legacy single-value mask path (default 1). */
function parseLegacyLabelValue(jsonExtra: string): number {
  try {
    const parsed: unknown = JSON.parse(jsonExtra || '{}');
    const value = parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>).labelValue : null;
    return typeof value === 'number' && Number.isFinite(value) ? value : 1;
  } catch {
    return 1;
  }
}

export interface LicenseTokenResponse {
  /** The WebSDK license token from the server's environment, or `null` if unset. */
  license_token: string | null;
}

/** Must resolve before any viewer mounts - `ImFusionProvider` never re-reads its options. */
export async function fetchLicenseToken(): Promise<string | null> {
  const res = await fetch('./license_token');
  if (!res.ok) {
    throw new Error(`Failed to fetch ./license_token: ${res.status} ${res.statusText}`);
  }
  return ((await res.json()) as LicenseTokenResponse).license_token;
}

export async function fetchCases(): Promise<CasesResponse> {
  const res = await fetch('./cases');
  if (!res.ok) {
    throw new Error(`Failed to fetch ./cases: ${res.status} ${res.statusText}`);
  }
  const raw = (await res.json()) as RawCasesResponse;

  const result: CasesResponse = {};
  for (const [run, cases] of Object.entries(raw)) {
    result[run] = {};
    for (const [caseName, meta] of Object.entries(cases)) {
      result[run][caseName] = {
        steps: [...meta.steps].sort((a, b) => a - b),
        layers: meta.layers
          .map(
            (l): LayerMeta => ({
              ...l,
              kind: normalizeKind(l.kind),
              default_color: toRgba(l.default_color),
              steps: [...(l.steps ?? [])].sort((a, b) => a - b),
              maskLabels: parseMaskLabels(l.json_extra),
              legacyLabelValue: parseLegacyLabelValue(l.json_extra),
            }),
          )
          .sort((a, b) => a.order - b.order),
      };
    }
  }
  return result;
}

export interface FetchLayerDataParams {
  run: string;
  case: string;
  layer: string;
  step: number;
  /** From this layer's metadata (`LayerMeta.zlib_compressed`); decompressed client-side with pako. */
  compressed: boolean;
  /** Optional cross-section crop (see `plugin.py`'s `_crop_volume_blob`); both or neither. */
  cropAxis?: 'x' | 'y' | 'z';
  cropPosition?: number;
}

/** Thrown by `fetchLayerData` on a non-2xx response; `status` lets callers tell a transient 404 from a real failure. */
export class LayerFetchError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'LayerFetchError';
    this.status = status;
  }
}

/** Fetches one layer's raw bytes, decompressing with pako if flagged compressed. */
export async function fetchLayerData(params: FetchLayerDataParams): Promise<ArrayBuffer> {
  const qs = new URLSearchParams({
    run: params.run,
    case: params.case,
    layer: params.layer,
    step: String(params.step),
  });
  if (params.cropAxis !== undefined && params.cropPosition !== undefined) {
    qs.set('crop_axis', params.cropAxis);
    qs.set('crop_position', String(params.cropPosition));
    // Only needed server-side when it must decompress/crop/recompress.
    qs.set('compressed', String(params.compressed));
  }
  const res = await fetch(`./layer_data?${qs.toString()}`);
  if (!res.ok) {
    throw new LayerFetchError(
      `Failed to fetch layer_data for "${params.layer}" @ step ${params.step}: ${res.status} ${res.statusText}`,
      res.status,
    );
  }
  const buf = await res.arrayBuffer();
  if (!params.compressed) return buf;

  const inflated = inflate(new Uint8Array(buf));
  // Sliced to a plain ArrayBuffer, not a view into a larger shared buffer.
  return inflated.buffer.slice(inflated.byteOffset, inflated.byteOffset + inflated.byteLength) as ArrayBuffer;
}

// Must match the backend's `_COMBINED_LABEL_OFFSET_STEP` exactly.
export const COMBINED_LABEL_OFFSET_STEP = 1000;

export interface FetchCombinedLayerDataParams {
  case: string;
  step: number;
  /** Every (run, layer) mask contributing to this merged volume, in order (index i -> label offset i * COMBINED_LABEL_OFFSET_STEP). */
  pairs: Array<{ run: string; layer: string }>;
  /** Whether every pair's own blob is zlib-compressed (shared across all of them). */
  compressed: boolean;
}

/** Thrown on a 409: volumes don't share a voxel grid; caller should fall back to rendering them separately. */
export class GridMismatchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GridMismatchError';
  }
}

/** Fetches every listed mask already merged server-side into one label volume (see `plugin.py`'s `_serve_combined_layer_data`). */
export async function fetchCombinedLayerData(params: FetchCombinedLayerDataParams): Promise<ArrayBuffer> {
  const qs = new URLSearchParams({
    case: params.case,
    step: String(params.step),
    pairs: params.pairs.map((p) => `${p.run}:${p.layer}`).join(','),
    compressed: String(params.compressed),
  });
  const res = await fetch(`./combined_layer_data?${qs.toString()}`);
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    if (res.status === 409) throw new GridMismatchError(text);
    throw new LayerFetchError(`Failed to fetch combined_layer_data @ step ${params.step}: ${text}`, res.status);
  }
  const buf = await res.arrayBuffer();
  const inflated = inflate(new Uint8Array(buf));
  return inflated.buffer.slice(inflated.byteOffset, inflated.byteOffset + inflated.byteLength) as ArrayBuffer;
}

export interface ScalarPoint {
  wallTime: number;
  step: number;
  value: number;
}

/** Calls TensorBoard's built-in scalar-plugin route, one level up from this plugin's own base path. */
export async function fetchScalarTags(run: string): Promise<string[]> {
  const experiment = new URLSearchParams(window.location.search).get('experiment');
  const qs = new URLSearchParams();
  if (experiment) qs.set('experiment', experiment);
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  const res = await fetch(`./../scalars/tags${suffix}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch scalar tags for run "${run}": ${res.status} ${res.statusText}`);
  }
  const raw = (await res.json()) as Record<string, Record<string, { displayName: string; description: string }>>;
  return Object.keys(raw[run] ?? {});
}

export async function fetchScalars(run: string, tag: string): Promise<ScalarPoint[]> {
  const experiment = new URLSearchParams(window.location.search).get('experiment');
  const qs = new URLSearchParams({ run, tag });
  if (experiment) qs.set('experiment', experiment);

  const res = await fetch(`./../scalars/scalars?${qs.toString()}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch scalars for run "${run}" tag "${tag}": ${res.status} ${res.statusText}`);
  }
  // TensorBoard's scalars route returns an array of [wallTime, step, value] tuples.
  const raw = (await res.json()) as Array<[number, number, number]>;
  return raw.map(([wallTime, step, value]) => ({ wallTime, step, value }));
}
