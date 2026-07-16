import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * PDEQ (dissociation péritraumatique, Marmar 1997 / Birmes 2005).
 * 10 items Likert 1-5, somme simple : 10-50. Un score ≥ 15 dépiste une
 * dissociation péritraumatique significative (fiche Cn2r).
 */
export function scorePdeq(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'intensity_');
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
