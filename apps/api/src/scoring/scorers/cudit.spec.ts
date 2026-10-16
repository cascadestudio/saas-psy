import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/cudit-r/cudit-r.md` §9.
 * Les réponses sont des valeurs (points), items 1 à 8 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`option_${i}`, v]));
}

describe('CUDIT-R scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('cudit-r', toResponses(values));
  const low = 'Consommation pouvant être à faible risque';
  const mid = 'Consommation de cannabis pouvant être problématique';
  const high = "Trouble important de l'usage de cannabis possible";

  it.each([
    ['T1 min', [0, 0, 0, 0, 0, 0, 0, 0], 0, low],
    ['T2', [4, 3, 0, 0, 0, 0, 0, 0], 7, low],
    ['T3', [4, 4, 0, 0, 0, 0, 0, 0], 8, mid],
    ['T4', [4, 4, 2, 0, 0, 0, 0, 0], 10, mid],
    ['T5', [4, 4, 3, 0, 0, 0, 0, 0], 11, high],
    ['T6 max', [4, 4, 4, 4, 4, 4, 4, 4], 32, high],
  ])('%s', (_label, values, expectedScore, expectedInterpretation) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(expectedScore);
    expect(result.maxScore).toBe(32);
    expect(result.interpretation).toBe(expectedInterpretation);
  });

  it("porte 8 items, l'item 8 coté 0 / 2 / 4", () => {
    const scale = getScaleById('cudit-r')!;
    expect(scale.questions).toHaveLength(8);
    const item8 = scale.questions[7] as { options: { value: number }[] };
    expect(item8.options.map((o) => o.value)).toEqual([0, 2, 4]);
  });
});
