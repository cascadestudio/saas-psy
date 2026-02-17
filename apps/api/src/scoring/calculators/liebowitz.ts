import { ScoreResult } from '../types';
import { getInterpretation } from './utils';

export function calculateLiebowitzScore(
  scale: any,
  responses: Record<string, any>,
): ScoreResult {
  const questions: any[] = scale.questions || [];

  const anxietyValues = Object.entries(responses)
    .filter(([key]) => key.startsWith('anxiety_'))
    .map(([key, value]) => ({
      index: parseInt(key.split('_')[1], 10),
      value: parseInt(String(value), 10),
    }));

  const avoidanceValues = Object.entries(responses)
    .filter(([key]) => key.startsWith('avoidance_'))
    .map(([key, value]) => ({
      index: parseInt(key.split('_')[1], 10),
      value: parseInt(String(value), 10),
    }));

  const anxietyPerformanceScore = anxietyValues.reduce((sum, item) => {
    const question = questions[item.index];
    return question?.type === 'performance' ? sum + item.value : sum;
  }, 0);

  const anxietyInteractionScore = anxietyValues.reduce((sum, item) => {
    const question = questions[item.index];
    return question?.type === 'interaction' ? sum + item.value : sum;
  }, 0);

  const avoidancePerformanceScore = avoidanceValues.reduce((sum, item) => {
    const question = questions[item.index];
    return question?.type === 'performance' ? sum + item.value : sum;
  }, 0);

  const avoidanceInteractionScore = avoidanceValues.reduce((sum, item) => {
    const question = questions[item.index];
    return question?.type === 'interaction' ? sum + item.value : sum;
  }, 0);

  const anxietyScore = anxietyPerformanceScore + anxietyInteractionScore;
  const avoidanceScore = avoidancePerformanceScore + avoidanceInteractionScore;
  const totalScore = anxietyScore + avoidanceScore;

  const performanceCount = questions.filter(
    (q) => q.type === 'performance',
  ).length;
  const interactionCount = questions.filter(
    (q) => q.type === 'interaction',
  ).length;

  return {
    totalScore,
    anxietyScore,
    avoidanceScore,
    anxietyPerformanceScore,
    anxietyInteractionScore,
    avoidancePerformanceScore,
    avoidanceInteractionScore,
    interpretation: getInterpretation(scale, totalScore),
    maxTotal: 144,
    maxAnxiety: 72,
    maxAvoidance: 72,
    maxPerformanceAnxiety: performanceCount * 3,
    maxInteractionAnxiety: interactionCount * 3,
    maxPerformanceAvoidance: performanceCount * 3,
    maxInteractionAvoidance: interactionCount * 3,
  };
}
