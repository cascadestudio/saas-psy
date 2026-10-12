import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * FFMQ (Baer 2008 ; VF Heeren 2011, PDF UCLouvain).
 * 39 items 1-5, 19 inversés ; 5 facettes ; total 39-195 ; pas de seuil.
 */
const REVERSED = new Set([3, 5, 8, 10, 12, 13, 14, 16, 17, 18, 22, 23, 25, 28, 30, 34, 35, 38, 39]); // numéros d'items (1-based)

const SUBSCALES: { key: string; label: string; items: number[] }[] = [
  { key: 'observation', label: "Observation", items: [1, 6, 11, 15, 20, 26, 31, 36] },
  { key: 'description', label: "Description de l'expérience", items: [2, 7, 12, 16, 22, 27, 32, 37] },
  { key: 'action-consciente', label: "Action en pleine conscience", items: [5, 8, 13, 18, 23, 28, 34, 38] },
  { key: 'non-reactivite', label: "Non-réactivité aux évènements privés", items: [4, 9, 19, 21, 24, 29, 33] },
  { key: 'non-jugement', label: "Non-jugement", items: [3, 10, 14, 17, 25, 30, 35, 39] },
];

export function scoreFfmq(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const raw = collectByPrefix(responses, 'intensity_');
  const values = raw.map((v, i) => (v == null ? v : REVERSED.has(i + 1) ? 6 - v : v));
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
