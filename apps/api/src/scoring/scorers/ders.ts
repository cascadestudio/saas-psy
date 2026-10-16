import { Scale, ScoreResult, Subscore } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * DERS-F (Dan-Glauser & Scherer 2013, PDF UNIGE) ; clé Gratz & Roemer 2004 (U. Coimbra).
 * 36 items 1-5, 11 inversés ; somme 36-180 ; 6 sous-scores ; pas de seuil.
 */
const REVERSED = new Set([1, 2, 6, 7, 8, 10, 17, 20, 22, 24, 34]); // numéros d'items (1-based)

const SUBSCALES: { key: string; label: string; items: number[] }[] = [
  { key: 'non-acceptation', label: "Non-acceptation des réponses émotionnelles", items: [11, 12, 21, 23, 25, 29] },
  { key: 'buts', label: "Difficultés à adopter des comportements dirigés vers un but", items: [13, 18, 20, 26, 33] },
  { key: 'impulsivite', label: "Difficultés de contrôle des impulsions", items: [3, 14, 19, 24, 27, 32] },
  { key: 'conscience', label: "Manque de conscience émotionnelle", items: [2, 6, 8, 10, 17, 34] },
  { key: 'strategies', label: "Accès limité aux stratégies de régulation émotionnelle", items: [15, 16, 22, 28, 30, 31, 35, 36] },
  { key: 'clarte', label: "Manque de clarté émotionnelle", items: [1, 4, 5, 7, 9] },
];

export function scoreDers(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const raw = collectByPrefix(responses, 'intensity_');
  const values = raw.map((v, i) => (v == null ? v : REVERSED.has(i + 1) ? 6 - v : v));
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
