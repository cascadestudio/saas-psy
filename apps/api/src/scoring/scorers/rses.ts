import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * Rosenberg Self-Esteem Scale: items are 1-based in the catalogue's
 * `reverseItems` (3, 5, 8, 9, 10). We invert on a Likert 1-4 (1↔4, 2↔3) before
 * summing all 10 items. Final score range: 10-40, higher = better.
 */
export function scoreRses(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'intensity_');
  const reverseIndices = new Set(
    (scale.reverseItems ?? []).map((i) => i - 1),
  );

  const adjusted = values.map((v, i) =>
    reverseIndices.has(i) ? 5 - (v ?? 0) : v ?? 0,
  );
  const totalScore = adjusted.reduce((s, v) => s + v, 0);
  const severity = resolveSeverity(scale, totalScore);

  return {
    totalScore,
    maxScore: scale.scoring.maxScore,
    interpretation: severity.interpretation,
    severityIndex: severity.severityIndex,
    severityRangeCount: severity.severityRangeCount,
  };
}
