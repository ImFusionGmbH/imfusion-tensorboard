import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { useDisplayOptions2d, useDisplayOptions3d, useImFusion, useViewVisibility } from '@imfusion/sdk-react';
import type { Data, Display, HandleArray, ImFusion, LabelConfig, Mesh, SharedImageSet, View } from '@imfusion/sdk';
import {
  COMBINED_LABEL_OFFSET_STEP,
  fetchCases,
  fetchCombinedLayerData,
  fetchLayerData,
  GridMismatchError,
  LayerFetchError,
  type LayerKind,
  type LayerMeta,
} from './api';
import { assignLabelColor } from './labelColors';

const POLL_INTERVAL_MS = 2000;
// Number of recently viewed steps to keep loaded in WASM memory, so scrubbing
// back and forth doesn't re-fetch every tick. Evicted steps are released via
// `releaseLayers`.
const MAX_RESIDENT_STEPS = 3;
// Order of layer kinds to try when centering the initial view: prefer the
// base volume/image scan, since mask/mesh layers are positioned relative to it.
const CENTER_KIND_PRIORITY: LayerKind[] = ['volume', 'image', 'mask', 'mesh'];

// The four toggleable panes, by the label shown on their checkbox.
const VIEW_BY_LABEL: Record<string, (display: Display) => View> = {
  Axial: (display) => display.mainAxialView(),
  Coronal: (display) => display.mainCoronalView(),
  Sagittal: (display) => display.mainSagittalView(),
  '3D': (display) => display.main3dView(),
};

// Sanitizes a path component for use inside the virtual filename passed to
// `imf.loadBuffer`: replaces any character outside [a-zA-Z0-9_.-] with "_".
function sanitize(s: string): string {
  return s.replace(/[^a-zA-Z0-9_.-]/g, '_');
}

/** Releases layers loaded by `imf.loadBuffer`. `remove()`, not `delete()`: the latter only frees the JS wrapper and leaks the wasm-side Data. */
function releaseLayers(imf: ImFusion, layers: Iterable<Data>): void {
  for (const data of layers) {
    try {
      imf.dataModel.remove(data);
    } catch {
      // The wasm instance is already gone (provider teardown).
    }
  }
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

interface LoadedStep {
  /** Which source (primary or overlay run) this cached step belongs to - each source now scrubs independently, so the same step number can be resident for one run but not another. */
  run: string;
  step: number;
  /** `layerKey(run, layer_name)` -> the Data handle loaded for that layer at this step. */
  layers: Map<string, Data>;
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

/** One contributor to the single combined-workspace merged mask volume: one (source, its own mask layer) pair. */
interface CombinedContributor {
  sourceRun: string;
  meta: LayerMeta;
}

/** User-chosen volume windowing, kept here (not just mutated live) so a step reload re-applies the same choice. */
interface VolumeOverride {
  window2d?: number;
  level2d?: number;
  gamma2d?: number;
  invert2d?: boolean;
  window3d?: number;
  level3d?: number;
  invert3d?: boolean;
  /** Cross-section crop (see `plugin.py`'s `_crop_volume_blob`) - baked into fetched bytes, so a change must re-fetch, not just re-style. */
  cropAxis?: 'x' | 'y' | 'z';
  cropPosition?: number;
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
  /** DOM node the shared view-toggle row portals into (see App.tsx's `registerViewToggleContainer`); renders inline if unset. */
  viewToggleContainer?: HTMLElement | null;
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
  viewToggleContainer,
  onCurrentStepChange,
}: CaseViewerProps) {
  const imf = useImFusion();

  // Show/hide toggles for the 4-pane MPR/3D grid. useViewVisibility handles
  // subscription and identity stability, so calling the view getters fresh on
  // every render is fine; no memoization needed here.
  const axialView = useViewVisibility(imf.display.mainAxialView());
  const coronalView = useViewVisibility(imf.display.mainCoronalView());
  const sagittalView = useViewVisibility(imf.display.mainSagittalView());
  const threeDView = useViewVisibility(imf.display.main3dView());
  const viewToggles = [
    { label: 'Axial', ...axialView },
    { label: 'Coronal', ...coronalView },
    { label: 'Sagittal', ...sagittalView },
    { label: '3D', ...threeDView },
  ];

  // Which panes the user has hidden - re-asserted after each load, since the
  // SDK auto-reshows every view whenever visible data changes.
  const hiddenViewsRef = useRef<Record<string, boolean>>({});
  const applyHiddenViews = useCallback(() => {
    const layouter = imf.display.layouter();
    for (const [label, hidden] of Object.entries(hiddenViewsRef.current)) {
      const getView = VIEW_BY_LABEL[label];
      if (getView) layouter.setViewHidden(getView(imf.display), hidden);
    }
  }, [imf]);

  // Recomputed fresh every render; effects needing stability read `sourcesRef.current` instead.
  const sources: Source[] = [{ run, color: null }, ...overlayRuns.map((o) => ({ run: o.run, color: o.color }))];

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
  const [currentStepBySource, setCurrentStepBySource] = useState<Map<string, number | null>>(() => {
    const m = new Map<string, number | null>();
    m.set(run, initialSteps.length > 0 ? initialSteps[initialSteps.length - 1] : null);
    for (const overlay of overlayRuns) {
      const overlaySteps = overlay.initialSteps ?? [];
      m.set(overlay.run, overlaySteps.length > 0 ? overlaySteps[overlaySteps.length - 1] : null);
    }
    return m;
  });
  const [pinnedToLiveBySource, setPinnedToLiveBySource] = useState<Map<string, boolean>>(() => {
    const m = new Map<string, boolean>();
    m.set(run, true);
    for (const overlay of overlayRuns) m.set(overlay.run, true);
    return m;
  });
  // Keyed by layerKey(run, layer_name), so the same layer name in two different runs is independent.
  const [visibility, setVisibility] = useState<Map<string, boolean>>(() => {
    const m = new Map<string, boolean>();
    for (const l of initialLayers) m.set(layerKey(run, l.layer_name), l.default_visible);
    return m;
  });
  // Live overrides layered onto writer-provided defaults, keyed like `visibility`.
  // `labelColorOverrides`/`labelVisibilityOverrides` are suffixed `:<value>` for one multiclass label.
  const [colorOverrides, setColorOverrides] = useState<Map<string, [number, number, number]>>(new Map());
  const [opacityOverrides, setOpacityOverrides] = useState<Map<string, number>>(new Map());
  const [labelColorOverrides, setLabelColorOverrides] = useState<Map<string, [number, number, number]>>(new Map());
  const [labelVisibilityOverrides, setLabelVisibilityOverrides] = useState<Map<string, boolean>>(new Map());
  const [volumeOverrides, setVolumeOverrides] = useState<Map<string, VolumeOverride>>(new Map());
  // Currently-shown volume Data per layer key, for the windowing controls row.
  const [currentVolumeData, setCurrentVolumeData] = useState<Map<string, Data>>(new Map());
  const [isLoadingStep, setIsLoadingStep] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  // Re-runs the load/show effect; bumped when a load lands or on a retry, never mid-load.
  const [cacheVersion, setCacheVersion] = useState(0);
  const bumpCacheVersion = useCallback(() => setCacheVersion((n) => n + 1), []);

  // Refs mirror latest state for long-lived interval/effect closures; updated in an effect, not during render.
  const pinnedToLiveBySourceRef = useRef(pinnedToLiveBySource);
  const layersBySourceRef = useRef(layersBySource);
  const visibilityRef = useRef(visibility);
  const stepsBySourceRef = useRef(stepsBySource);
  const currentStepBySourceRef = useRef(currentStepBySource);
  const sourcesRef = useRef(sources);
  const volumeOverridesRef = useRef(volumeOverrides);
  useEffect(() => {
    pinnedToLiveBySourceRef.current = pinnedToLiveBySource;
    layersBySourceRef.current = layersBySource;
    visibilityRef.current = visibility;
    stepsBySourceRef.current = stepsBySource;
    currentStepBySourceRef.current = currentStepBySource;
    sourcesRef.current = sources;
    volumeOverridesRef.current = volumeOverrides;
  });

  const cacheRef = useRef<LoadedStep[]>([]);
  // Combined-workspace only: ONE merged label volume for every mask across
  // aligned sources, or `null` if nothing's merged - must be a single object
  // since the WebSDK's 3D view can only render one LABEL SharedImageSet.
  const combinedCacheRef = useRef<{ pairsKey: string; step: number; data: Data } | null>(null);
  // key -> last-applied style signature, so an unchanged style is never reapplied.
  const lastAppliedStyleRef = useRef<Map<string, string>>(new Map());
  // Keyed by `${run}:${step}` - two sources can be mid-load simultaneously.
  const loadingStepsRef = useRef<Set<string>>(new Set());
  // Set once per mount; re-centering on every scrub would discard a manual pan/zoom.
  const centeredRef = useRef(false);

  // Poll each source's layers/steps, auto-advancing to the newest step unless manually scrubbed back.
  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
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
        // fetchCases rebuilds every object, so assigning unconditionally
        // would change state identity every 2s and re-run the show/hide
        // effect (and re-render) in every mounted column for no reason.
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

  // Release all resident Data on unmount; `unmountedRef` lets a late-landing load free itself too.
  const unmountedRef = useRef(false);
  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
      for (const entry of cacheRef.current) {
        releaseLayers(imf, entry.layers.values());
      }
      cacheRef.current = [];
      if (combinedCacheRef.current) {
        releaseLayers(imf, [combinedCacheRef.current.data]);
        combinedCacheRef.current = null;
      }
    };
  }, [imf]);

  const applyMaskDefaults = useCallback(
    // Visibility is driven entirely through LabelConfig, never viewGroup.hideData/showData:
    // that silently breaks a mask's rendering once combined-workspace mode shares the WASM
    // instance with a second run's label data (checkbox/opacity read back fine, nothing draws).
    (sis: SharedImageSet, sourceRun: string, meta: LayerMeta, layerVisible: boolean) => {
      sis.setModality('LABEL'); // required for label configs to apply
      const bindings = imf.bindings;
      const key = layerKey(sourceRun, meta.layer_name);
      const opacity = opacityOverrides.get(key) ?? meta.default_opacity;
      // Only an overlay run's default color is muted; an explicit override is never second-guessed.
      const isOverlay = sourceRun !== run;

      const maskLabels = meta.maskLabels;
      if (maskLabels && Object.keys(maskLabels).length > 0) {
        // Multi-class mask: each label value gets its own overridable color.
        const entries = Object.entries(maskLabels)
          .map(([valueStr, name]): [string, number, string] => [valueStr, Number(valueStr), name])
          .sort((a, b) => a[1] - b[1]);
        for (const [valueStr, value, name] of entries) {
          if (!Number.isFinite(value)) {
            console.warn(`imfusion_viewer: skipping non-numeric mask label key "${valueStr}" (name "${name}")`);
            continue;
          }
          const defaultColor = assignLabelColor(value);
          const color =
            labelColorOverrides.get(`${key}:${value}`) ?? (isOverlay ? desaturateForOverlay(defaultColor) : defaultColor);
          // Combines the whole-layer checkbox with this one class's own
          // filter toggle - either one hides just this label.
          const labelVisible = layerVisible && (labelVisibilityOverrides.get(`${key}:${value}`) ?? meta.default_visible);
          const config: LabelConfig = {
            name,
            color: [...color, opacity],
            isVisible2d: labelVisible,
            isVisible3d: labelVisible,
          };
          bindings.setLabelConfig(sis, value, config);
        }
        return;
      }

      // Legacy single-label mask: `meta.legacyLabelValue` is the foreground
      // pixel value (write_layer's `label_value`), defaulted in api.ts.
      const pixelValue = meta.legacyLabelValue;
      bindings.setDefaultLabelConfig(sis, pixelValue);
      const defaultColor: [number, number, number] = [meta.default_color[0], meta.default_color[1], meta.default_color[2]];
      const color = colorOverrides.get(key) ?? (isOverlay ? desaturateForOverlay(defaultColor) : defaultColor);
      const config: LabelConfig = {
        name: meta.display_name,
        color: [...color, opacity],
        isVisible2d: layerVisible,
        isVisible3d: layerVisible,
      };
      bindings.setLabelConfig(sis, pixelValue, config);
    },
    [imf, run, colorOverrides, opacityOverrides, labelColorOverrides, labelVisibilityOverrides],
  );

  // Styles a merged combined-workspace label volume: each contributor's label
  // value(s) offset by `index * COMBINED_LABEL_OFFSET_STEP` (see plugin.py's
  // `_serve_combined_layer_data`), keeping its own color/opacity overrides.
  const applyCombinedMaskLabelConfig = useCallback(
    (sis: SharedImageSet, contributors: Array<{ sourceRun: string; meta: LayerMeta; layerVisible: boolean }>) => {
      sis.setModality('LABEL');
      const bindings = imf.bindings;
      contributors.forEach(({ sourceRun, meta, layerVisible }, index) => {
        const key = layerKey(sourceRun, meta.layer_name);
        const opacity = opacityOverrides.get(key) ?? meta.default_opacity;
        const isOverlay = sourceRun !== run;
        const offset = index * COMBINED_LABEL_OFFSET_STEP;

        const maskLabels = meta.maskLabels;
        if (maskLabels && Object.keys(maskLabels).length > 0) {
          const entries = Object.entries(maskLabels)
            .map(([valueStr, name]): [string, number, string] => [valueStr, Number(valueStr), name])
            .sort((a, b) => a[1] - b[1]);
          for (const [valueStr, value, name] of entries) {
            if (!Number.isFinite(value)) {
              console.warn(`imfusion_viewer: skipping non-numeric mask label key "${valueStr}" (name "${name}")`);
              continue;
            }
            const defaultColor = assignLabelColor(value);
            const color =
              labelColorOverrides.get(`${key}:${value}`) ?? (isOverlay ? desaturateForOverlay(defaultColor) : defaultColor);
            const labelVisible = layerVisible && (labelVisibilityOverrides.get(`${key}:${value}`) ?? meta.default_visible);
            bindings.setLabelConfig(sis, value + offset, {
              name: `${sourceRun}: ${name}`,
              color: [...color, opacity],
              isVisible2d: labelVisible,
              isVisible3d: labelVisible,
            });
          }
          return;
        }

        const pixelValue = meta.legacyLabelValue + offset;
        const defaultColor: [number, number, number] = [meta.default_color[0], meta.default_color[1], meta.default_color[2]];
        const color = colorOverrides.get(key) ?? (isOverlay ? desaturateForOverlay(defaultColor) : defaultColor);
        bindings.setLabelConfig(sis, pixelValue, {
          name: `${sourceRun}: ${meta.display_name}`,
          color: [...color, opacity],
          isVisible2d: layerVisible,
          isVisible3d: layerVisible,
        });
      });
    },
    [imf, run, colorOverrides, opacityOverrides, labelColorOverrides, labelVisibilityOverrides],
  );

  const applyMeshDefaults = useCallback(
    (mesh: Mesh, sourceRun: string, meta: LayerMeta) => {
      const key = layerKey(sourceRun, meta.layer_name);
      const opacity = opacityOverrides.get(key) ?? meta.default_opacity;
      const defaultColor: [number, number, number] = [meta.default_color[0], meta.default_color[1], meta.default_color[2]];
      const color = colorOverrides.get(key) ?? (sourceRun !== run ? desaturateForOverlay(defaultColor) : defaultColor);
      // Matches the surfaceRendering/material state shape the SDK's demo viewer uses.
      const opts = mesh.displayOptions();
      const state = opts.state() as Record<string, unknown>;
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
      if ('showSurface' in state) state.showSurface = true;
      opts.setState(state);
    },
    [run, colorOverrides, opacityOverrides],
  );

  const applyVolumeDefaults = useCallback(
    (sis: SharedImageSet, sourceRun: string, meta: LayerMeta) => {
      // The SDK defaults 3D to a "CT Bone" preset regardless of modality, which
      // renders real-valued MRI data invisible; createMriDefaultPreset derives a
      // window/level from the image's own range instead. autoWindow() does the
      // same for 2D, which otherwise defaults to a degenerate 0/0. A user's own
      // choice from the windowing controls always overrides either baseline.
      const override = volumeOverrides.get(layerKey(sourceRun, meta.layer_name));
      sis.autoWindow();
      const twoD = sis.displayOptions2d();
      const threeD = sis.displayOptions3d();
      threeD.transferFunction = imf.bindings.TransferFunctionFactory.createMriDefaultPreset(sis);
      if (override?.window2d !== undefined) twoD.window = override.window2d;
      if (override?.level2d !== undefined) twoD.level = override.level2d;
      if (override?.gamma2d !== undefined) twoD.gamma = override.gamma2d;
      if (override?.invert2d !== undefined) twoD.invert = override.invert2d;
      if (override?.window3d !== undefined) threeD.window = override.window3d;
      if (override?.level3d !== undefined) threeD.level = override.level3d;
      if (override?.invert3d !== undefined) threeD.invert = override.invert3d;
    },
    [imf, volumeOverrides],
  );

  /** Fetches/loads one volume layer under its current crop, to swap a crop change into an already-visible step without reloading everything else. */
  const reloadVolumeLayer = useCallback(
    async (sourceRun: string, step: number, meta: LayerMeta): Promise<Data> => {
      const key = layerKey(sourceRun, meta.layer_name);
      const crop = volumeOverridesRef.current.get(key);
      const cropParams =
        crop?.cropAxis !== undefined && crop?.cropPosition !== undefined
          ? { cropAxis: crop.cropAxis, cropPosition: crop.cropPosition }
          : undefined;
      const buf = await fetchLayerData({
        run: sourceRun,
        case: caseName,
        layer: meta.layer_name,
        step,
        compressed: meta.zlib_compressed,
        ...cropParams,
      });
      // See loadStep's own filename comment: must stay unique per crop too.
      const cropSuffix = cropParams ? `__crop_${cropParams.cropAxis}_${Math.round(cropParams.cropPosition * 1000)}` : '';
      const filename = `${sanitize(sourceRun)}__${sanitize(caseName)}__${sanitize(meta.layer_name)}__s${step}${cropSuffix}${meta.file_extension}`;
      const dataArr: HandleArray<Data> = await imf.loadBuffer(buf, filename);
      const primary = dataArr[0];
      if (!primary) {
        throw new Error(`Layer "${meta.display_name}" @ step ${step} contains no readable data.`);
      }
      applyVolumeDefaults(primary as unknown as SharedImageSet, sourceRun, meta);
      return primary;
    },
    [caseName, imf, applyVolumeDefaults],
  );

  const loadStep = useCallback(
    async (sourceRun: string, step: number) => {
      const loadKey = `${sourceRun}:${step}`;
      if (loadingStepsRef.current.has(loadKey) || cacheRef.current.some((e) => e.run === sourceRun && e.step === step)) {
        return;
      }
      loadingStepsRef.current.add(loadKey);
      setIsLoadingStep(true);
      try {
        const loaded = new Map<string, Data>();
        let transientMiss = false;
        let permanentMiss = false;

        const sourceLayers = layersBySourceRef.current[sourceRun] ?? [];
        // Skip layers this step was never written at (cadences can differ per layer).
        const expected = sourceLayers.filter((meta) => meta.steps.includes(step));
        for (const meta of expected) {
          const key = layerKey(sourceRun, meta.layer_name);
          try {
            // Only volume-kind layers ever carry a crop override.
            const crop = meta.kind === 'volume' ? volumeOverridesRef.current.get(key) : undefined;
            const cropParams =
              crop?.cropAxis !== undefined && crop?.cropPosition !== undefined
                ? { cropAxis: crop.cropAxis, cropPosition: crop.cropPosition }
                : undefined;
            const buf = await fetchLayerData({
              run: sourceRun,
              case: caseName,
              layer: meta.layer_name,
              step,
              compressed: meta.zlib_compressed,
              ...cropParams,
            });
            // Filename must be unique per (run, case, layer, step, crop): the
            // WebSDK's DataModel dedups/aliases loaded Data by filename globally,
            // and an unscoped one previously let a destroyed object from one
            // instance get referenced by another, crashing on case switch.
            const cropSuffix = cropParams ? `__crop_${cropParams.cropAxis}_${Math.round(cropParams.cropPosition * 1000)}` : '';
            const filename = `${sanitize(sourceRun)}__${sanitize(caseName)}__${sanitize(meta.layer_name)}__s${step}${cropSuffix}${meta.file_extension}`;
            const dataArr: HandleArray<Data> = await imf.loadBuffer(buf, filename);
            const primary = dataArr[0];
            if (!primary) {
              console.error(
                `imfusion_viewer: layer "${meta.layer_name}" (run "${sourceRun}") @ step ${step} loaded no data.`,
              );
              setLoadError(`Layer "${meta.display_name}" @ step ${step} contains no readable data.`);
              permanentMiss = true;
              continue;
            }

            // Registered before defaults are applied, so a throw there doesn't leave it unreleasable.
            loaded.set(key, primary);
            if (meta.kind === 'mask') {
              const layerVisible = visibilityRef.current.get(key) ?? meta.default_visible;
              applyMaskDefaults(primary as unknown as SharedImageSet, sourceRun, meta, layerVisible);
            } else if (meta.kind === 'mesh') {
              applyMeshDefaults(primary as unknown as Mesh, sourceRun, meta);
            } else if (meta.kind === 'volume') {
              applyVolumeDefaults(primary as unknown as SharedImageSet, sourceRun, meta);
            }
          } catch (e) {
            // A 404 is expected/transient: the reservoir can evict a step between
            // the /cases listing and this fetch; it self-heals on the next poll.
            if (e instanceof LayerFetchError && e.status === 404) {
              console.warn(
                `imfusion_viewer: layer "${meta.layer_name}" (run "${sourceRun}") @ step ${step} not currently retained (likely reservoir eviction on a long/live run) - will retry on next poll.`,
              );
              transientMiss = true;
            } else {
              console.error(`imfusion_viewer: failed to load layer "${meta.layer_name}" (run "${sourceRun}") @ step ${step}`, e);
              setLoadError(`Failed to load layer "${meta.display_name}" @ step ${step}.`);
              permanentMiss = true;
            }
          }
        }

        // This CaseViewer went away while the fetches were in flight; its
        // cleanup has already run, so free what we loaded here instead.
        if (unmountedRef.current) {
          releaseLayers(imf, loaded.values());
          return;
        }

        // A step with only retryable misses stays uncached, or the retry would never happen;
        // a step with a permanent miss IS cached, partial, showing what it can.
        if (transientMiss && !permanentMiss) {
          releaseLayers(imf, loaded.values());
          return;
        }

        cacheRef.current.push({ run: sourceRun, step, layers: loaded });
        // Evict oldest-first, never the step currently on screen (would blank the viewer).
        while (cacheRef.current.filter((e) => e.run === sourceRun).length > MAX_RESIDENT_STEPS) {
          const currentForSource = currentStepBySourceRef.current.get(sourceRun) ?? null;
          const index = cacheRef.current.findIndex((e) => e.run === sourceRun && e.step !== currentForSource);
          if (index === -1) break;
          const [evicted] = cacheRef.current.splice(index, 1);
          releaseLayers(imf, evicted.layers.values());
          for (const key of evicted.layers.keys()) lastAppliedStyleRef.current.delete(`${evicted.step}:${key}`);
        }
        // The cache changed, so the effect must re-run to actually show it.
        bumpCacheVersion();
      } finally {
        loadingStepsRef.current.delete(loadKey);
        setIsLoadingStep(loadingStepsRef.current.size > 0);
      }
    },
    [caseName, imf, applyMaskDefaults, applyMeshDefaults, applyVolumeDefaults, bumpCacheVersion],
  );

  // Combined-workspace only: loads the ONE merged label volume for every mask
  // layer across aligned sources (see the main load/show effect), replacing any previous merge.
  const loadCombinedLayer = useCallback(
    async (step: number, contributors: CombinedContributor[]) => {
      const pairsKey = contributors.map((c) => `${c.sourceRun}:${c.meta.layer_name}`).join(',');
      const loadKey = `combined:${step}:${pairsKey}`;
      const existing = combinedCacheRef.current;
      if (loadingStepsRef.current.has(loadKey) || (existing && existing.step === step && existing.pairsKey === pairsKey)) {
        return;
      }
      loadingStepsRef.current.add(loadKey);
      setIsLoadingStep(true);
      try {
        const buf = await fetchCombinedLayerData({
          case: caseName,
          step,
          pairs: contributors.map((c) => ({ run: c.sourceRun, layer: c.meta.layer_name })),
          compressed: contributors[0].meta.zlib_compressed,
        });
        if (unmountedRef.current) return;

        const filename = `combined__${sanitize(caseName)}__s${step}__${sanitize(pairsKey)}.nii`;
        const dataArr: HandleArray<Data> = await imf.loadBuffer(buf, filename);
        const merged = dataArr[0];
        if (!merged) {
          console.error(`imfusion_viewer: combined mask @ step ${step} loaded no data.`);
          return;
        }
        if (unmountedRef.current) {
          imf.dataModel.remove(merged);
          return;
        }

        if (combinedCacheRef.current) {
          try {
            imf.dataModel.remove(combinedCacheRef.current.data);
          } catch {
            // Already released (e.g. a prior unmount raced this).
          }
        }
        combinedCacheRef.current = { pairsKey, step, data: merged };
        bumpCacheVersion();
      } catch (e) {
        if (e instanceof GridMismatchError) {
          console.warn(
            `imfusion_viewer: combined mask @ step ${step} can't be merged (${e.message}) - showing each run's own masks separately instead.`,
          );
        } else {
          console.error(`imfusion_viewer: failed to load combined mask @ step ${step}`, e);
        }
      } finally {
        loadingStepsRef.current.delete(loadKey);
        setIsLoadingStep(loadingStepsRef.current.size > 0);
      }
    },
    [caseName, imf, bumpCacheVersion],
  );

  // Ensure every source's current step is loaded, then show its visible-per-checkbox
  // layers and hide the rest of its LRU cache - each source's step is independent.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Handle a crop change for whichever step is on screen per source: fetch the
      // freshly-cropped layer and swap in only its Data, leaving masks/meshes
      // untouched. Other cached steps are left alone (not evicted) and get the
      // same treatment lazily, the next time they become the current step.
      for (const source of sourcesRef.current) {
        const step = currentStepBySourceRef.current.get(source.run) ?? null;
        if (step === null) continue;
        const entry = cacheRef.current.find((e) => e.run === source.run && e.step === step);
        if (!entry) continue;
        for (const meta of layersBySourceRef.current[source.run] ?? []) {
          if (meta.kind !== 'volume') continue;
          const key = layerKey(source.run, meta.layer_name);
          const data = entry.layers.get(key);
          if (!data) continue;
          const override = volumeOverridesRef.current.get(key);
          const cacheKey = `${entry.step}:${key}`;
          const sig = JSON.stringify([override?.cropAxis, override?.cropPosition]);
          const previous = lastAppliedCropRef.current.get(cacheKey);
          lastAppliedCropRef.current.set(cacheKey, sig);
          // No prior record means just-loaded under the already-current crop - nothing to swap.
          if (previous === undefined || previous === sig) continue;

          try {
            const fresh = await reloadVolumeLayer(source.run, entry.step, meta);
            if (cancelled) {
              releaseLayers(imf, [fresh]);
              continue;
            }
            // flushSync forces VolumeWindowingControls' sis prop swap (and its
            // useDisplayOptions hooks' unsubscribe-from-old) to finish before `data`
            // is released below - otherwise its still-subscribed onChanged callback
            // fires on the destroyed object and crashes ("RuntimeError: null function").
            flushSync(() => {
              setCurrentVolumeData((prev) => new Map(prev).set(key, fresh));
            });
            entry.layers.set(key, fresh);
            const swapViewGroup = imf.display.viewGroup();
            swapViewGroup.showData(fresh);
            swapViewGroup.hideData(data);
            releaseLayers(imf, [data]);
          } catch (e) {
            console.error(`imfusion_viewer: failed to reload cropped volume layer "${meta.layer_name}"`, e);
          }
        }
      }

      for (const source of sourcesRef.current) {
        const step = currentStepBySourceRef.current.get(source.run) ?? null;
        if (step === null) continue;
        if (!cacheRef.current.some((e) => e.run === source.run && e.step === step)) {
          await loadStep(source.run, step);
        }
      }
      if (cancelled) return;

      const viewGroup = imf.display.viewGroup();
      const nextVolumeData = new Map<string, Data>();
      for (const entry of cacheRef.current) {
        const isCurrentStep = entry.step === (currentStepBySourceRef.current.get(entry.run) ?? null);
        for (const [key, data] of entry.layers) {
          // Falls back to the layer's own default, not a bare `true`, so a
          // layer discovered post-mount starts at its intended default.
          const [sourceRun, layerName] = splitLayerKey(key);
          const meta = (layersBySourceRef.current[sourceRun] ?? []).find((l) => l.layer_name === layerName);
          const layerVisible = visibilityRef.current.get(key) ?? meta?.default_visible ?? true;

          if (meta?.kind === 'mask') {
            // Never hideData/showData for the checkbox itself - only step visibility does (see applyMaskDefaults).
            applyMaskDefaults(data as unknown as SharedImageSet, sourceRun, meta, layerVisible);
            if (isCurrentStep) viewGroup.showData(data);
            else viewGroup.hideData(data);
          } else if (isCurrentStep && layerVisible) {
            viewGroup.showData(data);
          } else {
            viewGroup.hideData(data);
          }

          if (meta?.kind === 'volume' && isCurrentStep) nextVolumeData.set(key, data);
        }
      }
      setCurrentVolumeData((prev) => {
        if (prev.size === nextVolumeData.size && [...nextVolumeData].every(([k, v]) => prev.get(k) === v)) return prev;
        return nextVolumeData;
      });

      // Combined-workspace mask merge: when 2+ sources agree on one step, fold
      // every mask layer from every one of them into one merged label volume -
      // the WebSDK's 3D view can only render one LABEL SharedImageSet at a time,
      // so separate per-source objects would only ever show one of them.
      if (sourcesRef.current.length > 1) {
        const contributors: CombinedContributor[] = [];
        const sourceSteps = sourcesRef.current.map((source) => currentStepBySourceRef.current.get(source.run) ?? null);
        const commonStep = sourceSteps[0];
        const stepsAligned = commonStep !== null && sourceSteps.every((s) => s === commonStep);

        if (stepsAligned) {
          for (const source of sourcesRef.current) {
            for (const meta of layersBySourceRef.current[source.run] ?? []) {
              if (meta.kind === 'mask') contributors.push({ sourceRun: source.run, meta });
            }
          }
        }

        const pairsKey = contributors.map((c) => `${c.sourceRun}:${c.meta.layer_name}`).join(',');
        // Nothing to merge with fewer than 2 contributing masks.
        if (stepsAligned && contributors.length >= 2) {
          await loadCombinedLayer(commonStep, contributors);
        }
        if (cancelled) return;

        const entry = combinedCacheRef.current;
        if (entry && stepsAligned && entry.step === commonStep && entry.pairsKey === pairsKey) {
          const styledContributors = contributors.map(({ sourceRun, meta }) => ({
            sourceRun,
            meta,
            layerVisible: visibilityRef.current.get(layerKey(sourceRun, meta.layer_name)) ?? meta.default_visible,
          }));
          applyCombinedMaskLabelConfig(entry.data as unknown as SharedImageSet, styledContributors);
          viewGroup.showData(entry.data);
          // The merged volume takes over from each contributor's own copy, shown individually above.
          for (const { sourceRun, meta } of contributors) {
            const ownEntry = cacheRef.current.find((e) => e.run === sourceRun && e.step === commonStep);
            const ownData = ownEntry?.layers.get(layerKey(sourceRun, meta.layer_name));
            if (ownData) viewGroup.hideData(ownData);
          }
        } else if (entry) {
          // No longer mergeable (steps diverged, grid mismatch, or the
          // contributing set changed) - release the stale merged volume and
          // let the per-source loop's own decision above stand.
          viewGroup.hideData(entry.data);
          try {
            imf.dataModel.remove(entry.data);
          } catch {
            // Already released (e.g. a prior unmount raced this).
          }
          combinedCacheRef.current = null;
        }
      }

      // Center on the primary run's base volume/image once per mount, not the mesh -
      // the SDK's default placement doesn't reliably land on the volume otherwise.
      if (!centeredRef.current) {
        const primaryStep = currentStepBySourceRef.current.get(run) ?? null;
        const currentEntry = cacheRef.current.find((e) => e.run === run && e.step === primaryStep);
        if (currentEntry) {
          let centerData: Data | undefined;
          const primaryLayers = layersBySourceRef.current[run] ?? [];
          for (const kind of CENTER_KIND_PRIORITY) {
            const meta = primaryLayers.find((l) => l.kind === kind && currentEntry.layers.has(layerKey(run, l.layer_name)));
            if (meta) {
              centerData = currentEntry.layers.get(layerKey(run, meta.layer_name));
              break;
            }
          }
          if (centerData) {
            viewGroup.centerOnData(centerData);
            centeredRef.current = true;
          }
        }
      }

      applyHiddenViews();
      imf.render();
    })();

    return () => {
      cancelled = true;
    };
  }, [
    currentStepBySource,
    layersBySource,
    visibility,
    cacheVersion,
    volumeOverrides,
    imf,
    loadStep,
    reloadVolumeLayer,
    loadCombinedLayer,
    applyHiddenViews,
    run,
    applyMaskDefaults,
    applyMeshDefaults,
    applyCombinedMaskLabelConfig,
  ]);

  // Per (step, key) crop signature, since overrides are keyed by run+layer only
  // (applies to every step) but a crop change must be detected per cached step.
  const lastAppliedCropRef = useRef<Map<string, string>>(new Map());

  // Re-styles every cached step's Data in place (no refetch), so scrubbing back shows the same override.
  useEffect(() => {
    for (const entry of cacheRef.current) {
      for (const [key, data] of entry.layers) {
        const [sourceRun, layerName] = splitLayerKey(key);
        const meta = (layersBySource[sourceRun] ?? []).find((l) => l.layer_name === layerName);
        if (!meta) continue;
        // Same key can be cached at several steps - key the applied signature by (step, key).
        const cacheKey = `${entry.step}:${key}`;
        if (meta.kind === 'mask') {
          const layerVisible = visibility.get(key) ?? meta.default_visible;
          const sig = JSON.stringify([
            layerVisible,
            colorOverrides.get(key),
            opacityOverrides.get(key),
            [...labelColorOverrides].filter(([k]) => k.startsWith(`${key}:`)),
            [...labelVisibilityOverrides].filter(([k]) => k.startsWith(`${key}:`)),
          ]);
          if (lastAppliedStyleRef.current.get(cacheKey) === sig) continue;
          lastAppliedStyleRef.current.set(cacheKey, sig);
          applyMaskDefaults(data as unknown as SharedImageSet, sourceRun, meta, layerVisible);
        } else if (meta.kind === 'mesh') {
          const sig = JSON.stringify([colorOverrides.get(key), opacityOverrides.get(key)]);
          if (lastAppliedStyleRef.current.get(cacheKey) === sig) continue;
          lastAppliedStyleRef.current.set(cacheKey, sig);
          applyMeshDefaults(data as unknown as Mesh, sourceRun, meta);
        } else if (meta.kind === 'volume') {
          const sig = JSON.stringify(volumeOverrides.get(key));
          if (lastAppliedStyleRef.current.get(cacheKey) === sig) continue;
          lastAppliedStyleRef.current.set(cacheKey, sig);
          applyVolumeDefaults(data as unknown as SharedImageSet, sourceRun, meta);
        }
      }
    }
    // The combined merged mask volume isn't in `cacheRef`, so it needs its own re-style pass too.
    if (combinedCacheRef.current) {
      const entry = combinedCacheRef.current;
      const contributors = entry.pairsKey.split(',').flatMap((token) => {
        const [sourceRun, layerName] = token.split(':');
        const meta = (layersBySource[sourceRun] ?? []).find((l) => l.layer_name === layerName);
        if (!meta) return [];
        const layerVisible = visibility.get(layerKey(sourceRun, layerName)) ?? meta.default_visible;
        return [{ sourceRun, meta, layerVisible }];
      });
      if (contributors.length > 0) {
        const sig = JSON.stringify(
          contributors.map(({ sourceRun, meta, layerVisible }) => {
            const key = layerKey(sourceRun, meta.layer_name);
            return [
              layerVisible,
              colorOverrides.get(key),
              opacityOverrides.get(key),
              [...labelColorOverrides].filter(([k]) => k.startsWith(`${key}:`)),
              [...labelVisibilityOverrides].filter(([k]) => k.startsWith(`${key}:`)),
            ];
          }),
        );
        const cacheKey = `combined:${entry.step}:${entry.pairsKey}`;
        if (lastAppliedStyleRef.current.get(cacheKey) !== sig) {
          lastAppliedStyleRef.current.set(cacheKey, sig);
          applyCombinedMaskLabelConfig(entry.data as unknown as SharedImageSet, contributors);
        }
      }
    }
    imf.render();
  }, [
    colorOverrides,
    opacityOverrides,
    labelColorOverrides,
    labelVisibilityOverrides,
    volumeOverrides,
    layersBySource,
    visibility,
    imf,
    applyMaskDefaults,
    applyMeshDefaults,
    applyVolumeDefaults,
    applyCombinedMaskLabelConfig,
  ]);

  const toggleVisibility = useCallback((sourceRun: string, layerName: string) => {
    setVisibility((prev) => {
      const key = layerKey(sourceRun, layerName);
      const next = new Map(prev);
      next.set(key, !(prev.get(key) ?? true));
      return next;
    });
  }, []);

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

  /** Renders one source's epoch scrubber: the slider, "epoch N / M" label, and live pin button. */
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
            {/*
              Denominator matches the slider's zero-based `max`, so the last
              step reads "epoch 19 / 19", not "19 / 20".
            */}
            <span style={stepCountLabelStyle}> / {Math.max(0, srcSteps.length - 1)}</span>
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
    const defaultColor: [number, number, number] = [meta.default_color[0], meta.default_color[1], meta.default_color[2]];
    const color = colorOverrides.get(key) ?? (isOverlay ? desaturateForOverlay(defaultColor) : defaultColor);
    const opacity = opacityOverrides.get(key) ?? meta.default_opacity;
    const maskLabelEntries =
      meta.kind === 'mask' && meta.maskLabels && Object.keys(meta.maskLabels).length > 0
        ? Object.entries(meta.maskLabels)
            .map(([valueStr, name]): [number, string] => [Number(valueStr), name])
            .filter(([value]) => Number.isFinite(value))
            .sort((a, b) => a[0] - b[0])
        : null;

    return (
      <div key={key}>
        <label style={layerRowStyle}>
          <input
            type="checkbox"
            checked={visibility.get(key) ?? meta.default_visible}
            onChange={() => toggleVisibility(source.run, meta.layer_name)}
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
        {/* Opacity slider hidden for now. */}
        {false && isStylable && (
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
                crop={volumeOverrides.get(key)}
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
              const labelVisible = labelVisibilityOverrides.get(`${key}:${value}`) ?? meta.default_visible;
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

  // Rendered once - either inline, or portalled above Runs while combined - never both.
  const viewToggleRow = (
    <div style={viewToggleRowStyle}>
      {viewToggles.map(({ label, hidden, setHidden }) => (
        <label key={label} style={viewToggleLabelStyle}>
          <input
            type="checkbox"
            checked={!hidden}
            onChange={(e) => {
              hiddenViewsRef.current[label] = !e.target.checked;
              setHidden(!e.target.checked);
            }}
          />
          {label}
        </label>
      ))}
    </div>
  );

  const content = (
    <div style={wrapStyle}>
      {!viewToggleContainer && viewToggleRow}

      {renderScrubber(run)}

      {isLoadingStep && <div style={hintStyle}>Loading layers…</div>}
      {loadError && <div style={errorStyle}>{loadError}</div>}

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
      {viewToggleContainer && createPortal(viewToggleRow, viewToggleContainer)}
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
 * Invert/Auto-Window/cross-section controls for a volume layer, mutating
 * `sis`'s live DisplayOptions directly and reporting the change up so it
 * survives the next step's fresh SharedImageSet. A real component (not
 * inlined into `renderLayerRow`) since `useDisplayOptions2d/3d` are hooks.
 */
function VolumeWindowingControls({
  sis,
  crop,
  onOverrideChange,
}: {
  sis: SharedImageSet;
  /** Passed in, not read off `sis`: a crop is baked into fetched bytes, not a live SDK option. */
  crop: Pick<VolumeOverride, 'cropAxis' | 'cropPosition'> | undefined;
  onOverrideChange(patch: Partial<VolumeOverride>): void;
}) {
  const imf = useImFusion();
  const twoD = useDisplayOptions2d(sis);
  const threeD = useDisplayOptions3d(sis);
  const [tab, setTab] = useState<'2d' | '3d'>('2d');
  const options = tab === '2d' ? twoD : threeD;
  const cropAxis = crop?.cropAxis ?? 'z';
  const cropPosition = crop?.cropPosition ?? 1;
  const cropped = crop?.cropAxis !== undefined && crop?.cropPosition !== undefined;

  return (
    <div style={windowingWrapStyle}>
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
          // autoWindow() only recomputes 2D's window/level (see
          // applyVolumeDefaults) - the 3D side is copied across explicitly,
          // matching imfusion-webappkit's own Auto Window button.
          sis.autoWindow();
          // Not React state - see the Invert handler's comment above.
          // eslint-disable-next-line react-hooks/immutability
          threeD.window = twoD.window;
          threeD.level = twoD.level;
          onOverrideChange({
            window2d: twoD.window,
            level2d: twoD.level,
            window3d: threeD.window,
            level3d: threeD.level,
          });
          imf.render();
        }}
      >
        Auto Window
      </button>
      <div style={windowingCropSectionStyle}>
        <div style={windowingCropHeaderStyle}>
          <span>Cross-section</span>
          {cropped && (
            <button
              type="button"
              style={windowingCropClearButtonStyle}
              onClick={() => onOverrideChange({ cropAxis: undefined, cropPosition: undefined })}
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
              onClick={() => onOverrideChange({ cropAxis: axis, cropPosition: cropped ? cropPosition : 1 })}
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
            onChange={(e) => onOverrideChange({ cropAxis, cropPosition: Number(e.target.value) })}
            style={windowingSliderStyle}
          />
          <span style={windowingSliderValueStyle}>{cropped ? `${Math.round(cropPosition * 100)}%` : 'off'}</span>
        </label>
      </div>
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

// Toggle row for the 4 view panes; wraps so the labels fit the floating panel's width.
const viewToggleRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px 10px',
};

const viewToggleLabelStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  opacity: 0.85,
  cursor: 'pointer',
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
