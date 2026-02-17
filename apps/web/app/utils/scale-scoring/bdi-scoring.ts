import { ScoreResult } from "./types";
import { getInterpretation, formatSingleScaleDetails } from "./utils";

export function calculateBDIScore(
  scale: any,
  scaleAnswers: Record<string, any>
): ScoreResult {
  const values = Object.entries(scaleAnswers)
    .filter(([key]) => key.startsWith("bdi_"))
    .map(([_, value]) => parseInt(value as string, 10));

  const totalScore = values.reduce((sum, value) => sum + value, 0);
  const maxTotal = 63; // Maximum BDI score (21 questions with max 3 points each)

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
