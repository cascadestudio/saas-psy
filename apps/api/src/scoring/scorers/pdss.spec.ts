import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/pdss/pdss.md` §9.
 * Les réponses sont des valeurs (0-4), items 1 à 7 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`option_${i}`, v]));
}

describe('PDSS scorer', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('pdss', toResponses(values));

  const below = 'En dessous du seuil de dépistage';
  const probable = 'Trouble panique probable';

  it.each([
    ['T1 min', [0, 0, 0, 0, 0, 0, 0], 0, below],
    ['T2 max', [4, 4, 4, 4, 4, 4, 4], 28, probable],
    ['T3 borne basse', [2, 2, 1, 1, 1, 1, 0], 8, below],
    ['T4 borne haute', [2, 2, 1, 1, 1, 1, 1], 9, probable],
    ['T5 typique', [2, 3, 3, 2, 1, 2, 1], 14, probable],
    ['T6 typique', [1, 1, 1, 0, 0, 0, 0], 3, below],
    ['T8 item 3 seul', [0, 0, 4, 0, 0, 0, 0], 4, below],
  ])('%s', (_label, values, expectedScore, expectedInterpretation) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(expectedScore);
    expect(result.maxScore).toBe(28);
    expect(result.interpretation).toBe(expectedInterpretation);
  });

  it("T7 affiche les options dans l'ordre du PDF (0 → 4) pour les 7 items", () => {
    const scale = getScaleById('pdss')!;
    const valuesInDisplayOrder = scale.questions.map((q: any) =>
      q.options.map((o: { value: number }) => o.value),
    );
    expect(valuesInDisplayOrder).toEqual(Array(7).fill([0, 1, 2, 3, 4]));
  });
});
