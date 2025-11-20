import { ScoreResult } from "./types";
import { getInterpretation, formatDualScaleDetails } from "./utils";

export function calculateDualScaleScore(
  questionnaire: any,
  questionnaireAnswers: Record<string, any>
): ScoreResult {
  const anxietyValues = Object.entries(questionnaireAnswers)
    .filter(([key]) => key.startsWith("anxiety_"))
    .map(([key, value]) => ({
      index: parseInt(key.split("_")[1], 10),
      value: parseInt(value as string, 10),
    }));

  const avoidanceValues = Object.entries(questionnaireAnswers)
    .filter(([key]) => key.startsWith("avoidance_"))
    .map(([key, value]) => ({
      index: parseInt(key.split("_")[1], 10),
      value: parseInt(value as string, 10),
    }));

  // Get the questions with their types
  const questions = questionnaire.questions || [];

  // Calculate performance and interaction scores
  const anxietyPerformanceScore = anxietyValues.reduce((sum, item) => {
    const question = questions[item.index];
    return question.type === "performance" ? sum + item.value : sum;
  }, 0);

  const anxietyInteractionScore = anxietyValues.reduce((sum, item) => {
    const question = questions[item.index];
    return question.type === "interaction" ? sum + item.value : sum;
  }, 0);

  const avoidancePerformanceScore = avoidanceValues.reduce((sum, item) => {
    const question = questions[item.index];
    return question.type === "performance" ? sum + item.value : sum;
  }, 0);

  const avoidanceInteractionScore = avoidanceValues.reduce((sum, item) => {
    const question = questions[item.index];
    return question.type === "interaction" ? sum + item.value : sum;
  }, 0);

  // Calculate total scores
  const anxietyScore = anxietyPerformanceScore + anxietyInteractionScore;
  const avoidanceScore = avoidancePerformanceScore + avoidanceInteractionScore;
  const totalScore = anxietyScore + avoidanceScore;

  const interpretation = getInterpretation(questionnaire, totalScore);

  // Count the number of questions by type
  const performanceQuestionsCount = questions.filter(
    (q: any) => q.type === "performance"
  ).length;
  const interactionQuestionsCount = questions.filter(
    (q: any) => q.type === "interaction"
  ).length;

  return {
    totalScore,
    anxietyScore,
    avoidanceScore,
    anxietyPerformanceScore,
    anxietyInteractionScore,
    avoidancePerformanceScore,
    avoidanceInteractionScore,
    interpretation,
    scoreDetails: formatDualScaleDetails(
      totalScore,
      anxietyScore,
      avoidanceScore,
      interpretation
    ),
    maxTotal: 144,
    maxAnxiety: 72,
    maxAvoidance: 72,
    maxPerformanceAnxiety: performanceQuestionsCount * 3, // Max is 3 per question
    maxInteractionAnxiety: interactionQuestionsCount * 3,
    maxPerformanceAvoidance: performanceQuestionsCount * 3,
    maxInteractionAvoidance: interactionQuestionsCount * 3,
  };
}
