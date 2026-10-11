import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/honc/honc.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 10 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('HONC scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('honc', toResponses(values));

  it.each([
    ["T1 min", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0, "Pas de perte d'autonomie mise en évidence (aucune réponse positive)", null],
    ["T2 une réponse positive", [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 1, "Perte d'autonomie liée à la consommation de tabac", null],
    ["T3 six", [1, 1, 1, 1, 1, 1, 0, 0, 0, 0], 6, "Perte d'autonomie liée à la consommation de tabac", null],
    ["T4 seuil 7", [1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 7, "Forte dépendance à la nicotine (score ≥ 7)", null],
    ["T5 max", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 10, "Forte dépendance à la nicotine (score ≥ 7)", null],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(10);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 10 items et les réponses de la source', () => {
    const scale = getScaleById('honc')!;
    expect(scale.questions).toHaveLength(10);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[1, "Oui"], [0, "Non"]],
    );
  });
});
