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

