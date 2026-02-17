import { ScoreResult } from "./types";
import { getInterpretation, formatSingleScaleDetails } from "./utils";

export function calculateSingleScaleScore(
  scale: any,
  scaleAnswers: Record<string, any>
): ScoreResult {
  const values = Object.entries(scaleAnswers)
    .filter(([key]) => key.startsWith("intensity_"))
    .map(([_, value]) => parseInt(value as string, 10));

  const totalScore = values.reduce((sum, value) => sum + value, 0);
  const maxPossibleValue = Math.max(
    ...(scale.answerScales.intensity?.map(
      (s: { value: number }) => s.value
    ) || [])
  );
  const maxTotal = scale.questions.length * maxPossibleValue;

  const interpretation = getInterpretation(scale, totalScore);

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
