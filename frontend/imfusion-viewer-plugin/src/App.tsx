import { useCallback, useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import {
  ImFusionCanvas,
  ImFusionError,
  ImFusionLoading,
  ImFusionProvider,
  ImFusionReady,
  useImFusion,
  useImFusionError,
} from '@imfusion/sdk-react';
import { AboutButton } from './AboutButton';
import { CaseBrowser, type Selection } from './CaseBrowser';
import { CaseViewer, type OverlayRun } from './CaseViewer';
import { CollapsibleSection } from './CollapsibleSection';
import { DockedMetrics } from './DockedMetrics';
import { assignRunColors, RUN_COLOR_PALETTE } from './runColors';
import { getThemeTokens, hexToVec3 } from './theme';
import { useMetricsData } from './useMetricsData';
import { useTensorBoardTheme } from './useTensorBoardTheme';
import type { VolumeView } from '@imfusion/sdk';
import { fetchLicenseToken, type CaseMeta, type CasesResponse } from './api';

// Adds an index signature for `--*` custom CSS properties, which
// `CSSProperties` doesn't support natively. Only needed for the root
// `<div>`'s style, where live theme tokens are set as CSS variables.
interface CSSPropertiesWithVars extends CSSProperties {
  [key: `--${string}`]: string | number | undefined;
}

// Sanitizes a path component for use in a downloaded filename. Duplicated
// from CaseViewer.tsx's identical helper since the two files share nothing else.
function sanitizeForFilename(s: string): string {
  return s.replace(/[^a-zA-Z0-9_.-]/g, '_');
}

// `ImFusionError`'s children are a plain ReactNode, not a render-prop, so the
// error itself is read via `useImFusionError()` from inside.
function InitErrorMessage() {
  const error = useImFusionError();
  return <div style={centerErrorStyle}>Failed to initialize ImFusion WebSDK: {error.message}</div>;
}

/**
 * Paints this column's canvas in the theme's canvas background color and tints
 * the 3D view's border with the run's identity color. Renders nothing; must
 * live inside `<ImFusionReady>` for `useImFusion()`.
 *
 * Only the 3D view gets a border color. The 2D views' red/green/blue borders
 * are anatomical plane coding that their slice indicators in the other views
 * are matched to, so recoloring those would destroy real information.
 */
function CanvasChrome({ isDark, color }: { isDark: boolean; color: string }) {
  const imf = useImFusion();

  useEffect(() => {
    const background = hexToVec3(getThemeTokens(isDark).canvasBackground);
    // Both levels are needed: the Display clears around the viewports, then
    // each View clears its own viewport on top of that.
    imf.display.setBackgroundColor(background);
    for (const view of [
      imf.display.mainAxialView(),
      imf.display.mainCoronalView(),
      imf.display.mainSagittalView(),
      imf.display.main3dView(),
      imf.display.main2dView(),
    ]) {
      view.setBackgroundColor(background);
    }
    imf.display.main3dView().setBorderColor(hexToVec3(color));
    // Rendering is on demand and these setters don't request an update, so
    // without this the old colors stay until the next interaction.
    imf.render();
  }, [imf, isDark, color]);

  return null;
}

// Cross-column 3D camera sync. Each column is its own WASM instance, so no
// handle can cross between them; only these plain numbers do. A pose is
// [position, lookVector, upVector, fovY], tagged with the case it belongs to.
interface CameraPose {
  case: string;
  values: number[];
}

const cameraSyncSubscribers = new Set<(pose: CameraPose) => void>();

// Absorbs the drift from the SDK re-normalizing look/up vectors on setCamera,
// which exact equality would turn into an endless echo between columns.
const POSE_EPSILON = 1e-4;

function readPose(view: VolumeView): number[] {
  const cam = view.camera();
  try {
    return [...cam.position, ...cam.lookVector, ...cam.upVector, cam.fovY];
  } finally {
    cam.delete();
  }
}

// Mutates a copy of this view's own camera rather than building a new one, so
// the column keeps its own projection mode and only the pose is shared.
function applyPose(view: VolumeView, p: number[]): void {
  const cam = view.camera();
  try {
    cam.setVectors([p[0], p[1], p[2]], [p[3], p[4], p[5]], [p[6], p[7], p[8]]);
    cam.fovY = p[9];
    view.setCamera(cam, true);
  } finally {
    cam.delete();
  }
}

function samePose(a: number[], b: number[]): boolean {
  return a.every((n, i) => Math.abs(n - b[i]) < POSE_EPSILON);
}

/**
 * Mirrors this column's 3D camera onto every other column showing the same
 * case, so orbiting one run moves all of them. Renders nothing; must live
 * inside `<ImFusionReady>`.
 *
 * The SDK has no camera-changed signal, so the camera is read on the display's
 * render requests. Only the hovered column broadcasts: pointer capture keeps
 * `:hover` on the canvas through a drag, and gating on it is what stops a
 * column's own `centerOnData` from yanking every other column when a case loads.
 */
function CameraSync({ caseName, linked }: { caseName: string | null; linked: boolean }) {
  const imf = useImFusion();

  useEffect(() => {
    // Unlinking unsubscribes entirely, so a column keeps whatever view it had.
    // Re-linking re-reads `lastPose` below, so it never jumps to a stale one.
    if (caseName === null || !linked) return;
    const view = imf.display.main3dView();
    // The last pose this column sent or applied, and the whole echo guard: a
    // pose we just applied reads back unchanged, so nothing bounces.
    let lastPose = readPose(view);

    const receive = (pose: CameraPose) => {
      // World-space poses are meaningless across different anatomy.
      if (pose.case !== caseName || samePose(pose.values, lastPose)) return;
      lastPose = pose.values;
      applyPose(view, pose.values);
    };
    cameraSyncSubscribers.add(receive);

    const unsubscribe = imf.display.onUpdateRequested(() => {
      // ponytail: hover is the whole "who is driving" heuristic, and it's dead
      // on touch (the SDK's touch path sets no pointer capture). Swap in an
      // explicit pointerdown latch if tablets ever need to drive the sync.
      if (!imf.canvas.matches(':hover')) return;
      const pose = readPose(view);
      if (samePose(pose, lastPose)) return;
      lastPose = pose;
      for (const subscriber of cameraSyncSubscribers) {
        if (subscriber !== receive) subscriber({ case: caseName, values: pose });
      }
    });

    return () => {
      cameraSyncSubscribers.delete(receive);
      unsubscribe();
    };
  }, [imf, caseName, linked]);

  return null;
}

/**
 * Captures the canvas as a PNG and triggers a browser download.
 *
 * Must call `imf.render()` and `canvas.toBlob()` synchronously in the same
 * `requestAnimationFrame` callback: the GL context has no
 * `preserveDrawingBuffer`, so the browser clears the buffer right after each
 * frame, and reading it later (e.g. after an `await`) captures a blank image.
 */
function exportCanvasAsPng(imf: ReturnType<typeof useImFusion>, canvas: HTMLCanvasElement, filename: string): void {
  requestAnimationFrame(() => {
    imf.render();
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('imfusion_viewer: canvas.toBlob() returned null - export failed.');
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, 'image/png');
  });
}

export interface ExportButtonProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  run: string;
  caseName: string;
  step: number | null;
}

/**
 * Exports the column's current canvas content as a downloaded PNG.
 * Must live inside `<ImFusionReady>` so `useImFusion()` is safe to call.
 */
function ExportButton({ canvasRef, run, caseName, step }: ExportButtonProps) {
  const imf = useImFusion();

  const handleExport = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const stepPart = step !== null ? `epoch${step}` : 'epoch_unknown';
    const filename = `${sanitizeForFilename(run)}_${sanitizeForFilename(caseName)}_${stepPart}.png`;
    exportCanvasAsPng(imf, canvas, filename);
  }, [imf, canvasRef, run, caseName, step]);

  return (
    <button type="button" onClick={handleExport} style={exportButtonStyle}>
      Export PNG
    </button>
  );
}

export interface ViewerColumnProps {
  /** The run this column is permanently assigned to (see `everCheckedRuns` in `App`). */
  run: string;
  /** This run's stable identity color (see runColors.ts), shown in the column's header label and on its 3D view border. */
  color: string;
  /** TensorBoard's live dark-mode flag, forwarded to `CanvasChrome`. */
  isDark: boolean;
  /**
   * WebSDK license token, or `null` if the server has none configured.
   * Must be settled before this column first renders (see `App`).
   */
  licenseToken: string | null;
  /** Whether this column's 3D camera follows the other columns'. */
  linkCameras: boolean;
  selection: Selection | null;
  caseMeta: CaseMeta | undefined;
  /**
   * Other checked runs' layers to load into this column's own WASM instance
   * alongside its own, so they render together in one shared workspace
   * (combined-workspace mode). Empty outside that mode.
   */
  overlayRuns: OverlayRun[];
  /**
   * Reports this column's scrubbed epoch upward. Only wired up for the
   * primary (first-checked) column, to drive the shared metrics chart's
   * current-step marker.
   */
  onCurrentStepChange?: (step: number | null) => void;
  /**
   * DOM node, rendered inline under this run's own row in the sidebar's
   * Runs list (see `CaseBrowser`), that this column's controls (view
   * toggles, scrubber, layer list, export button) portal into - or `null`
   * while that row hasn't mounted yet (see `App`'s
   * `registerControlsContainer`). Rendering the controls next to the canvas
   * they affect made it impossible to see a layer while adjusting its own
   * opacity/color, since the panel had to sit on top of the canvas to be
   * reachable at all; a portal keeps CaseViewer mounted in this column's own
   * provider tree (so its WASM-backed state is unaffected) while its output
   * DOM lives in the sidebar instead.
   */
  controlsContainer: HTMLElement | null;
  /**
   * Per-overlay-run sidebar containers (see `App`'s
   * `overlayContainersForPrimary`): each overlay run's own layer controls
   * portal into its OWN row's container here, not into this column's
   * `controlsContainer`, so combining runs on the canvas never combines
   * their entries in the sidebar. Only set on the primary column.
   */
  overlayControlsContainers?: Map<string, HTMLElement | null>;
  /**
   * DOM node the shared view-toggle row portals into instead of rendering
   * inline (see `App`'s "Viewer Control" section/`registerViewToggleContainer`).
   * Always set on the primary column, regardless of combined/side-by-side
   * mode; `null`/undefined on every other column, which keeps its own inline
   * toggle row.
   */
  viewToggleContainer?: HTMLElement | null;
}

/**
 * One self-contained ImFusion provider/canvas/CaseViewer stack for one run.
 * `App` mounts this lazily on first check and never unmounts it again, so
 * each ever-checked run keeps its own WASM instance and CaseViewer state.
 */
function ViewerColumn({
  run,
  color,
  isDark,
  licenseToken,
  linkCameras,
  selection,
  caseMeta,
  overlayRuns,
  onCurrentStepChange,
  controlsContainer,
  overlayControlsContainers,
  viewToggleContainer,
}: ViewerColumnProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Forces CaseViewer to remount (and so fully reload) whenever the set of
  // overlaid runs changes, rather than trying to add/remove WASM-loaded
  // sources in place - the same "remount on identity change" approach
  // already used for case switches below.
  const overlayKey = overlayRuns.map((o) => o.run).sort().join(',');
  const [currentStep, setCurrentStep] = useState<number | null>(null);

  // Tracks the scrubbed epoch locally (used in ExportButton's filename) and
  // forwards it to the optional parent callback.
  const handleCurrentStepChange = useCallback(
    (step: number | null) => {
      setCurrentStep(step);
      onCurrentStepChange?.(step);
    },
    [onCurrentStepChange],
  );

  return (
    <ImFusionProvider options={{ autoResize: true, uiAnimations: false, licenseToken: licenseToken ?? undefined }}>
      <div style={columnInnerWrapStyle}>
        {/* Header labeling which run this column shows. */}
        <div style={columnHeaderStyle}>
          <div style={columnHeaderLabelGroupStyle}>
            <span style={{ ...columnHeaderDotStyle, background: color }} />
            <span style={columnHeaderNameStyle} title={run}>
              {run}
            </span>
          </div>
        </div>

        {/*
          `autoResize` keeps the canvas sized correctly as columns reflow in
          the grid. `uiAnimations` is disabled since epoch scrubbing
          triggered distracting animations. No overlay panel here anymore:
          the layer/opacity/color controls render in the sidebar instead
          (via the portal below), so nothing ever sits on top of the canvas.
        */}
        <div style={canvasContainerStyle}>
          <ImFusionCanvas ref={canvasRef} style={canvasStyle} />
          <ImFusionLoading>
            <div style={centerMsgStyle}>Initializing ImFusion WebSDK…</div>
          </ImFusionLoading>
          <ImFusionError>
            <InitErrorMessage />
          </ImFusionError>
          <ImFusionReady>
            <CanvasChrome isDark={isDark} color={color} />
            <CameraSync caseName={selection?.case ?? null} linked={linkCameras} />
            {!(selection && caseMeta) && (
              <div style={centerMsgStyle}>Select a case from the list to begin.</div>
            )}
            {/*
              Always mounted: never conditionally render CaseViewer based on
              whether `controlsContainer` is set. Unmounting it runs its WASM
              cleanup effect, which would wipe loaded data and reset the
              scrub/layer state (this exact bug has recurred more than
              once). `createPortal` only relocates the *rendered DOM*, not
              the component itself, so it's safe to gate on `controlsContainer`
              here - CaseViewer still mounts based on `selection`/`caseMeta`
              alone, exactly as before.
            */}
            {controlsContainer &&
              createPortal(
                selection && caseMeta ? (
                  <>
                    <CaseViewer
                      key={`${selection.run} ${selection.case} ${overlayKey}`}
                      run={selection.run}
                      caseName={selection.case}
                      initialLayers={caseMeta.layers}
                      initialSteps={caseMeta.steps}
                      overlayRuns={overlayRuns}
                      overlayContainers={overlayControlsContainers}
                      viewToggleContainer={viewToggleContainer}
                      onCurrentStepChange={handleCurrentStepChange}
                    />
                    <div style={exportRowStyle}>
                      <ExportButton
                        canvasRef={canvasRef}
                        run={selection.run}
                        caseName={selection.case}
                        step={currentStep}
                      />
                    </div>
                  </>
                ) : (
                  <div style={panelEmptyStyle}>No case selected.</div>
                ),
                controlsContainer,
              )}
          </ImFusionReady>
        </div>
      </div>
    </ImFusionProvider>
  );
}

export function App() {
  // Detected once here and passed down to every component via CSS variables
  // on the root div. TensorBoard core's dark-mode state doesn't automatically
  // apply inside this plugin's iframe, so it must be re-detected independently.
  const isDark = useTensorBoardTheme();
  const themeTokens = getThemeTokens(isDark);

  // run name -> the case currently selected for viewing within that run.
  // Entries are never removed on uncheck, only added or overwritten, so
  // re-checking a run redisplays whatever it last had selected.
  const [selectedCaseByRun, setSelectedCaseByRun] = useState<Map<string, string>>(new Map());
  const [cases, setCases] = useState<CasesResponse | null>(null);
  // Which runs are checked for the Metrics comparison and for showing their
  // viewer column. Kept independent of `selectedCaseByRun`: unchecking a run
  // never forgets which case it had selected.
  const [checkedRuns, setCheckedRuns] = useState<Set<string>>(new Set());

  // Every run name that has ever been checked, in first-checked order and
  // never shrinking. Determines which runs get a permanently-mounted
  // ViewerColumn; unchecking a run only hides its column via CSS, it's never
  // unmounted (see `columns`/`columnVisibleStyle` below).
  const [everCheckedRuns, setEverCheckedRuns] = useState<string[]>([]);

  // The primary (first-checked) column's scrubbed epoch, used to draw the
  // matching dashed step marker on the sidebar's shared DockedMetrics charts.
  const [primaryCurrentStep, setPrimaryCurrentStep] = useState<number | null>(null);

  // `undefined` until the fetch settles, then the token or `null`. No column
  // may render before then: ImFusionProvider captures its options on first
  // render, so a token arriving afterwards would never reach the SDK and the
  // viewer would keep the unlicensed watermark for the rest of the session.
  const [licenseToken, setLicenseToken] = useState<string | null | undefined>(undefined);

  // On by default: comparing the same case across runs from a common viewpoint
  // is the reason several columns are open at once. The control stays rendered
  // (just disabled) with fewer than two visible columns, so the setting is
  // never in effect while invisible.
  const [linkCameras, setLinkCameras] = useState(true);

  // Off by default: overlaying every checked run's layers into one shared
  // workspace is a more specialized comparison than the default side-by-side
  // columns. Collapses every non-primary column into the primary one's WASM
  // instance (see `overlayRunsForPrimary` below) instead of giving each its
  // own; the other columns stay mounted (never unmounted, per the invariant
  // above) but hidden, so re-disabling this is instant.
  const [combinedWorkspace, setCombinedWorkspace] = useState(false);

  // DOM nodes rendered inline under each run's own row in the sidebar's Runs
  // list (see CaseBrowser.tsx), one per column currently shown there (see
  // `showAsColumn` below), that each column's CaseViewer portals its
  // controls into. A plain ref (not state) holds the nodes themselves - only
  // the version counter is state, just to force a re-render once a *new*
  // node appears, since a ref write alone wouldn't.
  const controlsContainersRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const [, setControlsContainerVersion] = useState(0);
  // Cached per run, not recreated every render: a `ref` callback whose
  // identity changes between renders makes React call the old one with
  // `null` and the new one with the element on every single commit, even
  // when the DOM node itself hasn't changed. That previously deleted and
  // re-added this run's map entry every render, each re-add bumping the
  // version state and triggering another render - an infinite loop (React
  // error #185, "Maximum update depth exceeded").
  const registerControlsContainerFnsRef = useRef<Map<string, (el: HTMLDivElement | null) => void>>(new Map());
  const registerControlsContainer = useCallback((run: string) => {
    let fn = registerControlsContainerFnsRef.current.get(run);
    if (!fn) {
      fn = (el: HTMLDivElement | null) => {
        if (el) {
          if (controlsContainersRef.current.get(run) !== el) {
            controlsContainersRef.current.set(run, el);
            setControlsContainerVersion((v) => v + 1);
          }
        } else {
          controlsContainersRef.current.delete(run);
        }
      };
      registerControlsContainerFnsRef.current.set(run, fn);
    }
    return fn;
  }, []);

  // Single shared DOM node (not per-run, unlike `controlsContainersRef`
  // above): only the primary column's view-toggle row ever needs a home
  // here (see render site below, the always-visible "Viewer Control"
  // section) - every other column keeps its own inline copy.
  const viewToggleContainerRef = useRef<HTMLDivElement | null>(null);
  const [, setViewToggleContainerVersion] = useState(0);
  const registerViewToggleContainer = useCallback((el: HTMLDivElement | null) => {
    if (viewToggleContainerRef.current !== el) {
      viewToggleContainerRef.current = el;
      setViewToggleContainerVersion((v) => v + 1);
    }
  }, []);

  useEffect(() => {
    fetchLicenseToken().then(setLicenseToken, (e: unknown) => {
      console.warn('imfusion_viewer: could not fetch the WebSDK license token', e);
      setLicenseToken(null);
    });
  }, []);

  const handleSelect = useCallback((sel: Selection, allCases: CasesResponse) => {
    setCases(allCases);
    setSelectedCaseByRun((prev) => {
      const next = new Map(prev);
      next.set(sel.run, sel.case);
      return next;
    });
    // Viewing a case also checks its run for metrics comparison, so the
    // common single-run case needs no extra click. Only ever adds, never
    // removes, so unchecking other runs is preserved across case switches.
    setCheckedRuns((prev) => (prev.has(sel.run) ? prev : new Set(prev).add(sel.run)));
  }, []);

  const handleToggleRun = useCallback((run: string) => {
    setCheckedRuns((prev) => {
      const next = new Set(prev);
      if (next.has(run)) next.delete(run);
      else next.add(run);
      return next;
    });
  }, []);

  // "Toggle All Runs": checks every currently visible run if not all are
  // already checked, otherwise unchecks all of them. Only touches
  // `checkedRuns` directly; the render-time effect below handles mounting
  // columns for any newly-checked run.
  const handleToggleAllRuns = useCallback((visibleRuns: string[]) => {
    setCheckedRuns((prev) => {
      const allChecked = visibleRuns.length > 0 && visibleRuns.every((run) => prev.has(run));
      const next = new Set(prev);
      for (const run of visibleRuns) {
        if (allChecked) next.delete(run);
        else next.add(run);
      }
      return next;
    });
  }, []);

  // Recomputed every render rather than memoized (cheap for this plugin's
  // small run counts). Computed once here and shared with CaseBrowser and
  // DockedMetrics so both agree on the same run-color mapping.
  const runColors = assignRunColors(cases ? Object.keys(cases) : []);
  const allRunNames = cases ? Object.keys(cases).sort() : [];
  const runsForMetrics = allRunNames
    .filter((run) => checkedRuns.has(run))
    .map((run) => ({ run, color: runColors.get(run) ?? RUN_COLOR_PALETTE[0] }));

  // Called once here and shared with the single DockedMetrics instance in
  // the sidebar. Calling this hook per-column would multiply network
  // requests by the number of columns.
  const metricsData = useMetricsData(runsForMetrics);

  // Intentional setState-during-render (not useEffect), so a newly-checked
  // run gets its column and, if it has exactly one case, that case
  // auto-selected, in the same render pass. Always converges after at most
  // one extra render, since `everCheckedRuns` only grows to match `checkedRuns`.
  const newlyCheckedRuns = [...checkedRuns].filter((run) => !everCheckedRuns.includes(run));
  if (newlyCheckedRuns.length > 0) {
    setEverCheckedRuns((prev) => [...prev, ...newlyCheckedRuns]);
    setSelectedCaseByRun((prev) => {
      let changed = false;
      const next = new Map(prev);
      for (const run of newlyCheckedRuns) {
        if (next.has(run)) continue;
        const runCaseNames = cases ? Object.keys(cases[run] ?? {}) : [];
        if (runCaseNames.length === 1) {
          next.set(run, runCaseNames[0]);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }

  // Raw count of checked runs, independent of `combinedWorkspace`: used to
  // gate both toggles below without either one disabling itself once it
  // takes effect (combining reduces the *rendered* column count to 1, which
  // must not turn around and disable the very checkbox that caused it).
  // `checkedRuns.size` rather than counting `columns` below, so it's ready
  // before `columns` needs it.
  const activeColumnCount = checkedRuns.size;

  // The "Combine into one workspace" checkbox stays checked (and the toggle
  // itself never resets) once dropping to one checked run leaves nothing to
  // combine with - only its *effect* on rendering switches off, so
  // re-checking a second run resumes combined mode with no extra click.
  const effectiveCombinedWorkspace = combinedWorkspace && activeColumnCount >= 2;

  // One ViewerColumn per ever-checked run, in first-checked order (`isPrimary`
  // is true only for index 0). `active` only drives CSS visibility; a column,
  // once created, is never removed from this list, so unchecking a run just
  // hides it instead of losing its state.
  const columns = everCheckedRuns.map((run, index) => {
    const caseName = selectedCaseByRun.get(run);
    const selection: Selection | null = caseName !== undefined ? { run, case: caseName } : null;
    const caseMeta = selection ? cases?.[selection.run]?.[selection.case] : undefined;
    const active = checkedRuns.has(run);
    const isPrimary = index === 0;
    return {
      run,
      color: runColors.get(run) ?? RUN_COLOR_PALETTE[0],
      selection,
      caseMeta,
      active,
      isPrimary,
      // In combined-workspace mode, every other active run's data folds into
      // the primary column as an overlay (see `overlayRunsForPrimary`), so
      // only the primary itself gets a rendered column and sidebar controls.
      showAsColumn: active && (!effectiveCombinedWorkspace || isPrimary),
    };
  });

  // The only place theme token values are actually written, as CSS custom
  // properties. Every other style constant just references the matching
  // `var(--tb-*)` string, so the CSS cascade propagates color changes
  // automatically without recomputing anything else when `isDark` changes.
  const rootVarStyle: CSSPropertiesWithVars = {
    ...rootStyle,
    '--tb-bg': themeTokens.background,
    '--tb-canvas-bg': themeTokens.canvasBackground,
    '--tb-sidebar-bg': themeTokens.sidebarBackground,
    '--tb-surface': themeTokens.surface,
    '--tb-text': themeTokens.textPrimary,
    '--tb-text-muted': themeTokens.textMuted,
    '--tb-border': themeTokens.border,
    '--tb-accent': themeTokens.accent,
    '--tb-accent-soft': themeTokens.accentSoft,
    '--tb-error': themeTokens.error,
  };

  // Every active run gets its own inline expanded panel in the sidebar's
  // Runs list (see CaseBrowser.tsx) - including an overlay run in
  // combined-workspace mode: its layers portal into its OWN row's
  // container (see `overlayContainersForPrimary` below), never into the
  // primary's, so combining runs on the canvas never combines their entries
  // in the sidebar.
  const activeControlsRuns = new Set(columns.filter((column) => column.active).map((column) => column.run));

  // Every other active, case-selected run gets folded into the primary
  // column's own WASM instance as an overlay instead of its own column - and
  // shows the *primary's* case name there (CaseViewer loads every source
  // under one shared case name), not whatever case that run itself has
  // selected. `cases` (already fetched) is looked up directly under that
  // shared name to seed the overlay's layer list instantly instead of
  // leaving it empty until CaseViewer's own first poll tick fills it in -
  // `column.caseMeta` would be the wrong data here, since it's keyed by each
  // run's own selection, not the primary's.
  const primaryCaseName = columns.find((column) => column.isPrimary)?.selection?.case;
  const overlayRunsForPrimary: OverlayRun[] = effectiveCombinedWorkspace
    ? columns
        .filter((column) => column.active && !column.isPrimary && column.selection)
        .map((column) => ({
          run: column.run,
          color: column.color,
          initialLayers: primaryCaseName ? cases?.[column.run]?.[primaryCaseName]?.layers : undefined,
          initialSteps: primaryCaseName ? cases?.[column.run]?.[primaryCaseName]?.steps : undefined,
        }))
    : [];
  // Each overlay's own sidebar container (registered under its own run name,
  // same as any other active run - see `activeControlsRuns` above), so
  // CaseViewer can portal that overlay's layers there instead of into the
  // primary's container.
  const overlayContainersForPrimary = new Map(
    overlayRunsForPrimary.map((o) => [o.run, controlsContainersRef.current.get(o.run) ?? null]),
  );

  // Both camera/workspace toggles, as one block: rendered inside the
  // always-visible "Viewer Control" section (see render site below), not
  // conditionally repositioned, so the control governing the shared camera
  // stays visible in a fixed spot regardless of how many runs are checked.
  const cameraControls = (
    <>
      {/*
        Disabled rather than hidden below two visible columns: hiding it
        would leave the setting in force with no way to see or change it.
        Also disabled in combined-workspace mode, where only one column
        (and so one 3D camera) is ever rendered.
      */}
      <label style={linkCamerasRowStyle} title="Orbiting one run's 3D view moves every other column showing the same case">
        <input
          type="checkbox"
          checked={linkCameras}
          disabled={combinedWorkspace || activeColumnCount < 2}
          onChange={(e) => setLinkCameras(e.target.checked)}
        />
        <span style={combinedWorkspace || activeColumnCount < 2 ? linkCamerasLabelDisabledStyle : undefined}>
          Link 3D cameras
        </span>
      </label>

      {/*
        Disabled rather than hidden below two checked runs, matching "Link
        3D cameras" above: hiding it would leave the setting in force with
        no way to see or change it. Uses the raw checked-run count, not
        `linkCameras`'s (possibly combined-reduced) visible count, so
        turning this on never disables itself.
      */}
      <label
        style={linkCamerasRowStyle}
        title="Show every checked run's layers together in one shared viewer, colored per run, instead of separate side-by-side columns"
      >
        <input
          type="checkbox"
          checked={combinedWorkspace}
          disabled={activeColumnCount < 2}
          onChange={(e) => setCombinedWorkspace(e.target.checked)}
        />
        <span style={activeColumnCount < 2 ? linkCamerasLabelDisabledStyle : undefined}>Combine into one workspace</span>
      </label>
    </>
  );

  return (
    <div style={rootVarStyle}>
      <aside style={sidebarStyle}>
        {/* Title and About button: only two children, so plain space-between works. */}
        <div style={sidebarHeaderStyle}>
          <h1 style={titleStyle}>ImFusion Viewer</h1>
          <AboutButton isDark={isDark} />
        </div>

        {/*
          The shared view-toggle row (Axial/Coronal/Sagittal/3D) and the
          camera/workspace checkboxes portal in/render here, always - both
          combined and side-by-side - instead of sitting under the primary
          run's own row like the rest of its controls, since that reads
          oddly tucked under just one run's name and would otherwise jump in
          and out of the sidebar every time "Combine into one workspace" is
          toggled. A fixed, always-visible section keeps the sidebar's
          layout stable regardless of that setting.
        */}
        <CollapsibleSection label="Viewer Control">
          <div ref={registerViewToggleContainer} style={viewToggleContainerStyle} />
          {cameraControls}
        </CollapsibleSection>

        <CollapsibleSection label="Runs">
          <CaseBrowser
            selectedCaseByRun={selectedCaseByRun}
            onSelect={handleSelect}
            onCasesUpdate={setCases}
            checkedRuns={checkedRuns}
            onToggleRun={handleToggleRun}
            onToggleAllRuns={handleToggleAllRuns}
            runColors={runColors}
            activeControlsRuns={activeControlsRuns}
            registerControlsContainer={registerControlsContainer}
          />
        </CollapsibleSection>

        {/*
          Exactly one DockedMetrics instance, always mounted in the sidebar
          rather than nested in any one column, so it stays visible for all
          checked runs even if a particular column is hidden. It manages its
          own collapsible section header (see DockedMetrics.tsx), matching
          CollapsibleSection's look, so it needs no wrapper here.
        */}
        <DockedMetrics data={metricsData} currentStep={primaryCurrentStep} />
      </aside>

      <main style={mainStyle}>
        {/*
          Every checked run's canvas tree stays mounted; only CSS visibility
          toggles, never conditional rendering, since WASM init is expensive
          and unmounting would lose CaseViewer's loaded state. A CSS grid lets
          columns reflow into multiple rows instead of squeezing narrower.
        */}
        <div style={viewerContainerStyle}>
          {licenseToken !== undefined &&
            columns.map(({ run, color, selection, caseMeta, showAsColumn, isPrimary }) => (
              <div key={run} style={showAsColumn ? columnVisibleStyle : columnHiddenStyle}>
                <ViewerColumn
                  run={run}
                  color={color}
                  isDark={isDark}
                  licenseToken={licenseToken}
                  linkCameras={linkCameras}
                  selection={selection}
                  caseMeta={caseMeta}
                  overlayRuns={isPrimary ? overlayRunsForPrimary : []}
                  overlayControlsContainers={isPrimary ? overlayContainersForPrimary : undefined}
                  viewToggleContainer={isPrimary ? viewToggleContainerRef.current : null}
                  onCurrentStepChange={isPrimary ? setPrimaryCurrentStep : undefined}
                  controlsContainer={showAsColumn ? (controlsContainersRef.current.get(run) ?? null) : null}
                />
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

// Module-level and static: references `var(--tb-*)` custom properties whose
// actual values are set once on `rootVarStyle` in App's render. The CSS
// cascade propagates value changes to every descendant automatically.
const rootStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  width: '100vw',
  height: '100vh',
  background: 'var(--tb-bg)',
  color: 'var(--tb-text)',
  // Matches TensorBoard core's own typography (Roboto/Noto, 15px). The font
  // itself is made available via index.tsx's font-face injection, since this
  // plugin's iframe doesn't automatically inherit TB core's fonts.
  fontFamily: 'Roboto, Noto, sans-serif',
  fontSize: 15,
  overflow: 'hidden',
};

const sidebarStyle: CSSProperties = {
  width: 340,
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  padding: '12px 14px',
  // Distinct from the main area's --tb-bg: TensorBoard's sidebar is
  // consistently one shade off from its main content area, in both themes.
  background: 'var(--tb-sidebar-bg)',
  borderRight: '1px solid var(--tb-border)',
  overflowY: 'auto',
};

// Sidebar's top title row: title on the left, About button on the right.
const sidebarHeaderStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
};

// `<h1>` has its own browser-default font-size/weight that ordinary
// inheritance doesn't override; `font: 'inherit'` pulls it down to match
// the rest of the UI.
const titleStyle: CSSProperties = {
  font: 'inherit',
  margin: 0,
};

// Sits between the Runs list and the metrics charts, matching the sidebar's
// other rows rather than introducing a new section header for one checkbox.
const linkCamerasRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
};

const linkCamerasLabelDisabledStyle: CSSProperties = {
  opacity: 0.45,
};

// Portal target for the shared view-toggle row while combined (see render
// site above) - just enough margin to separate it from the camera checkboxes
// above and the Runs list below.
const viewToggleContainerStyle: CSSProperties = {
  marginBottom: 4,
};

const mainStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
};

const canvasStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'block',
};

// Responsive grid wrapping every ViewerColumn. `auto-fit` + `minmax(420px,
// 1fr)` packs as many columns as fit per row and wraps the rest; hidden
// columns (display: none) don't occupy a grid track at all.
const viewerContainerStyle: CSSProperties = {
  flex: 1,
  minHeight: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
  gridAutoRows: 'minmax(320px, 1fr)',
  gap: 8,
  padding: 8,
  overflow: 'auto',
};

// A visible column, styled as a bordered card so adjacent columns stay
// visually distinct regardless of grid position.
const columnVisibleStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  minHeight: 0,
  border: '1px solid var(--tb-border)',
  borderRadius: 8,
  overflow: 'hidden',
};

// A column whose run is unchecked: hidden via CSS only, never unmounted.
// `display: none` grid items don't leave gaps in the layout.
const columnHiddenStyle: CSSProperties = {
  display: 'none',
};

// The flex-column wrapper ViewerColumn itself renders, filling the grid
// cell and stacking the header above the canvas area.
const columnInnerWrapStyle: CSSProperties = {
  flex: 1,
  minHeight: 0,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
};

// The column's run-name label bar, above the canvas so it never overlaps
// the floating layers panel anchored inside the canvas area.
const columnHeaderStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  flexShrink: 0,
  padding: '6px 10px',
  background: 'var(--tb-surface)',
  borderBottom: '1px solid var(--tb-border)',
  overflow: 'hidden',
};

// Groups the color dot and run name on the header's left side, so
// space-between splits it against the toggle button as two children.
const columnHeaderLabelGroupStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minWidth: 0,
  overflow: 'hidden',
};

// The run's color-identity dot, matching the sidebar's per-run swatch color.
const columnHeaderDotStyle: CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: '50%',
  flexShrink: 0,
  display: 'inline-block',
};

const columnHeaderNameStyle: CSSProperties = {
  flex: '1 1 auto',
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

// `position: relative` anchors the absolutely-positioned overlay messages to
// the canvas area rather than a further ancestor. The background matches the
// GL clear color, so the overlay messages sit on the same color before WASM
// init as they do after it.
const canvasContainerStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  flex: 1,
  minHeight: 0,
  background: 'var(--tb-canvas-bg)',
};

const exportRowStyle: CSSProperties = {
  padding: '0 10px 4px',
};

// Same button style as elsewhere in this codebase, full-width as this
// column's primary action. `font: 'inherit'` since buttons don't inherit
// font by default.
const exportButtonStyle: CSSProperties = {
  width: '100%',
  font: 'inherit',
  padding: '6px 8px',
  borderRadius: 4,
  border: '1px solid var(--tb-border)',
  background: 'var(--tb-surface)',
  color: 'inherit',
  cursor: 'pointer',
};

const panelEmptyStyle: CSSProperties = {
  minHeight: 160,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
  opacity: 0.55,
  textAlign: 'center',
};

const centerMsgStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.6,
  textAlign: 'center',
  padding: 24,
  // Fixed light color, not var(--tb-text): the canvas and the container behind
  // it are painted `canvasBackground`, dark in both themes by design, so a
  // theme-aware color would be invisible in light mode.
  color: '#e8eaed',
};

const centerErrorStyle: CSSProperties = {
  ...centerMsgStyle,
  color: 'var(--tb-error)',
};
