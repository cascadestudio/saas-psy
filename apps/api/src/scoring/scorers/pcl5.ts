import { Scale, ScoreAlert, ScoreResult, Subscore } from '@melya/core';
import {
  collectByPrefix,
  countEndorsed,
  resolveSeverity,
  sumRange,
} from './helpers';

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
  B: { start: 0, end: 4, max: 20, label: 'Intrusions (B)' },
  C: { start: 5, end: 6, max: 8, label: 'Évitement (C)' },
  D: { start: 7, end: 13, max: 28, label: 'Cognitions et humeur (D)' },
  E: { start: 14, end: 19, max: 24, label: 'Hyperéveil (E)' },
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

  const provisionalDx =
    countEndorsed(values, CLUSTERS.B.start, CLUSTERS.B.end) >= 1 &&
    countEndorsed(values, CLUSTERS.C.start, CLUSTERS.C.end) >= 1 &&
    countEndorsed(values, CLUSTERS.D.start, CLUSTERS.D.end) >= 2 &&
    countEndorsed(values, CLUSTERS.E.start, CLUSTERS.E.end) >= 2;

  const alerts: ScoreAlert[] = [];
  if (provisionalDx) {
    alerts.push({
      kind: 'diagnostic-threshold',
      severity: 'warning',
      message:
        'Selon les critères DSM-5, ce profil correspond à un diagnostic provisoire de TSPT (≥1B, ≥1C, ≥2D, ≥2E avec items cotés ≥ 2). Confirmation requise par évaluation clinique structurée.',
    });
  }

  return {
    totalScore,
    maxScore: scale.scoring.maxScore,
    interpretation: severity.interpretation,
    severityIndex: severity.severityIndex,
    severityRangeCount: severity.severityRangeCount,
    subscores,
    ...(alerts.length > 0 && { alerts }),
  };
}
