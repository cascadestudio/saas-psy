import { getScaleById } from '@melya/core';
import { ScoringService } from '../scoring.service';

/**
 * Cas de test de la fiche `docs/scales/asrs/asrs.md` §9.
 * Réponses 0-4 (Jamais … Très souvent), questions 1 à 6 dans l'ordre.
 */
function toResponses(values: number[]): Record<string, number> {
  return Object.fromEntries(values.map((v, i) => [`intensity_${i}`, v]));
}

describe('ASRS-V1.1 screener', () => {
  const service = new ScoringService();
  const score = (values: number[]) =>
    service.calculateScore('asrs', toResponses(values));
  const negative = 'Dépistage négatif : moins de 4 réponses dans la zone grisée';
  const positive =
    "Symptômes pouvant correspondre à ceux d'un TDAH de l'adulte : évaluation clinique recommandée";

  it.each([
    ['T1 tout à Jamais', [0, 0, 0, 0, 0, 0], 0, negative],
    ['T2 juste sous les cases grisées', [1, 1, 1, 2, 2, 2], 0, negative],
    ['T3 bords des cases grisées', [2, 2, 2, 3, 3, 3], 6, positive],
    ['T4 trois réponses grisées', [2, 2, 2, 2, 2, 2], 3, negative],
    ['T5 quatre réponses grisées', [2, 2, 2, 3, 0, 0], 4, positive],
    ['T6 tout à Très souvent', [4, 4, 4, 4, 4, 4], 6, positive],
  ])('%s', (_label, values, expectedScore, expectedInterpretation) => {
    const result = score(values as number[]);
    expect(result.totalScore).toBe(expectedScore);
    expect(result.maxScore).toBe(6);
    expect(result.interpretation).toBe(expectedInterpretation);
  });

  it('porte 6 questions et les 5 réponses du formulaire français', () => {
    const scale = getScaleById('asrs')!;
    expect(scale.domain).toBe('neurodeveloppement');
    expect(scale.questions).toHaveLength(6);
    expect(scale.answerScales!.intensity!.map((o) => [o.value, o.label])).toEqual([
      [0, 'Jamais'],
      [1, 'Rarement'],
      [2, 'Quelquefois'],
      [3, 'Souvent'],
      [4, 'Très souvent'],
    ]);
  });
});
