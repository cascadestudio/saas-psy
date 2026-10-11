import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * HONC (Hooked on Nicotine Checklist, DiFranza et al. 2002 ; VF La Revue du Praticien).
 * 10 items oui (1) / non (0), somme 0-10.
 * 0 : pas de perte d'autonomie ; ≥ 1 : perte d'autonomie ; ≥ 7 : forte dépendance.
 */
export function scoreHonc(
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
