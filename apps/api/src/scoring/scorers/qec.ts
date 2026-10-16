import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * QEC (Questionnaire d'évitement cognitif, Gosselin et al. 2002).
 * 25 items Likert 1-5, somme 25-125 (usage unifactoriel), sans seuil fourni
 * par les auteurs. Cinq sous-échelles de 5 items (fiche de cotation du
 * laboratoire Dugas, UQO). Indices 1-based (numéros d'items du formulaire).
 */
const SUBSCALES: { key: string; label: string; items: number[] }[] = [
  {
    key: 'substitution',
    label: 'Substitution de pensées',
    items: [4, 11, 17, 20, 25],
  },
  {
    key: 'transformation-images',
    label: 'Transformation des images en pensées',
    items: [3, 15, 19, 23, 24],
  },
  { key: 'distraction', label: 'Distraction', items: [8, 10, 12, 13, 21] },
  {
    key: 'evitement-stimuli',
    label: 'Évitement des stimuli menaçants',
    items: [7, 9, 16, 18, 22],
  },
  {
    key: 'suppression',
    label: 'Suppression de pensées',
    items: [1, 2, 5, 6, 14],
  },
];

function sumItems(values: number[], oneBasedItems: number[]): number {
  return oneBasedItems.reduce((s, item) => s + (values[item - 1] ?? 0), 0);
}

export function scoreQec(
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
