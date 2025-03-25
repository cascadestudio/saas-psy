import { ScoreResult } from "./types";
import { getInterpretation, formatDualScaleDetails } from "./utils";

export function calculateDualScaleScore(
  questionnaire: any,
  questionnaireAnswers: Record<string, any>
): ScoreResult {
  const anxietyValues = Object.entries(questionnaireAnswers)
    .filter(([key]) => key.startsWith("anxiety_"))
    .map(([_, value]) => parseInt(value as string, 10));

  const avoidanceValues = Object.entries(questionnaireAnswers)
    .filter(([key]) => key.startsWith("avoidance_"))
    .map(([_, value]) => parseInt(value as string, 10));

  const anxietyScore = anxietyValues.reduce((sum, value) => sum + value, 0);
  const avoidanceScore = avoidanceValues.reduce((sum, value) => sum + value, 0);
  const totalScore = anxietyScore + avoidanceScore;

  const interpretation = getInterpretation(questionnaire, totalScore);

  return {
    totalScore,
    anxietyScore,
    avoidanceScore,
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
  };
}
