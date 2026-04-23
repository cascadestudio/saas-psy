import { ScoreResult } from "./types";
import { calculateDualScaleScore } from "./dual-scale-scoring";
import { calculateSingleScaleScore } from "./single-scale-scoring";
import { calculateOptionsScore } from "./options-scoring";

export function calculateScaleScore(
  scale: any,
  scaleAnswers: Record<string, any>
): ScoreResult {
  if (scale.formType === "dual-scale") {
    return calculateDualScaleScore(scale, scaleAnswers);
  }

  if (scale.formType === "options") {
    return calculateOptionsScore(scale, scaleAnswers);
  }

  return calculateSingleScaleScore(scale, scaleAnswers);
}
