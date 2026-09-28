// ES-module entry point for the TensorBoard "imfusion_viewer" plugin.
//
// TensorBoard core loads this in an iframe and calls the required
// zero-argument `render()` export; no DOM element is handed to us, so we
// create our own mount point on document.body.

import { createRoot } from 'react-dom/client';
import { preloadWasm } from '@imfusion/sdk';
import { App } from './App';
import { getThemeTokens } from './theme';
import { detectTensorBoardDarkMode } from './useTensorBoardTheme';

// Starts fetching the wasm binary immediately on import, at the route the
// backend actually serves it under ("/wasm/ImFusionLib.wasm"), which differs
// from the SDK's own default path and must be overridden explicitly.
// `init()` later calls `preloadWasm()` again with no args, reusing this
// cached promise.
preloadWasm({ url: new URL('./wasm/ImFusionLib.wasm', import.meta.url) });

// TensorBoard core renders in Roboto, but this plugin's iframe is a separate
// document, so TB's own `@font-face` rules don't apply here; we declare our
// own, pointing at the same already-served, content-hashed font files (no
// extra font bytes shipped, no CDN dependency). If a future TensorBoard
// version renames those files, these rules just stop matching and the UI
// falls back to generic sans-serif/monospace instead of breaking.
const ROBOTO_FONT_FACE_CSS = `
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto'), local('Roboto-Regular'), url(/font-roboto/oMMgfZMQthOryQo9n22dcuvvDin1pK8aKteLpeZ5c0A.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(/font-roboto/hMqPNLsu_dywMa4C_DEpY4gp9Q8gbYrhqGlRav_IXfk.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}
`;

/** Injects `ROBOTO_FONT_FACE_CSS` into `<head>` exactly once; safe to call on every `render()`. */
function injectRobotoFontFace(): void {
  if (document.getElementById('imfusion-viewer-roboto-fontface')) return;
  const style = document.createElement('style');
  style.id = 'imfusion-viewer-roboto-fontface';
  style.textContent = ROBOTO_FONT_FACE_CSS;
  document.head.appendChild(style);
}

export function render(): void {
  injectRobotoFontFace();
  const container = document.createElement('div');
  container.id = 'imfusion-viewer-root';
  container.style.width = '100vw';
  container.style.height = '100vh';
  document.documentElement.style.margin = '0';
  document.documentElement.style.height = '100%';
  document.body.style.margin = '0';
  document.body.style.height = '100%';
  // Read TB core's theme synchronously before React mounts, so the body
  // background doesn't flash dark before the correct theme paints. `App`'s
  // own `useTensorBoardTheme()` handles live updates afterward.
  document.body.style.background = getThemeTokens(detectTensorBoardDarkMode()).background;
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<App />);
}
