import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * Échelle brève d'évaluation du stress (Cungi), 11 items 1-6, somme 11-66.
 * Bandes 11-19 / 20-30 / 31-45 / 46-66 (bornes de la source chevauchantes, tranchées par Melya).
 */
export function scoreCst(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const raw = collectByPrefix(responses, 'intensity_');
  const values = raw;
  const totalScore = values.reduce((s: number, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);

  return {
    totalScore,
    maxScore: scale.scoring.maxScore,
    interpretation: severity.interpretation,
    severityIndex: severity.severityIndex,
    severityRangeCount: severity.severityRangeCount,
  };
}
