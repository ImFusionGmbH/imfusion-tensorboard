import { useEffect, useRef, useState } from 'react';
import { fetchScalars, fetchScalarTags, type ScalarPoint } from './api';
import type { MetricSeries } from './MetricChart';
import type { RunColorEntry } from './runColors';

// Same poll cadence as CaseViewer, so metrics track training live alongside
// the epoch scrubber.
const POLL_INTERVAL_MS = 2000;

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
  /** One entry per currently-checked run that reports `tag`, each carrying that run's points for it. */
  seriesForTag: (tag: string) => MetricSeries[];
}

/**
 * Data-fetching/polling core behind `DockedMetrics`. Discovers all scalar
 * tags for every checked run, then polls every (run, tag) pair together on
 * one shared interval, rather than each chart polling independently.
 */
export function useMetricsData(runs: RunColorEntry[]): UseMetricsDataResult {
  // run -> tags that run reports (discovered independently; runs may differ).
  const [tagsByRun, setTagsByRun] = useState<Record<string, string[]>>({});
  // run -> tag -> points.
  const [pointsByRunTag, setPointsByRunTag] = useState<Record<string, Record<string, ScalarPoint[]>>>({});
  const [error, setError] = useState<string | null>(null);

  const runsKey = runsKeyOf(runs);

  // Mirror latest `runs`/`tagsByRun` into refs so the poll interval doesn't
  // need to be torn down and recreated on every discovery refresh.
  const runsRef = useRef<RunColorEntry[]>(runs);
  const tagsByRunRef = useRef<Record<string, string[]>>({});
  useEffect(() => {
    runsRef.current = runs;
    tagsByRunRef.current = tagsByRun;
  });

  // Reset state synchronously during render (React's "adjusting state when a
  // prop changes" pattern) when the checked-run set changes, so there's no
  // flash of stale data from the previous run set.
  const [prevRunsKey, setPrevRunsKey] = useState(runsKey);
  if (runsKey !== prevRunsKey) {
    setPrevRunsKey(runsKey);
    setTagsByRun({});
    setPointsByRunTag({});
    setError(null);
  }

  // Discover tags whenever the checked-run set changes. Reset happens here
  // (effect time), not in the render-time adjustment above, because mutating
  // a ref during render isn't safe.
  useEffect(() => {
    tagsByRunRef.current = {};
    const currentRuns = runsRef.current;
    if (currentRuns.length === 0) return;
    let cancelled = false;
    Promise.all(
      currentRuns.map(async ({ run }): Promise<[string, string[]]> => [run, await fetchScalarTags(run)]),
    )
      .then((results) => {
        if (cancelled) return;
        const next: Record<string, string[]> = {};
        for (const [run, discovered] of results) next[run] = discovered;
        tagsByRunRef.current = next;
        setTagsByRun(next);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to discover scalar tags.');
      });
    return () => {
      cancelled = true;
    };
  }, [runsKey]);

  // Poll every discovered (run, tag) pair together on one shared interval.
  useEffect(() => {
    const totalTagCount = Object.values(tagsByRun).reduce((n, tags) => n + tags.length, 0);
    if (!runsKey || totalTagCount === 0) return;
    let cancelled = false;

    const poll = async () => {
      try {
        const pairs: Array<[string, string]> = [];
        for (const { run } of runsRef.current) {
          for (const tag of tagsByRunRef.current[run] ?? []) pairs.push([run, tag]);
        }
        const results = await Promise.all(
          pairs.map(
            async ([run, tag]): Promise<[string, string, ScalarPoint[]]> => [run, tag, await fetchScalars(run, tag)],
          ),
        );
        if (cancelled) return;
        const next: Record<string, Record<string, ScalarPoint[]>> = {};
        for (const [run, tag, points] of results) {
          if (!next[run]) next[run] = {};
          next[run][tag] = points;
        }
        setPointsByRunTag(next);
        setError(null);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load scalars.');
      }
    };

    void poll();
    const interval = window.setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [runsKey, tagsByRun]);

  const seriesForTag = (tag: string): MetricSeries[] =>
    runs
      .filter(({ run }) => (tagsByRun[run] ?? []).includes(tag))
      .map(({ run, color }) => ({ run, color, points: pointsByRunTag[run]?.[tag] ?? [] }));

  if (runs.length === 0) {
    return { status: 'empty-runs', error: null, groups: [], seriesForTag };
  }
  if (error) {
    return { status: 'error', error, groups: [], seriesForTag };
  }

  const allTagsKnown = runs.every(({ run }) => run in tagsByRun);
  if (!allTagsKnown) {
    return { status: 'loading', error: null, groups: [], seriesForTag };
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
    return { status: 'no-tags', error: null, groups: [], seriesForTag };
  }

  return { status: 'ready', error: null, groups: groupTags(allTags), seriesForTag };
}
