import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/ftnd/ftnd.md` §9.
 * Les réponses sont des valeurs (points), items 1 à 6 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`option_${i}`, v]));
}

describe('FTND scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('ftnd', toResponses(values));

  it.each([
    ['T1 min', [0, 0, 0, 0, 0, 0], 0, 'Pas de dépendance'],
    ['T2 max', [3, 1, 1, 3, 1, 1], 10, 'Dépendance forte ou très forte'],
    ['T3', [2, 0, 0, 0, 0, 0], 2, 'Pas de dépendance'],
    ['T4', [3, 0, 0, 0, 0, 0], 3, 'Dépendance faible'],
    ['T5', [3, 1, 0, 0, 0, 0], 4, 'Dépendance faible'],
    ['T6', [3, 1, 1, 0, 0, 0], 5, 'Dépendance moyenne'],
    ['T7', [3, 1, 1, 1, 0, 0], 6, 'Dépendance moyenne'],
    ['T8', [3, 1, 1, 2, 0, 0], 7, 'Dépendance forte ou très forte'],
    ['T9 typique', [2, 1, 1, 1, 0, 0], 5, 'Dépendance moyenne'],
    ['T10 item 4 seul', [0, 0, 0, 3, 0, 0], 3, 'Dépendance faible'],
    [
      'T11 option a partout',
      [3, 1, 1, 0, 1, 1],
      7,
      'Dépendance forte ou très forte',
    ],
  ])('%s', (_label, values, expectedScore, expectedInterpretation) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(expectedScore);
    expect(result.maxScore).toBe(10);
    expect(result.interpretation).toBe(expectedInterpretation);
  });

  it("affiche les options dans l'ordre du PDF HAS (§5), pas trié par valeur", () => {
    const scale = getScaleById('ftnd')!;
    const valuesInDisplayOrder = scale.questions.map((q: any) =>
      q.options.map((o: { value: number }) => o.value),
    );
    expect(valuesInDisplayOrder).toEqual([
      [3, 2, 1, 0],
      [1, 0],
      [1, 0],
      [0, 1, 2, 3],
      [1, 0],
      [1, 0],
    ]);
  });
});
