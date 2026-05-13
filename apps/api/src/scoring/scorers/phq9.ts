import { Scale, ScoreAlert, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

export function scorePhq9(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'intensity_');
  const totalScore = values.reduce((s, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);

  const alerts: ScoreAlert[] = [];
  const item9 = values[8] ?? 0;
  if (item9 >= 1) {
    alerts.push({
      kind: 'suicide-ideation',
      severity: item9 >= 2 ? 'critical' : 'warning',
      message: `Idéation suicidaire endossée à l'item 9 (cotation ${item9}). Évaluation clinique du risque suicidaire recommandée.`,
      itemIndex: 8,
    });
  }

  return {
    totalScore,
    maxScore: scale.scoring.maxScore,
    interpretation: severity.interpretation,
    severityIndex: severity.severityIndex,
    severityRangeCount: severity.severityRangeCount,
    ...(alerts.length > 0 && { alerts }),
  };
}
