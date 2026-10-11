import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/scared/scared.md` §9.
 * Réponses : valeurs brutes saisies par le patient, items 1 à 41 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('SCARED scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('scared', toResponses(values));

  it.each([
    ["T1 min", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0, "Sous le seuil de dépistage (score < 25)", [0, 0, 0, 0, 0]],
    ["T2 24", [2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0], 24, "Sous le seuil de dépistage (score < 25)", [24, 0, 0, 0, 0]],
    ["T3 seuil 25", [2, 0, 0, 0, 1, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0], 25, "Peut indiquer la présence d'un trouble anxieux (score ≥ 25)", [24, 1, 0, 0, 0]],
    ["T4 30", [2, 0, 0, 0, 2, 2, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], 30, "Peut indiquer la présence d'un trouble anxieux (score ≥ 25)", [26, 4, 0, 0, 0]],
    ["T5 31", [2, 0, 0, 0, 2, 2, 2, 0, 2, 0, 0, 2, 0, 1, 2, 0, 0, 2, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], 31, "Peut indiquer la présence d'un trouble anxieux (score > 30, plus spécifique)", [26, 5, 0, 0, 0]],
    ["T6 max", [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 82, "Peut indiquer la présence d'un trouble anxieux (score > 30, plus spécifique)", [26, 18, 16, 14, 8]],
    ["T7 sous-échelles distinctes", [1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 2, 0, 1, 0, 0, 0, 2, 1, 0, 1, 0, 1, 0, 0, 0, 0], 32, "Peut indiquer la présence d'un trouble anxieux (score > 30, plus spécifique)", [7, 9, 5, 8, 3]],
  ])('%s', (_label, values, total, interpretation, subscores) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(total);
    expect(result.maxScore).toBe(82);
    expect(result.interpretation).toBe(interpretation);
    if (subscores) expect(result.subscores?.map((s) => s.value)).toEqual(subscores);
  });

  it('porte 41 items et les réponses de la source', () => {
    const scale = getScaleById('scared')!;
    expect(scale.questions).toHaveLength(41);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual(
      [[0, "Pas vrai ou presque jamais vrai"], [1, "Plutôt vrai ou parfois vrai"], [2, "Très vrai ou souvent vrai"]],
    );
  });
});
