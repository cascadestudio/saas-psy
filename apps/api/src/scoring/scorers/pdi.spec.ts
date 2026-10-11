import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/pdi/pdi.md` §9.
 * Les réponses sont des valeurs Likert 0-4, items 1 à 13 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('PDI scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('pdi', toResponses(values));
  const low = 'Détresse péritraumatique non significative';
  const high = 'Détresse péritraumatique significative';

  it.each([
    ['T1 min', Array(13).fill(0), 0, low],
    ['T2 sous le seuil', [2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0], 14, low],
    ['T3 seuil', [2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0], 15, high],
    ['T4 max', Array(13).fill(4), 52, high],
  ])('%s', (_label, values, expectedScore, expectedInterpretation) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(expectedScore);
    expect(result.maxScore).toBe(52);
    expect(result.interpretation).toBe(expectedInterpretation);
  });

  it('porte 13 items et la cotation 0-4 de la fiche Cn2r', () => {
    const scale = getScaleById('pdi')!;
    expect(scale.questions).toHaveLength(13);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual([
      [0, 'Pas du tout vrai'],
      [1, 'Un peu vrai'],
      [2, 'Plutôt vrai'],
      [3, 'Très vrai'],
      [4, 'Extrêmement vrai'],
    ]);
  });
});
