// Deterministic color assignment for per-label-value colors within a
// multi-class segmentation mask (e.g. label 1 = liver, 2 = tumor), keyed by
// the numeric label value. Produces normalized [0, 1] RGB triples, as the
// WebSDK's `LabelConfig.color` expects, not CSS hex strings; a different
// concern from runColors.ts's per-run identity colors.

/**
 * A small fixed palette of RGB triples (each channel in [0, 1]), chosen for
 * legibility against dark/grayscale medical imagery.
 */
export const LABEL_COLOR_PALETTE: [number, number, number][] = [
  [0.9, 0.25, 0.25],
  [0.25, 0.75, 0.35],
  [0.3, 0.55, 0.95],
  [0.95, 0.6, 0.15],
  [0.65, 0.35, 0.9],
  [0.2, 0.75, 0.8],
  [0.85, 0.8, 0.2],
  [0.9, 0.45, 0.65],
  [0.6, 0.4, 0.25],
  [0.6, 0.6, 0.6],
];

/**
 * Maps a mask label value (not its position among labels present in one
 * case) to a color, so label value 1 always renders the same color across
 * every case. The double-modulo also handles negative values correctly.
 */
export function assignLabelColor(value: number): [number, number, number] {
  const n = LABEL_COLOR_PALETTE.length;
  const index = ((value % n) + n) % n;
  return LABEL_COLOR_PALETTE[index];
}
