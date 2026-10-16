import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/ffmq/ffmq.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 39 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('FFMQ scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('ffmq', toResponses(values));

  it.each([
    ["T1 min (inversés à 5)", [1, 1, 5, 1, 5, 1, 1, 5, 1, 5, 1, 5, 5, 5, 1, 5, 5, 5, 1, 1, 1, 5, 5, 1, 5, 1, 1, 5, 1, 5, 1, 1, 1, 5, 5, 1, 1, 5, 5], 39, "Pas de seuil clinique fourni par les auteurs.", [8, 8, 8, 7, 8]],
    ["T2 max (inversés à 1)", [5, 5, 1, 5, 1, 5, 5, 1, 5, 1, 5, 1, 1, 1, 5, 1, 1, 1, 5, 5, 5, 1, 1, 5, 1, 5, 5, 1, 5, 1, 5, 5, 5, 1, 1, 5, 5, 1, 1], 195, "Pas de seuil clinique fourni par les auteurs.", [40, 40, 40, 35, 40]],
    ["T3 tout à 3", [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 117, "Pas de seuil clinique fourni par les auteurs.", [24, 24, 24, 21, 24]],
    ["T4 mixte", [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4], 99, "Pas de seuil clinique fourni par les auteurs.", [16, 23, 21, 24, 15]],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(195);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 39 items et les réponses de la source', () => {
    const scale = getScaleById('ffmq')!;
    expect(scale.questions).toHaveLength(39);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[1, "Jamais ou très rarement vrai"], [2, "Rarement vrai"], [3, "Parfois vrai"], [4, "Souvent vrai"], [5, "Très souvent ou toujours vrai"]],
    );
  });
});
