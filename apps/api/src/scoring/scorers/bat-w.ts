import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * BAT, version travail (Schaufeli, De Witte & Desart ; VF France).
 * Total = somme des 23 items primaires (équivalent de la moyenne du manuel) ; secondaires en sous-score, hors total.
 * Zones : verte, orange, rouge (seuils cliniques flamands convertis en sommes).
 */
const SUBSCALES: { key: string; label: string; items: number[] }[] = [
  { key: 'epuisement', label: "Épuisement", items: [1, 2, 3, 4, 5, 6, 7, 8] },
  { key: 'distance-mentale', label: "Distance mentale", items: [9, 10, 11, 12, 13] },
  { key: 'deficience-cognitive', label: "Déficience cognitive", items: [14, 15, 16, 17, 18] },
  { key: 'deficience-emotionnelle', label: "Déficience émotionnelle", items: [19, 20, 21, 22, 23] },
  { key: 'symptomes-secondaires', label: "Symptômes secondaires (plaintes psychiques et psychosomatiques)", items: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33] },
];

export function scoreBatW(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const raw = collectByPrefix(responses, 'intensity_');
  const values = raw;
  const TOTAL_ITEMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const totalScore = TOTAL_ITEMS.reduce((s, item) => s + (values[item - 1] ?? 0), 0);
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
