import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * ÉII / IUS (intolérance à l'incertitude, Freeston et al. 1994).
 * 27 items Likert 1-5, somme simple : 27-135, sans seuil clinique établi.
 * Cotation bifactorielle (source UQO) restituée en sous-scores :
 * - Facteur 1 (15 items) : l'incertitude a des implications négatives sur
 *   la perception de soi et les comportements.
 * - Facteur 2 (12 items) : l'incertitude est injuste et gâche tout.
 * Les indices ci-dessous sont 1-based (numéros d'items du formulaire).
 */
const FACTOR_1_ITEMS = [1, 2, 3, 9, 12, 13, 14, 15, 16, 17, 20, 22, 23, 24, 25];
const FACTOR_2_ITEMS = [4, 5, 6, 7, 8, 10, 11, 18, 19, 21, 26, 27];

function sumItems(values: number[], oneBasedItems: number[]): number {
  return oneBasedItems.reduce((s, item) => s + (values[item - 1] ?? 0), 0);
}

export function scoreEii(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'intensity_');
  const totalScore = values.reduce((s, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);

  const subscores: Subscore[] = [
    {
      key: 'facteur-1',
      label:
        "Facteur 1 — Implications négatives sur la perception de soi et les comportements",
      value: sumItems(values, FACTOR_1_ITEMS),
      max: FACTOR_1_ITEMS.length * 5,
    },
    {
      key: 'facteur-2',
      label: "Facteur 2 — L'incertitude est injuste et gâche tout",
      value: sumItems(values, FACTOR_2_ITEMS),
      max: FACTOR_2_ITEMS.length * 5,
    },
  ];

  return {
    totalScore,
    maxScore: scale.scoring.maxScore,
    interpretation: severity.interpretation,
    severityIndex: severity.severityIndex,
    severityRangeCount: severity.severityRangeCount,
    subscores,
  };
}
