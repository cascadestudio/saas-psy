import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity, sumRange } from './helpers';

/**
 * Y-BOCS uses per-item options (formType "options"). Items 1-5 measure
 * obsessions, items 6-10 measure compulsions; each item is scored 0-4
 * (max 20 per cluster, 40 total).
 */
export function scoreYbocs(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'option_');
  const totalScore = values.reduce((s, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);

  const subscores: Subscore[] = [
    {
      key: 'obsessions',
      label: 'Obsessions',
      value: sumRange(values, 0, 4),
      max: 20,
    },
    {
      key: 'compulsions',
      label: 'Compulsions',
      value: sumRange(values, 5, 9),
      max: 20,
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
