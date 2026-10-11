import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * Dépistage ASRS-V1.1 en 6 questions (partie A, Adler & Kessler / OMS).
 * Réponses 0-4 (Jamais … Très souvent). Le score est le nombre de réponses
 * dans la zone grisée du formulaire : questions 1-3 à partir de
 * « Quelquefois » (2), questions 4-6 à partir de « Souvent » (3).
 * 0-6 ; ≥ 4 = symptômes pouvant correspondre à un TDAH de l'adulte.
 */
const SHADED_FROM = [2, 2, 2, 3, 3, 3];

export function scoreAsrs(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'intensity_');
  const totalScore = SHADED_FROM.reduce(
    (count, threshold, i) => count + ((values[i] ?? 0) >= threshold ? 1 : 0),
    0,
  );
  const severity = resolveSeverity(scale, totalScore);

  return {
    totalScore,
    maxScore: scale.scoring.maxScore,
    interpretation: severity.interpretation,
    severityIndex: severity.severityIndex,
    severityRangeCount: severity.severityRangeCount,
  };
}
