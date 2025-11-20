// Common utility functions for questionnaire scoring

/**
 * Find the appropriate interpretation for a score based on the questionnaire's scoring ranges
 */
export function getInterpretation(
  questionnaire: any,
  totalScore: number
): string {
  if (!questionnaire.scoring?.ranges) return "";

  const matchingRange = questionnaire.scoring.ranges.find(
    (range: { min: number; max: number; interpretation: string }) =>
      totalScore >= range.min && totalScore <= range.max
  );

  return matchingRange?.interpretation || "";
}

/**
 * Format the details for a single scale questionnaire
 */
export function formatSingleScaleDetails(
  totalScore: number,
  maxTotal: number,
  interpretation: string
): string {
  return `
Score total: ${totalScore}/${maxTotal}
Interprétation: ${interpretation}
  `.trim();
}

/**
 * Format the details for a dual scale questionnaire
 */
export function formatDualScaleDetails(
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

/**
 * Format the details for STAI questionnaire
 */
export function formatSTAIDetails(
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

/**
 * Get interpretation for STAI scores
 */
export function getSTAIInterpretation(score: number): string {
  if (score <= 35) return "Anxiété très faible";
  if (score <= 45) return "Anxiété faible";
  if (score <= 55) return "Anxiété modérée";
  if (score <= 65) return "Anxiété élevée";
  return "Anxiété très élevée";
}
