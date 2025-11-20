import { ScoreResult, Questionnaire } from '../types';

/**
 * Calculate score for a questionnaire based on its scoring method
 */
export function calculateScore(
  questionnaire: Questionnaire,
  answers: Record<string, any>,
): ScoreResult {
  if (!questionnaire.scoring) {
    return {
      totalScore: 0,
      interpretation: 'No scoring configuration available',
    };
  }

  const method = questionnaire.scoring.method;

  switch (method) {
    case 'sum':
      return calculateSumScore(questionnaire, answers);
    case 'bdi':
      return calculateBDIScore(questionnaire, answers);
    case 'stai':
      return calculateSTAIScore(questionnaire, answers);
    case 'dual-scale':
      return calculateDualScaleScore(questionnaire, answers);
    default:
      return {
        totalScore: 0,
        interpretation: `Unknown scoring method: ${method}`,
      };
  }
}

/**
 * Simple sum scoring
 */
function calculateSumScore(
  questionnaire: Questionnaire,
  answers: Record<string, any>,
): ScoreResult {
  const totalScore = Object.values(answers).reduce(
    (sum: number, value: any) => sum + (Number(value) || 0),
    0,
  );

  const interpretation = getInterpretation(
    totalScore,
    questionnaire.scoring?.ranges || [],
  );

  return {
    totalScore,
    interpretation,
  };
}

/**
 * Beck Depression Inventory scoring
 */
function calculateBDIScore(
  questionnaire: Questionnaire,
  answers: Record<string, any>,
): ScoreResult {
  const totalScore = Object.values(answers).reduce(
    (sum: number, value: any) => sum + (Number(value) || 0),
    0,
  );

  let severity = '';
  if (totalScore <= 13) severity = 'Dépression minimale';
  else if (totalScore <= 19) severity = 'Dépression légère';
  else if (totalScore <= 28) severity = 'Dépression modérée';
  else severity = 'Dépression sévère';

  return {
    totalScore,
    severity,
    interpretation: `Score BDI-II: ${totalScore}/63. ${severity}`,
  };
}

/**
 * STAI (State-Trait Anxiety Inventory) scoring
 */
function calculateSTAIScore(
  questionnaire: Questionnaire,
  answers: Record<string, any>,
): ScoreResult {
  // STAI has state and trait subscales
  const stateQuestions = Array.from({ length: 20 }, (_, i) => i + 1);
  const traitQuestions = Array.from({ length: 20 }, (_, i) => i + 21);

  const stateScore = stateQuestions.reduce(
    (sum, q) => sum + (Number(answers[q]) || 0),
    0,
  );

  const traitScore = traitQuestions.reduce(
    (sum, q) => sum + (Number(answers[q]) || 0),
    0,
  );

  return {
    stateScore,
    traitScore,
    totalScore: stateScore + traitScore,
    interpretation: `Anxiété état: ${stateScore}/80, Anxiété trait: ${traitScore}/80`,
  };
}

/**
 * Dual scale scoring (e.g., Liebowitz Social Anxiety Scale)
 */
function calculateDualScaleScore(
  questionnaire: Questionnaire,
  answers: Record<string, any>,
): ScoreResult {
  let anxietyScore = 0;
  let avoidanceScore = 0;

  Object.entries(answers).forEach(([key, value]) => {
    if (key.includes('anxiety')) {
      anxietyScore += Number(value) || 0;
    } else if (key.includes('avoidance')) {
      avoidanceScore += Number(value) || 0;
    }
  });

  const totalScore = anxietyScore + avoidanceScore;

  return {
    totalScore,
    subscores: {
      anxiety: anxietyScore,
      avoidance: avoidanceScore,
    },
    interpretation: `Anxiété: ${anxietyScore}, Évitement: ${avoidanceScore}, Total: ${totalScore}`,
  };
}

/**
 * Get interpretation based on score ranges
 */
function getInterpretation(
  score: number,
  ranges: Array<{ min: number; max: number; interpretation: string }>,
): string {
  const range = ranges.find((r) => score >= r.min && score <= r.max);
  return range?.interpretation || 'Score calculated';
}

