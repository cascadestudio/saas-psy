import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/ders/ders.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 36 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('DERS scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('ders', toResponses(values));

  it.each([
    ["T1 min (inversés à 5)", [5, 5, 1, 1, 1, 5, 5, 5, 1, 5, 1, 1, 1, 1, 1, 1, 5, 1, 1, 5, 1, 5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1], 36, "Pas de seuil clinique fourni par les auteurs.", [6, 5, 6, 6, 8, 5]],
    ["T2 max (inversés à 1)", [1, 1, 5, 5, 5, 1, 1, 1, 5, 1, 5, 5, 5, 5, 5, 5, 1, 5, 5, 1, 5, 1, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5], 180, "Pas de seuil clinique fourni par les auteurs.", [30, 25, 30, 30, 40, 25]],
    ["T3 tout à 1", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 80, "Pas de seuil clinique fourni par les auteurs.", [6, 9, 10, 30, 12, 13]],
    ["T4 tout à 3", [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 108, "Pas de seuil clinique fourni par les auteurs.", [18, 15, 18, 18, 24, 15]],
    ["T5 mixte", [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1], 110, "Pas de seuil clinique fourni par les auteurs.", [16, 11, 17, 19, 25, 22]],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(180);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 36 items et les réponses de la source', () => {
    const scale = getScaleById('ders')!;
    expect(scale.questions).toHaveLength(36);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[1, "Presque jamais"], [2, "Quelques fois"], [3, "La moitié du temps"], [4, "La plupart du temps"], [5, "Presque toujours"]],
    );
  });
});
