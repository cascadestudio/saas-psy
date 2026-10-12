import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * CAT-Q (Hull et al. 2018, CC BY 4.0 ; trad. Bessette, Embrace Autism).
 * 25 items 1-7, items 3, 12, 19, 22, 24 inversés ; somme 25-175 ; pas de seuil (les auteurs déconseillent tout score seuil, Hannon et al. 2026).
 * Sous-scores compensation, masquage, assimilation.
 */
const REVERSED = new Set([3, 12, 19, 22, 24]); // numéros d'items (1-based)

const SUBSCALES: { key: string; label: string; items: number[] }[] = [
  { key: 'compensation', label: "Compensation", items: [1, 4, 5, 8, 11, 14, 17, 20, 23] },
  { key: 'masquage', label: "Masquage", items: [2, 6, 9, 12, 15, 18, 21, 24] },
  { key: 'assimilation', label: "Assimilation", items: [3, 7, 10, 13, 16, 19, 22, 25] },
];

export function scoreCatQ(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const raw = collectByPrefix(responses, 'intensity_');
  const values = raw.map((v, i) => (v == null ? v : REVERSED.has(i + 1) ? 8 - v : v));
  const totalScore = values.reduce((s: number, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);
  const subscores: Subscore[] = SUBSCALES.map((sub) => ({
    key: sub.key,
    label: sub.label,
    value: sub.items.reduce((s, item) => s + (values[item - 1] ?? 0), 0),
    max: sub.items.length * 7,
  }));

  return {
    totalScore,
    maxScore: scale.scoring.maxScore,
    interpretation: severity.interpretation,
    severityIndex: severity.severityIndex,
    severityRangeCount: severity.severityRangeCount,
    subscores,
  };
}
