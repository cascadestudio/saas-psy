import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * CRIES-13 (Smith et al. 2003, Children and War Foundation ; fiche Cn2r).
 * 13 items cotés 0/1/3/5, somme 0-65 ; seuil ≥ 30 = dépistage positif de TSPT.
 * Sous-scores : intrusion 1,4,8,9 ; évitement 2,6,7,10 ; hyperréactivité 3,5,11,12,13.
 */
const SUBSCALES: { key: string; label: string; items: number[] }[] = [
  { key: 'intrusion', label: "Intrusion", items: [1, 4, 8, 9] },
  { key: 'evitement', label: "Évitement", items: [2, 6, 7, 10] },
  { key: 'hyperreactivite', label: "Hyperréactivité", items: [3, 5, 11, 12, 13] },
];

export function scoreCries13(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const raw = collectByPrefix(responses, 'intensity_');
  const values = raw;
  const totalScore = values.reduce((s: number, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);
  const subscores: Subscore[] = SUBSCALES.map((sub) => ({
    key: sub.key,
    label: sub.label,
    value: sub.items.reduce((s, item) => s + (values[item - 1] ?? 0), 0),
    max: sub.items.length * 5,
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
