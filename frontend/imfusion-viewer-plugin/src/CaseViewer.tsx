import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { useDisplayOptions2d, useDisplayOptions3d, useImFusion } from '@imfusion/sdk-react';
import type {
  Data,
  DataKind,
  HandleArray,
  ImFusion,
  LabelConfig,
  Mesh,
  SharedImageSet,
} from '@imfusion/sdk';
import { closeContextMenus } from './ContextMenu';
import {
  fetchCases,
  fetchCombinedLayerData,
  fetchLayerData,
  GridMismatchError,
  LayerFetchError,
  type LayerKind,
  type LayerMeta,
} from './api';
import { assignLabelColor } from './labelColors';
import { reassertHidden, type ViewName } from './viewVisibility';

const POLL_INTERVAL_MS = 3000;
// Recently shown steps kept loaded per source, so scrubbing back doesn't re-fetch.
const MAX_RESIDENT_STEPS = 3;
// Order of layer kinds to try when centering the initial view: prefer the
// base volume/image scan, since mask/mesh layers are positioned relative to it.
const CENTER_KIND_PRIORITY: LayerKind[] = ['volume', 'image', 'mask', 'mesh'];
const CROP_DEBOUNCE_MS = 250;
const DEFAULT_CROP_POSITION = 0.5;
// Mask opacity is intentionally unsupported; the slider stays hidden.
const SHOW_OPACITY_SLIDER = false as boolean;
// The server crop (plugin.py `_crop_volume_blob`) only reads NIfTI.
const CROPPABLE_EXTENSION = /\.nii(\.gz)?$/i;
const IMAGE_DATA_KINDS: ReadonlySet<DataKind> = new Set<DataKind>(['IMAGE', 'VOLUME', 'IMAGESET', 'VOLUMESET']);

// Sanitizes a path component for use inside the virtual filename passed to
// `imf.loadBuffer`: replaces any character outside [a-zA-Z0-9_.-] with "_".
function sanitize(s: string): string {
  return s.replace(/[^a-zA-Z0-9_.-]/g, '_');
}

/** Frees Data loaded by `imf.loadBuffer`. `remove()`, not `delete()`: the latter only frees the JS wrapper. Use `releaseData` for anything React or the view may still hold. */
function releaseLayers(imf: ImFusion, layers: Iterable<Data>): void {
  for (const data of layers) {
    try {
      imf.dataModel.remove(data);
    } catch {
      // The wasm instance is already gone (provider teardown).
    }
  }
}

function isAbortError(e: unknown): boolean {
  return (e as { name?: unknown } | null)?.name === 'AbortError';
}

/** Marks a NIfTI-1 header's unset spatial unit as mm, the SDK's own fallback, so it doesn't warn on every load. */
function assumeMillimetres(buf: ArrayBuffer): void {
  if (buf.byteLength < 348) return;
  const view = new DataView(buf);
  if (view.getInt32(0, true) !== 348 && view.getInt32(0, false) !== 348) return;
  const bytes = new Uint8Array(buf);
  // Magic "n+1\0" / "ni1\0"; byte 123 is xyzt_units, 2 = mm.
  if (bytes[344] !== 0x6e || bytes[346] !== 0x31 || bytes[347] !== 0) return;
  if ((bytes[123] & 0x07) === 0) bytes[123] |= 2;
}

/** Keeps `loadBuffer`'s first Data; extras (multi-object files) are released right away. */
async function loadPrimary(imf: ImFusion, buf: ArrayBuffer, filename: string): Promise<Data | null> {
  if (/\.nii$/i.test(filename)) assumeMillimetres(buf);
  const dataArr: HandleArray<Data> = await imf.loadBuffer(buf, filename);
  if (dataArr.length > 1) releaseLayers(imf, dataArr.slice(1));
  return dataArr[0] ?? null;
}

/** Error text if the loaded Data doesn't match the layer's declared kind, else `null`. */
function kindMismatch(meta: LayerMeta, data: Data): string | null {
  const actual = data.kind();
  const ok = meta.kind === 'mesh' ? actual === 'SURFACE' : IMAGE_DATA_KINDS.has(actual);
  return ok ? null : `Layer "${meta.display_name}" is a ${meta.kind} layer but its file loaded as ${actual}.`;
}

/** Structural equality for poll payloads; both are small and freshly parsed. */
function unchanged<T>(prev: T, next: T): boolean {
  return JSON.stringify(prev) === JSON.stringify(next);
}

// Keyed by run+layer, not layer name alone, since combined-workspace mode
// loads more than one run's layers into the same WASM instance.
function layerKey(run: string, layerName: string): string {
  return `${run}::${layerName}`;
}

function splitLayerKey(key: string): [run: string, layerName: string] {
  const separatorIndex = key.indexOf('::');
  return [key.slice(0, separatorIndex), key.slice(separatorIndex + 2)];
}

/** `null` when uncropped; otherwise identifies the crop a 3D copy was fetched for. */
function cropSig(override: VolumeOverride | undefined): string | null {
  if (override?.cropAxis === undefined || override?.cropPosition === undefined) return null;
  return `${override.cropAxis}_${Math.round(override.cropPosition * 1000)}`;
}

/** Sets the `alpha` key of a DisplayOptions2d/3d state (no typed setter in 1.1.0) - hides a volume in 2D or 3D only. */
function setAlpha(options: { state(): Record<string, unknown>; setState(s: Record<string, unknown>): boolean }, alpha: number): void {
  const state = options.state();
  if (state.alpha === alpha) return;
  state.alpha = alpha;
  options.setState(state);
}

const warned = new Set<string>();
function warnOnce(message: string): void {
  if (warned.has(message)) return;
  warned.add(message);
  console.warn(message);
}

/**
 * A mask's label values as [value, name], ascending; integer and non-zero only.
 * plugin.py's `_declared_label_values` must agree (it numbers the merged combined labels).
 */
function labelEntries(meta: LayerMeta): Array<[number, string]> {
  const labels = meta.maskLabels;
  if (labels && Object.keys(labels).length > 0) {
    const byValue = new Map<number, string>();
    for (const [valueStr, name] of Object.entries(labels)) {
      const value = Number(valueStr);
      if (!Number.isInteger(value) || value === 0) {
        warnOnce(`imfusion_viewer: skipping mask label key "${valueStr}" (name "${name}")`);
        continue;
      }
      if (!byValue.has(value)) byValue.set(value, name);
    }
    return [...byValue].sort((a, b) => a[0] - b[0]);
  }
  const value = meta.legacyLabelValue;
  return Number.isInteger(value) && value !== 0 ? [[value, meta.display_name]] : [];
}

function isMultiClass(meta: LayerMeta): boolean {
  return !!meta.maskLabels && Object.keys(meta.maskLabels).length > 0;
}

function rgbOf(color: [number, number, number, number]): [number, number, number] {
  return [color[0], color[1], color[2]];
}

function hexFromRgb([r, g, b]: [number, number, number]): string {
  const toHex = (c: number) => Math.round(Math.max(0, Math.min(1, c)) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function rgbToHsl([r, g, b]: [number, number, number]): [number, number, number] {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h /= 6;
  if (h < 0) h += 1;
  return [h, s, l];
}

function hslToRgb([h, s, l]: [number, number, number]): [number, number, number] {
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  return [hue2rgb(h + 1 / 3), hue2rgb(h), hue2rgb(h - 1 / 3)];
}

// Muting factor for an overlay run's default colors, so two runs' same
// class doesn't render identically where they overlap.
const OVERLAY_SATURATION_SCALE = 0.5;

function desaturateForOverlay(rgb: [number, number, number]): [number, number, number] {
  const [h, s, l] = rgbToHsl(rgb);
  return hslToRgb([h, s * OVERLAY_SATURATION_SCALE, l]);
}

interface VolumeSummary {
  dims: number[];
  spacing: number[];
  range: number[];
}

function summarizeVolume(sis: SharedImageSet): VolumeSummary | null {
  const image = sis.get();
  if (!image) return null;
  try {
    return { dims: [...image.dimensions()], spacing: [...image.spacing()], range: [...sis.minmaxIntensityOriginal()] };
  } finally {
    image.delete();
  }
}

/** What differs between an overlay volume and the primary's, or `null`. */
function describeVolumeDifference(a: VolumeSummary, b: VolumeSummary): string | null {
  const diffs: string[] = [];
  if (a.dims.some((v, i) => v !== b.dims[i])) diffs.push(`size ${a.dims.join('×')} vs ${b.dims.join('×')}`);
  if (a.spacing.some((v, i) => Math.abs(v - b.spacing[i]) > 1e-3 * Math.max(1, Math.abs(v)))) diffs.push('spacing');
  const span = Math.max(Math.abs(b.range[1] - b.range[0]), 1e-6);
  if (a.range.some((v, i) => Math.abs(v - b.range[i]) > 0.01 * span)) diffs.push('intensity range');
  return diffs.length > 0 ? diffs.join(', ') : null;
}

interface LoadedStep {
  /** Which source (primary or overlay run) this cached step belongs to - each source scrubs independently. */
  run: string;
  step: number;
  /** `layerKey(run, layer_name)` -> the Data handle loaded for that layer at this step. */
  layers: Map<string, Data>;
  /** Cropped copy of a volume, shown in 3D only while the uncropped original keeps the 2D views; `sig` is the crop it was fetched for. */
  crops: Map<string, { data: Data; sig: string }>;
}

/** An in-flight crop-copy fetch; outlives effect runs so a cancelled run doesn't lose it. */
interface CropJob {
  sig: string;
  step: number;
  controller: AbortController;
  promise: Promise<Data | null>;
  discarded: boolean;
}

/** One run whose layers are loaded alongside the primary run's, in the same WASM instance. */
export interface OverlayRun {
  run: string;
  /** This run's identity color (see runColors.ts), used for its layer-list group header. */
  color: string;
  /** Already-fetched layers for this run (from App.tsx's own poll), so this source doesn't start empty. */
  initialLayers?: LayerMeta[];
  /** Already-fetched step list, seeding this run's own independent epoch scrubber. */
  initialSteps?: number[];
}

// `color: null` marks the primary run, so it renders without a group header.
interface Source {
  run: string;
  color: string | null;
}

/** One mask in the merged 3D label volume, with the label values it keeps (its visible ones). */
interface CombinedContributor {
  sourceRun: string;
  meta: LayerMeta;
  labels: number[];
}

type MergeStatus = 'ok' | 'pending' | 'mismatch' | 'error';

/** User-chosen volume windowing, kept here (not just mutated live) so a step reload re-applies the same choice. */
interface VolumeOverride {
  window2d?: number;
  level2d?: number;
  invert2d?: boolean;
  window3d?: number;
  level3d?: number;
  invert3d?: boolean;
  /** Cross-section crop (see `plugin.py`'s `_crop_volume_blob`), 3D only - baked into a second fetched copy, so a change must re-fetch, not just re-style. */
  cropAxis?: 'x' | 'y' | 'z';
  cropPosition?: number;
}

// 'both' normally; while cropped the original is '2d' and its copy '3d'; overlay volumes in combined mode are '2d'.
// 'none': an unchecked volume kept shown, invisible, so 3D still has a volume to draw labels on.
type VolumeRole = 'both' | '2d' | '3d' | 'none';

/** What `styleVolume` last applied to one Data, so a re-style only touches changed fields. */
interface AppliedVolumeStyle {
  window2d?: number;
  level2d?: number;
  invert2d?: boolean;
  window3d?: number;
  level3d?: number;
  invert3d?: boolean;
  alpha2d: number;
  alpha3d: number;
}

interface MaskLabel {
  value: number;
  name: string;
  color: [number, number, number];
  visible: boolean;
}

/** One source's UI choices for one case; restored when a viewer for that (run, case) remounts. No WASM handles. */
interface SavedSourceUi {
  step: number | null;
  pinned: boolean;
  visibility: Map<string, boolean>;
  colors: Map<string, [number, number, number]>;
  opacity: Map<string, number>;
  labelColors: Map<string, [number, number, number]>;
  labelVisibility: Map<string, boolean>;
  volume: Map<string, VolumeOverride>;
}

// Survives case switches, Combine toggles and column eviction (not page reloads).
const savedUi = new Map<string, SavedSourceUi>();

function savedUiKey(run: string, caseName: string): string {
  return `${run}\n${caseName}`;
}

/** The entries of a layer-keyed map that belong to `run`. */
function ownEntries<V>(m: Map<string, V>, run: string): Map<string, V> {
  const prefix = layerKey(run, '');
  return new Map([...m].filter(([k]) => k.startsWith(prefix)));
}

/** Restored step/pin for one source: a pinned or no-longer-logged step falls back to live. */
function initialStep(steps: number[], saved: SavedSourceUi | undefined): { step: number | null; pinned: boolean } {
  const latest = steps.length > 0 ? steps[steps.length - 1] : null;
  if (saved && !saved.pinned && saved.step !== null && steps.includes(saved.step)) return { step: saved.step, pinned: false };
  return { step: latest, pinned: true };
}

export interface CaseViewerProps {
  run: string;
  caseName: string;
  initialLayers: LayerMeta[];
  initialSteps: number[];
  /** Other runs' layers for this same case, loaded into this WASM instance too ("combined workspace" mode) instead of a separate column each. */
  overlayRuns?: OverlayRun[];
  /** Each overlay run's own sidebar container (in CaseBrowser) - layer rows portal there, not into the primary container. */
  overlayContainers?: Map<string, HTMLElement | null>;
  /** Panes the user hid (App state); re-hidden after every show pass, since the SDK re-shows panes on data changes. */
  hiddenViews: ReadonlySet<ViewName>;
  onCurrentStepChange?: (step: number | null) => void;
}

/** Viewer for a case: loads the current step's layers and renders a layer list plus epoch scrubber. */
export function CaseViewer({
  run,
  caseName,
  initialLayers,
  initialSteps,
  overlayRuns = [],
  overlayContainers,
  hiddenViews,
  onCurrentStepChange,
}: CaseViewerProps) {
  const imf = useImFusion();

  // Only re-hides; App's ViewVisibilitySync owns un-hiding.
  const hiddenViewsRef = useRef(hiddenViews);
  const applyHiddenViews = useCallback(() => reassertHidden(imf.display, hiddenViewsRef.current), [imf]);

  // Recomputed fresh every render; effects needing stability read `sourcesRef.current` instead.
  const sources: Source[] = [{ run, color: null }, ...overlayRuns.map((o) => ({ run: o.run, color: o.color }))];

  // This mount's restored per-source UI state, read once.
  const [restored] = useState(() => {
    const steps: Array<[string, number[]]> = [
      [run, initialSteps],
      ...overlayRuns.map((o): [string, number[]] => [o.run, o.initialSteps ?? []]),
    ];
    const saved = steps.map(([r]) => savedUi.get(savedUiKey(r, caseName)));
    const merge = <V,>(pick: (s: SavedSourceUi) => Map<string, V>) =>
      new Map(saved.flatMap((s) => (s ? [...pick(s)] : [])));
    const stepState = steps.map(([r, st], i) => [r, initialStep(st, saved[i])] as const);
    return {
      step: new Map(stepState.map(([r, st]) => [r, st.step])),
      pinned: new Map(stepState.map(([r, st]) => [r, st.pinned])),
      visibility: merge((s) => s.visibility),
      colors: merge((s) => s.colors),
      opacity: merge((s) => s.opacity),
      labelColors: merge((s) => s.labelColors),
      labelVisibility: merge((s) => s.labelVisibility),
      volume: merge((s) => s.volume),
    };
  });

  // run -> that run's layers, seeded from each source's initial data so overlays render immediately too.
  const [layersBySource, setLayersBySource] = useState<Record<string, LayerMeta[]>>(() => {
    const initial: Record<string, LayerMeta[]> = { [run]: initialLayers };
    for (const overlay of overlayRuns) {
      if (overlay.initialLayers) initial[overlay.run] = overlay.initialLayers;
    }
    return initial;
  });
  // Each source scrubs its own epoch independently - cadences aren't shared across runs.
  const [stepsBySource, setStepsBySource] = useState<Record<string, number[]>>(() => {
    const initial: Record<string, number[]> = { [run]: initialSteps };
    for (const overlay of overlayRuns) {
      if (overlay.initialSteps) initial[overlay.run] = overlay.initialSteps;
    }
    return initial;
  });
  const [currentStepBySource, setCurrentStepBySource] = useState<Map<string, number | null>>(restored.step);
  const [pinnedToLiveBySource, setPinnedToLiveBySource] = useState<Map<string, boolean>>(restored.pinned);
  // Explicit toggles only (unset -> `defaultVisible`), keyed by layerKey(run, layer_name) so runs stay independent.
  const [visibility, setVisibility] = useState<Map<string, boolean>>(restored.visibility);
  // Live overrides layered onto writer-provided defaults, keyed like `visibility`.
  // `labelColorOverrides`/`labelVisibilityOverrides` are suffixed `:<value>` for one multiclass label.
  const [colorOverrides, setColorOverrides] = useState(restored.colors);
  const [opacityOverrides, setOpacityOverrides] = useState(restored.opacity);
  const [labelColorOverrides, setLabelColorOverrides] = useState(restored.labelColors);
  const [labelVisibilityOverrides, setLabelVisibilityOverrides] = useState(restored.labelVisibility);
  const [volumeOverrides, setVolumeOverrides] = useState(restored.volume);
  // Currently-shown volume Data per layer key, for the windowing controls row.
  const [currentVolumeData, setCurrentVolumeData] = useState<Map<string, Data>>(new Map());
  // Currently-shown 3D-only cropped copy per layer key, which the 3D windowing tab drives while cropped.
  const [currentCropData, setCurrentCropData] = useState<Map<string, Data>>(new Map());
  // Layer keys whose crop copy is being fetched.
  const [cuttingKeys, setCuttingKeys] = useState<Set<string>>(new Set());
  const [combinedHint, setCombinedHint] = useState<string | null>(null);
  // Overlay volume key -> how it differs from the primary's volume (combined mode).
  const [volumeWarnings, setVolumeWarnings] = useState<Map<string, string>>(new Map());
  const [isLoadingStep, setIsLoadingStep] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  // Re-runs the load/show effect; bumped when a load lands or on a retry, never mid-load.
  const [cacheVersion, setCacheVersion] = useState(0);
  const bumpCacheVersion = useCallback(() => setCacheVersion((n) => n + 1), []);

  // Overlay volumes start hidden in combined mode, so one reference image shows by default.
  const defaultVisible = useCallback(
    (sourceRun: string, meta: LayerMeta) => (meta.kind === 'volume' && sourceRun !== run ? false : meta.default_visible),
    [run],
  );
  // Overlay volumes are 2D-only in combined mode, so they get no 3D cross-section.
  const canCrop = useCallback(
    (sourceRun: string, meta: LayerMeta) =>
      meta.kind === 'volume' && sourceRun === run && CROPPABLE_EXTENSION.test(meta.file_extension),
    [run],
  );

  // Refs mirror latest state for long-lived interval/effect closures; updated in an effect, not during render.
  const pinnedToLiveBySourceRef = useRef(pinnedToLiveBySource);
  const layersBySourceRef = useRef(layersBySource);
  const visibilityRef = useRef(visibility);
  const stepsBySourceRef = useRef(stepsBySource);
  const currentStepBySourceRef = useRef(currentStepBySource);
  const sourcesRef = useRef(sources);
  const volumeOverridesRef = useRef(volumeOverrides);
  const colorOverridesRef = useRef(colorOverrides);
  const opacityOverridesRef = useRef(opacityOverrides);
  const labelColorOverridesRef = useRef(labelColorOverrides);
  const labelVisibilityOverridesRef = useRef(labelVisibilityOverrides);
  useEffect(() => {
    pinnedToLiveBySourceRef.current = pinnedToLiveBySource;
    layersBySourceRef.current = layersBySource;
    visibilityRef.current = visibility;
    stepsBySourceRef.current = stepsBySource;
    currentStepBySourceRef.current = currentStepBySource;
    sourcesRef.current = sources;
    volumeOverridesRef.current = volumeOverrides;
    colorOverridesRef.current = colorOverrides;
    opacityOverridesRef.current = opacityOverrides;
    labelColorOverridesRef.current = labelColorOverrides;
    labelVisibilityOverridesRef.current = labelVisibilityOverrides;
    hiddenViewsRef.current = hiddenViews;
  });

  const cacheRef = useRef<LoadedStep[]>([]);
  // ONE merged label volume for every mask with a label visible in 3D (any sources, aligned
  // steps) - the WebSDK's 3D view renders only one LABEL SharedImageSet.
  const combinedCacheRef = useRef<{ pairsKey: string; step: number; data: Data } | null>(null);
  // `${step}|${pairsKey}` -> a merge that failed for good (grid mismatch etc.), so it isn't re-fetched every pass.
  const combinedFailRef = useRef<Map<string, MergeStatus>>(new Map());
  // Data -> last-applied mask/mesh style signature, so an unchanged style is never reapplied.
  const styledRef = useRef<WeakMap<Data, string>>(new WeakMap());
  const volumeStyleRef = useRef<WeakMap<Data, AppliedVolumeStyle>>(new WeakMap());
  // Exactly what's shown in the view group, in show order (all show/hide goes through `syncShown`).
  const shownRef = useRef<Data[]>([]);
  // run -> step on screen; stays on the previous step until the new one has loaded.
  const displayedStepRef = useRef<Map<string, number>>(new Map());
  const cropJobsRef = useRef<Map<string, CropJob>>(new Map());
  // `${key}@${step}` -> crop sig whose fetch failed, so it isn't retried every pass.
  const cropFailedRef = useRef<Map<string, string>>(new Map());
  // Keyed by `${run}:${step}` - two sources can be mid-load simultaneously.
  const loadingStepsRef = useRef<Set<string>>(new Set());
  // Set once per mount; re-centering on every scrub would discard a manual pan/zoom.
  const centeredRef = useRef(false);
  const lastVolumeMapRef = useRef<Map<string, Data>>(new Map());
  // Lets a late-landing load free itself after unmount.
  const unmountedRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  // Poll each source's layers/steps, auto-advancing to the newest step unless manually scrubbed back.
  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
        // Shared with App.tsx/CaseBrowser, which coalesce concurrent /cases requests.
        const all = await fetchCases();
        if (cancelled) return;

        const nextLayersBySource: Record<string, LayerMeta[]> = {};
        const nextStepsBySource: Record<string, number[]> = {};
        for (const source of sourcesRef.current) {
          const meta = all[source.run]?.[caseName];
          if (meta) {
            nextLayersBySource[source.run] = meta.layers;
            nextStepsBySource[source.run] = meta.steps;
          }
        }
        // Fresh objects per source; unchanged() keeps the old ones so the show pass doesn't re-run.
        setLayersBySource((prev) => (unchanged(prev, nextLayersBySource) ? prev : nextLayersBySource));
        setStepsBySource((prev) => (unchanged(prev, nextStepsBySource) ? prev : nextStepsBySource));

        setCurrentStepBySource((prev) => {
          let changed = false;
          const next = new Map(prev);
          for (const source of sourcesRef.current) {
            const srcSteps = nextStepsBySource[source.run] ?? [];
            const pinned = pinnedToLiveBySourceRef.current.get(source.run) ?? true;
            if (pinned && srcSteps.length > 0) {
              const latest = srcSteps[srcSteps.length - 1];
              if (next.get(source.run) !== latest) {
                next.set(source.run, latest);
                changed = true;
              }
            }
          }
          return changed ? next : prev;
        });

        // Retry any source's step that 404'd on a reservoir eviction (skip if still loading).
        for (const source of sourcesRef.current) {
          const step = currentStepBySourceRef.current.get(source.run) ?? null;
          if (
            step !== null &&
            !loadingStepsRef.current.has(`${source.run}:${step}`) &&
            !cacheRef.current.some((e) => e.run === source.run && e.step === step)
          ) {
            bumpCacheVersion();
            break; // one bump re-runs the whole show/load pass for every source.
          }
        }
      } catch {
        // Transient poll failure; next tick retries silently.
      }
    };

    const interval = window.setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [caseName, bumpCacheVersion]);

  useEffect(() => {
    onCurrentStepChange?.(currentStepBySource.get(run) ?? null);
  }, [currentStepBySource, run, onCurrentStepChange]);

  // Writes back only the fields this viewer changed, so another mounted viewer of the same
  // (run, case) (e.g. the hidden standalone column in combined mode) doesn't clobber the rest.
  const lastSavedRef = useRef<unknown[] | null>(null);
  useEffect(() => {
    const fields = [
      currentStepBySource,
      pinnedToLiveBySource,
      visibility,
      colorOverrides,
      opacityOverrides,
      labelColorOverrides,
      labelVisibilityOverrides,
      volumeOverrides,
    ];
    const last = lastSavedRef.current;
    lastSavedRef.current = fields;
    const changed = (i: number) => !last || last[i] !== fields[i];
    for (const { run: r } of sourcesRef.current) {
      const key = savedUiKey(r, caseName);
      const prev = savedUi.get(key);
      const pick = <T,>(i: number, fresh: () => T, old: T | undefined): T => (changed(i) || old === undefined ? fresh() : old);
      savedUi.set(key, {
        step: pick(0, () => currentStepBySource.get(r) ?? null, prev?.step),
        pinned: pick(1, () => pinnedToLiveBySource.get(r) ?? true, prev?.pinned),
        visibility: pick(2, () => ownEntries(visibility, r), prev?.visibility),
        colors: pick(3, () => ownEntries(colorOverrides, r), prev?.colors),
        opacity: pick(4, () => ownEntries(opacityOverrides, r), prev?.opacity),
        labelColors: pick(5, () => ownEntries(labelColorOverrides, r), prev?.labelColors),
        labelVisibility: pick(6, () => ownEntries(labelVisibilityOverrides, r), prev?.labelVisibility),
        volume: pick(7, () => ownEntries(volumeOverrides, r), prev?.volume),
      });
    }
  }, [
    caseName,
    currentStepBySource,
    pinnedToLiveBySource,
    visibility,
    colorOverrides,
    opacityOverrides,
    labelColorOverrides,
    labelVisibilityOverrides,
    volumeOverrides,
  ]);

  const setCutting = useCallback((key: string, on: boolean) => {
    setCuttingKeys((prev) => {
      if (prev.has(key) === on) return prev;
      const next = new Set(prev);
      if (on) next.add(key);
      else next.delete(key);
      return next;
    });
  }, []);

  /** The one release path for Data that may be on screen or in React state: close menus, drop state refs synchronously, hide, remove. */
  const releaseData = useCallback(
    (datas: Data[]) => {
      if (datas.length === 0) return;
      closeContextMenus();
      const dropped = new Set(datas);
      const drop = (prev: Map<string, Data>) =>
        [...prev.values()].some((d) => dropped.has(d)) ? new Map([...prev].filter(([, d]) => !dropped.has(d))) : prev;
      // useDisplayOptions2d/3d must unsubscribe before the Data is freed ("RuntimeError: null function").
      flushSync(() => {
        setCurrentVolumeData(drop);
        setCurrentCropData(drop);
      });
      shownRef.current = shownRef.current.filter((d) => !dropped.has(d));
      const viewGroup = imf.display.viewGroup();
      for (const data of datas) {
        try {
          viewGroup.hideData(data);
        } catch {
          // The wasm instance is already gone.
        }
      }
      releaseLayers(imf, datas);
    },
    [imf],
  );

  const discardCropJob = useCallback(
    (key: string, job: CropJob) => {
      job.discarded = true;
      job.controller.abort();
      // Frees the copy if it had already landed before the discard.
      void job.promise.then((data) => data && releaseLayers(imf, [data]));
      if (cropJobsRef.current.get(key) === job) cropJobsRef.current.delete(key);
      setCutting(key, false);
    },
    [imf, setCutting],
  );

  // Release all resident Data on unmount.
  useEffect(() => {
    unmountedRef.current = false;
    const controller = new AbortController();
    abortRef.current = controller;
    // Per-view settings (e.g. a blending mode picked in combined mode) would otherwise outlive this viewer.
    try {
      imf.display.viewGroup().reset();
    } catch (e) {
      console.warn('imfusion_viewer: view reset failed', e);
    }
    const cropJobs = cropJobsRef.current;
    return () => {
      unmountedRef.current = true;
      controller.abort();
      for (const [key, job] of [...cropJobs]) discardCropJob(key, job);
      const all: Data[] = [];
      for (const entry of cacheRef.current) {
        all.push(...entry.layers.values(), ...[...entry.crops.values()].map((c) => c.data));
      }
      if (combinedCacheRef.current) all.push(combinedCacheRef.current.data);
      cacheRef.current = [];
      combinedCacheRef.current = null;
      shownRef.current = [];
      closeContextMenus();
      // Deferred: children's useDisplayOptions cleanups run after this one and must unsubscribe first.
      queueMicrotask(() => releaseLayers(imf, all));
    };
  }, [imf, discardCropJob]);

  /** Evicts a source's least recently shown steps past MAX_RESIDENT_STEPS, never one on screen. */
  const evictExcess = useCallback(
    (sourceRun: string) => {
      const onScreen = new Set(shownRef.current);
      const current = currentStepBySourceRef.current.get(sourceRun) ?? null;
      const evicted: Data[] = [];
      while (cacheRef.current.filter((e) => e.run === sourceRun).length > MAX_RESIDENT_STEPS) {
        const index = cacheRef.current.findIndex(
          (e) => e.run === sourceRun && e.step !== current && ![...e.layers.values()].some((d) => onScreen.has(d)),
        );
        if (index === -1) break;
        const [entry] = cacheRef.current.splice(index, 1);
        evicted.push(...entry.layers.values(), ...[...entry.crops.values()].map((c) => c.data));
      }
      releaseData(evicted);
    },
    [releaseData],
  );

  /** Makes the view group show exactly `desired`, in that order. */
  const syncShown = useCallback(
    (desired: Data[]) => {
      const current = shownRef.current;
      if (current.length === desired.length && current.every((d, i) => d === desired[i])) return;
      // One atomic swap: hiding first would empty the group, auto-hiding and re-laying out every pane mid-swap.
      imf.display.viewGroup().setVisibleData(desired);
      shownRef.current = desired;
    },
    [imf],
  );

  /** A mask's per-label colour/visibility from the current overrides, in `labelEntries` order. */
  const maskLabels = useCallback(
    (sourceRun: string, meta: LayerMeta): MaskLabel[] => {
      const key = layerKey(sourceRun, meta.layer_name);
      const layerVisible = visibilityRef.current.get(key) ?? defaultVisible(sourceRun, meta);
      const isOverlay = sourceRun !== run;
      const multi = isMultiClass(meta);
      return labelEntries(meta).map(([value, name]) => {
        const labelKey = `${key}:${value}`;
        const base = multi ? assignLabelColor(value) : rgbOf(meta.default_color);
        const override = multi ? labelColorOverridesRef.current.get(labelKey) : colorOverridesRef.current.get(key);
        return {
          value,
          name,
          color: override ?? (isOverlay ? desaturateForOverlay(base) : base),
          // The layer checkbox alone sets the default; a class shows unless filtered out.
          visible: layerVisible && (multi ? (labelVisibilityOverridesRef.current.get(labelKey) ?? true) : true),
        };
      });
    },
    [run, defaultVisible],
  );

  const applyLabelConfigs = useCallback(
    (sis: SharedImageSet, configs: Array<[number, LabelConfig]>) => {
      const sig = JSON.stringify(configs);
      if (styledRef.current.get(sis) === sig) return;
      if (sis.modality() !== 'LABEL') sis.setModality('LABEL'); // required for label configs to apply
      for (const [value, config] of configs) imf.bindings.setLabelConfig(sis, value, config);
      styledRef.current.set(sis, sig);
    },
    [imf],
  );

  // Visibility goes through LabelConfig only, never hideData/showData (that breaks mask rendering
  // once combined mode shares the instance). `in3d` is false while the merged volume draws it in 3D.
  const styleMask = useCallback(
    (sis: SharedImageSet, sourceRun: string, meta: LayerMeta, in3d: boolean) => {
      const opacity = opacityOverridesRef.current.get(layerKey(sourceRun, meta.layer_name)) ?? meta.default_opacity;
      applyLabelConfigs(
        sis,
        maskLabels(sourceRun, meta).map(({ value, name, color, visible }) => [
          value,
          { name, color: [...color, opacity], isVisible2d: visible, isVisible3d: in3d && visible },
        ]),
      );
    },
    [applyLabelConfigs, maskLabels],
  );

  // Merged volume: 3D only (2D keeps each mask's own image, which may overlap).
  // Label ids are 1..N in contributor order, each one's kept values ascending - same as plugin.py's merge.
  const styleMerged = useCallback(
    (sis: SharedImageSet, contributors: CombinedContributor[]) => {
      let id = 0;
      const configs: Array<[number, LabelConfig]> = [];
      for (const { sourceRun, meta, labels } of contributors) {
        const opacity = opacityOverridesRef.current.get(layerKey(sourceRun, meta.layer_name)) ?? meta.default_opacity;
        for (const { value, name, color, visible } of maskLabels(sourceRun, meta)) {
          if (!labels.includes(value)) continue;
          id += 1;
          configs.push([id, { name: `${sourceRun}: ${name}`, color: [...color, opacity], isVisible2d: false, isVisible3d: visible }]);
        }
      }
      applyLabelConfigs(sis, configs);
    },
    [applyLabelConfigs, maskLabels],
  );

  const styleMesh = useCallback(
    (mesh: Mesh, sourceRun: string, meta: LayerMeta) => {
      const key = layerKey(sourceRun, meta.layer_name);
      const opacity = opacityOverridesRef.current.get(key) ?? meta.default_opacity;
      const base = rgbOf(meta.default_color);
      const color = colorOverridesRef.current.get(key) ?? (sourceRun !== run ? desaturateForOverlay(base) : base);
      const sig = JSON.stringify([color, opacity]);
      if (styledRef.current.get(mesh) === sig) return;
      // Matches the surfaceRendering/material state shape the SDK's demo viewer uses.
      const opts = mesh.displayOptions();
      const state = opts.state();
      const surface = state.surfaceRendering as Record<string, unknown> | undefined;
      if (surface) {
        surface.opacity = opacity;
        for (const materialKey of ['materialFront', 'materialBack']) {
          const material = surface[materialKey] as Record<string, unknown> | undefined;
          if (material) {
            material.ambientColor = color;
            material.diffuseColor = color;
          }
        }
      }
      // The MPR slice contour; lineColor must be RGBA (an RGB value is silently ignored).
      const intersection = state.intersectionRendering as Record<string, unknown> | undefined;
      if (intersection && 'lineColor' in intersection) intersection.lineColor = [...color, 1];
      if ('showSurface' in state) state.showSurface = true;
      opts.setState(state);
      styledRef.current.set(mesh, sig);
    },
    [run],
  );

  /** Full defaults for fresh Data; afterwards only the fields that changed, so SDK-side edits survive a re-style. */
  const styleVolume = useCallback(
    (sis: SharedImageSet, sourceRun: string, meta: LayerMeta, role: VolumeRole, copyFrom?: SharedImageSet) => {
      const o = volumeOverridesRef.current.get(layerKey(sourceRun, meta.layer_name));
      const next: AppliedVolumeStyle = {
        window2d: o?.window2d,
        level2d: o?.level2d,
        invert2d: o?.invert2d,
        window3d: o?.window3d,
        level3d: o?.level3d,
        invert3d: o?.invert3d,
        alpha2d: role === '3d' || role === 'none' ? 0 : 1,
        alpha3d: role === '2d' || role === 'none' ? 0 : 1,
      };
      const prev = volumeStyleRef.current.get(sis);
      const twoD = sis.displayOptions2d();
      const threeD = sis.displayOptions3d();
      if (!prev) {
        if (copyFrom) {
          // A crop copy keeps the original's current 3D look rather than re-deriving it from cropped voxels.
          const source3d = copyFrom.displayOptions3d();
          threeD.transferFunction = source3d.transferFunction;
          threeD.invert = source3d.invert;
        } else {
          // The loader already auto-windowed 2D. The SDK's default 3D "CT Bone" preset hides MRI-range data.
          threeD.transferFunction = imf.bindings.TransferFunctionFactory.createMriDefaultPreset(sis);
        }
      }
      if (next.window2d !== undefined && next.window2d !== prev?.window2d) twoD.window = next.window2d;
      if (next.level2d !== undefined && next.level2d !== prev?.level2d) twoD.level = next.level2d;
      if (next.invert2d !== undefined && next.invert2d !== prev?.invert2d) twoD.invert = next.invert2d;
      if (next.window3d !== undefined && next.window3d !== prev?.window3d) threeD.window = next.window3d;
      if (next.level3d !== undefined && next.level3d !== prev?.level3d) threeD.level = next.level3d;
      if (next.invert3d !== undefined && next.invert3d !== prev?.invert3d) threeD.invert = next.invert3d;
      if (next.alpha2d !== prev?.alpha2d) setAlpha(twoD, next.alpha2d);
      if (next.alpha3d !== prev?.alpha3d) setAlpha(threeD, next.alpha3d);
      volumeStyleRef.current.set(sis, next);
    },
    [imf],
  );

  /** Fetches/loads the cropped copy of one volume layer (unstyled), for the 3D view only. */
  const loadCropCopy = useCallback(
    async (sourceRun: string, step: number, meta: LayerMeta, override: VolumeOverride, signal: AbortSignal): Promise<Data> => {
      const buf = await fetchLayerData(
        {
          run: sourceRun,
          case: caseName,
          layer: meta.layer_name,
          step,
          compressed: meta.zlib_compressed,
          cropAxis: override.cropAxis,
          cropPosition: override.cropPosition,
        },
        signal,
      );
      // Must stay unique per crop too; ContextMenu.tsx parses this pattern.
      const filename = `${sanitize(sourceRun)}__${sanitize(caseName)}__${sanitize(meta.layer_name)}__s${step}__crop_${cropSig(override)}${meta.file_extension}`;
      const data = await loadPrimary(imf, buf, filename);
      if (!data) throw new Error(`Layer "${meta.display_name}" @ step ${step} contains no readable data.`);
      const mismatch = kindMismatch(meta, data);
      if (mismatch) {
        releaseLayers(imf, [data]);
        throw new Error(mismatch);
      }
      return data;
    },
    [caseName, imf],
  );

  const startCropJob = useCallback(
    (key: string, step: number, sourceRun: string, meta: LayerMeta, override: VolumeOverride, sig: string): CropJob => {
      const controller = new AbortController();
      const job: CropJob = { sig, step, controller, discarded: false, promise: Promise.resolve(null) };
      job.promise = loadCropCopy(sourceRun, step, meta, override, controller.signal).then(
        (data) => {
          if (!job.discarded && !unmountedRef.current) return data;
          releaseLayers(imf, [data]);
          return null;
        },
        (e) => {
          if (!isAbortError(e)) {
            console.error(`imfusion_viewer: failed to load cropped volume layer "${meta.layer_name}"`, e);
            cropFailedRef.current.set(`${key}@${step}`, sig);
          }
          return null;
        },
      );
      cropJobsRef.current.set(key, job);
      setCutting(key, true);
      return job;
    },
    [imf, loadCropCopy, setCutting],
  );

  const loadStep = useCallback(
    async (sourceRun: string, step: number) => {
      const loadKey = `${sourceRun}:${step}`;
      if (loadingStepsRef.current.has(loadKey) || cacheRef.current.some((e) => e.run === sourceRun && e.step === step)) {
        return;
      }
      loadingStepsRef.current.add(loadKey);
      setIsLoadingStep(true);
      const loaded = new Map<string, Data>();
      try {
        let transientMiss = false;
        let permanentMiss = false;

        // Skip layers this step was never written at (cadences can differ per layer).
        const expected = (layersBySourceRef.current[sourceRun] ?? []).filter((meta) => meta.steps.includes(step));
        const signal = abortRef.current?.signal;
        // Network in parallel; loadBuffer stays sequential.
        const fetched = await Promise.allSettled(
          // Always uncropped: a crop only ever applies to a separate 3D copy.
          expected.map((meta) =>
            fetchLayerData(
              { run: sourceRun, case: caseName, layer: meta.layer_name, step, compressed: meta.zlib_compressed },
              signal,
            ),
          ),
        );

        for (let i = 0; i < expected.length && !unmountedRef.current; i++) {
          const meta = expected[i];
          const result = fetched[i];
          if (result.status === 'rejected') {
            const e: unknown = result.reason;
            // A 404 is transient: the reservoir can evict a step between /cases and this fetch.
            if (isAbortError(e)) {
              transientMiss = true;
            } else if (e instanceof LayerFetchError && e.status === 404) {
              console.warn(
                `imfusion_viewer: layer "${meta.layer_name}" (run "${sourceRun}") @ step ${step} not currently retained (likely reservoir eviction on a long/live run) - will retry on next poll.`,
              );
              transientMiss = true;
            } else {
              console.error(`imfusion_viewer: failed to load layer "${meta.layer_name}" (run "${sourceRun}") @ step ${step}`, e);
              setLoadError(`Failed to load layer "${meta.display_name}" @ step ${step}.`);
              permanentMiss = true;
            }
            continue;
          }

          // Unique per (run, case, layer, step): the DataModel aliases loaded Data by filename globally.
          const filename = `${sanitize(sourceRun)}__${sanitize(caseName)}__${sanitize(meta.layer_name)}__s${step}${meta.file_extension}`;
          let data: Data | null = null;
          try {
            data = await loadPrimary(imf, result.value, filename);
            if (!data) {
              console.error(`imfusion_viewer: layer "${meta.layer_name}" (run "${sourceRun}") @ step ${step} loaded no data.`);
              setLoadError(`Layer "${meta.display_name}" @ step ${step} contains no readable data.`);
              permanentMiss = true;
              continue;
            }
            const mismatch = kindMismatch(meta, data);
            if (mismatch) throw new Error(mismatch);
            // Styled by the show pass (full defaults, since it's fresh).
            loaded.set(layerKey(sourceRun, meta.layer_name), data);
          } catch (e) {
            if (data) releaseLayers(imf, [data]);
            console.error(`imfusion_viewer: failed to load layer "${meta.layer_name}" (run "${sourceRun}") @ step ${step}`, e);
            setLoadError(e instanceof Error && e.message.startsWith('Layer "') ? e.message : `Failed to load layer "${meta.display_name}" @ step ${step}.`);
            permanentMiss = true;
          }
        }

        // Unmounted mid-load, or only retryable misses (kept uncached so the retry happens).
        // A step with a permanent miss IS cached, partial, showing what it can.
        if (unmountedRef.current || (transientMiss && !permanentMiss)) {
          releaseLayers(imf, loaded.values());
          return;
        }

        cacheRef.current.push({ run: sourceRun, step, layers: loaded, crops: new Map() });
        evictExcess(sourceRun);
        // The cache changed, so the effect must re-run to actually show it.
        bumpCacheVersion();
      } finally {
        loadingStepsRef.current.delete(loadKey);
        setIsLoadingStep(loadingStepsRef.current.size > 0);
      }
    },
    [caseName, imf, evictExcess, bumpCacheVersion],
  );

  // Loads the ONE merged 3D label volume, replacing any previous merge.
  const loadCombinedLayer = useCallback(
    async (step: number, contributors: CombinedContributor[], pairsKey: string): Promise<MergeStatus> => {
      const existing = combinedCacheRef.current;
      if (existing && existing.step === step && existing.pairsKey === pairsKey) return 'ok';
      const failKey = `${step}|${pairsKey}`;
      const failed = combinedFailRef.current.get(failKey);
      if (failed) return failed;
      const loadKey = `combined:${failKey}`;
      if (loadingStepsRef.current.has(loadKey)) return 'pending';
      loadingStepsRef.current.add(loadKey);
      setIsLoadingStep(true);
      try {
        const buf = await fetchCombinedLayerData(
          {
            case: caseName,
            step,
            pairs: contributors.map((c) => ({ run: c.sourceRun, layer: c.meta.layer_name, labels: c.labels })),
            compressed: contributors[0].meta.zlib_compressed,
          },
          abortRef.current?.signal,
        );
        if (unmountedRef.current) return 'pending';

        const filename = `combined__${sanitize(caseName)}__s${step}__${sanitize(pairsKey)}.nii`;
        const merged = await loadPrimary(imf, buf, filename);
        if (!merged || !IMAGE_DATA_KINDS.has(merged.kind())) {
          if (merged) releaseLayers(imf, [merged]);
          console.error(`imfusion_viewer: combined mask @ step ${step} loaded no label volume.`);
          combinedFailRef.current.set(failKey, 'error');
          return 'error';
        }
        if (unmountedRef.current) {
          releaseLayers(imf, [merged]);
          return 'pending';
        }
        const previous = combinedCacheRef.current;
        combinedCacheRef.current = { pairsKey, step, data: merged };
        if (previous) releaseData([previous.data]);
        bumpCacheVersion();
        return 'ok';
      } catch (e) {
        if (isAbortError(e) || (e instanceof LayerFetchError && e.status === 404)) return 'pending';
        const status: MergeStatus = e instanceof GridMismatchError ? 'mismatch' : 'error';
        if (status === 'mismatch') {
          console.warn(`imfusion_viewer: combined mask @ step ${step} can't be merged (${e instanceof Error ? e.message : e}).`);
        } else {
          console.error(`imfusion_viewer: failed to load combined mask @ step ${step}`, e);
        }
        combinedFailRef.current.set(failKey, status);
        return status;
      } finally {
        loadingStepsRef.current.delete(loadKey);
        setIsLoadingStep(loadingStepsRef.current.size > 0);
      }
    },
    [caseName, imf, releaseData, bumpCacheVersion],
  );

  /** Centers the views on the primary run's base volume/image in `entry` (not the mesh; masks/meshes sit relative to it). */
  const centerOnPrimary = useCallback(
    (entry: LoadedStep | undefined): boolean => {
      if (!entry) return false;
      const primaryLayers = layersBySourceRef.current[run] ?? [];
      for (const kind of CENTER_KIND_PRIORITY) {
        const meta = primaryLayers.find((l) => l.kind === kind && entry.layers.has(layerKey(run, l.layer_name)));
        const data = meta && entry.layers.get(layerKey(run, meta.layer_name));
        if (data) {
          imf.display.viewGroup().centerOnData(data);
          return true;
        }
      }
      return false;
    },
    [imf, run],
  );

  // The SDK keeps each pane's zoom on resize, so a big canvas size change (e.g. columns
  // added/removed) re-fits the 2D panes; the 3D camera is kept.
  useEffect(() => {
    const canvas = imf.canvas;
    let last: { w: number; h: number } | null = null;
    let raf: number | null = null;
    const refit = () => {
      raf = null;
      const step = displayedStepRef.current.get(run);
      const entry = cacheRef.current.find((e) => e.run === run && e.step === step);
      const view = imf.display.main3dView();
      const camera = view.camera();
      try {
        if (centerOnPrimary(entry)) view.setCamera(camera, true);
      } finally {
        camera.delete();
      }
      imf.render();
    };
    const observer = new ResizeObserver(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return; // hidden column
      const big = last !== null && (Math.abs(w - last.w) > 0.25 * last.w || Math.abs(h - last.h) > 0.25 * last.h);
      last = { w, h };
      // rAF: after the SDK's own observer has applied the new size.
      if (big && centeredRef.current) raf ??= requestAnimationFrame(refit);
    });
    observer.observe(canvas);
    return () => {
      observer.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [imf, run, centerOnPrimary]);

  // Load each source's current step, keep crop copies and the combined merge in sync, then style and show.
  useEffect(() => {
    let cancelled = false;

    const findEntry = (sourceRun: string, step: number | null | undefined) =>
      step === null || step === undefined ? undefined : cacheRef.current.find((e) => e.run === sourceRun && e.step === step);

    // Label values of a mask that show in 3D (layer checked and class not filtered out).
    const visibleLabels = (sourceRun: string, meta: LayerMeta) =>
      maskLabels(sourceRun, meta)
        .filter((l) => l.visible)
        .map((l) => l.value);

    // Every mask with a visible label, across sources at their current steps; merged only if those steps agree.
    // Hidden labels are left out of the merge, else they'd overwrite visible ones where masks overlap.
    const planMerge = () => {
      const contributors: CombinedContributor[] = [];
      const steps = new Set<number>();
      for (const source of sourcesRef.current) {
        const step = currentStepBySourceRef.current.get(source.run) ?? null;
        if (step === null) continue;
        for (const meta of layersBySourceRef.current[source.run] ?? []) {
          if (meta.kind !== 'mask' || !meta.steps.includes(step)) continue;
          const labels = visibleLabels(source.run, meta);
          if (labels.length === 0) continue;
          steps.add(step);
          contributors.push({ sourceRun: source.run, meta, labels });
        }
      }
      if (contributors.length < 2) return null;
      const aligned = steps.size === 1;
      return {
        contributors,
        aligned,
        step: aligned ? [...steps][0] : null,
        pairsKey: contributors.map((c) => `${c.sourceRun}:${c.meta.layer_name}=${c.labels.join('.')}`).join(','),
      };
    };

    const showPass = () => {
      // Each source shows its current step, or keeps its previous one until that has loaded.
      const shownEntries = new Map<string, LoadedStep>();
      for (const source of sourcesRef.current) {
        const entry =
          findEntry(source.run, currentStepBySourceRef.current.get(source.run)) ??
          findEntry(source.run, displayedStepRef.current.get(source.run));
        if (!entry) continue;
        shownEntries.set(source.run, entry);
        displayedStepRef.current.set(source.run, entry.step);
        // LRU: most recently shown last.
        cacheRef.current = [...cacheRef.current.filter((e) => e !== entry), entry];
      }

      const plan = planMerge();
      const cached = combinedCacheRef.current;
      const merged =
        plan?.aligned && cached && cached.step === plan.step && cached.pairsKey === plan.pairsKey ? cached : null;
      if (cached && !merged) {
        combinedCacheRef.current = null;
        releaseData([cached.data]);
      }

      // 3D takes its first image as the volume and draws only the first label image after it, so with
      // no volume checked the first mask would be swallowed. A mask 3D doesn't need then goes first
      // (see below); failing that, an unchecked volume stays shown here, invisible.
      let anchor: Data | null = null;
      const primaryEntry = shownEntries.get(run);
      const anyVolumeShown = sourcesRef.current.some((source) =>
        (layersBySourceRef.current[source.run] ?? []).some(
          (meta) =>
            meta.kind === 'volume' &&
            !!shownEntries.get(source.run)?.layers.has(layerKey(source.run, meta.layer_name)) &&
            (visibilityRef.current.get(layerKey(source.run, meta.layer_name)) ?? defaultVisible(source.run, meta)),
        ),
      );
      const anyLabel3d =
        merged !== null ||
        sourcesRef.current.some((source) =>
          (layersBySourceRef.current[source.run] ?? []).some(
            (meta) =>
              meta.kind === 'mask' &&
              !!shownEntries.get(source.run)?.layers.has(layerKey(source.run, meta.layer_name)) &&
              visibleLabels(source.run, meta).length > 0,
          ),
        );
      // A mask can fill the volume slot if the merge covers 3D or a mask with nothing visible exists.
      const spareMask =
        sourcesRef.current.some((source) =>
          (layersBySourceRef.current[source.run] ?? []).some(
            (meta) =>
              meta.kind === 'mask' &&
              !!shownEntries.get(source.run)?.layers.has(layerKey(source.run, meta.layer_name)) &&
              (merged !== null || visibleLabels(source.run, meta).length === 0),
          ),
        );
      if (primaryEntry && !anyVolumeShown && anyLabel3d && !spareMask) {
        const meta = (layersBySourceRef.current[run] ?? []).find(
          (m) => m.kind === 'volume' && primaryEntry.layers.has(layerKey(run, m.layer_name)),
        );
        anchor = meta ? (primaryEntry.layers.get(layerKey(run, meta.layer_name)) ?? null) : null;
      }

      for (const entry of cacheRef.current) {
        const mergedHere = merged !== null && entry.step === merged.step && shownEntries.get(entry.run) === entry;
        for (const [key, data] of entry.layers) {
          const [sourceRun, layerName] = splitLayerKey(key);
          const meta = (layersBySourceRef.current[sourceRun] ?? []).find((l) => l.layer_name === layerName);
          if (!meta) continue;
          try {
            if (meta.kind === 'mask') {
              styleMask(data as unknown as SharedImageSet, sourceRun, meta, !mergedHere);
            } else if (meta.kind === 'mesh') {
              styleMesh(data as unknown as Mesh, sourceRun, meta);
            } else if (meta.kind === 'volume') {
              const crop = entry.crops.get(key);
              const role: VolumeRole = data === anchor ? 'none' : crop || sourceRun !== run ? '2d' : 'both';
              styleVolume(data as unknown as SharedImageSet, sourceRun, meta, role);
              if (crop) styleVolume(crop.data as unknown as SharedImageSet, sourceRun, meta, '3d');
            }
          } catch (e) {
            console.error(`imfusion_viewer: failed to style layer "${meta.layer_name}" (run "${sourceRun}")`, e);
          }
        }
      }
      if (merged && plan) styleMerged(merged.data as unknown as SharedImageSet, plan.contributors);

      const crops: Data[] = [];
      const volumes: Data[] = [];
      const images: Data[] = [];
      const masks: Data[] = [];
      // Masks with nothing visible go last: without a merge, 3D draws only the first label image.
      const hiddenMasks: Data[] = [];
      const meshes: Data[] = [];
      const nextVolumeData = new Map<string, Data>();
      const nextCropData = new Map<string, Data>();
      for (const source of sourcesRef.current) {
        const entry = shownEntries.get(source.run);
        if (!entry) continue;
        for (const meta of layersBySourceRef.current[source.run] ?? []) {
          const key = layerKey(source.run, meta.layer_name);
          const data = entry.layers.get(key);
          if (!data) continue;
          const crop = entry.crops.get(key);
          if (meta.kind === 'volume') {
            nextVolumeData.set(key, data);
            if (crop) nextCropData.set(key, crop.data);
          }
          if (meta.kind === 'mask') {
            (visibleLabels(source.run, meta).length > 0 ? masks : hiddenMasks).push(data);
            continue;
          }
          if (!(visibilityRef.current.get(key) ?? defaultVisible(source.run, meta))) continue;
          if (meta.kind === 'volume') {
            if (crop) crops.push(crop.data);
            volumes.push(data);
          } else if (meta.kind === 'image') {
            images.push(data);
          } else {
            meshes.push(data);
          }
        }
      }
      // No volume shown: a mask 3D doesn't draw as a label fills the volume slot (it draws nothing there).
      let filler: Data | null = null;
      if (crops.length === 0 && volumes.length === 0 && !anchor) {
        filler = (merged ? (masks[0] ?? hiddenMasks[0]) : hiddenMasks[0]) ?? null;
      }
      const rest = [...masks, ...hiddenMasks].filter((d) => d !== filler);
      // Fixed order, earliest first: 3D draws only the first visible volume (crop copy, then the
      // primary's) and the first label image after it, and 2D blends in list order.
      syncShown([
        ...(anchor ? [anchor] : []),
        ...(filler ? [filler] : []),
        ...crops,
        ...volumes,
        ...images,
        ...(merged ? [merged.data] : []),
        ...rest,
        ...meshes,
      ]);

      const sameMap = (a: Map<string, Data>, b: Map<string, Data>) => a.size === b.size && [...b].every(([k, v]) => a.get(k) === v);
      setCurrentVolumeData((prev) => (sameMap(prev, nextVolumeData) ? prev : nextVolumeData));
      setCurrentCropData((prev) => (sameMap(prev, nextCropData) ? prev : nextCropData));

      if (!sameMap(lastVolumeMapRef.current, nextVolumeData)) {
        lastVolumeMapRef.current = nextVolumeData;
        const warnings = new Map<string, string>();
        const primaryVolumes = [...nextVolumeData].filter(([k]) => splitLayerKey(k)[0] === run);
        for (const [key, data] of nextVolumeData) {
          const [sourceRun, layerName] = splitLayerKey(key);
          if (sourceRun === run || primaryVolumes.length === 0) continue;
          const reference = primaryVolumes.find(([k]) => splitLayerKey(k)[1] === layerName) ?? primaryVolumes[0];
          try {
            const a = summarizeVolume(data as unknown as SharedImageSet);
            const b = summarizeVolume(reference[1] as unknown as SharedImageSet);
            const diff = a && b ? describeVolumeDifference(a, b) : null;
            if (diff) warnings.set(key, `Differs from ${run}'s volume (${diff}).`);
          } catch (e) {
            console.warn('imfusion_viewer: could not compare volumes', e);
          }
        }
        setVolumeWarnings(warnings);
      }

      for (const source of sourcesRef.current) evictExcess(source.run);

      // Once per mount: the SDK's default placement doesn't reliably land on the volume.
      if (!centeredRef.current) centeredRef.current = centerOnPrimary(shownEntries.get(run));

      applyHiddenViews();
      imf.render();
    };

    // Cross-section, 3D only: the current step's volume gets a cropped copy drawn in 3D while
    // the uncropped original keeps the 2D slices. Other cached steps catch up when they become current.
    const syncCrops = async () => {
      for (const source of sourcesRef.current) {
        const entry = findEntry(source.run, currentStepBySourceRef.current.get(source.run));
        if (!entry) continue;
        for (const meta of layersBySourceRef.current[source.run] ?? []) {
          if (meta.kind !== 'volume') continue;
          const key = layerKey(source.run, meta.layer_name);
          const original = entry.layers.get(key);
          if (!original) continue;
          const override = volumeOverridesRef.current.get(key);
          const want = canCrop(source.run, meta) ? cropSig(override) : null;
          const have = entry.crops.get(key);
          let job = cropJobsRef.current.get(key);
          if (job && (job.sig !== want || job.step !== entry.step)) {
            discardCropJob(key, job);
            job = undefined;
          }
          if ((have?.sig ?? null) === want) continue;

          if (want === null || !override) {
            // Uncropped again: the original takes 3D back.
            entry.crops.delete(key);
            styleVolume(original as unknown as SharedImageSet, source.run, meta, source.run === run ? 'both' : '2d');
            if (have) releaseData([have.data]);
            showPass();
            continue;
          }
          if (!job) {
            if (cropFailedRef.current.get(`${key}@${entry.step}`) === want) continue;
            job = startCropJob(key, entry.step, source.run, meta, override, want);
          }
          const fresh = await job.promise;
          // Cancelled: the job stays queued and the next run installs it.
          if (cancelled) return;
          if (cropJobsRef.current.get(key) !== job) continue;
          cropJobsRef.current.delete(key);
          setCutting(key, false);
          if (!fresh) continue;
          if (!cacheRef.current.includes(entry) || entry.layers.get(key) !== original) {
            releaseLayers(imf, [fresh]);
            continue;
          }
          try {
            styleVolume(fresh as unknown as SharedImageSet, source.run, meta, '3d', original as unknown as SharedImageSet);
          } catch (e) {
            console.error(`imfusion_viewer: failed to style cropped volume layer "${meta.layer_name}"`, e);
            releaseLayers(imf, [fresh]);
            continue;
          }
          entry.crops.set(key, { data: fresh, sig: want });
          styleVolume(original as unknown as SharedImageSet, source.run, meta, '2d');
          if (have) releaseData([have.data]);
          showPass();
        }
      }
    };

    const syncMerge = async () => {
      const plan = planMerge();
      let hint: string | null = null;
      if (plan && !plan.aligned) {
        hint = 'Epochs differ: align epochs to merge masks in 3D (3D shows one mask image only).';
      } else if (plan && plan.step !== null) {
        const status = await loadCombinedLayer(plan.step, plan.contributors, plan.pairsKey);
        if (cancelled) return;
        if (status === 'mismatch') hint = "Masks can't be merged in 3D: their volumes use different grids (3D shows one mask image only).";
        else if (status === 'error') hint = 'Merging masks for 3D failed; 3D shows one mask image only.';
      }
      setCombinedHint(hint);
    };

    (async () => {
      // A task, not a microtask: off the commit phase (so releaseData's flushSync takes effect) and out of
      // the input event that changed state, so React updates made mid-pass stay async instead of
      // flushing synchronously between SDK calls.
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (cancelled) return;
      const loads: Promise<void>[] = [];
      for (const source of sourcesRef.current) {
        const step = currentStepBySourceRef.current.get(source.run) ?? null;
        if (step !== null && !findEntry(source.run, step)) loads.push(loadStep(source.run, step));
      }
      // Styles and shows what's resident now (e.g. an override change) without waiting on fetches.
      showPass();
      if (loads.length > 0) {
        await Promise.all(loads);
        if (cancelled) return;
        showPass();
      }
      await syncCrops();
      if (cancelled) return;
      await syncMerge();
      if (cancelled) return;
      showPass();
    })().catch((e) => console.error('imfusion_viewer: load/show pass failed', e));

    return () => {
      cancelled = true;
    };
  }, [
    currentStepBySource,
    layersBySource,
    visibility,
    cacheVersion,
    volumeOverrides,
    colorOverrides,
    opacityOverrides,
    labelColorOverrides,
    labelVisibilityOverrides,
    imf,
    run,
    loadStep,
    loadCombinedLayer,
    startCropJob,
    discardCropJob,
    releaseData,
    evictExcess,
    syncShown,
    styleMask,
    styleMerged,
    styleMesh,
    styleVolume,
    maskLabels,
    canCrop,
    defaultVisible,
    setCutting,
    applyHiddenViews,
    centerOnPrimary,
  ]);

  const toggleVisibility = useCallback(
    (sourceRun: string, meta: LayerMeta) => {
      setVisibility((prev) => {
        const key = layerKey(sourceRun, meta.layer_name);
        return new Map(prev).set(key, !(prev.get(key) ?? defaultVisible(sourceRun, meta)));
      });
    },
    [defaultVisible],
  );

  const handleColorChange = useCallback((sourceRun: string, layerName: string, hex: string) => {
    setColorOverrides((prev) => {
      const next = new Map(prev);
      next.set(layerKey(sourceRun, layerName), hexToRgb(hex));
      return next;
    });
  }, []);

  const handleOpacityChange = useCallback((sourceRun: string, layerName: string, opacity: number) => {
    setOpacityOverrides((prev) => {
      const next = new Map(prev);
      next.set(layerKey(sourceRun, layerName), opacity);
      return next;
    });
  }, []);

  const updateVolumeOverride = useCallback((sourceRun: string, layerName: string, patch: Partial<VolumeOverride>) => {
    setVolumeOverrides((prev) => {
      const key = layerKey(sourceRun, layerName);
      const next = new Map(prev);
      next.set(key, { ...next.get(key), ...patch });
      return next;
    });
  }, []);

  const handleLabelColorChange = useCallback((sourceRun: string, layerName: string, value: number, hex: string) => {
    setLabelColorOverrides((prev) => {
      const next = new Map(prev);
      next.set(`${layerKey(sourceRun, layerName)}:${value}`, hexToRgb(hex));
      return next;
    });
  }, []);

  const toggleLabelVisibility = useCallback((sourceRun: string, layerName: string, value: number, current: boolean) => {
    setLabelVisibilityOverrides((prev) => {
      const next = new Map(prev);
      next.set(`${layerKey(sourceRun, layerName)}:${value}`, !current);
      return next;
    });
  }, []);

  const handleScrub = useCallback(
    (sourceRun: string, index: number) => {
      const srcSteps = stepsBySource[sourceRun] ?? [];
      const target = srcSteps[index];
      if (target === undefined) return;
      setCurrentStepBySource((prev) => new Map(prev).set(sourceRun, target));
      const latest = srcSteps[srcSteps.length - 1];
      if (target !== latest) setPinnedToLiveBySource((prev) => new Map(prev).set(sourceRun, false));
    },
    [stepsBySource],
  );

  const goLive = useCallback(
    (sourceRun: string) => {
      setPinnedToLiveBySource((prev) => new Map(prev).set(sourceRun, true));
      const srcSteps = stepsBySource[sourceRun] ?? [];
      if (srcSteps.length > 0) {
        setCurrentStepBySource((prev) => new Map(prev).set(sourceRun, srcSteps[srcSteps.length - 1]));
      }
    },
    [stepsBySource],
  );

  /** Renders one source's epoch scrubber: the slider, "epoch N · i/M" label, and live pin button. */
  function renderScrubber(sourceRun: string) {
    const srcSteps = stepsBySource[sourceRun] ?? [];
    const step = currentStepBySource.get(sourceRun) ?? null;
    const idx = step !== null ? srcSteps.indexOf(step) : -1;
    const pinned = pinnedToLiveBySource.get(sourceRun) ?? true;
    return (
      <div style={scrubberWrapStyle}>
        <input
          type="range"
          min={0}
          max={Math.max(0, srcSteps.length - 1)}
          value={Math.max(0, idx)}
          disabled={srcSteps.length === 0}
          onChange={(e) => handleScrub(sourceRun, Number(e.target.value))}
          style={sliderStyle}
        />
        <div style={scrubberInfoRowStyle}>
          <span style={stepLabelStyle}>
            {step !== null ? `epoch ${step}` : '—'}
            {/* Step value first, then its 1-based position among the logged steps. */}
            {idx >= 0 && <span style={stepCountLabelStyle}> · {idx + 1}/{srcSteps.length}</span>}
          </span>
          <button type="button" onClick={() => goLive(sourceRun)} disabled={pinned} style={liveButtonStyle}>
            {pinned ? '● live' : '○ go live'}
          </button>
        </div>
      </div>
    );
  }

  /** Renders one layer's checkbox row plus its style controls/legend, for one source. */
  function renderLayerRow(source: Source, meta: LayerMeta) {
    const key = layerKey(source.run, meta.layer_name);
    const isStylable = meta.kind === 'mask' || meta.kind === 'mesh';
    // Shows the same muted default the rendered data actually uses, so the swatch never lies.
    const isOverlay = source.color !== null;
    const defaultColor = rgbOf(meta.default_color);
    const color = colorOverrides.get(key) ?? (isOverlay ? desaturateForOverlay(defaultColor) : defaultColor);
    const opacity = opacityOverrides.get(key) ?? meta.default_opacity;
    const maskLabelEntries = meta.kind === 'mask' && isMultiClass(meta) ? labelEntries(meta) : null;

    return (
      <div key={key}>
        <label style={layerRowStyle}>
          <input
            type="checkbox"
            checked={visibility.get(key) ?? defaultVisible(source.run, meta)}
            onChange={() => toggleVisibility(source.run, meta)}
          />
          {/* Multi-class masks get per-value swatches in the legend row instead. */}
          {!maskLabelEntries &&
            (isStylable ? (
              <input
                type="color"
                value={hexFromRgb(color)}
                onChange={(e) => handleColorChange(source.run, meta.layer_name, e.target.value)}
                style={colorInputStyle}
                title="Layer color"
              />
            ) : (
              <span style={{ ...swatchStyle, background: rgba(meta.default_color) }} />
            ))}
          <span style={layerNameStyle}>{meta.display_name}</span>
          <span style={kindTagStyle}>{meta.kind}</span>
        </label>
        {SHOW_OPACITY_SLIDER && isStylable && (
          <div style={styleControlsRowStyle}>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={opacity}
              onChange={(e) => handleOpacityChange(source.run, meta.layer_name, Number(e.target.value))}
              style={opacitySliderStyle}
              title="Layer opacity"
            />
            <span style={opacityValueStyle}>{Math.round(opacity * 100)}%</span>
          </div>
        )}
        {meta.kind === 'volume' &&
          (() => {
            // Only rendered once this layer's current step is actually resident.
            const sis = currentVolumeData.get(key) as unknown as SharedImageSet | undefined;
            if (!sis) return null;
            return (
              <VolumeWindowingControls
                key={key}
                sis={sis}
                sis3d={(currentCropData.get(key) as unknown as SharedImageSet | undefined) ?? sis}
                crop={volumeOverrides.get(key)}
                cropSupported={canCrop(source.run, meta)}
                show3d={!isOverlay}
                cutting={cuttingKeys.has(key)}
                warning={volumeWarnings.get(key)}
                onOverrideChange={(patch) => updateVolumeOverride(source.run, meta.layer_name, patch)}
              />
            );
          })()}
        {/* Sibling of the layer's <label>, not nested, so a legend entry only toggles its own class. */}
        {maskLabelEntries && (
          <div style={legendRowStyle}>
            {maskLabelEntries.map(([value, name]) => {
              const defaultLabelColor = assignLabelColor(value);
              const labelColor =
                labelColorOverrides.get(`${key}:${value}`) ?? (isOverlay ? desaturateForOverlay(defaultLabelColor) : defaultLabelColor);
              const labelVisible = labelVisibilityOverrides.get(`${key}:${value}`) ?? true;
              return (
                <label key={value} style={legendItemStyle} title={`Show/hide ${name}`}>
                  <input
                    type="checkbox"
                    checked={labelVisible}
                    onChange={() => toggleLabelVisibility(source.run, meta.layer_name, value, labelVisible)}
                  />
                  <input
                    type="color"
                    value={hexFromRgb(labelColor)}
                    onChange={(e) => handleLabelColorChange(source.run, meta.layer_name, value, e.target.value)}
                    style={legendColorInputStyle}
                    title={`${name} color`}
                    // Otherwise this would also toggle the surrounding <label>'s checkbox.
                    onClick={(e) => e.stopPropagation()}
                  />
                  {name}
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const content = (
    <div style={wrapStyle}>
      {renderScrubber(run)}

      {isLoadingStep && <div style={hintStyle}>Loading layers…</div>}
      {loadError && <div style={errorStyle}>{loadError}</div>}
      {combinedHint && <div style={warningStyle}>{combinedHint}</div>}

      <div style={layerListStyle}>
        {(() => {
          const primaryLayers = layersBySource[run] ?? [];
          return (
            <div>
              {primaryLayers.map((meta) => renderLayerRow({ run, color: null }, meta))}
              {primaryLayers.length === 0 && <div style={hintStyle}>No layers reported for this case.</div>}
            </div>
          );
        })()}
      </div>
    </div>
  );

  return (
    <>
      {content}
      {/* Each overlay run's layers portal into its own sidebar row, never the primary's. */}
      {overlayRuns.map((overlay) => {
        const container = overlayContainers?.get(overlay.run);
        if (!container) return null;
        const source: Source = { run: overlay.run, color: overlay.color };
        const sourceLayers = layersBySource[overlay.run] ?? [];
        return createPortal(
          <div style={wrapStyle}>
            {renderScrubber(overlay.run)}
            <div style={layerListStyle}>
              {sourceLayers.map((meta) => renderLayerRow(source, meta))}
              {sourceLayers.length === 0 && <div style={hintStyle}>No data available for this run.</div>}
            </div>
          </div>,
          container,
          overlay.run,
        );
      })}
    </>
  );
}

function rgba([r, g, b, a]: [number, number, number, number]): string {
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
}

/**
 * Runs `sis.autoWindow()` (which only writes 2D window/level) and returns the result; with
 * `restore2d` the 2D side is put back, for when the values are wanted for 3D only.
 */
function autoWindowValues(sis: SharedImageSet, restore2d: boolean): [number, number] {
  // SDK-owned reference (return_value_policy::reference): never delete() it, that frees the live options.
  const o = sis.displayOptions2d();
  const before = [o.window, o.level];
  sis.autoWindow();
  const result: [number, number] = [o.window, o.level];
  if (restore2d) {
    o.window = before[0];
    o.level = before[1];
  }
  return result;
}

/**
 * Invert/Auto-Window/cross-section controls for a volume layer, mutating
 * `sis`'s live DisplayOptions directly and reporting the change up so it
 * survives the next step's fresh SharedImageSet. A real component (not
 * inlined into `renderLayerRow`) since `useDisplayOptions2d/3d` are hooks.
 */
function VolumeWindowingControls({
  sis,
  sis3d,
  crop,
  cropSupported,
  show3d,
  cutting,
  warning,
  onOverrideChange,
}: {
  sis: SharedImageSet;
  /** What the 3D view draws: the cropped copy while cross-sectioned, else `sis` itself. */
  sis3d: SharedImageSet;
  /** Passed in, not read off `sis`: a crop is baked into fetched bytes, not a live SDK option. */
  crop: Pick<VolumeOverride, 'cropAxis' | 'cropPosition'> | undefined;
  cropSupported: boolean;
  /** False for an overlay volume in combined mode, which renders in 2D only. */
  show3d: boolean;
  cutting: boolean;
  warning: string | undefined;
  onOverrideChange(patch: Partial<VolumeOverride>): void;
}) {
  const imf = useImFusion();
  const twoD = useDisplayOptions2d(sis);
  const threeD = useDisplayOptions3d(sis3d);
  const [selectedTab, setTab] = useState<'2d' | '3d'>('2d');
  const tab = show3d ? selectedTab : '2d';
  const options = tab === '2d' ? twoD : threeD;
  const cropped = crop?.cropAxis !== undefined && crop?.cropPosition !== undefined;
  const cropAxis = crop?.cropAxis ?? 'z';
  // Slider position while a debounced cut is still pending.
  const [draftPosition, setDraftPosition] = useState<number | null>(null);
  const cropPosition = draftPosition ?? crop?.cropPosition ?? DEFAULT_CROP_POSITION;
  const pendingCutRef = useRef<Partial<VolumeOverride> | null>(null);
  const cutTimerRef = useRef<number | undefined>(undefined);
  const onOverrideChangeRef = useRef(onOverrideChange);
  useEffect(() => {
    onOverrideChangeRef.current = onOverrideChange;
  });

  const cancelCut = useCallback(() => {
    window.clearTimeout(cutTimerRef.current);
    cutTimerRef.current = undefined;
    pendingCutRef.current = null;
    setDraftPosition(null);
  }, []);
  const flushCut = useCallback(() => {
    const patch = pendingCutRef.current;
    cancelCut();
    if (patch) onOverrideChangeRef.current(patch);
  }, [cancelCut]);
  // A cut still pending at unmount is committed, not dropped.
  useEffect(() => () => flushCut(), [flushCut]);

  return (
    <div style={windowingWrapStyle}>
      {warning && <div style={warningStyle}>{warning}</div>}
      {show3d ? (
        <div style={windowingTabsStyle}>
          {(['2d', '3d'] as const).map((name) => (
            <button
              key={name}
              type="button"
              style={{ ...windowingTabStyle, ...(tab === name ? windowingTabActiveStyle : {}) }}
              onClick={() => setTab(name)}
            >
              {name.toUpperCase()}
            </button>
          ))}
        </div>
      ) : (
        <div style={hintStyle}>2D only in the combined view</div>
      )}
      <label style={windowingCheckboxRowStyle}>
        <input
          type="checkbox"
          checked={options.invert}
          onChange={(e) => {
            const checked = e.target.checked;
            // Not React state - an embind setter writing straight to WASM (see useDisplayOptions2d's JSDoc).
            // eslint-disable-next-line react-hooks/immutability
            options.invert = checked;
            onOverrideChange(tab === '2d' ? { invert2d: checked } : { invert3d: checked });
            imf.render();
          }}
        />
        Invert
      </label>
      <button
        type="button"
        style={windowingAutoButtonStyle}
        onClick={() => {
          // Only the selected tab's side; 3D is windowed from what it draws (the crop copy while cut).
          if (tab === '2d') {
            const [window2d, level2d] = autoWindowValues(sis, false);
            onOverrideChange({ window2d, level2d });
          } else {
            const [window3d, level3d] = autoWindowValues(sis3d, true);
            const o = sis3d.displayOptions3d(); // SDK-owned, not deleted
            o.window = window3d;
            o.level = level3d;
            onOverrideChange({ window3d, level3d });
          }
          imf.render();
        }}
      >
        Auto Window
      </button>
      {cropSupported && show3d && (
        <div style={windowingCropSectionStyle}>
          <div style={windowingCropHeaderStyle}>
            <span>
              Cross-section
              {cutting && <span style={cuttingStyle}> · cutting…</span>}
            </span>
            {cropped && (
              <button
                type="button"
                style={windowingCropClearButtonStyle}
                onClick={() => {
                  cancelCut();
                  onOverrideChange({ cropAxis: undefined, cropPosition: undefined });
                }}
              >
                Clear
              </button>
            )}
          </div>
          <div style={windowingTabsStyle}>
            {(['x', 'y', 'z'] as const).map((axis) => (
              <button
                key={axis}
                type="button"
                style={{ ...windowingTabStyle, ...(cropped && cropAxis === axis ? windowingTabActiveStyle : {}) }}
                onClick={() => {
                  const position = cropped ? cropPosition : DEFAULT_CROP_POSITION;
                  cancelCut();
                  onOverrideChange({ cropAxis: axis, cropPosition: position });
                }}
              >
                {axis.toUpperCase()}
              </button>
            ))}
          </div>
          <label style={windowingSliderRowStyle}>
            <span style={windowingSliderLabelStyle}>Cut</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={cropPosition}
              disabled={!cropped}
              onChange={(e) => {
                const position = Number(e.target.value);
                setDraftPosition(position);
                pendingCutRef.current = { cropAxis, cropPosition: position };
                window.clearTimeout(cutTimerRef.current);
                cutTimerRef.current = window.setTimeout(flushCut, CROP_DEBOUNCE_MS);
              }}
              onPointerUp={flushCut}
              onKeyUp={flushCut}
              style={windowingSliderStyle}
            />
            <span style={windowingSliderValueStyle}>{cropped ? `${Math.round(cropPosition * 100)}%` : 'off'}</span>
          </label>
        </div>
      )}
    </div>
  );
}

// No horizontal padding: the sidebar's "Layers" section (App.tsx) already insets its own body.
const wrapStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  color: 'var(--tb-text)',
};

// Scrubber wrap: two stacked rows instead of one, to avoid overflow past the
// floating panel's edge (see render-site comment).
const scrubberWrapStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
};

const scrubberInfoRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
};

// Full-width on its own row so its minimum width can't squeeze other elements.
const sliderStyle: CSSProperties = {
  width: '100%',
};

const stepLabelStyle: CSSProperties = {
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
};

const stepCountLabelStyle: CSSProperties = {
  opacity: 0.55,
};

// `<button>` doesn't inherit font by default, so `font: 'inherit'` is
// needed to match the surrounding text (same fix as App.tsx's `panelToggleButtonStyle`).
const liveButtonStyle: CSSProperties = {
  font: 'inherit',
  padding: '4px 8px',
  borderRadius: 4,
  border: '1px solid var(--tb-border)',
  background: 'var(--tb-surface)',
  color: 'inherit',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};

const hintStyle: CSSProperties = {
  opacity: 0.55,
};

const errorStyle: CSSProperties = {
  color: 'var(--tb-error)',
};

const layerListStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

const layerRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
};

const layerNameStyle: CSSProperties = {
  flex: 1,
  fontSize: 13,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

// Uses the theme-aware border token so the swatch outline stays legible in
// both light and dark themes.
const swatchStyle: CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: 2,
  flexShrink: 0,
  display: 'inline-block',
  border: '1px solid var(--tb-border)',
};

// No border: below ~14px, Chromium's swatch inset shrinks illegibly once a border is also applied.
const colorInputStyle: CSSProperties = {
  width: 16,
  height: 16,
  padding: 0,
  flexShrink: 0,
  border: 'none',
  borderRadius: 2,
  cursor: 'pointer',
};

// Same as colorInputStyle but sized to match legendItemStyle's smaller swatch
// (14px is close to the smallest that still renders a legible native swatch).
const legendColorInputStyle: CSSProperties = {
  width: 14,
  height: 14,
  padding: 0,
  flexShrink: 0,
  border: 'none',
  borderRadius: 2,
  cursor: 'pointer',
};

// Opacity slider row for a mask/mesh layer, aligned under its checkbox like
// legendRowStyle.
const styleControlsRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '2px 0 2px 22px',
};

const opacitySliderStyle: CSSProperties = {
  flex: 1,
  height: 14,
};

const opacityValueStyle: CSSProperties = {
  opacity: 0.6,
  fontVariantNumeric: 'tabular-nums',
  minWidth: 32,
  textAlign: 'right',
};

// Window/level/gamma controls for a volume layer, aligned under its
// checkbox like styleControlsRowStyle/legendRowStyle above.
const windowingWrapStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: '4px 0 4px 22px',
};

const windowingTabsStyle: CSSProperties = {
  display: 'flex',
  gap: 4,
  marginBottom: 2,
};

const windowingTabStyle: CSSProperties = {
  font: 'inherit',
  fontSize: '0.85em',
  padding: '1px 8px',
  borderRadius: 4,
  border: '1px solid var(--tb-border)',
  background: 'transparent',
  color: 'inherit',
  opacity: 0.6,
  cursor: 'pointer',
};

const windowingTabActiveStyle: CSSProperties = {
  opacity: 1,
  background: 'var(--tb-surface)',
};

const windowingSliderRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const windowingSliderLabelStyle: CSSProperties = {
  flexShrink: 0,
  width: 46,
  opacity: 0.7,
};

const windowingSliderStyle: CSSProperties = {
  flex: 1,
  height: 14,
};

const windowingSliderValueStyle: CSSProperties = {
  opacity: 0.6,
  fontVariantNumeric: 'tabular-nums',
  minWidth: 40,
  textAlign: 'right',
};

const windowingCheckboxRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  opacity: 0.85,
  cursor: 'pointer',
};

const windowingAutoButtonStyle: CSSProperties = {
  font: 'inherit',
  fontSize: '0.85em',
  padding: '2px 8px',
  marginTop: 2,
  borderRadius: 4,
  border: '1px solid var(--tb-border)',
  background: 'var(--tb-surface)',
  color: 'inherit',
  cursor: 'pointer',
  alignSelf: 'flex-start',
};

const windowingCropSectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  marginTop: 6,
  paddingTop: 6,
  borderTop: '1px solid var(--tb-border)',
};

const windowingCropHeaderStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  opacity: 0.7,
};

const windowingCropClearButtonStyle: CSSProperties = {
  font: 'inherit',
  fontSize: '0.8em',
  padding: '0 6px',
  border: 'none',
  background: 'transparent',
  color: 'inherit',
  opacity: 0.7,
  cursor: 'pointer',
  textDecoration: 'underline',
};

// Legend row under a multi-class mask's checkbox; a sibling <div>, not
// nested in the <label>, so clicking it never toggles visibility.
const legendRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '3px 10px',
  padding: '2px 0 2px 22px', // aligned past the checkbox + a bit more
  opacity: 0.85,
};

const legendItemStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
};

const kindTagStyle: CSSProperties = {
  flexShrink: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  opacity: 0.45,
};

const warningStyle: CSSProperties = {
  color: 'var(--tb-warning, #d89614)',
  fontSize: '0.9em',
};

const cuttingStyle: CSSProperties = {
  opacity: 0.8,
  fontStyle: 'italic',
};
