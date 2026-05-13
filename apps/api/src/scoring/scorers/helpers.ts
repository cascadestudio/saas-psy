import { Scale } from '@melya/core';

export function resolveSeverity(scale: Scale, totalScore: number) {
  const ranges = scale.scoring.ranges;
  const severityIndex = ranges.findIndex(
    (r) => totalScore >= r.min && totalScore <= r.max,
  );
  const interpretation =
    severityIndex >= 0 ? ranges[severityIndex].interpretation : '';
  return {
    severityIndex,
    interpretation,
    severityRangeCount: ranges.length,
  };
}

/**
 * Reads response keys with the given prefix (e.g. "intensity_", "option_",
 * "anxiety_", "avoidance_") and returns a dense array indexed by item.
 */
export function collectByPrefix(
  responses: Record<string, unknown>,
  prefix: string,
): number[] {
  const values: number[] = [];
  for (const [key, value] of Object.entries(responses)) {
    if (!key.startsWith(prefix)) continue;
    const idx = parseInt(key.slice(prefix.length), 10);
    if (Number.isNaN(idx)) continue;
    values[idx] = Number(value) || 0;
  }
  return values;
}

export function sumRange(values: number[], start: number, endInclusive: number): number {
  let total = 0;
  for (let i = start; i <= endInclusive; i++) {
    total += values[i] ?? 0;
  }
  return total;
}

export function countEndorsed(
  values: number[],
  start: number,
  endInclusive: number,
  threshold = 2,
): number {
  let count = 0;
  for (let i = start; i <= endInclusive; i++) {
    if ((values[i] ?? 0) >= threshold) count++;
  }
  return count;
}
