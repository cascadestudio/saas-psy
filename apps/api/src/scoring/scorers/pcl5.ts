import { CriteriaCheck, Scale, ScoreResult, Subscore } from '@melya/core';
import {
  collectByPrefix,
  countEndorsed,
  resolveSeverity,
  sumRange,
} from './helpers';

const ENDORSEMENT_THRESHOLD = 2;

/**
 * DSM-5 cluster ranges (0-based item indices):
 * - B (Intrusions):              items 1-5   → 0-4    (max 20)
 * - C (Évitement):               items 6-7   → 5-6    (max 8)
 * - D (Cognitions / humeur):     items 8-14  → 7-13   (max 28)
 * - E (Hyperéveil / réactivité): items 15-20 → 14-19  (max 24)
 *
 * Provisional DSM-5 diagnosis (National Center for PTSD):
 * an item is endorsed when scored ≥ 2 ("Modérément" or higher).
 * Diagnosis is provisional when ≥1B, ≥1C, ≥2D, ≥2E are endorsed simultaneously.
 */
const CLUSTERS = {
  B: { start: 0, end: 4, max: 20, label: 'Intrusions (B)', required: 1 },
  C: { start: 5, end: 6, max: 8, label: 'Évitement (C)', required: 1 },
  D: {
    start: 7,
    end: 13,
    max: 28,
    label: 'Cognitions et humeur (D)',
    required: 2,
  },
  E: { start: 14, end: 19, max: 24, label: 'Hyperéveil (E)', required: 2 },
} as const;

export function scorePcl5(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'intensity_');
  const totalScore = values.reduce((s, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);

  const subscores: Subscore[] = [
    {
      key: 'cluster-b',
      label: CLUSTERS.B.label,
      value: sumRange(values, CLUSTERS.B.start, CLUSTERS.B.end),
      max: CLUSTERS.B.max,
    },
    {
      key: 'cluster-c',
      label: CLUSTERS.C.label,
      value: sumRange(values, CLUSTERS.C.start, CLUSTERS.C.end),
      max: CLUSTERS.C.max,
    },
    {
      key: 'cluster-d',
      label: CLUSTERS.D.label,
      value: sumRange(values, CLUSTERS.D.start, CLUSTERS.D.end),
      max: CLUSTERS.D.max,
    },
    {
      key: 'cluster-e',
      label: CLUSTERS.E.label,
      value: sumRange(values, CLUSTERS.E.start, CLUSTERS.E.end),
      max: CLUSTERS.E.max,
    },
  ];

  const rows = (Object.keys(CLUSTERS) as (keyof typeof CLUSTERS)[]).map((k) => {
    const c = CLUSTERS[k];
    const count = countEndorsed(values, c.start, c.end, ENDORSEMENT_THRESHOLD);
    return {
      key: k,
      label: c.label,
      count,
      required: c.required,
      met: count >= c.required,
    };
  });

  const criteriaCheck: CriteriaCheck = {
    key: 'dsm5-pcl5',
    source: 'DSM-5 / National Center for PTSD',
    met: rows.every((r) => r.met),
    rows,
    endorsementThreshold: ENDORSEMENT_THRESHOLD,
  };

  return {
    totalScore,
    maxScore: scale.scoring.maxScore,
    interpretation: severity.interpretation,
    severityIndex: severity.severityIndex,
    severityRangeCount: severity.severityRangeCount,
    subscores,
    criteriaCheck,
  };
}
