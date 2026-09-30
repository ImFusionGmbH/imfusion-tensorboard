import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ImFusionMark } from './ImFusionMark';

// Hand-maintained: bump alongside pyproject.toml's `version` field, since
// there's no build-time injection linking them. This is the shipped plugin
// version, not the frontend's unrelated package.json version.
const PLUGIN_VERSION = '0.1.2';

export interface AboutButtonProps {
  /**
   * Passed down from App.tsx's single theme detection call rather than
   * re-detected here. Selects between the two fixed brand-blue variants;
   * this isn't a themeable `--tb-*` token.
   */
  isDark: boolean;
}

/**
 * Icon button showing the ImFusion brand mark, toggling an About popover
 * (version, copyright, license note) on click.
 *
 * Uses a plain conditional render for the popover: unlike CaseViewer's
 * floating panel, it holds no WASM state, so the always-mounted/
 * `display:none` pattern used there isn't needed here.
 */
export function AboutButton({ isDark }: AboutButtonProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Click-outside and Escape close the popover. This subscribes to real DOM
  // events rather than mirroring state during render, so a plain useEffect
  // is appropriate. Listeners attach only while `open` is true.
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const markColor = isDark ? '#F9FDFE' : '#245EFF';

  return (
    <div ref={wrapRef} style={wrapStyle}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={buttonStyle}
        aria-label="About ImFusion Viewer"
        title="About ImFusion Viewer"
        aria-expanded={open}
      >
        <ImFusionMark color={markColor} size={16} />
      </button>

      {open && (
        <div style={popoverStyle} role="dialog" aria-label="About ImFusion Viewer">
          <ImFusionMark color={markColor} size={30} style={popoverMarkStyle} />
          <div style={popoverHeadingStyle}>ImFusion Viewer</div>
          <div style={popoverVersionStyle}>Version {PLUGIN_VERSION}</div>
          <div style={popoverLineStyle}>Copyright © ImFusion GmbH.</div>
          <div style={popoverWarningLineStyle}>Not for clinical use.</div>
        </div>
      )}
    </div>
  );
}

// Anchors `popoverStyle`'s absolute positioning. `flexShrink: 0` keeps this
// from being squeezed by the sidebar header's title.
const wrapStyle: CSSProperties = {
  position: 'relative',
  flexShrink: 0,
};

// Matches this codebase's other compact icon buttons; sized to fit the
// 16px brand mark with a little breathing room.
const buttonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  padding: '4px 6px',
  borderRadius: 4,
  border: '1px solid var(--tb-border)',
  background: 'var(--tb-surface)',
  cursor: 'pointer',
};

// Same "glass" chrome as App.tsx's floating panel, for visual consistency.
// Width is sized so the prose lines don't wrap too aggressively at this
// text size.
const popoverStyle: CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 6px)',
  right: 0,
  zIndex: 20,
  width: 260,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: '12px 14px',
  background: 'color-mix(in srgb, var(--tb-surface) 92%, transparent)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  border: '1px solid var(--tb-border)',
  borderRadius: 8,
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
  color: 'var(--tb-text)',
  lineHeight: 1.45,
};

const popoverMarkStyle: CSSProperties = {
  marginBottom: 2,
};

const popoverHeadingStyle: CSSProperties = {};

const popoverVersionStyle: CSSProperties = {
  color: 'var(--tb-text-muted)',
  marginBottom: 4,
};

const popoverLineStyle: CSSProperties = {};

// Regulatory safety statement (ImFusion's viewers are not certified medical
// devices), set apart from the other lines by color alone.
const popoverWarningLineStyle: CSSProperties = {
  color: 'var(--tb-error)',
};
