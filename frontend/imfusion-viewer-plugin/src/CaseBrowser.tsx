import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { fetchCases, type CasesResponse } from './api';
import { RUN_COLOR_PALETTE } from './runColors';

// Case/step lists change only once per completed epoch, so this polls
// slower than CaseViewer's own per-case poll.
const POLL_INTERVAL_MS = 3000;

export interface Selection {
  run: string;
  case: string;
}

export interface CaseBrowserProps {
  /** run name -> the case currently selected for viewing within that run. */
  selectedCaseByRun: Map<string, string>;
  onSelect: (selection: Selection, cases: CasesResponse) => void;
  onCasesUpdate?: (cases: CasesResponse) => void;
  /** Run names currently checked for inclusion in the Metrics comparison. */
  checkedRuns: Set<string>;
  /** Toggles whether a run is checked for the Metrics comparison. */
  onToggleRun: (run: string) => void;
  /**
   * "Toggle All Runs" handler, called with the currently visible (filtered)
   * run names. The check-all/uncheck-all logic itself lives in App.tsx.
   */
  onToggleAllRuns: (visibleRuns: string[]) => void;
  /** run name -> its stable color swatch, shared with the Metrics dashboard. */
  runColors: Map<string, string>;
  /**
   * Every currently-active run gets its own inline expanded layer-controls
   * panel right under its own row (view toggles, scrubber, layer list) -
   * including an overlay run in combined-workspace mode, which portals its
   * layers into its own container here rather than the primary's, so
   * combining runs on the canvas never merges their entries in this list.
   */
  activeControlsRuns: Set<string>;
  /**
   * Returns a stable ref callback for `run`'s panel container - a DOM node
   * that run's CaseViewer portals its controls into (see App.tsx's
   * `ViewerColumn`). Cached per run in App.tsx, not recreated each render:
   * a fresh callback identity every render would make React tear down and
   * re-register the node on every keystroke elsewhere in the sidebar.
   */
  registerControlsContainer: (run: string) => (el: HTMLDivElement | null) => void;
}

/**
 * Filters run names by `filterText` as a case-insensitive regex. An invalid
 * pattern (e.g. mid-typed) is treated as no filter, showing every run.
 */
function filterRunNames(allRuns: string[], filterText: string): string[] {
  const trimmed = filterText.trim();
  if (!trimmed) return allRuns;
  let re: RegExp;
  try {
    re = new RegExp(trimmed, 'i');
  } catch {
    return allRuns;
  }
  return allRuns.filter((run) => re.test(run));
}

export function CaseBrowser({
  selectedCaseByRun,
  onSelect,
  onCasesUpdate,
  checkedRuns,
  onToggleRun,
  onToggleAllRuns,
  runColors,
  activeControlsRuns,
  registerControlsContainer,
}: CaseBrowserProps) {
  const [cases, setCases] = useState<CasesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filterText, setFilterText] = useState('');
  const onCasesUpdateRef = useRef(onCasesUpdate);
  // Updated in an effect, not during render, matching the same pattern in CaseViewer.tsx.
  useEffect(() => {
    onCasesUpdateRef.current = onCasesUpdate;
  });

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
        const result = await fetchCases();
        if (cancelled) return;
        setCases(result);
        setError(null);
        onCasesUpdateRef.current?.(result);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load cases.');
      }
    };

    void poll();
    const interval = window.setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  const allRunNames = useMemo(() => (cases ? Object.keys(cases).sort() : []), [cases]);
  const visibleRunNames = useMemo(() => filterRunNames(allRunNames, filterText), [allRunNames, filterText]);

  if (error) return <div style={errorStyle}>{error}</div>;
  if (!cases) return <div style={emptyStyle}>Loading cases…</div>;

  if (allRunNames.length === 0) {
    return <div style={emptyStyle}>No runs with imfusion_viewer data yet.</div>;
  }

  return (
    <div style={wrapStyle}>
      <input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Write a regex to filter runs"
        aria-label="Write a regex to filter runs"
        style={filterInputStyle}
      />

      <div style={runListStyle}>
        {visibleRunNames.length === 0 && <div style={emptyStyle}>No runs match this filter.</div>}
        {visibleRunNames.map((run, index) => {
          const caseNames = Object.keys(cases[run]).sort();
          // For a single-case run, the checkbox alone both selects the case
          // and includes it in Metrics, collapsing what would otherwise be
          // two controls into one; the run name stays clickable too.
          // Multi-case runs still need the per-case button list to disambiguate.
          const isSingleCase = caseNames.length === 1;
          const onlyCase = isSingleCase ? caseNames[0] : undefined;
          const color = runColors.get(run) ?? RUN_COLOR_PALETTE[0];
          const isChecked = checkedRuns.has(run);

          return (
            <div key={run} style={index === 0 ? runGroupFirstStyle : runGroupStyle}>
              <div style={runHeaderRowStyle}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    // Checking a single-case run's box both selects the case
                    // and includes the run in Metrics, via the same onSelect
                    // flow as clicking the run name. Unchecking, or a
                    // multi-case run, just toggles Metrics inclusion.
                    if (isSingleCase && onlyCase && !isChecked) {
                      onSelect({ run, case: onlyCase }, cases);
                    } else {
                      onToggleRun(run);
                    }
                  }}
                  // accent-color fills the checkbox with the run's own color
                  // when checked, matching TensorBoard's Runs panel.
                  style={{ accentColor: color }}
                  title={
                    isSingleCase
                      ? `View "${run}" and include it in the Metrics comparison`
                      : `Include "${run}" in the Metrics comparison`
                  }
                />
                <span style={{ ...runDotStyle, background: color }} title={`"${run}"'s color`} />
                <span
                  style={isSingleCase ? runLabelClickableStyle : runLabelStyle}
                  onClick={
                    isSingleCase && onlyCase ? () => onSelect({ run, case: onlyCase }, cases) : undefined
                  }
                  title={isSingleCase ? `View "${run}" in the 3D viewer` : undefined}
                >
                  {run}
                </span>
                {isSingleCase && (
                  <span style={stepCountStyle}>
                    {cases[run][onlyCase!].steps.length} step{cases[run][onlyCase!].steps.length === 1 ? '' : 's'}
                  </span>
                )}
              </div>
              {!isSingleCase && (
                <div style={caseListStyle}>
                  {caseNames.map((caseName) => {
                    const meta = cases[run][caseName];
                    const isSelected = selectedCaseByRun.get(run) === caseName;
                    return (
                      <button
                        key={caseName}
                        type="button"
                        style={isSelected ? caseButtonSelectedStyle : caseButtonStyle}
                        onClick={() => onSelect({ run, case: caseName }, cases)}
                      >
                        <span style={caseNameStyle}>{caseName}</span>
                        <span style={stepCountStyle}>{meta.steps.length} step{meta.steps.length === 1 ? '' : 's'}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              {/*
                Inline expanded panel: this run's own layer controls (view
                toggles, scrubber, layer list) portal into this div - from
                this run's own CaseViewer normally, or from the primary
                run's CaseViewer when this run is an overlay in
                combined-workspace mode (see App.tsx's
                `overlayContainersForPrimary`), never merged into the
                primary's own container either way. Rendered right under
                this run's own row instead of in a separate detached
                section, with a left border in the run's own identity color
                tying it back to the checkbox/dot above. Always mounted
                structurally alongside the row; only whether it's in the DOM
                at all depends on `activeControlsRuns`, which is fine since
                CaseViewer's own mount lifecycle is driven elsewhere
                (App.tsx's `everCheckedRuns`), never by this.
              */}
              {activeControlsRuns.has(run) && (
                <div style={{ ...expandedPanelStyle, borderLeftColor: color }}>
                  <div ref={registerControlsContainer(run)} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        style={toggleAllButtonStyle}
        disabled={visibleRunNames.length === 0}
        onClick={() => onToggleAllRuns(visibleRunNames)}
      >
        Toggle All Runs
      </button>
    </div>
  );
}

const wrapStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  minHeight: 0,
};

// Uses theme tokens only, so it stays legible in both light and dark themes.
// `<input>` doesn't inherit font by default, so `font: 'inherit'` matches it
// to the surrounding text (same fix as App.tsx's `panelToggleButtonStyle`).
const filterInputStyle: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  font: 'inherit',
  padding: '6px 8px',
  borderRadius: 5,
  border: '1px solid var(--tb-border)',
  background: 'var(--tb-surface)',
  color: 'inherit',
};

// No gap here: each run's own group supplies its spacing via
// `runGroupStyle`'s top padding/border, since groups are no longer uniform
// height (a checked run's inline expanded panel makes some much taller).
const runListStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
};

// A top border separates consecutive runs now that a checked run's own
// group can grow much taller than a collapsed one (its inline expanded
// panel), rather than every group being a uniform, easily-scannable height.
const runGroupStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  paddingTop: 10,
  borderTop: '1px solid var(--tb-border)',
};

// `runGroupStyle` for the first run: no top border, since there's no
// previous group above it to separate from.
const runGroupFirstStyle: CSSProperties = {
  ...runGroupStyle,
  paddingTop: 0,
  borderTop: 'none',
};

// No checked/active highlight variant: the checkbox's native appearance and
// the static color dot are enough to show a run's state on their own.
const runHeaderRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '2px 4px',
  borderRadius: 5,
  border: '1px solid transparent',
};

// The run's color as a static, solid-filled dot, matching TensorBoard's Runs
// panel; always the same regardless of the run's checked state.
const runDotStyle: CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: '50%',
  flexShrink: 0,
  display: 'inline-block',
};

// 13px, smaller than the plugin's 15px default, matching TensorBoard's own
// Runs panel where run names run smaller than the rest of the UI.
const runLabelStyle: CSSProperties = {
  flex: 1,
  fontSize: 13,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

// Same as runLabelStyle, but clickable: used when a run has exactly one
// case, so clicking the name selects it for viewing.
const runLabelClickableStyle: CSSProperties = {
  ...runLabelStyle,
  cursor: 'pointer',
};

const caseListStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

// This run's expanded layer-controls panel (view toggles, scrubber, layer
// list), indented under its own row with a left border in the run's own
// identity color - the same "colored border = this run's identity" language
// already used elsewhere (column headers, the 3D view border).
const expandedPanelStyle: CSSProperties = {
  marginLeft: 4,
  paddingLeft: 10,
  borderLeft: '2px solid transparent',
};

// `<button>` doesn't inherit font by default; see `filterInputStyle` above.
const caseButtonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  padding: '6px 8px',
  borderRadius: 5,
  border: '1px solid var(--tb-border)',
  background: 'var(--tb-surface)',
  color: 'inherit',
  font: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
};

const caseButtonSelectedStyle: CSSProperties = {
  ...caseButtonStyle,
  border: '1px solid var(--tb-accent)',
  background: 'var(--tb-accent-soft)',
};

const caseNameStyle: CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const stepCountStyle: CSSProperties = {
  flexShrink: 0,
  opacity: 0.55,
};

// Full-width, matching this plugin's other full-width action buttons.
// `<button>` doesn't inherit font by default; see `filterInputStyle` above.
const toggleAllButtonStyle: CSSProperties = {
  width: '100%',
  font: 'inherit',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  padding: '7px 8px',
  borderRadius: 4,
  border: '1px solid var(--tb-border)',
  background: 'var(--tb-surface)',
  color: 'inherit',
  cursor: 'pointer',
};

const emptyStyle: CSSProperties = {
  padding: '8px 0',
  opacity: 0.55,
};

const errorStyle: CSSProperties = {
  padding: '8px 0',
  color: 'var(--tb-error)',
};
