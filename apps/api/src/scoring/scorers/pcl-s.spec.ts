import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/pcl-s/pcl-s.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 17 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('PCL-S scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('pcl-s', toResponses(values));

  it.each([
    ["T1 min", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 17, "Sous le seuil de dépistage du TSPT (score < 44)", [5, 7, 5]],
    ["T2 sous le seuil (43)", [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1], 43, "Sous le seuil de dépistage du TSPT (score < 44)", [15, 19, 9]],
    ["T3 seuil (44)", [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2], 44, "Dépistage positif de TSPT (score ≥ 44)", [15, 19, 10]],
    ["T4 max", [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 85, "Dépistage positif de TSPT (score ≥ 44)", [25, 35, 25]],
    ["T5 sous-échelles distinctes", [5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3], 47, "Dépistage positif de TSPT (score ≥ 44)", [25, 7, 15]],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(85);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 17 items et les réponses de la source', () => {
    const scale = getScaleById('pcl-s')!;
    expect(scale.questions).toHaveLength(17);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[1, "Pas du tout"], [2, "Un peu"], [3, "Parfois"], [4, "Souvent"], [5, "Très souvent"]],
    );
  });
});
