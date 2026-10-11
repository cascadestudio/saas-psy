import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/cast/cast.md` §9.
 * Les réponses sont des valeurs 0-4, items 1 à 6 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('CAST scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('cast', toResponses(values));
  const none = 'Usage sans risque';
  const low = 'Risque faible';
  const high = "Risque élevé d'usage problématique, voire de dépendance";

  it.each([
    ['T1 min', [0, 0, 0, 0, 0, 0], 0, none],
    ['T2 haut de la 1re tranche', [1, 1, 0, 0, 0, 0], 2, none],
    ['T3 seuil 3', [1, 1, 1, 0, 0, 0], 3, low],
    ['T4 haut de la 2e tranche', [2, 2, 1, 1, 0, 0], 6, low],
    ['T5 seuil 7', [2, 2, 1, 1, 1, 0], 7, high],
    ['T6 max', [4, 4, 4, 4, 4, 4], 24, high],
  ])('%s', (_label, values, expectedScore, expectedInterpretation) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(expectedScore);
    expect(result.maxScore).toBe(24);
    expect(result.interpretation).toBe(expectedInterpretation);
  });

  it("porte 6 items et la cotation 0-4 de l'OFDT", () => {
    const scale = getScaleById('cast')!;
    expect(scale.questions).toHaveLength(6);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual([
      [0, 'Jamais'],
      [1, 'Rarement'],
      [2, 'De temps en temps'],
      [3, 'Assez souvent'],
      [4, 'Très souvent'],
    ]);
  });
});
