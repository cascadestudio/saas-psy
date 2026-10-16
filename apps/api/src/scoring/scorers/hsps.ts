import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * HSPS (auto-test d'hypersensibilité d'Elaine Aron, 1996).
 * 23 items OUI (1) / NON (0), somme = nombre de OUI : 0-23.
 * ≥ 12 OUI → hypersensibilité probable.
 */
export function scoreHsps(
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
