import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/qec/qec.md` §9.
 * Réponses : valeurs 1 à 5, items 1 à 25 dans l'ordre.
 * Sous-scores dans l'ordre : substitution, transformation des images,
 * distraction, évitement des stimuli, suppression.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('QEC scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('qec', toResponses(values));
  const noThreshold = 'Pas de seuil clinique fourni par les auteurs.';

  it.each([
    ['T1 min', Array(25).fill(1), 25, [5, 5, 5, 5, 5]],
    ['T2 max', Array(25).fill(5), 125, [25, 25, 25, 25, 25]],
    [
      'T3 typique',
      [3, 2, 4, 1, 5, 2, 3, 4, 2, 3, 1, 5, 4, 2, 3, 1, 2, 4, 3, 2, 5, 1, 3, 4, 2],
      71,
      [8, 17, 21, 11, 14],
    ],
    [
      'T4 une valeur par sous-échelle (R1)',
      [1, 1, 4, 5, 1, 1, 2, 3, 2, 3, 5, 3, 3, 1, 4, 2, 5, 2, 4, 5, 3, 2, 4, 4, 5],
      75,
      [25, 20, 15, 10, 5],
    ],
  ])('%s', (_label, values, expectedTotal, expectedSubscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(expectedTotal);
    expect(result.maxScore).toBe(125);
    expect(result.interpretation).toBe(noThreshold);
    expect(result.subscores?.map((s) => s.value)).toEqual(expectedSubscores);
    expect(result.subscores?.map((s) => s.max)).toEqual([25, 25, 25, 25, 25]);
  });

  it("porte 25 items, réponses 1 à 5 dans l'ordre de la source", () => {
    const scale = getScaleById('qec')!;
    expect(scale.questions).toHaveLength(25);
    expect(scale.answerScales!.intensity.map((o) => o.label)).toEqual([
      'Pas du tout correspondant',
      'Un peu correspondant',
      'Assez correspondant',
      'Très correspondant',
      'Tout à fait correspondant',
    ]);
  });
});
