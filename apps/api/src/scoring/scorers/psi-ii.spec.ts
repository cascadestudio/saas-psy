import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/ww-ii/psi-ii.md` §9.
 * Les réponses sont des valeurs 1 à 5, items 1 à 25 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

/** Toutes les réponses à 1, sauf les items (1-based) donnés, mis à 5. */
function withItemsAt5(items: number[]): number[] {
  const values = Array(25).fill(1);
  for (const item of items) values[item - 1] = 5;
  return values;
}

describe('PSI-II scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('psi-ii', toResponses(values));
  const subscoresOf = (values: number[]) =>
    Object.fromEntries(
      (score(values).subscores ?? []).map((s) => [s.key, s.value]),
    );
  const noThreshold = 'Pas de seuil clinique fourni par les auteurs.';

  it.each([
    ['T1 min', Array(25).fill(1), 25, [5, 5, 5, 5, 5]],
    ['T2 max', Array(25).fill(5), 125, [25, 25, 25, 25, 25]],
    [
      'T3 typique',
      [2, 3, 4, 3, 4, 1, 2, 3, 4, 2, 1, 2, 3, 4, 3, 3, 1, 2, 3, 1, 4, 2, 3, 1, 2],
      63,
      [20, 14, 14, 5, 10],
    ],
  ])('%s', (_label, values, expectedTotal, expectedSubscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(expectedTotal);
    expect(result.maxScore).toBe(125);
    expect(result.interpretation).toBe(noThreshold);
    expect(result.subscores?.map((s) => s.value)).toEqual(expectedSubscores);
    expect(result.subscores?.map((s) => s.max)).toEqual([25, 25, 25, 25, 25]);
  });

  it.each([
    ['T4', 'resolution-problemes', [3, 5, 9, 14, 21]],
    ['T5', 'motivation', [8, 15, 16, 18, 19]],
    ['T6', 'protection-emotions', [2, 4, 13, 22, 23]],
    ['T7', 'prevention-evenements', [6, 11, 17, 20, 24]],
    ['T8', 'trait-personnalite', [1, 7, 10, 12, 25]],
  ])('%s sous-échelle %s seule à 5', (_label, key, items) => {
    const values = withItemsAt5(items as number[]);
    expect(score(values).totalScore).toBe(45);
    const subscores = subscoresOf(values);
    for (const [k, v] of Object.entries(subscores)) {
      expect(v).toBe(k === key ? 25 : 5);
    }
  });

  it('T9 item 13 seul à 5 → sous-échelle « émotions difficiles » = 9', () => {
    const values = withItemsAt5([13]);
    expect(score(values).totalScore).toBe(29);
    expect(subscoresOf(values)['protection-emotions']).toBe(9);
  });

  it('porte 25 items, réponses 1 à 5 dans l\'ordre de la source', () => {
    const scale = getScaleById('psi-ii')!;
    expect(scale.questions).toHaveLength(25);
    expect(scale.answerScales!.intensity.map((o) => o.label)).toEqual([
      'Pas du tout vrai',
      'Un peu vrai',
      'Assez vrai',
      'Très vrai',
      'Tout à fait',
    ]);
  });
});
