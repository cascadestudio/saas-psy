import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * SCARED, version de l'enfant (Birmaher et al., University of Pittsburgh ; VF fr-CA).
 * 41 items 0-2, somme 0-82 ; ≥ 25 peut indiquer un trouble anxieux, > 30 plus spécifique.
 * Cinq sous-scores ; leurs seuils (7, 9, 5, 8, 3) figurent dans les libellés faute d'interprétation par sous-échelle.
 */
const SUBSCALES: { key: string; label: string; items: number[] }[] = [
  { key: 'panique-somatique', label: "Trouble panique ou symptômes somatiques (seuil 7)", items: [1, 6, 9, 12, 15, 18, 19, 22, 24, 27, 30, 34, 38] },
  { key: 'anxiete-generalisee', label: "Anxiété généralisée (seuil 9)", items: [5, 7, 14, 21, 23, 28, 33, 35, 37] },
  { key: 'anxiete-separation', label: "Anxiété de séparation (seuil 5)", items: [4, 8, 13, 16, 20, 25, 29, 31] },
  { key: 'phobie-sociale', label: "Phobie sociale (seuil 8)", items: [3, 10, 26, 32, 39, 40, 41] },
  { key: 'refus-scolaire', label: "Refus scolaire anxieux (seuil 3)", items: [2, 11, 17, 36] },
];

export function scoreScared(
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
    max: sub.items.length * 2,
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
