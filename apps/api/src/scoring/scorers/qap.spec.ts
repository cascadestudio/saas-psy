import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/qap/qap.md` §9.
 * Réponses : valeurs 1 à 5, items 1 à 12 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('QAP scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('qap', toResponses(values));
  const noThreshold = 'Pas de seuil clinique fourni par les auteurs.';

  it.each([
    ['T1 min', Array(12).fill(1), 12],
    ['T2 max', Array(12).fill(5), 60],
    ['T3 typique', [2, 3, 4, 1, 5, 2, 3, 4, 2, 3, 1, 5], 35],
  ])('%s', (_label, values, expected) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(expected);
    expect(result.maxScore).toBe(60);
    expect(result.interpretation).toBe(noThreshold);
    expect(result.subscores).toBeUndefined();
  });

  it("porte 12 items, réponses 1 à 5 dans l'ordre de la source", () => {
    const scale = getScaleById('qap')!;
    expect(scale.questions).toHaveLength(12);
    expect(scale.answerScales!.intensity.map((o) => o.label)).toEqual([
      'Pas du tout correspondant',
      'Un peu correspondant',
      'Assez correspondant',
      'Très correspondant',
      'Extrêmement correspondant',
    ]);
  });
});
