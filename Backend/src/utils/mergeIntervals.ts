import { Interval } from '../models/progress'

export const mergeIntervals = (intervals: Interval[]): Interval[] => {
  const sorted = intervals.sort((a, b) => a.start - b.start)
  const merged: Interval[] = []

  for (const interval of sorted) {
    const last = merged[merged.length - 1]
    if (last && interval.start <= last.end) {
      last.end = Math.max(last.end, interval.end)
    } else {
      merged.push({ ...interval })
    }
  }

  return merged
}
