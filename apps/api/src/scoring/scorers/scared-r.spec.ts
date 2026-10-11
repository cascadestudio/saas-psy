import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/scared-r/scared-r.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 51 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('SCARED-R-51 scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('scared-r', toResponses(values));

  it.each([
    ["T1 min", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0, "Pas de seuil clinique fourni par les auteurs.", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    ["T2 max", [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 102, "Pas de seuil clinique fourni par les auteurs.", [14, 14, 14, 8, 10, 8, 8, 6, 10, 10]],
    ["T3 un item par sous-échelle", [1, 1, 1, 2, 2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 15, "Pas de seuil clinique fourni par les auteurs.", [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]],
    ["T4 typique", [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2], 51, "Pas de seuil clinique fourni par les auteurs.", [10, 8, 6, 3, 4, 4, 3, 3, 4, 6]],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(102);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 51 items et les réponses de la source', () => {
    const scale = getScaleById('scared-r')!;
    expect(scale.questions).toHaveLength(51);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[0, "Jamais ou presque jamais"], [1, "Quelques fois"], [2, "Souvent"]],
    );
  });
});
