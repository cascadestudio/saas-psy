import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * CAST (Cannabis Abuse Screening Test, OFDT ; Legleye et al. 2007).
 * 6 items Likert 0-4 sur les 12 derniers mois, somme 0-24.
 * Seuils OFDT (Note 2013-02) : < 3 sans risque, 3-6 risque faible,
 * ≥ 7 risque élevé d'usage problématique, voire de dépendance.
 */
export function scoreCast(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'intensity_');
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
