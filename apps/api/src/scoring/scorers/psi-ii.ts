import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * PSI-II (Questionnaire Pourquoi s'inquiéter-II, Gosselin et al. 2003).
 * 25 items Likert 1-5, somme simple : 25-125, sans seuil fourni par les auteurs.
 * Cinq sous-échelles de 5 items (fiche de cotation du laboratoire Dugas, UQO).
 * Les indices ci-dessous sont 1-based (numéros d'items du formulaire).
 */
const SUBSCALES: { key: string; label: string; items: number[] }[] = [
  {
    key: 'resolution-problemes',
    label: "S'inquiéter aide à résoudre les problèmes",
    items: [3, 5, 9, 14, 21],
  },
  {
    key: 'motivation',
    label: "S'inquiéter aide à se motiver",
    items: [8, 15, 16, 18, 19],
  },
  {
    key: 'protection-emotions',
    label:
      "S'inquiéter aide l'individu à se prémunir de vivre des émotions difficiles si un événement s'avère négatif",
    items: [2, 4, 13, 22, 23],
  },
  {
    key: 'prevention-evenements',
    label: "S'inquiéter en soi prévient les événements négatifs",
    items: [6, 11, 17, 20, 24],
  },
  {
    key: 'trait-personnalite',
    label: "S'inquiéter est un trait de personnalité positif",
    items: [1, 7, 10, 12, 25],
  },
];

function sumItems(values: number[], oneBasedItems: number[]): number {
  return oneBasedItems.reduce((s, item) => s + (values[item - 1] ?? 0), 0);
}

export function scorePsiII(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'intensity_');
  const totalScore = values.reduce((s, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);

  const subscores: Subscore[] = SUBSCALES.map((sub) => ({
    key: sub.key,
    label: sub.label,
    value: sumItems(values, sub.items),
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
