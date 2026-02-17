import { ScoreResult } from '../types';
import { getInterpretation } from './utils';

export function calculateOptionsScore(
  scale: any,
  responses: Record<string, any>,
): ScoreResult {
  const values = Object.entries(responses)
    .filter(([key]) => key.startsWith('option_') || key.startsWith('bdi_'))
    .map(([, value]) => parseInt(String(value), 10));

  const totalScore = values.reduce((sum, v) => sum + v, 0);

  const questionCount = Array.isArray(scale.questions)
    ? scale.questions.length
    : 0;
  const maxOptionValue = scale.questions?.[0]?.options
    ? Math.max(...scale.questions[0].options.map((o: any) => o.value))
    : 3;
  const maxTotal = questionCount * maxOptionValue;

  return {
    totalScore,
    maxTotal,
    interpretation: getInterpretation(scale, totalScore),
  };
}
