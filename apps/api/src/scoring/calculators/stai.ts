import { ScoreResult } from '../types';

function getSTAIInterpretation(score: number): string {
  if (score <= 35) return 'Anxiété très faible';
  if (score <= 45) return 'Anxiété faible';
  if (score <= 55) return 'Anxiété modérée';
  if (score <= 65) return 'Anxiété élevée';
  return 'Anxiété très élevée';
}

export function calculateSTAIScore(
  _scale: any,
  responses: Record<string, any>,
): ScoreResult {
  const stateValues = Object.entries(responses)
    .filter(([key]) => key.startsWith('intensity_0_'))
    .map(([, value]) => parseInt(String(value), 10));

  const traitValues = Object.entries(responses)
    .filter(([key]) => key.startsWith('intensity_1_'))
    .map(([, value]) => parseInt(String(value), 10));

  const stateScore = stateValues.reduce((sum, v) => sum + v, 0);
  const traitScore = traitValues.reduce((sum, v) => sum + v, 0);

  return {
    totalScore: stateScore + traitScore,
    stateScore,
    traitScore,
    interpretation: {
      trait: getSTAIInterpretation(traitScore),
      state: getSTAIInterpretation(stateScore),
    },
    maxTotal: 160,
    maxState: 80,
    maxTrait: 80,
  };
}
