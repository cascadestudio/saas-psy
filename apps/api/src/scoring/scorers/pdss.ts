import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * PDSS-SR (Shear 1997 / Houck 2002, version française MSSS Québec 2019).
 * 7 items en `formType: "options"`, cotés 0-4. Somme simple : 0-28.
 * Seuil de diagnostic probable ≥ 9 (Roberge et al., 2022) porté dans
 * `scale.scoring.ranges`.
 */
export function scorePdss(
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
