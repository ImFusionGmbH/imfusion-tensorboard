import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type RefCallback,
  type RefObject,
  type SyntheticEvent,
} from 'react';
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
import { ContextMenu } from './ContextMenu';
import { DockedMetrics } from './DockedMetrics';
import { assignRunColors, RUN_COLOR_PALETTE } from './runColors';
import { getThemeTokens, hexToVec3 } from './theme';
import { useMetricsData } from './useMetricsData';
import { useTensorBoardTheme } from './useTensorBoardTheme';
import type { VolumeView } from '@imfusion/sdk';
import { fetchLicenseToken, type CaseMeta, type CasesResponse, type LayerMeta } from './api';
import {
  forceRelayout,
  isMenuActionRunning,
  maximizedViewOf,
  reassertHidden,
  viewNameOf,
  viewsForKind,
  VIEWS,
  watchDrawnViews,
  type ViewName,
} from './viewVisibility';

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

// The column that last got pointer/wheel/menu input; only it broadcasts, so a
// column's own centerOnData on load never yanks the others.
let cameraDriver: object | null = null;
const cameraDriverWakeups = new Map<object, () => void>();

function claimCameraDriver(token: object): void {
  cameraDriver = token;
  cameraDriverWakeups.get(token)?.();
}

// How long the driver keeps sampling its camera after input, to catch SDK animations (e.g. menu Reset).
const FOLLOW_MS = 1000;

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
 * case. Renders nothing; must live inside `<ImFusionReady>`.
 *
 * The SDK has no camera-changed signal, so once this column is the driver
 * (see `claimCameraDriver`) its pose is sampled every frame for `FOLLOW_MS`
 * after each input or update request.
 */
function CameraSync({ caseName, linked, token }: { caseName: string | null; linked: boolean; token: object }) {
  const imf = useImFusion();

  useEffect(() => {
    // Unlinking unsubscribes entirely, so a column keeps whatever view it had.
    if (caseName === null || !linked) return;
    const view = imf.display.main3dView();
    // Last pose sent or applied; also the echo guard.
    let lastPose = readPose(view);
    let followUntil = 0;
    let rafId: number | null = null;

    const receive = (pose: CameraPose) => {
      // World-space poses are meaningless across different anatomy.
      if (pose.case !== caseName || samePose(pose.values, lastPose)) return;
      lastPose = pose.values;
      applyPose(view, pose.values);
    };
    cameraSyncSubscribers.add(receive);

    const tick = () => {
      rafId = null;
      if (cameraDriver !== token) return;
      const pose = readPose(view);
      if (!samePose(pose, lastPose)) {
        lastPose = pose;
        for (const subscriber of cameraSyncSubscribers) {
          if (subscriber !== receive) subscriber({ case: caseName, values: pose });
        }
      }
      if (performance.now() < followUntil) rafId = requestAnimationFrame(tick);
    };
    const wake = () => {
      followUntil = performance.now() + FOLLOW_MS;
      rafId ??= requestAnimationFrame(tick);
    };
    cameraDriverWakeups.set(token, wake);

    const unsubscribe = imf.display.onUpdateRequested(() => {
      if (cameraDriver === token && performance.now() < followUntil) wake();
    });

    return () => {
      cameraSyncSubscribers.delete(receive);
      if (cameraDriverWakeups.get(token) === wake) cameraDriverWakeups.delete(token);
      unsubscribe();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [imf, caseName, linked, token]);

  return null;
}

/**
 * Stops a hidden (display:none) column from resizing to 0x0 and rendering;
 * resumes, re-measures and re-renders once shown. Layout effect so it runs
 * before the ResizeObserver sees the new size.
 */
function PauseWhenHidden({ visible }: { visible: boolean }) {
  const imf = useImFusion();

  useLayoutEffect(() => {
    if (visible) return;
    imf.pauseAutoResize();
    imf.pauseAutoRender();
    return () => {
      imf.resumeAutoResize();
      imf.resumeAutoRender();
      imf.render();
    };
  }, [imf, visible]);

  return null;
}

interface ViewVisibilitySyncProps {
  hiddenViews: ReadonlySet<ViewName>;
  /** Panes this column has data for; re-checking a pane never force-opens an empty one. */
  viewsWithData: ReadonlySet<ViewName>;
  /** Bumped by sidebar toggles and "Restore layout": un-maximizes before applying. */
  restoreToken: number;
  onMenuHide: (name: ViewName) => void;
  /** The pane this column shows maximized (detected from what renders), or `null`. */
  onMaximizedChange: (name: ViewName | null) => void;
}

/**
 * Applies the app-wide hidden-pane set to this column. Only ever re-hides
 * user-hidden panes; un-hides only on an explicit re-check, so panes the SDK
 * auto-hid for incompatible data stay hidden. Must live inside `<ImFusionReady>`.
 */
function ViewVisibilitySync({
  hiddenViews,
  viewsWithData,
  restoreToken,
  onMenuHide,
  onMaximizedChange,
}: ViewVisibilitySyncProps) {
  const imf = useImFusion();
  const hiddenRef = useRef(hiddenViews);
  const viewsWithDataRef = useRef(viewsWithData);
  const onMenuHideRef = useRef(onMenuHide);
  const onMaximizedChangeRef = useRef(onMaximizedChange);
  const prevRef = useRef<ReadonlySet<ViewName> | null>(null);
  const restoreRef = useRef(restoreToken);
  // Our own setViewHidden calls, which the signal handler must ignore.
  const applyingRef = useRef(false);

  useLayoutEffect(() => {
    viewsWithDataRef.current = viewsWithData;
    onMenuHideRef.current = onMenuHide;
    onMaximizedChangeRef.current = onMaximizedChange;
  });

  useLayoutEffect(() => {
    const display = imf.display;
    const layouter = display.layouter();
    const prev = prevRef.current;
    prevRef.current = hiddenViews;
    hiddenRef.current = hiddenViews;
    applyingRef.current = true;
    try {
      if (restoreRef.current !== restoreToken) {
        restoreRef.current = restoreToken;
        layouter.setMaximizedView(null);
        forceRelayout(display, hiddenViews);
      }
      for (const spec of VIEWS) {
        const view = spec.get(display);
        if (hiddenViews.has(spec.name)) {
          if (!layouter.isViewHidden(view)) layouter.setViewHidden(view, true);
        } else if (prev?.has(spec.name) && viewsWithDataRef.current.has(spec.name) && layouter.isViewHidden(view)) {
          layouter.setViewHidden(view, false);
        }
      }
    } catch (e) {
      console.warn('imfusion_viewer: could not apply hidden views', e);
    } finally {
      applyingRef.current = false;
    }
  }, [imf, hiddenViews, restoreToken]);

  useEffect(() => {
    const display = imf.display;
    const layouter = display.layouter();
    let disposed = false;
    let queued = false;

    const withApplying = (fn: () => void) => {
      applyingRef.current = true;
      try {
        fn();
      } catch (e) {
        console.warn('imfusion_viewer: could not apply hidden views', e);
      } finally {
        applyingRef.current = false;
      }
    };
    // Deferred: re-entering the layouter from inside its own signal is unsafe.
    const reassertSoon = () => {
      if (queued) return;
      queued = true;
      queueMicrotask(() => {
        queued = false;
        if (!disposed) withApplying(() => reassertHidden(display, hiddenRef.current));
      });
    };
    const relayout = () => withApplying(() => forceRelayout(display, hiddenRef.current));

    const offs: (() => void)[] = [];
    offs.push(
      layouter.onViewHiddenChanged((view, hidden) => {
        if (applyingRef.current) return;
        const name = viewNameOf(display, view);
        if (!name) return;
        if (!hidden) {
          // The SDK re-shows panes on data changes; keep the user's hides.
          if (hiddenRef.current.has(name)) reassertSoon();
        } else if (isMenuActionRunning() && !hiddenRef.current.has(name)) {
          // Menu "Hide View" (possibly on a maximized pane): record it and show the rest.
          queueMicrotask(() => {
            if (disposed) return;
            withApplying(() => {
              layouter.setMaximizedView(null);
              forceRelayout(display, new Set(hiddenRef.current).add(name));
            });
            onMenuHideRef.current(name);
          });
        }
      }),
    );
    if (typeof layouter.onModeChanged === 'function') offs.push(layouter.onModeChanged(reassertSoon));

    // Maximize state comes from which pane drew over the whole canvas. Re-laying out only when a user-hidden pane drew
    // (the ⤢ restore can bring back a stale layout), not on every click: that would reorder panes
    // under an open ⇄ menu and make its swap/move actions hit the wrong pane.
    let lastMaximized: ViewName | null = null;
    let lastLeak: string | null = null;
    offs.push(
      watchDrawnViews(imf, (drawn) => {
        const expected = new Set(VIEWS.map((s) => s.name).filter((n) => !hiddenRef.current.has(n) && viewsWithDataRef.current.has(n)));
        const maximized = maximizedViewOf(drawn, expected, imf.canvas);
        if (maximized !== lastMaximized) {
          lastMaximized = maximized;
          onMaximizedChangeRef.current(maximized);
        }
        const leaked = maximized === null && [...drawn.keys()].some((n) => hiddenRef.current.has(n));
        const sig = leaked ? [...drawn.keys()].sort().join(',') : null;
        // Once per distinct layout, so a pane the SDK insists on can't loop re-layouts.
        if (sig !== null && sig !== lastLeak) relayout();
        lastLeak = sig;
      }),
    );

    return () => {
      disposed = true;
      for (const off of offs) off();
      if (lastMaximized) onMaximizedChangeRef.current(null);
    };
  }, [imf]);

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
      // Deferred: revoking in the same tick can abort the download in Firefox/Safari.
      setTimeout(() => URL.revokeObjectURL(url), 1000);
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

/** Props every column gets identically from `App`; add app-wide column state (e.g. hidden views) here. */
export interface SharedColumnProps {
  /** TensorBoard's live dark-mode flag, forwarded to `CanvasChrome`. */
  isDark: boolean;
  /** WebSDK license token, or `null` if none. Must be settled before a column first renders (see `App`). */
  licenseToken: string | null;
  /** Whether this column's 3D camera follows the other columns'. */
  linkCameras: boolean;
  /** Panes the user hid (sidebar or menu "Hide View"), applied to every column. */
  hiddenViews: ReadonlySet<ViewName>;
  /** See `ViewVisibilitySync`. */
  layoutRestoreToken: number;
  onMenuHideView: (name: ViewName) => void;
  onMaximizedChange: (run: string, name: ViewName | null) => void;
}

export interface ViewerColumnProps extends SharedColumnProps {
  run: string;
  /** This run's identity color (see runColors.ts), for the header dot and 3D view border. */
  color: string;
  /** Whether the column is on screen; hidden columns pause rendering/resizing. */
  visible: boolean;
  selection: Selection | null;
  caseMeta: CaseMeta | undefined;
  /** Other checked runs' layers loaded into this column's WASM instance (combined mode); empty otherwise. */
  overlayRuns: OverlayRun[];
  /** Reports the scrubbed epoch upward; only set on the primary column (drives the metrics step marker). */
  onCurrentStepChange?: (step: number | null) => void;
  /**
   * This run's sidebar row container (see `CaseBrowser`), or `null` while
   * there is none or the column is hidden. The controls are rendered into a
   * node the column owns and only re-parented here, so this never remounts CaseViewer.
   */
  controlsContainer: HTMLElement | null;
  /** Overlay run -> its own sidebar container, so combined runs keep separate sidebar entries. Primary only. */
  overlayControlsContainers?: Map<string, HTMLElement | null>;
}

function viewsWithDataOf(layerLists: Array<LayerMeta[] | undefined>): Set<ViewName> {
  const views = new Set<ViewName>();
  for (const layers of layerLists) {
    for (const meta of layers ?? []) for (const name of viewsForKind(meta.kind)) views.add(name);
  }
  return views;
}

/** One ImFusion provider/canvas/CaseViewer stack for one run. */
function ViewerColumn({
  run,
  color,
  visible,
  isDark,
  licenseToken,
  linkCameras,
  hiddenViews,
  layoutRestoreToken,
  onMenuHideView,
  onMaximizedChange,
  selection,
  caseMeta,
  overlayRuns,
  onCurrentStepChange,
  controlsContainer,
  overlayControlsContainers,
}: ViewerColumnProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Remounts CaseViewer when the overlaid run set changes, like a case switch.
  const overlayKey = overlayRuns.map((o) => o.run).sort().join(',');
  const viewsWithData = viewsWithDataOf([caseMeta?.layers, ...overlayRuns.map((o) => o.initialLayers)]);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  // Bumped to rebuild the provider (new canvas, GL context and WASM instance) after a lost context.
  const [generation, setGeneration] = useState(0);
  const [contextLost, setContextLost] = useState(false);
  const [syncToken] = useState(() => ({}));
  // Stable portal target owned by this column. Changing a portal's container
  // remounts its children, so the node is re-parented instead.
  const [controlsNode] = useState(() => document.createElement('div'));

  useLayoutEffect(() => {
    if (!controlsContainer) return;
    controlsContainer.appendChild(controlsNode);
    return () => controlsNode.remove();
  }, [controlsContainer, controlsNode]);

  const reloadProvider = useCallback(() => {
    setContextLost(false);
    setGeneration((g) => g + 1);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onLost = (e: Event) => {
      e.preventDefault(); // allows a later 'webglcontextrestored'
      setContextLost(true);
    };
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', reloadProvider);
    return () => {
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', reloadProvider);
      // Free a removed canvas's context now, not at GC, so it stops counting toward the browser's cap.
      setTimeout(() => {
        if (!canvas.isConnected) canvas.getContext('webgl2')?.getExtension('WEBGL_lose_context')?.loseContext();
      }, 0);
    };
  }, [generation, reloadProvider]);

  const handleCurrentStepChange = useCallback(
    (step: number | null) => {
      setCurrentStep(step);
      onCurrentStepChange?.(step);
    },
    [onCurrentStepChange],
  );

  // Input on this canvas or its context menu makes this column the camera-sync driver.
  const claimCamera = useCallback(
    (e: SyntheticEvent) => {
      const target = e.target;
      if (target === canvasRef.current || (target instanceof Element && target.closest('[data-imf-context-menu]'))) {
        claimCameraDriver(syncToken);
      }
    },
    [syncToken],
  );
  const handleMaximizedChange = useCallback((name: ViewName | null) => onMaximizedChange(run, name), [onMaximizedChange, run]);
  const claimCameraWhileDragging = useCallback(
    (e: ReactPointerEvent) => {
      if (e.buttons !== 0) claimCamera(e);
    },
    [claimCamera],
  );

  return (
    <div style={columnInnerWrapStyle}>
      <div style={columnHeaderStyle}>
        <div style={columnHeaderLabelGroupStyle}>
          <span style={{ ...columnHeaderDotStyle, background: color }} />
          <span style={columnHeaderNameStyle} title={run}>
            {run}
          </span>
        </div>
      </div>

      {/* `uiAnimations` off: epoch scrubbing triggered distracting animations. */}
      <ImFusionProvider
        key={generation}
        options={{ autoResize: true, uiAnimations: false, licenseToken: licenseToken ?? undefined }}
      >
        <div
          style={canvasContainerStyle}
          onPointerDownCapture={claimCamera}
          onPointerMoveCapture={claimCameraWhileDragging}
          onWheelCapture={claimCamera}
          onContextMenuCapture={claimCamera}
        >
          <ImFusionCanvas ref={canvasRef} style={canvasStyle} />
          <ImFusionLoading>
            <div style={centerMsgStyle}>Initializing ImFusion WebSDK…</div>
          </ImFusionLoading>
          <ImFusionError>
            <InitErrorMessage />
          </ImFusionError>
          <ImFusionReady>
            <CanvasChrome isDark={isDark} color={color} />
            <PauseWhenHidden visible={visible} />
            <ViewVisibilitySync
              hiddenViews={hiddenViews}
              viewsWithData={viewsWithData}
              restoreToken={layoutRestoreToken}
              onMenuHide={onMenuHideView}
              onMaximizedChange={handleMaximizedChange}
            />
            <CameraSync caseName={selection?.case ?? null} linked={linkCameras} token={syncToken} />
            <ContextMenu />
            {!(selection && caseMeta) && <div style={centerMsgStyle}>Select a case from the list to begin.</div>}
            {/* Always mounted while a case is selected; only the portal node moves in and out of the sidebar. */}
            {createPortal(
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
                    hiddenViews={hiddenViews}
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
              controlsNode,
            )}
          </ImFusionReady>
          {contextLost && (
            <div style={contextLostStyle}>
              <span>The WebGL context was lost.</span>
              <button type="button" onClick={reloadProvider} style={reloadButtonStyle}>
                Reload
              </button>
            </div>
          )}
        </div>
      </ImFusionProvider>
    </div>
  );
}

// Hidden columns beyond this many (least recently shown first) are unmounted,
// freeing their WASM heap and WebGL context. Shown columns never are.
const MAX_LIVE_COLUMNS = 4;

export function App() {
  // TensorBoard core's dark mode doesn't reach this iframe, so it's re-detected
  // here and handed down as CSS variables on the root div.
  const isDark = useTensorBoardTheme();
  const themeTokens = getThemeTokens(isDark);

  // run name -> the case selected within that run. Only added/overwritten,
  // so re-checking a run redisplays whatever it last had selected.
  const [selectedCaseByRun, setSelectedCaseByRun] = useState<Map<string, string>>(new Map());
  const [cases, setCases] = useState<CasesResponse | null>(null);
  // Runs checked for Metrics and for showing their viewer column.
  const [checkedRuns, setCheckedRuns] = useState<Set<string>>(new Set());

  // Every run ever checked, in first-checked order; fixes column order and
  // which checked run is primary.
  const [everCheckedRuns, setEverCheckedRuns] = useState<string[]>([]);
  // Most recently shown first; decides which hidden columns stay mounted.
  const [recentRuns, setRecentRuns] = useState<string[]>([]);

  // The primary column's scrubbed epoch, for the metrics charts' step marker.
  const [primaryCurrentStep, setPrimaryCurrentStep] = useState<number | null>(null);

  // `undefined` until the fetch settles. ImFusionProvider reads its options
  // once, so no column may render before the token is known.
  const [licenseToken, setLicenseToken] = useState<string | null | undefined>(undefined);

  // On by default: comparing the same case across runs from one viewpoint is
  // why several columns are open at once.
  const [linkCameras, setLinkCameras] = useState(true);

  // Folds every checked run's layers into the primary column's WASM instance
  // (see `overlayRunsForPrimary`); the other columns are hidden meanwhile.
  const [combinedWorkspace, setCombinedWorkspace] = useState(false);

  // run -> its sidebar controls container (see CaseBrowser). State, not a ref,
  // so a new container re-renders the columns that use it.
  const [controlsContainers, setControlsContainers] = useState<ReadonlyMap<string, HTMLElement>>(() => new Map());
  // Ref callbacks cached per run: a new identity each render would make React
  // detach/re-attach every container on every commit.
  const registerControlsContainerFnsRef = useRef<Map<string, RefCallback<HTMLDivElement>>>(new Map());
  const registerControlsContainer = useCallback((run: string) => {
    let fn = registerControlsContainerFnsRef.current.get(run);
    if (!fn) {
      fn = (el: HTMLDivElement | null) => {
        if (!el) return;
        setControlsContainers((prev) => (prev.get(run) === el ? prev : new Map(prev).set(run, el)));
        return () =>
          setControlsContainers((prev) => {
            if (prev.get(run) !== el) return prev;
            const next = new Map(prev);
            next.delete(run);
            return next;
          });
      };
      registerControlsContainerFnsRef.current.set(run, fn);
    }
    return fn;
  }, []);

  // Panes the user hid, shared by every column; survives case switches and Combine.
  const [hiddenViews, setHiddenViews] = useState<ReadonlySet<ViewName>>(() => new Set());
  const [layoutRestoreToken, setLayoutRestoreToken] = useState(0);

  const handleToggleView = useCallback((name: ViewName, show: boolean) => {
    setHiddenViews((prev) => {
      const next = new Set(prev);
      if (show) next.delete(name);
      else next.add(name);
      return next;
    });
    setLayoutRestoreToken((n) => n + 1);
  }, []);

  const handleMenuHideView = useCallback((name: ViewName) => {
    setHiddenViews((prev) => (prev.has(name) ? prev : new Set(prev).add(name)));
  }, []);

  // run -> the pane its column shows maximized (read from what renders; the SDK has no getter).
  const [maximizedByRun, setMaximizedByRun] = useState<ReadonlyMap<string, ViewName>>(() => new Map());
  const handleMaximizedChange = useCallback((run: string, name: ViewName | null) => {
    setMaximizedByRun((prev) => {
      if ((prev.get(run) ?? null) === name) return prev;
      const next = new Map(prev);
      if (name) next.set(run, name);
      else next.delete(run);
      return next;
    });
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
    // Viewing a case also checks its run; never unchecks others.
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

  // Checks every visible run unless all already are, then unchecks them all.
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

  // Shared by CaseBrowser and DockedMetrics so both agree on run colors.
  const runColors = assignRunColors(cases ? Object.keys(cases) : []);
  const allRunNames = cases ? Object.keys(cases).sort() : [];
  const runsForMetrics = allRunNames
    .filter((run) => checkedRuns.has(run))
    .map((run) => ({ run, color: runColors.get(run) ?? RUN_COLOR_PALETTE[0] }));

  // Changes when a checked run logs a new step, so metrics refresh right away
  // instead of waiting for their slow poll.
  const metricsRevision = runsForMetrics
    .map(({ run }) => {
      const caseMetas = Object.values(cases?.[run] ?? {});
      const latest = caseMetas.reduce((n, c) => Math.max(n, c.steps[c.steps.length - 1] ?? -1), -1);
      return `${run}:${latest}`;
    })
    .join(',');

  // One shared instance; per-column calls would multiply the requests.
  const metricsData = useMetricsData(runsForMetrics, metricsRevision);

  // Intentional setState-during-render, so a newly checked run gets its
  // column (and its only case auto-selected) in the same pass. Converges,
  // since `everCheckedRuns` only grows to match `checkedRuns`.
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

  // Raw checked count, so turning Combine on (one rendered column) never disables its own checkbox.
  const activeColumnCount = checkedRuns.size;

  // The checkbox keeps its value below two runs; only its effect switches off.
  const effectiveCombinedWorkspace = combinedWorkspace && activeColumnCount >= 2;

  // The first-checked run that is still checked.
  const primaryRun = everCheckedRuns.find((run) => checkedRuns.has(run));

  const columns = everCheckedRuns.map((run) => {
    const caseName = selectedCaseByRun.get(run);
    const selection: Selection | null = caseName !== undefined ? { run, case: caseName } : null;
    const caseMeta = selection ? cases?.[selection.run]?.[selection.case] : undefined;
    const active = checkedRuns.has(run);
    const isPrimary = run === primaryRun;
    return {
      run,
      color: runColors.get(run) ?? RUN_COLOR_PALETTE[0],
      selection,
      caseMeta,
      active,
      isPrimary,
      // In combined mode every other active run folds into the primary column.
      showAsColumn: active && (!effectiveCombinedWorkspace || isPrimary),
    };
  });

  // LRU over hidden columns (setState-during-render; converges once shown runs lead the list).
  const shownRuns = columns.filter((column) => column.showAsColumn).map((column) => column.run);
  const nextRecentRuns = [...shownRuns, ...recentRuns.filter((run) => !shownRuns.includes(run))];
  if (nextRecentRuns.join('\n') !== recentRuns.join('\n')) setRecentRuns(nextRecentRuns);
  const liveRuns = new Set(nextRecentRuns.slice(0, Math.max(MAX_LIVE_COLUMNS, shownRuns.length)));

  // The only place theme values are written; styles reference `var(--tb-*)`.
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

  // Every active run gets its own expanded panel in the Runs list, overlays included.
  const activeControlsRuns = new Set(columns.filter((column) => column.active).map((column) => column.run));

  // Other active, case-selected runs load into the primary column under the
  // primary's case name, seeded from `cases` under that name.
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
  // Each overlay's layers go to its own row's container, not the primary's.
  const overlayContainersForPrimary = new Map(
    overlayRunsForPrimary.map((o) => [o.run, controlsContainers.get(o.run) ?? null]),
  );

  const sharedColumnProps: SharedColumnProps | null =
    licenseToken === undefined
      ? null
      : {
          isDark,
          licenseToken,
          linkCameras,
          hiddenViews,
          layoutRestoreToken,
          onMenuHideView: handleMenuHideView,
          onMaximizedChange: handleMaximizedChange,
        };

  // The "2D image" toggle only matters when some shown case has an image layer.
  const anyImageLayer = columns.some(
    (column) => column.active && column.caseMeta?.layers.some((meta) => meta.kind === 'image'),
  );

  // Shown columns with a maximized pane; a checked pane is off screen if every shown column maximizes another.
  const shownColumns = columns.filter((column) => column.showAsColumn);
  const maximizedColumns = shownColumns.flatMap((column) => {
    const name = maximizedByRun.get(column.run);
    return name ? [{ run: column.run, name }] : [];
  });
  const isOnScreen = (name: ViewName) =>
    shownColumns.some((column) => (maximizedByRun.get(column.run) ?? name) === name);
  const labelOf = (name: ViewName) => VIEWS.find((spec) => spec.name === name)?.label ?? name;

  const viewToggleRow = (
    <div style={viewToggleRowStyle}>
      {VIEWS.filter((spec) => spec.name !== '2d' || anyImageLayer || hiddenViews.has('2d')).map((spec) => {
        const maximizedHere = maximizedColumns.some((m) => m.name === spec.name);
        const offScreen = !hiddenViews.has(spec.name) && maximizedColumns.length > 0 && !isOnScreen(spec.name);
        return (
          <label
            key={spec.name}
            style={offScreen ? viewToggleLabelOffStyle : viewToggleLabelStyle}
            title={maximizedHere ? 'Maximized' : offScreen ? 'Hidden while another pane is maximized' : undefined}
          >
            <input
              type="checkbox"
              checked={!hiddenViews.has(spec.name)}
              onChange={(e) => handleToggleView(spec.name, e.target.checked)}
            />
            {spec.label}
            {maximizedHere && ' ⤢'}
          </label>
        );
      })}
      <button
        type="button"
        style={maximizedColumns.length > 0 ? restoreLayoutButtonActiveStyle : restoreLayoutButtonStyle}
        title="Un-maximize any pane maximized with its ⤢ corner button, in every column"
        onClick={() => setLayoutRestoreToken((n) => n + 1)}
      >
        Restore layout
      </button>
      {maximizedColumns.length > 0 && (
        <div style={maximizedHintStyle}>
          {maximizedColumns
            .map((m) => (shownColumns.length > 1 ? `${labelOf(m.name)} (${m.run})` : labelOf(m.name)))
            .join(', ')}{' '}
          maximized. Restore layout, or change a pane above, to show the others.
        </div>
      )}
    </div>
  );

  const cameraControls = (
    <>
      {/* Disabled, not hidden, so a setting in force is always visible. */}
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
        <div style={sidebarHeaderStyle}>
          <h1 style={titleStyle}>ImFusion Viewer</h1>
          <AboutButton isDark={isDark} />
        </div>

        {/* Fixed spot for the shared view toggles and camera/workspace options, in every mode. */}
        <CollapsibleSection label="Viewer Control">
          {viewToggleRow}
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

        <DockedMetrics data={metricsData} currentStep={primaryCurrentStep} />
      </aside>

      <main style={mainStyle}>
        {/* Hidden columns stay mounted (display:none) up to MAX_LIVE_COLUMNS. */}
        <div style={viewerContainerStyle}>
          {sharedColumnProps &&
            columns
              .filter(({ run }) => liveRuns.has(run))
              .map(({ run, color, selection, caseMeta, showAsColumn, isPrimary }) => (
                <div key={run} style={showAsColumn ? columnVisibleStyle : columnHiddenStyle}>
                  <ViewerColumn
                    {...sharedColumnProps}
                    run={run}
                    color={color}
                    visible={showAsColumn}
                    selection={selection}
                    caseMeta={caseMeta}
                    overlayRuns={isPrimary ? overlayRunsForPrimary : []}
                    overlayControlsContainers={isPrimary ? overlayContainersForPrimary : undefined}
                    onCurrentStepChange={isPrimary ? setPrimaryCurrentStep : undefined}
                    controlsContainer={showAsColumn ? (controlsContainers.get(run) ?? null) : null}
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
  // The sidebar's single scroll container (sections don't scroll on their own).
  overflowY: 'auto',
  overscrollBehavior: 'contain',
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

// Pane toggles; wraps so the labels fit the sidebar width.
const viewToggleRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '4px 10px',
  marginBottom: 4,
};

const viewToggleLabelStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  opacity: 0.85,
  cursor: 'pointer',
};

const viewToggleLabelOffStyle: CSSProperties = {
  ...viewToggleLabelStyle,
  opacity: 0.45,
};

const restoreLayoutButtonStyle: CSSProperties = {
  font: 'inherit',
  fontSize: '0.85em',
  padding: 0,
  border: 'none',
  background: 'transparent',
  color: 'inherit',
  opacity: 0.6,
  cursor: 'pointer',
  textDecoration: 'underline',
};

const restoreLayoutButtonActiveStyle: CSSProperties = {
  ...restoreLayoutButtonStyle,
  opacity: 1,
  color: 'var(--tb-accent)',
};

const maximizedHintStyle: CSSProperties = {
  flexBasis: '100%',
  fontSize: '0.85em',
  opacity: 0.7,
};

const mainStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
};

// Absolutely positioned so the canvas's own pixel size never props up the
// grid cell; its CSS size always follows the cell, so autoResize sees shrinks too.
const canvasStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
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

// A hidden column (unchecked, or folded into the primary in combined mode).
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
  minWidth: 0,
  overflow: 'hidden',
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
  padding: '4px 0',
  fontSize: 13,
  opacity: 0.55,
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

const contextLostStyle: CSSProperties = {
  ...centerMsgStyle,
  flexDirection: 'column',
  gap: 10,
  opacity: 1,
  background: 'var(--tb-canvas-bg)',
};

const reloadButtonStyle: CSSProperties = {
  ...exportButtonStyle,
  width: 'auto',
  padding: '6px 16px',
};
