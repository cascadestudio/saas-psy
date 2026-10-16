import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * SCARED-R-51 (© Martin & Gosselin 2011, d'après Muris et al.).
 * 51 items 0-2, somme 0-102, dix sous-scores, sans seuil.
 */
const SUBSCALES: { key: string; label: string; items: number[] }[] = [
  { key: 'panique', label: "Trouble panique", items: [1, 9, 14, 27, 35, 42, 45] },
  { key: 'anxiete-generalisee', label: "Trouble d'anxiété généralisée", items: [8, 17, 29, 30, 36, 41, 43] },
  { key: 'anxiete-separation', label: "Anxiété de séparation", items: [7, 10, 15, 24, 32, 37, 38] },
  { key: 'phobie-sociale', label: "Phobie sociale", items: [4, 11, 34, 39] },
  { key: 'toc', label: "Trouble obsessionnel-compulsif", items: [6, 20, 22, 40, 47] },
  { key: 'tspt', label: "Trouble de stress post-traumatique", items: [21, 31, 33, 49] },
  { key: 'phobie-scolaire', label: "Phobie scolaire", items: [3, 13, 25, 44] },
  { key: 'phobie-animaux', label: "Phobie des animaux", items: [18, 28, 50] },
  { key: 'phobie-situationnelle', label: "Phobie de type situationnel", items: [2, 19, 23, 46, 48] },
  { key: 'phobie-soins-medicaux', label: "Phobie des soins médicaux", items: [5, 12, 16, 26, 51] },
];

export function scoreScaredR(
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
    max: sub.items.length * 2,
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
