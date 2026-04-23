import { ScoreResult } from "./types";
import { calculateDualScaleScore } from "./dual-scale-scoring";
import { calculateSingleScaleScore } from "./single-scale-scoring";

export function calculateScaleScore(
  scale: any,
  scaleAnswers: Record<string, any>
): ScoreResult {
  if (scale.id === "echelle-d-anxiete-sociale-de-liebowitz") {
    return calculateDualScaleScore(scale, scaleAnswers);
  }

  return calculateSingleScaleScore(scale, scaleAnswers);
}
