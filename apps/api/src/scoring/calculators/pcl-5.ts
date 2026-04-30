import { ScoreResult } from '../types';
import { getInterpretation } from './utils';

const CLUSTER_B_INDICES = [0, 1, 2, 3, 4]; // items 1-5
const CLUSTER_C_INDICES = [5, 6]; // items 6-7
const CLUSTER_D_INDICES = [7, 8, 9, 10, 11, 12, 13]; // items 8-14
const CLUSTER_E_INDICES = [14, 15, 16, 17, 18, 19]; // items 15-20

const ENDORSEMENT_THRESHOLD = 2;

function sumIndices(values: number[], indices: number[]): number {
  return indices.reduce((sum, i) => sum + (values[i] ?? 0), 0);
}

function endorsedCount(values: number[], indices: number[]): number {
  return indices.reduce(
    (count, i) => count + ((values[i] ?? 0) >= ENDORSEMENT_THRESHOLD ? 1 : 0),
    0,
  );
}

export function calculatePcl5Score(
  scale: any,
  responses: Record<string, any>,
): ScoreResult {
  const values: number[] = [];
  for (let i = 0; i < 20; i++) {
    const v = parseInt(String(responses[`intensity_${i}`]), 10);
    values.push(Number.isFinite(v) ? v : 0);
  }

  const totalScore = values.reduce((sum, v) => sum + v, 0);
  const maxTotal = 80;

  const subscoreClusterB = sumIndices(values, CLUSTER_B_INDICES);
  const subscoreClusterC = sumIndices(values, CLUSTER_C_INDICES);
  const subscoreClusterD = sumIndices(values, CLUSTER_D_INDICES);
  const subscoreClusterE = sumIndices(values, CLUSTER_E_INDICES);

  const diagnosticProvisoireDSM5 =
    endorsedCount(values, CLUSTER_B_INDICES) >= 1 &&
    endorsedCount(values, CLUSTER_C_INDICES) >= 1 &&
    endorsedCount(values, CLUSTER_D_INDICES) >= 2 &&
    endorsedCount(values, CLUSTER_E_INDICES) >= 2;

  return {
    totalScore,
    maxTotal,
    interpretation: getInterpretation(scale, totalScore),
    subscoreClusterB,
    subscoreClusterC,
    subscoreClusterD,
    subscoreClusterE,
    maxClusterB: 20,
    maxClusterC: 8,
    maxClusterD: 28,
    maxClusterE: 24,
    diagnosticProvisoireDSM5,
  };
}
