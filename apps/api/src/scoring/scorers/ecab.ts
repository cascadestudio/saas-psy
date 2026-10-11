import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * ECAB (Pélissolo & Naja 1996 ; fiche HAS 2007).
 * 10 items vrai (1) / faux (0) ; item 10 inversé (1 point pour « faux »).
 * Somme 0-10 ; seuil ≥ 6 = en faveur d'une dépendance.
 */
const REVERSED = new Set([10]); // numéros d'items (1-based)

export function scoreEcab(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const raw = collectByPrefix(responses, 'intensity_');
  const values = raw.map((v, i) => (v == null ? v : REVERSED.has(i + 1) ? 1 - v : v));
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
