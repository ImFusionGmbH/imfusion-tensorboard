import type { CSSProperties } from 'react';

// Path data from the ImFusion brand kit's compact symbol mark (not the full
// wordmark logo). The light/dark source SVGs differ only by fill color, so
// this component inlines the shared path once and takes color as a prop
// instead of importing two separate assets.
const MARK_VIEWBOX_WIDTH = 320;
const MARK_VIEWBOX_HEIGHT = 180;
const MARK_ASPECT_RATIO = MARK_VIEWBOX_HEIGHT / MARK_VIEWBOX_WIDTH;

export interface ImFusionMarkProps {
  /** Fill color for both paths; pass the light or dark brand-blue variant. */
  color: string;
  /** Rendered width in px; height is derived to preserve the mark's 320:180 aspect ratio. Defaults to 24. */
  size?: number;
  style?: CSSProperties;
}

/**
 * The compact ImFusion brand mark (two angled bars), rendered as inline SVG
 * at whatever size/color the caller needs.
 */
export function ImFusionMark({ color, size = 24, style }: ImFusionMarkProps) {
  const height = size * MARK_ASPECT_RATIO;
  return (
    <svg
      width={size}
      height={height}
      viewBox={`0 0 ${MARK_VIEWBOX_WIDTH} ${MARK_VIEWBOX_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      aria-hidden="true"
    >
      <path d="M320 180H0V159.715L237.082 128.105L320 65.916V180Z" fill={color} />
      <path d="M320 20.2832L82.918 51.8945L0 114.082V0H320V20.2832Z" fill={color} />
    </svg>
  );
}
