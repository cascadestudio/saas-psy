// Common utility functions for scale scoring

/**
 * Find the appropriate interpretation for a score based on the scale's scoring ranges
 */
export function getInterpretation(
  scale: any,
  totalScore: number
): string {
  if (!scale.scoring?.ranges) return "";

  const matchingRange = scale.scoring.ranges.find(
    (range: { min: number; max: number; interpretation: string }) =>
      totalScore >= range.min && totalScore <= range.max
  );

  return matchingRange?.interpretation || "";
}

/**
 * Format the details for a single scale form
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
 * Format the details for a dual scale form
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
 * Format the details for STAI scale
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
