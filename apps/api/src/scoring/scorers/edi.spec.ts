import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/edi/edi.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 34 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('EDI scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('edi', toResponses(values));

  it.each([
    ["T1 min", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 34, "Pas de seuil clinique fourni par les auteurs.", [17, 17]],
    ["T2 max", [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 170, "Pas de seuil clinique fourni par les auteurs.", [85, 85]],
    ["T3 tout à 3", [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 102, "Pas de seuil clinique fourni par les auteurs.", [51, 51]],
    ["T4 mixte", [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4], 100, "Pas de seuil clinique fourni par les auteurs.", [52, 48]],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(170);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 34 items et les réponses de la source', () => {
    const scale = getScaleById('edi')!;
    expect(scale.questions).toHaveLength(34);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[1, "Ne correspond pas du tout"], [2, "Correspond faiblement"], [3, "Correspond moyennement"], [4, "Correspond assez fortement"], [5, "Correspond exactement"]],
    );
  });
});
