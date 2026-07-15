import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * Questionnaire sur les inquiétudes du Penn State (QIPS / PSWQ).
 * Items 1, 3, 8, 10, 11 (1-based in the catalogue's `reverseItems`) are
 * reverse-worded and inverted on a Likert 1-5 (1↔5, 2↔4) before summing all
 * 16 items. Final score range: 16-80, higher = more worry-prone.
 */
export function scoreQips(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'intensity_');
  const reverseIndices = new Set((scale.reverseItems ?? []).map((i) => i - 1));

  const adjusted = values.map((v, i) =>
    reverseIndices.has(i) ? 6 - (v ?? 0) : v ?? 0,
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
