import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/bat/bat.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 33 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('BAT scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('bat-w', toResponses(values));

  it.each([
    ["T1 min", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 23, "Zone verte : pas de risque de burn-out (moyenne ≤ 2,58)", [8, 5, 5, 5, 10]],
    ["T2 max", [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 115, "Zone rouge : risque très élevé de burn-out (moyenne ≥ 3,02)", [40, 25, 25, 25, 50]],
    ["T3 haut de la zone verte", [5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 59, "Zone verte : pas de risque de burn-out (moyenne ≤ 2,58)", [40, 9, 5, 5, 30]],
    ["T4 bas de la zone orange", [5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 60, "Zone orange : risque de burn-out (moyenne 2,59 à 3,01)", [40, 10, 5, 5, 30]],
    ["T5 haut de la zone orange", [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 69, "Zone orange : risque de burn-out (moyenne 2,59 à 3,01)", [40, 19, 5, 5, 30]],
    ["T6 bas de la zone rouge", [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 70, "Zone rouge : risque très élevé de burn-out (moyenne ≥ 3,02)", [40, 20, 5, 5, 30]],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(115);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 33 items et les réponses de la source', () => {
    const scale = getScaleById('bat-w')!;
    expect(scale.questions).toHaveLength(33);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[1, "Jamais"], [2, "Rarement"], [3, "Parfois"], [4, "Souvent"], [5, "Toujours"]],
    );
  });
});
