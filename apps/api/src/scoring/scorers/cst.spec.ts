import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/cst/cst.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 11 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('CST scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('cst', toResponses(values));

  it.each([
    ["T1 min", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 11, "Niveau de stress très bas", null],
    ["T2 18", [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1], 18, "Niveau de stress très bas", null],
    ["T3 19", [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1], 19, "Niveau de stress bas", null],
    ["T4 29", [3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2], 29, "Niveau de stress bas", null],
    ["T5 30", [3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2], 30, "Niveau de stress élevé", null],
    ["T6 45", [4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4], 45, "Niveau de stress élevé", null],
    ["T7 46", [4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4], 46, "Niveau de stress très élevé", null],
    ["T8 max", [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], 66, "Niveau de stress très élevé", null],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(66);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 11 items et les réponses de la source', () => {
    const scale = getScaleById('cst')!;
    expect(scale.questions).toHaveLength(11);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[1, "Pas du tout"], [2, "Faiblement"], [3, "Un peu"], [4, "Assez"], [5, "Beaucoup"], [6, "Extrêmement"]],
    );
  });
});
