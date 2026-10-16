import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * QPA-30 (Hollon & Kendall 1980, trad. Cottraux) ; 2 sources de psychologues concordantes.
 * 30 items 1-5, somme 30-150, pas de seuil (repères déprimés 95,7 / contrôles 46,24).
 */
export function scoreAtq(
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
