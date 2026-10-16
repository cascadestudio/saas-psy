import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/pdeq/pdeq.md` §9.
 * Les réponses sont des valeurs Likert 1-5, items 1 à 10 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('PDEQ scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('pdeq', toResponses(values));

  it.each([
    ['T1 min', [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 10, 'Dissociation péritraumatique non significative'],
    ['T2 sous le seuil', [2, 2, 2, 2, 1, 1, 1, 1, 1, 1], 14, 'Dissociation péritraumatique non significative'],
    ['T3 seuil', [2, 2, 2, 2, 2, 1, 1, 1, 1, 1], 15, 'Dissociation péritraumatique significative'],
    ['T4 max', [5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 50, 'Dissociation péritraumatique significative'],
  ])('%s', (_label, values, expectedScore, expectedInterpretation) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(expectedScore);
    expect(result.maxScore).toBe(50);
    expect(result.interpretation).toBe(expectedInterpretation);
  });

  it('porte 10 items et la cotation 1-5 de la fiche Cn2r', () => {
    const scale = getScaleById('pdeq')!;
    expect(scale.questions).toHaveLength(10);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual([
      [1, 'Pas du tout vrai'],
      [2, 'Un peu vrai'],
      [3, 'Plutôt vrai'],
      [4, 'Très vrai'],
      [5, 'Extrêmement vrai'],
    ]);
  });
});
