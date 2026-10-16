import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/qcs-tag/qcs-tag.md` §9.
 * Réponses : valeurs 1 à 5, items 1 à 10 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('QCS-TAG scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('qcs-tag', toResponses(values));
  const noThreshold = 'Pas de seuil clinique fourni par les auteurs.';

  it.each([
    ['T1 min', Array(10).fill(1), 10],
    ['T2 max', Array(10).fill(5), 50],
    ['T3 typique', [2, 3, 4, 1, 5, 2, 3, 4, 2, 3], 29],
  ])('%s', (_label, values, expected) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(expected);
    expect(result.maxScore).toBe(50);
    expect(result.interpretation).toBe(noThreshold);
  });

  it("porte 10 items, réponses 1 à 5 dans l'ordre de la source", () => {
    const scale = getScaleById('qcs-tag')!;
    expect(scale.questions).toHaveLength(10);
    expect(scale.answerScales!.intensity!.map((o) => o.label)).toEqual([
      'Pas du tout typique de moi',
      'Un peu typique de moi',
      'Modérément typique de moi',
      'Plutôt typique de moi',
      'Extrêmement typique de moi',
    ]);
  });
});
