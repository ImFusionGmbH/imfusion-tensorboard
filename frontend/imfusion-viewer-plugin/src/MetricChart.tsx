import type { CSSProperties } from 'react';
import type { ScalarPoint } from './api';

/** One run's data for a single tag, plus the color it should be drawn in. */
export interface MetricSeries {
  run: string;
  color: string;
  points: ScalarPoint[];
}

export interface MetricChartProps {
  /** Scalar tag this chart represents, e.g. "loss/train". Shown in the title. */
  tag: string;
  /**
   * One entry per checked run that reports this tag. Purely presentational:
   * fetching and filtering out runs that lack this tag happen in the caller.
   */
  series: MetricSeries[];
  /** Marks a vertical dashed line at this step, if provided. */
  currentStep?: number | null;
  width?: number;
  height?: number;
}

/**
 * Inline-SVG line chart for a single scalar tag, overlaying one line per
 * checked run. Colors come from the shared per-run assignment in
 * runColors.ts so they match the sidebar's run swatches; no separate legend
 * is drawn here.
 */
export function MetricChart({ tag, series, currentStep = null, width = 320, height = 160 }: MetricChartProps) {
  // `padding`/`topPadding` size the margin around the axis-label text below.
  // They're hand-tuned to that text's font size rather than derived from CSS
  // layout, so changing the label font size requires re-deriving these too
  // (see also DockedMetrics.tsx's CHART_HEIGHT).
  const padding = 34;
  const topPadding = 28;

  const nonEmptySeries = series.filter((s) => s.points.length > 0);
  if (nonEmptySeries.length === 0) return <div style={emptyStyle}>Waiting for scalar data ({tag})…</div>;

  const sortedSeries = nonEmptySeries.map((s) => ({ ...s, points: [...s.points].sort((a, b) => a.step - b.step) }));
  const maxStep = Math.max(1, ...sortedSeries.flatMap((s) => s.points.map((p) => p.step)));
  // Y-axis scales to the combined min/max across all series, so overlaid
  // runs share one consistent scale.
  const allValues = sortedSeries.flatMap((s) => s.points.map((p) => p.value));
  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues);
  const span = Math.max(rawMax - rawMin, 1e-6);
  const minV = rawMin - span * 0.1;
  const maxV = rawMax + span * 0.1;
  const vSpan = Math.max(maxV - minV, 1e-6);

  const x = (step: number) => padding + (step / maxStep) * (width - 2 * padding);
  const y = (v: number) => height - padding - ((v - minV) / vSpan) * (height - padding - topPadding);

  const showMarker = currentStep !== null && currentStep <= maxStep;

  return (
    <div style={chartWrapStyle}>
      <div style={titleStyle}>{tag}</div>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" style={svgStyle}>
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--tb-border)" />
        <line x1={padding} y1={topPadding} x2={padding} y2={height - padding} stroke="var(--tb-border)" />
        {sortedSeries.map(({ run, color, points }) => {
          const path = points
            .map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.step).toFixed(1)} ${y(p.value).toFixed(1)}`)
            .join(' ');
          const latest = points[points.length - 1];
          return (
            <g key={run}>
              {points.length > 1 && <path d={path} fill="none" stroke={color} strokeWidth={2} />}
              {points.map((p) => (
                <circle key={p.step} cx={x(p.step)} cy={y(p.value)} r={p === latest ? 3 : 1.5} fill={color}>
                  <title>{`${run} · epoch ${p.step} · ${tag} ${p.value.toFixed(4)}`}</title>
                </circle>
              ))}
            </g>
          );
        })}
        {showMarker && (
          <line
            x1={x(currentStep as number)}
            y1={topPadding}
            x2={x(currentStep as number)}
            y2={height - padding}
            stroke="var(--tb-accent)"
            strokeDasharray="3,3"
          />
        )}
        <text x={padding} y={height - 11} fontSize={15} fill="var(--tb-text-muted)">
          epoch 0
        </text>
        <text x={width - padding} y={height - 11} fontSize={15} fill="var(--tb-text-muted)" textAnchor="end">
          epoch {maxStep}
        </text>
        <text x={padding} y={topPadding - 10} fontSize={15} fill="var(--tb-text-muted)">
          {minV.toFixed(3)}–{maxV.toFixed(3)}
        </text>
      </svg>
    </div>
  );
}

const chartWrapStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

const titleStyle: CSSProperties = {
  opacity: 0.75,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

// Only `viewBox` is set on the <svg> (no fixed width/height), so it stretches
// to fill its container's actual width (see DockedMetrics' `chartWrapStyle`).
const svgStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  height: 'auto',
  background: 'var(--tb-surface)',
  border: '1px solid var(--tb-border)',
  borderRadius: 6,
};

const emptyStyle: CSSProperties = {
  padding: '16px 8px',
  textAlign: 'center',
  opacity: 0.55,
  background: 'var(--tb-surface)',
  border: '1px solid var(--tb-border)',
  borderRadius: 6,
};
