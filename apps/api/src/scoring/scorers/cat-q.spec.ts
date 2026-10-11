import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/cat-q/cat-q.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 25 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('CAT-Q scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('cat-q', toResponses(values));

  it.each([
    ["T1 min (inversés à 7)", [1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 7, 1, 1, 7, 1, 7, 1], 25, "Sous le seuil de 100 indiqué par Embrace Autism", [9, 8, 8]],
    ["T2 max (inversés à 1)", [7, 7, 1, 7, 7, 7, 7, 7, 7, 7, 7, 1, 7, 7, 7, 7, 7, 7, 1, 7, 7, 1, 7, 1, 7], 175, "Score ≥ 100 : camouflage de traits autistiques (seuil indiqué par Embrace Autism)", [63, 56, 56]],
    ["T3 tout à 4", [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], 100, "Score ≥ 100 : camouflage de traits autistiques (seuil indiqué par Embrace Autism)", [36, 32, 32]],
    ["T4 juste sous le seuil (99)", [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], 99, "Sous le seuil de 100 indiqué par Embrace Autism", [35, 32, 32]],
    ["T5 seuil (100)", [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], 100, "Score ≥ 100 : camouflage de traits autistiques (seuil indiqué par Embrace Autism)", [36, 32, 32]],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(175);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 25 items et les réponses de la source', () => {
    const scale = getScaleById('cat-q')!;
    expect(scale.questions).toHaveLength(25);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[1, "Totalement en désaccord"], [2, "Pas d'accord"], [3, "Un peu en désaccord"], [4, "Ni d'accord ni en désaccord"], [5, "Plutôt d'accord"], [6, "D'accord"], [7, "Tout à fait d'accord"]],
    );
  });
});
