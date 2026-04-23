import { ScoreResult } from "./types";
import { getInterpretation, formatSingleScaleDetails } from "./utils";

export function calculateOptionsScore(
  scale: any,
  scaleAnswers: Record<string, any>
): ScoreResult {
  const indexed = Object.entries(scaleAnswers)
    .filter(([key]) => key.startsWith("option_"))
    .map(([key, value]) => {
      const idx = parseInt(key.slice("option_".length), 10);
      return { idx, value: parseInt(value as string, 10) };
    });

  const totalScore = indexed.reduce((sum, { value }) => sum + value, 0);

  const questionCount = Array.isArray(scale.questions)
    ? scale.questions.length
    : 0;
  const maxOptionValue = scale.questions?.[0]?.options
    ? Math.max(...scale.questions[0].options.map((o: any) => o.value))
    : 3;
  const maxTotal = questionCount * maxOptionValue;
  const interpretation = getInterpretation(scale, totalScore);

  const result: ScoreResult = {
    totalScore,
    maxTotal,
    interpretation,
    scoreDetails: formatSingleScaleDetails(totalScore, maxTotal, interpretation),
  };

  if (scale.id === "index-symptomes-ybocs" && questionCount === 10) {
    result.obsessionsScore = indexed
      .filter(({ idx }) => idx < 5)
      .reduce((sum, { value }) => sum + value, 0);
    result.compulsionsScore = indexed
      .filter(({ idx }) => idx >= 5)
      .reduce((sum, { value }) => sum + value, 0);
    result.maxObsessions = 5 * maxOptionValue;
    result.maxCompulsions = 5 * maxOptionValue;
  }

  return result;
}
