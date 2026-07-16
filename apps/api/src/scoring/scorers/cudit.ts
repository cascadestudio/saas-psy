import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * CUDIT-R (troubles de l'usage du cannabis, Adamson 2010 / Luquiens 2021).
 * 8 items en `formType: "options"` : items 1-7 cotés 0-4, item 8 coté 0/2/4.
 * Somme simple : 0-32. Seuils RESPADD : 8-10 possiblement problématique,
 * > 10 trouble de l'usage possible.
 */
export function scoreCuditR(
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
