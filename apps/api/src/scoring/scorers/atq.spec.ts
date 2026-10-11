import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/atq/atq.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 30 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('QPA-30 scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('atq', toResponses(values));

  it.each([
    ["T1 min", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 30, "Pas de seuil clinique fourni par les auteurs.", null],
    ["T2 max", [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 150, "Pas de seuil clinique fourni par les auteurs.", null],
    ["T3 tout à 3", [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 90, "Pas de seuil clinique fourni par les auteurs.", null],
    ["T4 mixte", [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5], 90, "Pas de seuil clinique fourni par les auteurs.", null],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(150);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 30 items et les réponses de la source', () => {
    const scale = getScaleById('atq')!;
    expect(scale.questions).toHaveLength(30);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[1, "Pas du tout"], [2, "Parfois"], [3, "Assez souvent"], [4, "Souvent"], [5, "Tout le temps"]],
    );
  });
});
