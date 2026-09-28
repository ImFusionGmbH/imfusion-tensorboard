import { useState, type CSSProperties } from 'react';
import { MetricChart } from './MetricChart';
import type { UseMetricsDataResult } from './useMetricsData';

// Logical viewBox size for MetricChart's coordinate math, not a literal pixel
// size: the chart's <svg> has no fixed width/height and stretches via CSS to
// fill its actual container width.
const CHART_WIDTH = 320;
// Taller than a bare plot would need, to leave room for MetricChart's axis
// labels without shrinking the plotted-line area. Keep in sync with
// MetricChart.tsx's `padding`/`topPadding` if those change.
const CHART_HEIGHT = 190;

export interface DockedMetricsProps {
  /** The `useMetricsData(runs)` result, computed once in App.tsx and passed down. */
  data: UseMetricsDataResult;
  /** Marks a vertical dashed line at this step on every chart, if provided. */
  currentStep?: number | null;
}

/**
 * Collapsible metrics section in the sidebar, mounted independently of the
 * viewer columns so comparisons stay live even when columns are hidden.
 * Reuses `useMetricsData` computed once in App.tsx instead of polling again
 * here. No separate legend is drawn; the sidebar's own run checkboxes and
 * swatches already serve that purpose.
 */
export function DockedMetrics({ data, currentStep = null }: DockedMetricsProps) {
  const [expanded, setExpanded] = useState(true);
  const { status, error, groups, seriesForTag } = data;

  const tagCount = groups.reduce((n, g) => n + g.tags.length, 0);

  return (
    <div style={sectionStyle}>
      <button type="button" onClick={() => setExpanded((e) => !e)} style={headerButtonStyle}>
        <span style={disclosureStyle}>{expanded ? '▾' : '▸'}</span>
        <span style={headerLabelStyle}>Metrics{status === 'ready' ? ` (${tagCount})` : ''}</span>
      </button>

      {expanded && (
        <div style={bodyStyle}>
          {status === 'empty-runs' && <div style={emptyStyle}>Check a run above to see its metrics.</div>}
          {status === 'loading' && <div style={emptyStyle}>Looking for scalar data…</div>}
          {status === 'error' && <div style={errorStyle}>{error}</div>}
          {status === 'no-tags' && <div style={emptyStyle}>No scalar tags found for the checked run(s).</div>}
          {status === 'ready' &&
            groups.map(({ group, tags }) => (
              <div key={group} style={groupStyle}>
                <div style={groupLabelStyle}>{group}</div>
                {tags.map((tag) => (
                  <div key={tag} style={chartWrapStyle}>
                    <MetricChart
                      tag={tag}
                      series={seriesForTag(tag)}
                      currentStep={currentStep}
                      width={CHART_WIDTH}
                      height={CHART_HEIGHT}
                    />
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

const sectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '4px 10px 12px',
  borderTop: '1px solid var(--tb-border)',
};

// A plain button, disclosure triangle + uppercase small label.
const headerButtonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  background: 'transparent',
  border: 'none',
  padding: '8px 0 0',
  margin: 0,
  cursor: 'pointer',
  color: 'inherit',
  textAlign: 'left',
  font: 'inherit',
};

const disclosureStyle: CSSProperties = {
  opacity: 0.55,
  width: 10,
  display: 'inline-block',
};

// Matches App.tsx's `sectionLabelStyle` for visual consistency with the
// sidebar's "Cases" section label.
const headerLabelStyle: CSSProperties = {
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  opacity: 0.55,
};

const bodyStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
};

const groupStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
};

const groupLabelStyle: CSSProperties = {
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  opacity: 0.4,
};

// MetricChart's <svg> stretches to fill this wrapper's full width (see
// MetricChart.tsx's `svgStyle`).
const chartWrapStyle: CSSProperties = {
  display: 'block',
};

const emptyStyle: CSSProperties = {
  padding: '10px 8px',
  textAlign: 'center',
  opacity: 0.55,
  background: 'var(--tb-surface)',
  border: '1px solid var(--tb-border)',
  borderRadius: 6,
};

const errorStyle: CSSProperties = {
  ...emptyStyle,
  color: 'var(--tb-error)',
};
