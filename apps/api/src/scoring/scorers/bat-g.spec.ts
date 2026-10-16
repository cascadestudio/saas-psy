import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/bat/bat.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 32 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('BAT scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('bat-g', toResponses(values));

  it.each([
    ["T1 min", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 22, "Zone verte : pas de risque de burn-out (moyenne ≤ 2,58)", [8, 4, 5, 5, 10]],
    ["T2 max", [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 110, "Zone rouge : risque très élevé de burn-out (moyenne ≥ 3,02)", [40, 20, 25, 25, 50]],
    ["T3 haut de la zone verte", [5, 5, 5, 5, 5, 5, 5, 5, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 56, "Zone verte : pas de risque de burn-out (moyenne ≤ 2,58)", [40, 6, 5, 5, 30]],
    ["T4 bas de la zone orange", [5, 5, 5, 5, 5, 5, 5, 5, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 57, "Zone orange : risque de burn-out (moyenne 2,59 à 3,01)", [40, 7, 5, 5, 30]],
    ["T5 haut de la zone orange", [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 66, "Zone orange : risque de burn-out (moyenne 2,59 à 3,01)", [40, 16, 5, 5, 30]],
    ["T6 bas de la zone rouge", [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 67, "Zone rouge : risque très élevé de burn-out (moyenne ≥ 3,02)", [40, 17, 5, 5, 30]],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(110);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 32 items et les réponses de la source', () => {
    const scale = getScaleById('bat-g')!;
    expect(scale.questions).toHaveLength(32);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[1, "Jamais"], [2, "Rarement"], [3, "Parfois"], [4, "Souvent"], [5, "Toujours"]],
    );
  });
});
