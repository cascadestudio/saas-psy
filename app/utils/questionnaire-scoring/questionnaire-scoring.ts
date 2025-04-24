import { ScoreResult } from "./types";
import { calculateDualScaleScore } from "./dual-scale-scoring";
import { calculateSingleScaleScore } from "./single-scale-scoring";
import { calculateSTAIScore } from "./stai-scoring";
import { calculateBDIScore } from "./bdi-scoring";

export function calculateQuestionnaireScore(
  questionnaire: any,
  questionnaireAnswers: Record<string, any>
): ScoreResult {
  if (questionnaire.id === "echelle-d-anxiete-sociale-de-liebowitz") {
    return calculateDualScaleScore(questionnaire, questionnaireAnswers);
  }

  if (questionnaire.id === "stai-anxiete-generalisee") {
    return calculateSTAIScore(questionnaire, questionnaireAnswers);
  }

  if (questionnaire.id === "inventaire-de-depression-de-beck") {
    return calculateBDIScore(questionnaire, questionnaireAnswers);
  }

  return calculateSingleScaleScore(questionnaire, questionnaireAnswers);
}
