import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

// Yao 1999 (correction de l'item 21 P→S) : 12 items P, 12 items S, indices 0-based.
const PERFORMANCE_INDICES = [0, 1, 2, 3, 5, 7, 8, 12, 13, 15, 16, 19];
const INTERACTION_INDICES = [4, 6, 9, 10, 11, 14, 17, 18, 20, 21, 22, 23];

function sumAt(values: number[], indices: number[]): number {
  return indices.reduce((s, i) => s + (values[i] ?? 0), 0);
}

/**
 * Liebowitz Social Anxiety Scale: 24 situations rated on two independent
 * dimensions (anxiety 0-3, avoidance 0-3). Total 0-144.
 *
 * Subscores returned in two groups (UI affiche les 4 premiers en évidence,
 * les 4 derniers repliés derrière "Voir le détail") :
 *   primary   : anxiety, avoidance, performance, interaction
 *   secondary : anxiety_performance, anxiety_interaction,
 *               avoidance_performance, avoidance_interaction
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

  const anxietyPerformance = sumAt(anxiety, PERFORMANCE_INDICES);
  const anxietyInteraction = sumAt(anxiety, INTERACTION_INDICES);
  const avoidancePerformance = sumAt(avoidance, PERFORMANCE_INDICES);
  const avoidanceInteraction = sumAt(avoidance, INTERACTION_INDICES);

  const subscores: Subscore[] = [
    { key: 'anxiety', label: 'Anxiété (total)', value: anxietyTotal, max: 72 },
    { key: 'avoidance', label: 'Évitement (total)', value: avoidanceTotal, max: 72 },
    {
      key: 'performance',
      label: 'Performance (anxiété + évitement)',
      value: anxietyPerformance + avoidancePerformance,
      max: 72,
    },
    {
      key: 'interaction',
      label: 'Interaction sociale (anxiété + évitement)',
      value: anxietyInteraction + avoidanceInteraction,
      max: 72,
    },
    {
      key: 'anxiety_performance',
      label: 'Anxiété × Performance',
      value: anxietyPerformance,
      max: 36,
    },
    {
      key: 'anxiety_interaction',
      label: 'Anxiété × Interaction sociale',
      value: anxietyInteraction,
      max: 36,
    },
    {
      key: 'avoidance_performance',
      label: 'Évitement × Performance',
      value: avoidancePerformance,
      max: 36,
    },
    {
      key: 'avoidance_interaction',
      label: 'Évitement × Interaction sociale',
      value: avoidanceInteraction,
      max: 36,
    },
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
