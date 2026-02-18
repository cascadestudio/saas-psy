import { ScoreResult } from "./types";
import { calculateDualScaleScore } from "./dual-scale-scoring";
import { calculateSingleScaleScore } from "./single-scale-scoring";
import { calculateSTAIScore } from "./stai-scoring";
import { calculateBDIScore } from "./bdi-scoring";

export function calculateScaleScore(
  scale: any,
  scaleAnswers: Record<string, any>
): ScoreResult {
  if (scale.id === "echelle-d-anxiete-sociale-de-liebowitz") {
    return calculateDualScaleScore(scale, scaleAnswers);
  }

  if (scale.id === "stai-anxiete-generalisee") {
    return calculateSTAIScore(scale, scaleAnswers);
  }

  if (scale.id === "inventaire-de-depression-de-beck") {
    return calculateBDIScore(scale, scaleAnswers);
  }

  return calculateSingleScaleScore(scale, scaleAnswers);
}
