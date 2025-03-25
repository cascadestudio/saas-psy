import { questionnaires } from "@/app/questionnairesData";

interface ScoreResult {
  totalScore: number;
  anxietyScore?: number;
  avoidanceScore?: number;
  interpretation: string;
  scoreDetails: string;
  maxTotal: number;
  maxAnxiety?: number;
  maxAvoidance?: number;
  stateScore?: number;
  traitScore?: number;
  maxState?: number;
  maxTrait?: number;
}

export function calculateQuestionnaireScore(
  questionnaire: any,
  formData: Record<string, any>
): ScoreResult {
  if (!questionnaire) {
    return {
      totalScore: 0,
      interpretation: "Questionnaire non trouvé",
      scoreDetails: "Questionnaire non trouvé",
      maxTotal: 0,
    };
  }

  if (
    questionnaire.answerScales.anxiety &&
    questionnaire.answerScales.avoidance
  ) {
    return calculateDualScaleScore(questionnaire, formData);
  }

  if (questionnaire.id === "stai-anxiete-generalisee") {
    return calculateSTAIScore(questionnaire, formData);
  }

  return calculateSingleScaleScore(questionnaire, formData);
}

function calculateDualScaleScore(
  questionnaire: any,
  formData: Record<string, any>
): ScoreResult {
  const anxietyValues = Object.entries(formData)
    .filter(([key]) => key.startsWith("anxiety_"))
    .map(([_, value]) => parseInt(value as string, 10));

  const avoidanceValues = Object.entries(formData)
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

function calculateSingleScaleScore(
  questionnaire: any,
  formData: Record<string, any>
): ScoreResult {
  // Special handling for STAI questionnaire
  if (questionnaire.id === "stai-anxiete-generalisee") {
    // Get all values and split them into state and trait groups
    const stateValues = Object.entries(formData)
      .filter(([key]) => key.startsWith("intensity_0_")) // First group (state)
      .map(([_, value]) => parseInt(value as string, 10));

    const traitValues = Object.entries(formData)
      .filter(([key]) => key.startsWith("intensity_1_")) // Second group (trait)
      .map(([_, value]) => parseInt(value as string, 10));

    const stateScore = stateValues.reduce((sum, value) => sum + value, 0);
    const traitScore = traitValues.reduce((sum, value) => sum + value, 0);

    // Get interpretations for both scores
    const stateInterpretation = getInterpretation(questionnaire, stateScore);
    const traitInterpretation = getInterpretation(questionnaire, traitScore);

    return {
      totalScore: stateScore, // Using state score as primary score
      stateScore,
      traitScore,
      interpretation: `État: ${stateInterpretation}\nTrait: ${traitInterpretation}`,
      scoreDetails: formatSTAIDetails(
        stateScore,
        traitScore,
        stateInterpretation,
        traitInterpretation
      ),
      maxTotal: 80,
      maxState: 80,
      maxTrait: 80,
    };
  }

  // Original single scale logic for other questionnaires
  const values = Object.entries(formData)
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

function getInterpretation(questionnaire: any, totalScore: number): string {
  if (!questionnaire.scoring?.ranges) return "";

  const matchingRange = questionnaire.scoring.ranges.find(
    (range: { min: number; max: number; interpretation: string }) =>
      totalScore >= range.min && totalScore <= range.max
  );

  return matchingRange?.interpretation || "";
}

function formatDualScaleDetails(
  totalScore: number,
  anxietyScore: number,
  avoidanceScore: number,
  interpretation: string
): string {
  return `
Score total: ${totalScore}/144
Score d'anxiété: ${anxietyScore}/72
Score d'évitement: ${avoidanceScore}/72
Interprétation: ${interpretation}
  `.trim();
}

function formatSingleScaleDetails(
  totalScore: number,
  maxTotal: number,
  interpretation: string
): string {
  return `
Score total: ${totalScore}/${maxTotal}
Interprétation: ${interpretation}
  `.trim();
}

function formatSTAIDetails(
  stateScore: number,
  traitScore: number,
  stateInterpretation: string,
  traitInterpretation: string
): string {
  return `Anxiété-État (situationnelle):
Score: ${stateScore}/80
Interprétation: ${stateInterpretation}

Anxiété-Trait (générale):
Score: ${traitScore}/80
Interprétation: ${traitInterpretation}`;
}

function getSTAIInterpretation(score: number): string {
  if (score <= 35) return "Anxiété très faible";
  if (score <= 45) return "Anxiété faible";
  if (score <= 55) return "Anxiété modérée";
  if (score <= 65) return "Anxiété élevée";
  return "Anxiété très élevée";
}

function calculateSTAIScore(
  questionnaire: any,
  formData: Record<string, any>
): ScoreResult {
  // Get all values and split them into state and trait groups
  const stateValues = Object.entries(formData)
    .filter(([key]) => key.startsWith("intensity_0_")) // First group (state)
    .map(([_, value]) => parseInt(value as string, 10));

  const traitValues = Object.entries(formData)
    .filter(([key]) => key.startsWith("intensity_1_")) // Second group (trait)
    .map(([_, value]) => parseInt(value as string, 10));

  // Calculate scores
  const stateScore = stateValues.reduce((sum, value) => sum + value, 0);
  const traitScore = traitValues.reduce((sum, value) => sum + value, 0);

  // Get interpretations using the new function
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
