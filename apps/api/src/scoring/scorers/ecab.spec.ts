import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/ecab/ecab.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 10 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('ECAB scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('ecab', toResponses(values));

  it.each([
    ["T1 min (tout faux sauf item 10 vrai)", [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 0, "Sous le seuil de dépendance (score < 6)", null],
    ["T2 tout faux", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1, "Sous le seuil de dépendance (score < 6)", null],
    ["T3 juste sous le seuil", [1, 1, 1, 1, 1, 0, 0, 0, 0, 1], 5, "Sous le seuil de dépendance (score < 6)", null],
    ["T4 seuil", [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], 6, "Score en faveur d'une dépendance aux benzodiazépines (score ≥ 6)", null],
    ["T5 max (tout vrai sauf item 10 faux)", [1, 1, 1, 1, 1, 1, 1, 1, 1, 0], 10, "Score en faveur d'une dépendance aux benzodiazépines (score ≥ 6)", null],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(10);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 10 items et les réponses de la source', () => {
    const scale = getScaleById('ecab')!;
    expect(scale.questions).toHaveLength(10);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[1, "Vrai"], [0, "Faux"]],
    );
  });
});
