import { ScoreResult } from "./types";
import { formatSTAIDetails, getSTAIInterpretation } from "./utils";

export function calculateSTAIScore(
  questionnaire: any,
  questionnaireAnswers: Record<string, any>
): ScoreResult {
  // Get all values and split them into state and trait groups
  const stateValues = Object.entries(questionnaireAnswers)
    .filter(([key]) => key.startsWith("intensity_0_")) // First group (state)
    .map(([_, value]) => parseInt(value as string, 10));

  const traitValues = Object.entries(questionnaireAnswers)
    .filter(([key]) => key.startsWith("intensity_1_")) // Second group (trait)
    .map(([_, value]) => parseInt(value as string, 10));

  // Calculate scores
  const stateScore = stateValues.reduce((sum, value) => sum + value, 0);
  const traitScore = traitValues.reduce((sum, value) => sum + value, 0);

  // Get interpretations using the STAI-specific function
  const stateInterpretation = getSTAIInterpretation(stateScore);
  const traitInterpretation = getSTAIInterpretation(traitScore);

  return {
    totalScore: stateScore + traitScore, // Total of both scores
    stateScore,
    traitScore,
    interpretation: `État: ${stateInterpretation}\nTrait: ${traitInterpretation}`,
    scoreDetails: formatSTAIDetails(
      stateScore,
      traitScore,
      stateInterpretation,
      traitInterpretation
    ),
    maxTotal: 160, // Maximum possible total (80 + 80)
    maxState: 80,
    maxTrait: 80,
  };
}
