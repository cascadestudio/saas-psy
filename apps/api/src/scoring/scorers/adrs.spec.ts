import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/adrs/adrs.md` §9.
 * Réponses : 1 = Vrai, 0 = Faux, items 1 à 10 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

/** n réponses « Vrai » sur les premiers items, en évitant l'item 6 si possible. */
function nTrueWithoutItem6(n: number): number[] {
  const order = [0, 1, 2, 3, 4, 6, 7, 8, 9, 5];
  const values = Array(10).fill(0);
  for (let k = 0; k < n; k++) values[order[k]] = 1;
  return values;
}

describe('ADRS scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('adrs', toResponses(values));
  const low = 'Niveau de risque faible';
  const mid = 'Niveau de risque modéré';
  const high = 'Risque important de dépression';

  it.each([
    ['T1 min', 0, low],
    ['T2', 3, low],
    ['T3', 4, mid],
    ['T4', 6, mid],
    ['T5', 7, high],
    ['T6', 9, high],
  ])('%s : %i réponses « Vrai » sans l\'item 6', (_label, n, expected) => {
    const result = score(nTrueWithoutItem6(n as number));
    expect(result.totalScore).toBe(n);
    expect(result.maxScore).toBe(10);
    expect(result.interpretation).toBe(expected);
    expect(result.alerts).toBeUndefined();
  });

  it('T7 max : 10 réponses « Vrai » → 10, risque important, alerte', () => {
    const result = score(Array(10).fill(1));
    expect(result.totalScore).toBe(10);
    expect(result.interpretation).toBe(high);
    expect(result.alerts).toHaveLength(1);
  });

  it('T8 : item 6 seul « Vrai » → 1, risque faible, alerte critique sur l\'item 6', () => {
    const values = Array(10).fill(0);
    values[5] = 1;
    const result = score(values);
    expect(result.totalScore).toBe(1);
    expect(result.interpretation).toBe(low);
    expect(result.alerts).toEqual([
      expect.objectContaining({
        kind: 'suicide-ideation',
        severity: 'critical',
        itemIndex: 5,
      }),
    ]);
  });

  it('porte 10 items, réponses Vrai (1) puis Faux (0)', () => {
    const scale = getScaleById('adrs')!;
    expect(scale.questions).toHaveLength(10);
    expect(scale.answerScales!.intensity).toEqual([
      { value: 1, label: 'Vrai' },
      { value: 0, label: 'Faux' },
    ]);
  });
});
