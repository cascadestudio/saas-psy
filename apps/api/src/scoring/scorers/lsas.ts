import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * Liebowitz Social Anxiety Scale: each of the 24 situations is rated twice
 * (anxiety 0-3, avoidance 0-3). Two subscores of 0-72 each, total 0-144.
 */
export function scoreLsas(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const anxiety = collectByPrefix(responses, 'anxiety_');
  const avoidance = collectByPrefix(responses, 'avoidance_');

  const anxietyTotal = anxiety.reduce((s, v) => s + (v ?? 0), 0);
  const avoidanceTotal = avoidance.reduce((s, v) => s + (v ?? 0), 0);
  const totalScore = anxietyTotal + avoidanceTotal;
  const severity = resolveSeverity(scale, totalScore);

  const subscores: Subscore[] = [
    { key: 'anxiety', label: 'Anxiété', value: anxietyTotal, max: 72 },
    { key: 'avoidance', label: 'Évitement', value: avoidanceTotal, max: 72 },
  ];

  return {
    totalScore,
    maxScore: scale.scoring.maxScore,
    interpretation: severity.interpretation,
    severityIndex: severity.severityIndex,
    severityRangeCount: severity.severityRangeCount,
    subscores,
  };
}
