import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/cries-13/cries-13.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 13 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('CRIES-13 scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('cries-13', toResponses(values));

  it.each([
    ["T1 min", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0, "Sous le seuil de dépistage du TSPT (score < 30)", [0, 0, 0]],
    ["T2 juste sous le seuil", [5, 5, 5, 5, 5, 3, 1, 0, 0, 0, 0, 0, 0], 29, "Sous le seuil de dépistage du TSPT (score < 30)", [10, 9, 10]],
    ["T3 seuil", [5, 5, 5, 5, 5, 3, 1, 1, 0, 0, 0, 0, 0], 30, "Dépistage positif de TSPT (score ≥ 30)", [11, 9, 10]],
    ["T4 max", [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 65, "Dépistage positif de TSPT (score ≥ 30)", [20, 20, 25]],
    ["T5 une valeur par sous-échelle", [5, 1, 0, 5, 0, 1, 1, 5, 5, 1, 0, 0, 0], 24, "Sous le seuil de dépistage du TSPT (score < 30)", [20, 4, 0]],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(65);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 13 items et les réponses de la source', () => {
    const scale = getScaleById('cries-13')!;
    expect(scale.questions).toHaveLength(13);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[0, "Pas du tout"], [1, "Rarement"], [3, "Quelques fois"], [5, "Souvent"]],
    );
  });
});
