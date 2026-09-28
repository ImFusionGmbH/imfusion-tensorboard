import { useEffect, useState } from 'react';

/**
 * Reads TensorBoard core's current dark/light mode from the `dark-mode`
 * class on the parent page's body; TB core exposes no other signal for it.
 * Falls back to the OS color-scheme preference if `window.parent` access
 * ever throws (e.g. a sandboxed iframe).
 */
export function detectTensorBoardDarkMode(): boolean {
  try {
    return window.parent.document.body.classList.contains('dark-mode');
  } catch {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }
}

/**
 * Tracks TensorBoard core's dark-mode boolean live, updating if the user
 * toggles TB's theme control while this plugin is open. Call once in the
 * root component (`App`) and derive CSS custom properties from the result.
 * Uses a `MutationObserver` on the parent body, disconnected on unmount.
 */
export function useTensorBoardTheme(): boolean {
  const [isDark, setIsDark] = useState(detectTensorBoardDarkMode);

  useEffect(() => {
    let parentBody: HTMLElement;
    try {
      parentBody = window.parent.document.body;
    } catch {
      // Cross-origin/sandboxed iframe (not expected today): no parent DOM to
      // observe, so there's no live signal beyond the initial fallback read.
      return;
    }

    const observer = new MutationObserver(() => {
      setIsDark(detectTensorBoardDarkMode());
    });
    observer.observe(parentBody, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
