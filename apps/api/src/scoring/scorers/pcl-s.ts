import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * PCL-S (Weathers et al. 1994 ; VF Yao, Cottraux et al. 2003 ; diffusion INSPQ).
 * 17 items 1-5, somme 17-85, seuil ≥ 44 (population générale).
 * Sous-scores critères DSM-IV B (1-5), C (6-12), D (13-17).
 */
const SUBSCALES: { key: string; label: string; items: number[] }[] = [
  { key: 'critere-b', label: "Critère B — reviviscence (items 1 à 5)", items: [1, 2, 3, 4, 5] },
  { key: 'critere-c', label: "Critère C — évitement et émoussement (items 6 à 12)", items: [6, 7, 8, 9, 10, 11, 12] },
  { key: 'critere-d', label: "Critère D — hyperactivation (items 13 à 17)", items: [13, 14, 15, 16, 17] },
];

export function scorePclS(
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
