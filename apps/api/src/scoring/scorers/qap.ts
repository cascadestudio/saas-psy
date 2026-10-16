import { Scale, ScoreResult } from '@melya/core';
import { collectByPrefix, resolveSeverity } from './helpers';

/**
 * QAP (Questionnaire d'attitude face aux problèmes, Gosselin et al. 2005).
 * 12 items Likert 1-5, mesure unifactorielle sans item inversé : somme 12-60,
 * sans seuil fourni par les auteurs (fiche de cotation du laboratoire Dugas, UQO).
 */
export function scoreQap(
  scale: Scale,
  responses: Record<string, unknown>,
): ScoreResult {
  const values = collectByPrefix(responses, 'intensity_');
  const totalScore = values.reduce((s, v) => s + (v ?? 0), 0);
  const severity = resolveSeverity(scale, totalScore);

  return {
    totalScore,
    maxScore: scale.scoring.maxScore,
    interpretation: severity.interpretation,
    severityIndex: severity.severityIndex,
    severityRangeCount: severity.severityRangeCount,
  };
}
