import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * EDI (Yao et coll. 1998b), thèse Yao Lyon 2 1999 (formulaire + codage).
 * 34 items 1-5 ; total 34-170 ; EDI-soi / EDI-autres ; pas de seuil (repères).
 */
const SUBSCALES: { key: string; label: string; items: number[] }[] = [
  { key: 'soi', label: "Sentiment d'infériorité aux yeux de soi-même (EDI-soi)", items: [1, 4, 6, 7, 9, 10, 13, 15, 18, 20, 23, 24, 26, 27, 29, 32, 33] },
  { key: 'autres', label: "Sentiment d'infériorité aux yeux des autres (EDI-autres)", items: [2, 3, 5, 8, 11, 12, 14, 16, 17, 19, 21, 22, 25, 28, 30, 31, 34] },
];

export function scoreEdi(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const raw = collectByPrefix(responses, 'intensity_');
  const values = raw;
  const totalScore = values.reduce((s: number, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);
  const subscores: Subscore[] = SUBSCALES.map((sub) => ({
    key: sub.key,
    label: sub.label,
    value: sub.items.reduce((s, item) => s + (values[item - 1] ?? 0), 0),
    max: sub.items.length * 5,
  }));

  return {
    totalScore,
    maxScore: scale.scoring.maxScore,
    interpretation: severity.interpretation,
    severityIndex: severity.severityIndex,
    severityRangeCount: severity.severityRangeCount,
    subscores,
  };
}
