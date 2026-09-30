import { useEffect, useRef, useState } from 'react';
import { fetchAllScalarTags, fetchScalars, type ScalarPoint } from './api';
import type { MetricSeries } from './MetricChart';
import type { RunColorEntry } from './runColors';

// Slow fallback cadence; new epochs trigger an immediate refresh via `revision`.
// TensorBoard's scalars route has no "since step" parameter, so each refresh is a full fetch.
const POLL_INTERVAL_MS = 10000;

export interface TagGroup {
  group: string;
  tags: string[];
}

/**
 * Groups tags the way TensorBoard's Scalars dashboard does: split on the
 * first "/", so "loss/train" and "loss/val" both group under "loss". Tags
 * with no "/" form their own group. Preserves first-seen order.
 */
function groupTags(tags: string[]): TagGroup[] {
  const order: string[] = [];
  const byGroup = new Map<string, string[]>();
  for (const tag of tags) {
    const slash = tag.indexOf('/');
    const group = slash === -1 ? tag : tag.slice(0, slash);
    if (!byGroup.has(group)) {
      byGroup.set(group, []);
      order.push(group);
    }
    byGroup.get(group)!.push(tag);
  }
  return order.map((group) => ({ group, tags: byGroup.get(group) ?? [] }));
}

/**
 * Stable key for the current set of checked run names, independent of array
 * identity/order. Used as an effect dependency so discovery/polling only
 * restarts when runs are actually added or removed.
 */
export function runsKeyOf(runs: RunColorEntry[]): string {
  return [...runs.map((r) => r.run)].sort().join('::');
}

function samePoints(a: ScalarPoint[] | undefined, b: ScalarPoint[]): boolean {
  return (
    a !== undefined &&
    a.length === b.length &&
    a.every((p, i) => p.step === b[i].step && p.value === b[i].value && p.wallTime === b[i].wallTime)
  );
}

function sameTags(a: Record<string, string[]>, b: Record<string, string[]>): boolean {
  const keys = Object.keys(b);
  return (
    Object.keys(a).length === keys.length &&
    keys.every((k) => a[k] !== undefined && a[k].join('\n') === b[k].join('\n'))
  );
}

/**
 * States a consumer of `useMetricsData` can render: no runs checked,
 * discovery still loading, a request failed, discovery finished with no
 * tags, or ready with real (possibly still-loading) data.
 */
export type MetricsDataStatus = 'empty-runs' | 'loading' | 'error' | 'no-tags' | 'ready';

export interface UseMetricsDataResult {
  status: MetricsDataStatus;
  /** Non-null only when `status === 'error'`. */
  error: string | null;
  /** Only meaningful when `status === 'ready'`. */
  groups: TagGroup[];
  /** The checked runs (with colors) that report at least one tag, for the legend. */
  legend: RunColorEntry[];
  /** One entry per currently-checked run that reports `tag`, each carrying that run's points for it. */
  seriesForTag: (tag: string) => MetricSeries[];
}

/**
 * Data-fetching/polling core behind `DockedMetrics`. Discovers tags and
 * fetches every (run, tag) series together, on `revision` changes (pass
 * something that changes when a run logs a new step) and on a slow interval.
 */
export function useMetricsData(runs: RunColorEntry[], revision = ''): UseMetricsDataResult {
  // run -> tags that run reports (runs may differ).
  const [tagsByRun, setTagsByRun] = useState<Record<string, string[]>>({});
  // run -> tag -> points.
  const [pointsByRunTag, setPointsByRunTag] = useState<Record<string, Record<string, ScalarPoint[]>>>({});
  const [error, setError] = useState<string | null>(null);

  const runsKey = runsKeyOf(runs);

  const runsRef = useRef<RunColorEntry[]>(runs);
  useEffect(() => {
    runsRef.current = runs;
  });

  // Reset during render when the run set changes, so stale data never flashes.
  const [prevRunsKey, setPrevRunsKey] = useState(runsKey);
  if (runsKey !== prevRunsKey) {
    setPrevRunsKey(runsKey);
    setTagsByRun({});
    setPointsByRunTag({});
    setError(null);
  }

  useEffect(() => {
    if (!runsKey) return;
    let cancelled = false;
    let inFlight = false;

    const refresh = async () => {
      if (inFlight) return;
      inFlight = true;
      try {
        const allTags = await fetchAllScalarTags();
        const nextTags: Record<string, string[]> = {};
        for (const { run } of runsRef.current) nextTags[run] = allTags[run] ?? [];
        const pairs = Object.entries(nextTags).flatMap(([run, tags]) => tags.map((tag) => [run, tag] as const));
        const results = await Promise.all(
          pairs.map(async ([run, tag]) => [run, tag, await fetchScalars(run, tag)] as const),
        );
        if (cancelled) return;
        setTagsByRun((prev) => (sameTags(prev, nextTags) ? prev : nextTags));
        setPointsByRunTag((prev) => {
          let changed = Object.keys(prev).length !== Object.keys(nextTags).length;
          const next: Record<string, Record<string, ScalarPoint[]>> = {};
          for (const [run, tag, points] of results) {
            const old = prev[run]?.[tag];
            next[run] ??= {};
            // Reuse unchanged arrays so charts don't re-render on idle polls.
            if (samePoints(old, points)) next[run][tag] = old!;
            else {
              next[run][tag] = points;
              changed = true;
            }
          }
          for (const run of Object.keys(next)) {
            if (Object.keys(next[run]).length !== Object.keys(prev[run] ?? {}).length) changed = true;
          }
          return changed ? next : prev;
        });
        setError(null);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load scalars.');
      } finally {
        inFlight = false;
      }
    };

    void refresh();
    const interval = window.setInterval(refresh, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [runsKey, revision]);

  const seriesForTag = (tag: string): MetricSeries[] =>
    runs
      .filter(({ run }) => (tagsByRun[run] ?? []).includes(tag))
      .map(({ run, color }) => ({ run, color, points: pointsByRunTag[run]?.[tag] ?? [] }));

  const legend = runs.filter(({ run }) => (tagsByRun[run] ?? []).length > 0);

  if (runs.length === 0) {
    return { status: 'empty-runs', error: null, groups: [], legend, seriesForTag };
  }
  if (error) {
    return { status: 'error', error, groups: [], legend, seriesForTag };
  }

  const allTagsKnown = runs.every(({ run }) => run in tagsByRun);
  if (!allTagsKnown) {
    return { status: 'loading', error: null, groups: [], legend, seriesForTag };
  }

  // Union of every checked run's tags, in first-seen order (runs iterated in sorted order).
  const seenTags = new Set<string>();
  const allTags: string[] = [];
  for (const { run } of runs) {
    for (const tag of tagsByRun[run] ?? []) {
      if (!seenTags.has(tag)) {
        seenTags.add(tag);
        allTags.push(tag);
      }
    }
  }
  if (allTags.length === 0) {
    return { status: 'no-tags', error: null, groups: [], legend, seriesForTag };
  }

  return { status: 'ready', error: null, groups: groupTags(allTags), legend, seriesForTag };
}
