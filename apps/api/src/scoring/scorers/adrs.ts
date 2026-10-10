import { Scale, ScoreAlert, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * ADRS, version auto-questionnaire (Revah-Lévy et al. 2007).
 * 10 items vrai (1) / faux (0), somme 0-10, tranches OFDT / Santé publique
 * France (0-3 / 4-6 / 7-10). L'item 6 (« j'ai envie de mourir ») déclenche une
 * alerte d'idéation suicidaire, sur le modèle de l'item 9 du PHQ-9.
 */
const DEATH_WISH_ITEM_INDEX = 5;

export function scoreAdrs(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'intensity_');
  const totalScore = values.reduce((s, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);

  const alerts: ScoreAlert[] = [];
  if ((values[DEATH_WISH_ITEM_INDEX] ?? 0) >= 1) {
    alerts.push({
      kind: 'suicide-ideation',
      severity: 'critical',
      message:
        "Envie de mourir endossée à l'item 6 (« Au fond, quand c'est comme ça, j'ai envie de mourir »). Évaluation clinique du risque suicidaire recommandée.",
      itemIndex: DEATH_WISH_ITEM_INDEX,
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
