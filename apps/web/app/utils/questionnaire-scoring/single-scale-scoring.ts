import { ScoreResult } from "./types";
import { getInterpretation, formatSingleScaleDetails } from "./utils";

export function calculateSingleScaleScore(
  questionnaire: any,
  questionnaireAnswers: Record<string, any>
): ScoreResult {
  const values = Object.entries(questionnaireAnswers)
    .filter(([key]) => key.startsWith("intensity_"))
    .map(([_, value]) => parseInt(value as string, 10));

  const totalScore = values.reduce((sum, value) => sum + value, 0);
  const maxPossibleValue = Math.max(
    ...(questionnaire.answerScales.intensity?.map(
      (scale: { value: number }) => scale.value
    ) || [])
  );
  const maxTotal = questionnaire.questions.length * maxPossibleValue;

  const interpretation = getInterpretation(questionnaire, totalScore);

  return {
    totalScore,
    interpretation,
    scoreDetails: formatSingleScaleDetails(
      totalScore,
      maxTotal,
      interpretation
    ),
    maxTotal,
  };
}
