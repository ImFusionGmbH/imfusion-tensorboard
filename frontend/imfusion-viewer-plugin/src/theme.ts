// Color tokens for this plugin's own UI chrome (sidebar, panel, buttons,
// charts) plus the WebGL canvas clear color: `canvasBackground` is the one
// token that reaches the renderer. Values are copied from TensorBoard core's
// own theme so this plugin's chrome looks consistent with the rest of
// TensorBoard; see `useTensorBoardTheme.ts` for the live light/dark detection.

export interface ThemeTokens {
  /** Outermost page background (this plugin's root `<div>` only). */
  background: string;
  /**
   * WebGL canvas clear color, dark in both themes on purpose: medical imagery,
   * labelColors.ts's palette and the SDK's own light-on-dark view overlays are
   * all calibrated for a dark surround.
   */
  canvasBackground: string;
  /** Sidebar background, one shade off from `background`, matching TensorBoard core's own UI. */
  sidebarBackground: string;
  /** Slightly-raised surface background: buttons, list rows, chart canvases. */
  surface: string;
  /** Primary text color. */
  textPrimary: string;
  /** Secondary/dimmed text: axis labels, step counts, hints. */
  textMuted: string;
  /** Divider/border color used throughout (panel seams, button outlines, swatch borders). */
  border: string;
  /** Brand/accent color: selected-state borders, the epoch-scrubber marker line. */
  accent: string;
  /** Low-alpha wash of `accent`, for selected-row/button backgrounds; no separate per-theme literal needed. */
  accentSoft: string;
  /** Fixed semantic red for error states, intentionally the same value in both themes. */
  error: string;
}

const LIGHT_THEME: ThemeTokens = {
  background: '#ffffff',
  // Not `background`: a white viewport wrecks grayscale window/level contrast.
  // Reusing DARK_THEME's page background keeps it inside TensorBoard's palette.
  canvasBackground: '#303030',
  sidebarBackground: '#f5f5f5',
  surface: '#fafafa',
  textPrimary: '#212121',
  textMuted: '#616161',
  border: '#ebebeb',
  accent: '#f57c00',
  accentSoft: 'rgba(245, 124, 0, 0.14)',
  error: '#e5534b',
};

const DARK_THEME: ThemeTokens = {
  background: '#303030',
  // One shade below the page background, so the viewport reads as recessed.
  // 0x1a/255 = 0.102, essentially the SDK's own default: dark mode is unchanged.
  canvasBackground: '#1a1a1a',
  sidebarBackground: '#3a3a3a',
  surface: '#424242',
  textPrimary: 'rgba(255, 255, 255, 0.87)',
  textMuted: 'rgba(255, 255, 255, 0.7)',
  border: '#555555',
  accent: '#ef6c00',
  accentSoft: 'rgba(239, 108, 0, 0.22)',
  error: '#e5534b',
};

export function getThemeTokens(isDark: boolean): ThemeTokens {
  return isDark ? DARK_THEME : LIGHT_THEME;
}

/**
 * `#rrggbb` -> the SDK's `vec3` (components in 0..1). Only the hex tokens are
 * valid input: `textPrimary`/`accentSoft` are `rgba()` strings and yield NaNs.
 */
export function hexToVec3(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
