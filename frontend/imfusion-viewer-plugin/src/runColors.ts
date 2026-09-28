// Stable, deterministic color assignment for runs, shared by the sidebar's
// per-run swatches and DockedMetrics' chart lines, so a run always maps to
// the same color everywhere it's shown.

/**
 * A small fixed palette assigned once per run (a stable identity color, not
 * theme-swapped), chosen to read clearly on both light and dark backgrounds.
 * Three entries (yellow/cyan/green) were darkened from their original,
 * too-pale-for-light-theme values; see the inline comments below.
 */
export const RUN_COLOR_PALETTE: readonly string[] = [
  '#4da3ff',
  '#ff8a4d',
  '#26a45e', // was #4dd68a: too pale against a light background.
  '#e5534b',
  '#c792ea',
  '#b58a00', // was #ffd54d: too pale against a light background.
  '#25a0a0', // was #4dd6d6: too pale against a light background.
  '#ff6ec7',
];

export interface RunColorEntry {
  run: string;
  color: string;
}

/**
 * Assigns each run a color from `RUN_COLOR_PALETTE` in sorted-run-name
 * order, so the assignment is deterministic regardless of fetch/discovery
 * order. A run's color can shift if a new run sorts before it
 * alphabetically; acceptable for this small fixed palette, since every
 * consumer recomputes from the same full run list and agrees with the others.
 */
export function assignRunColors(runNames: Iterable<string>): Map<string, string> {
  const sorted = [...new Set(runNames)].sort();
  const colors = new Map<string, string>();
  sorted.forEach((run, i) => {
    colors.set(run, RUN_COLOR_PALETTE[i % RUN_COLOR_PALETTE.length]);
  });
  return colors;
}
