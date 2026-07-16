import { CriteriaCheck, Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, countEndorsed, resolveSeverity } from './helpers';

const ENDORSEMENT_THRESHOLD = 4;

/**
 * QIA / WAQ (inquiétude et anxiété, Dugas et al. 2001 — cotation UQO).
 * 10 items cotés 0-8 (`option_0` à `option_9`) + item 1 non coté : thèmes
 * d'inquiétude en texte libre sous la clé `worry_themes` (openingTextItem).
 *
 * Score total = somme des 10 items cotés (0-80), sans seuil établi.
 * Critères TAG (fiche de cotation UQO) — un item est « coté » à partir de 4 :
 * - au moins un thème d'inquiétude rapporté (item 1) ;
 * - items 2, 3 et 4 cotés ≥ 4 (indices 0-2 : excessif, fréquence, contrôle) ;
 * - ≥ 3 des 6 sensations somatiques cotées ≥ 4 (indices 3-8, item 5 a-f) ;
 * - item 6 coté ≥ 4 (indice 9 : interférence).
 */
export function scoreQia(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'option_');
  const totalScore = values.reduce((s, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);

  const themesKey = scale.openingTextItem?.key ?? 'worry_themes';
  const themesRaw = responses[themesKey];
  const hasTheme = typeof themesRaw === 'string' && themesRaw.trim().length > 0;

  const cognitiveCount = countEndorsed(values, 0, 2, ENDORSEMENT_THRESHOLD);
  const somaticCount = countEndorsed(values, 3, 8, ENDORSEMENT_THRESHOLD);
  const interferenceCount = countEndorsed(values, 9, 9, ENDORSEMENT_THRESHOLD);

  const rows = [
    {
      key: 'theme',
      label: "Thème d'inquiétude rapporté (item 1)",
      count: hasTheme ? 1 : 0,
      required: 1,
      met: hasTheme,
    },
    {
      key: 'cognitif',
      label: 'Inquiétudes excessives, fréquentes et difficiles à contrôler (items 2 à 4)',
      count: cognitiveCount,
      required: 3,
      met: cognitiveCount >= 3,
    },
    {
      key: 'somatique',
      label: 'Sensations somatiques (au moins 3 des 6, item 5)',
      count: somaticCount,
      required: 3,
      met: somaticCount >= 3,
    },
    {
      key: 'interference',
      label: 'Interférence avec la vie quotidienne (item 6)',
      count: interferenceCount,
      required: 1,
      met: interferenceCount >= 1,
    },
  ];

  const criteriaCheck: CriteriaCheck = {
    key: 'tag-qia',
    source: 'Cotation QIA — Dugas et al. (2001), UQO',
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
    criteriaCheck,
  };
}
