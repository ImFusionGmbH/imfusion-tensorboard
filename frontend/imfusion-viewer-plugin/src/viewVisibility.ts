import type { Display, GlObject, GlViewport, ImFusion, View } from '@imfusion/sdk';
import type { LayerKind } from './api';

export type ViewName = 'axial' | 'coronal' | 'sagittal' | '3d' | '2d';

export interface ViewSpec {
  name: ViewName;
  label: string;
  get: (display: Display) => View;
}

// Sidebar order; '2d' is the IMAGE_2D pane.
export const VIEWS: readonly ViewSpec[] = [
  { name: 'axial', label: 'Axial', get: (d) => d.mainAxialView() },
  { name: 'coronal', label: 'Coronal', get: (d) => d.mainCoronalView() },
  { name: 'sagittal', label: 'Sagittal', get: (d) => d.mainSagittalView() },
  { name: '3d', label: '3D', get: (d) => d.main3dView() },
  { name: '2d', label: '2D image', get: (d) => d.main2dView() },
];

/** Panes a layer kind can appear in; used to skip un-hiding a pane that would be empty. */
export function viewsForKind(kind: LayerKind): ViewName[] {
  return kind === 'image' ? ['2d'] : ['axial', 'coronal', 'sagittal', '3d'];
}

export function viewNameOf(display: Display, view: View): ViewName | null {
  for (const spec of VIEWS) {
    try {
      if (view.isAliasOf(spec.get(display))) return spec.name;
    } catch {
      // Pane not present in this display.
    }
  }
  return null;
}

/** Hides every user-hidden pane that isn't hidden yet; never un-hides anything. */
export function reassertHidden(display: Display, hidden: ReadonlySet<ViewName>): void {
  if (hidden.size === 0) return;
  const layouter = display.layouter();
  for (const spec of VIEWS) {
    if (!hidden.has(spec.name)) continue;
    const view = spec.get(display);
    if (!layouter.isViewHidden(view)) layouter.setViewHidden(view, true);
  }
}

/** Re-hides like `reassertHidden`, after flipping one hidden flag to force a fresh layout (restoring a maximized pane reuses the old one). */
export function forceRelayout(display: Display, hidden: ReadonlySet<ViewName>): void {
  const spec = VIEWS.find((s) => hidden.has(s.name));
  if (!spec) return;
  const layouter = display.layouter();
  const view = spec.get(display);
  layouter.setViewHidden(view, false);
  layouter.setViewHidden(view, true);
  reassertHidden(display, hidden);
}

let probeSerial = 0;

/** Panes drawn in one render pass, each with its viewport (device px). */
export type DrawnPanes = ReadonlyMap<ViewName, GlViewport>;

/**
 * Calls `onPass` after each render with the panes that drew in it. The SDK exposes no layout or
 * maximize state, so each pane gets an invisible GlObject that records when and where it is drawn.
 */
export function watchDrawnViews(imf: ImFusion, onPass: (drawn: DrawnPanes) => void): () => void {
  let disposed = false;
  let pass: Map<ViewName, GlViewport> | null = null;
  // Default-constructed = invalid, so scene bounds ignore the probes.
  const noBounds = new imf.bindings.AlignedBox();
  const attached: Array<{ view: View; probe: GlObject }> = [];
  for (const spec of VIEWS) {
    try {
      const view = spec.get(imf.display);
      const probe = imf.createCustomGlObject(
        {
          render: (viewState) => {
            if (disposed) return;
            if (!pass) {
              pass = new Map();
              // Reported after the render call returns, never from inside it.
              queueMicrotask(() => {
                const drawn = pass;
                pass = null;
                if (drawn && !disposed) onPass(drawn);
              });
            }
            pass.set(spec.name, viewState.viewport());
          },
          bounds: () => noBounds,
        },
        `imfViewerLayoutProbe${++probeSerial}`,
      );
      view.addObject(probe);
      attached.push({ view, probe });
    } catch (e) {
      console.warn(`imfusion_viewer: no layout probe for the ${spec.label} pane`, e);
    }
  }
  return () => {
    disposed = true;
    for (const { view, probe } of attached) {
      try {
        view.removeObject(probe);
        probe.delete();
        // `view` is an SDK-owned reference: delete() would destroy the pane itself.
      } catch {
        // The wasm instance is already gone.
      }
    }
    try {
      noBounds.delete();
    } catch {
      // Same.
    }
  };
}

// A pane this close to the whole canvas is shown alone (layout borders eat a few px).
const FULL_CANVAS = 0.9;

/**
 * The pane drawn over (nearly) the whole canvas although others would be laid out, i.e. maximized;
 * `null` if none. Judged by size, not by how many panes drew: the SDK often redraws one pane alone.
 */
export function maximizedViewOf(
  drawn: DrawnPanes,
  expected: ReadonlySet<ViewName>,
  canvas: { width: number; height: number },
): ViewName | null {
  if (expected.size < 2 || canvas.width <= 0 || canvas.height <= 0) return null;
  for (const [name, vp] of drawn) {
    if (vp.width >= FULL_CANVAS * canvas.width && vp.height >= FULL_CANVAS * canvas.height) {
      return expected.has(name) ? name : null;
    }
  }
  return null;
}

// Set while a context-menu action runs, so a hide it causes counts as the user's (menu "Hide View").
let menuActionDepth = 0;

export function runAsMenuAction(fn: () => void): void {
  menuActionDepth++;
  try {
    fn();
  } finally {
    menuActionDepth--;
  }
}

export function isMenuActionRunning(): boolean {
  return menuActionDepth > 0;
}
