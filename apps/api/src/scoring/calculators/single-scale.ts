import { ScoreResult } from '../types';
import { getInterpretation } from './utils';

export function calculateSingleScaleScore(
  scale: any,
  responses: Record<string, any>,
): ScoreResult {
  const values = Object.entries(responses)
    .filter(([key]) => key.startsWith('intensity_'))
    .map(([, value]) => parseInt(String(value), 10));

  const totalScore = values.reduce((sum, v) => sum + v, 0);

  const maxPossibleValue = Math.max(
    ...(scale.answerScales?.intensity?.map(
      (s: { value: number }) => s.value,
    ) || [0]),
  );
  const questionCount = Array.isArray(scale.questions)
    ? scale.questions.length
    : 0;
  const maxTotal = questionCount * maxPossibleValue;

  const result: ScoreResult = {
    totalScore,
    maxTotal,
    interpretation: getInterpretation(scale, totalScore),
  };

  // PHQ-9 — drapeau d'alerte item 9 (idéation suicidaire) ≥ 1
  if (scale?.id === 'phq-9') {
    const item9 = parseInt(String(responses['intensity_8']), 10);
    result.alerteSuicide = Number.isFinite(item9) && item9 >= 1;
  }

  return result;
}
