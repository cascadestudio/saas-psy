import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * FTND (test de Fagerström en six questions, Heatherton 1991 / HAS 2014).
 * 6 items en `formType: "options"` : items 1 et 4 cotés 0-3, items 2, 3, 5
 * et 6 cotés 0-1. Somme simple : 0-10. Seuils HAS portés dans
 * `scale.scoring.ranges`.
 */
export function scoreFtnd(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'option_');
  const totalScore = values.reduce((s, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);

  return {
    totalScore,
    maxScore: scale.scoring.maxScore,
    interpretation: severity.interpretation,
    severityIndex: severity.severityIndex,
    severityRangeCount: severity.severityRangeCount,
  };
}
