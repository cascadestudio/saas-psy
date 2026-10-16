import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * AUDIT (Alcohol Use Disorders Identification Test, OMS).
 * 10 items en `formType: "options"` (réponses hétérogènes par item) :
 * items 1-8 cotés 0-4, items 9-10 cotés 0/2/4. Score = somme simple, 0-40.
 * Seuils Société Française d'Alcoologie (2015) portés dans `scale.scoring.ranges`.
 */
export function scoreAudit(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'option_');
  const totalScore = values.reduce((s, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);

  return {
    totalScore,
    maxScore: scale.scoring.maxScore,
    interpretation: severity.interpretation,
    severityIndex: severity.severityIndex,
    severityRangeCount: severity.severityRangeCount,
  };
}
