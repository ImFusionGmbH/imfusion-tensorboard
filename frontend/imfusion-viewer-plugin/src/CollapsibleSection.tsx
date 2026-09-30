import { useState, type CSSProperties, type ReactNode } from 'react';

export interface CollapsibleSectionProps {
  /** Section header label, shown uppercase next to the disclosure triangle. */
  label: string;
  /** Optional suffix appended right after `label` (e.g. a count), not uppercased. */
  labelSuffix?: string;
  /** Whether the section starts expanded. Defaults to `true`. */
  defaultExpanded?: boolean;
  children: ReactNode;
}

/**
 * Collapsible sidebar section: a disclosure-triangle header button toggling
 * a body below it. Matches DockedMetrics.tsx's own hand-rolled header
 * exactly (same styles), so "Runs", "Layers", and "Metrics" all read as the
 * same kind of section; DockedMetrics keeps its own copy since it also
 * splices a live tag count into the label.
 */
export function CollapsibleSection({ label, labelSuffix, defaultExpanded = true, children }: CollapsibleSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div style={sectionStyle}>
      <button type="button" onClick={() => setExpanded((e) => !e)} style={headerButtonStyle} aria-expanded={expanded}>
        <span style={disclosureStyle}>{expanded ? '▾' : '▸'}</span>
        <span style={headerLabelStyle}>
          {label}
          {labelSuffix ?? ''}
        </span>
      </button>
      {/* Hidden, not unmounted: children may host portal targets (see CaseBrowser). */}
      <div style={expanded ? bodyStyle : hiddenStyle}>{children}</div>
    </div>
  );
}

const sectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  // The sidebar is the one scroll container; sections never shrink into inner scrollers.
  flexShrink: 0,
  gap: 8,
  padding: '4px 10px 12px',
  borderTop: '1px solid var(--tb-border)',
};

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

const hiddenStyle: CSSProperties = {
  display: 'none',
};
