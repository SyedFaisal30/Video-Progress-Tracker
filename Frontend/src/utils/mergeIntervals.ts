import { Interval } from "../types/types"

export const mergeIntervals = (intervals: Interval[]): Interval[] => {
  const sorted = [...intervals].sort((a, b) => a.start - b.start)
  const merged: Interval[] = []

  for (const i of sorted) {
    const last = merged[merged.length - 1]
    if (last && i.start <= last.end) {
      last.end = Math.max(last.end, i.end)
    } else {
      merged.push({ ...i })
    }
  }

  return merged
}
