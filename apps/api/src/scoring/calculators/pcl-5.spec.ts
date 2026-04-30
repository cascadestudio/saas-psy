import { getScaleById } from '@melya/core';
import { calculatePcl5Score } from './pcl-5';

const scale = getScaleById('traumatismes-pcl5');

function score(values: number[]) {
  const responses: Record<string, number> = {};
  values.forEach((v, i) => (responses[`intensity_${i}`] = v));
  return calculatePcl5Score(scale, responses);
}

describe('PCL-5 scoring', () => {
  describe('limits', () => {
    it('T1 — all zeros', () => {
      const r = score(Array(20).fill(0));
      expect(r.totalScore).toBe(0);
      expect(r.subscoreClusterB).toBe(0);
      expect(r.subscoreClusterC).toBe(0);
      expect(r.subscoreClusterD).toBe(0);
      expect(r.subscoreClusterE).toBe(0);
      expect(r.diagnosticProvisoireDSM5).toBe(false);
      expect(r.interpretation).toBe(
        'Pas de trouble de stress post-traumatique',
      );
    });
    it('T2 — all 4', () => {
      const r = score(Array(20).fill(4));
      expect(r.totalScore).toBe(80);
      expect(r.subscoreClusterB).toBe(20);
      expect(r.subscoreClusterC).toBe(8);
      expect(r.subscoreClusterD).toBe(28);
      expect(r.subscoreClusterE).toBe(24);
      expect(r.diagnosticProvisoireDSM5).toBe(true);
      expect(r.interpretation).toBe(
        "Présence éventuelle d'un trouble de stress post-traumatique",
      );
    });
  });

  describe('threshold transitions (32)', () => {
    it('T3 — score 31 → no TSPT', () => {
      const r = score([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0]);
      expect(r.totalScore).toBe(31);
      expect(r.interpretation).toBe(
        'Pas de trouble de stress post-traumatique',
      );
    });
    it('T4 — score 32 → TSPT au seuil de dépistage', () => {
      const r = score([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0]);
      expect(r.totalScore).toBe(32);
      expect(r.interpretation).toBe(
        "Présence éventuelle d'un trouble de stress post-traumatique",
      );
    });
  });

  describe('cluster subscores isolation', () => {
    it('cluster B max only', () => {
      const v = Array(20).fill(0);
      [0, 1, 2, 3, 4].forEach((i) => (v[i] = 4));
      const r = score(v);
      expect(r.subscoreClusterB).toBe(20);
      expect(r.subscoreClusterC).toBe(0);
      expect(r.subscoreClusterD).toBe(0);
      expect(r.subscoreClusterE).toBe(0);
      expect(r.diagnosticProvisoireDSM5).toBe(false);
    });
    it('cluster C max only', () => {
      const v = Array(20).fill(0);
      [5, 6].forEach((i) => (v[i] = 4));
      const r = score(v);
      expect(r.subscoreClusterC).toBe(8);
      expect(r.diagnosticProvisoireDSM5).toBe(false);
    });
    it('cluster D max only', () => {
      const v = Array(20).fill(0);
      [7, 8, 9, 10, 11, 12, 13].forEach((i) => (v[i] = 4));
      const r = score(v);
      expect(r.subscoreClusterD).toBe(28);
      expect(r.diagnosticProvisoireDSM5).toBe(false);
    });
    it('cluster E max only', () => {
      const v = Array(20).fill(0);
      [14, 15, 16, 17, 18, 19].forEach((i) => (v[i] = 4));
      const r = score(v);
      expect(r.subscoreClusterE).toBe(24);
      expect(r.diagnosticProvisoireDSM5).toBe(false);
    });
  });

  describe('diagnostic provisoire DSM-5 — symptom count', () => {
    it('T12 — chaque critère tout juste rempli', () => {
      const r = score([2, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0]);
      expect(r.totalScore).toBe(12);
      expect(r.diagnosticProvisoireDSM5).toBe(true);
    });
    it('T13 — B insuffisant', () => {
      const r = score([0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0]);
      expect(r.diagnosticProvisoireDSM5).toBe(false);
    });
    it('T14 — C insuffisant', () => {
      const r = score([2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0]);
      expect(r.diagnosticProvisoireDSM5).toBe(false);
    });
    it('T15 — D insuffisant', () => {
      const r = score([2, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0]);
      expect(r.diagnosticProvisoireDSM5).toBe(false);
    });
    it('T16 — E insuffisant', () => {
      const r = score([2, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0]);
      expect(r.diagnosticProvisoireDSM5).toBe(false);
    });
    it('T17 — items à 1 ne comptent pas comme endossés', () => {
      const r = score([1, 1, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0]);
      expect(r.diagnosticProvisoireDSM5).toBe(false);
    });
    it('T18 — bascule item 2 de 1 à 2 → diag true', () => {
      const r = score([1, 2, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0]);
      expect(r.diagnosticProvisoireDSM5).toBe(true);
    });
  });

  describe('divergence seuil/diag', () => {
    it('T19 — score bas mais diag DSM-5 true', () => {
      const r = score([2, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0]);
      expect(r.totalScore).toBe(12);
      expect(r.interpretation).toBe(
        'Pas de trouble de stress post-traumatique',
      );
      expect(r.diagnosticProvisoireDSM5).toBe(true);
    });
    it('T20 — score haut mais diag DSM-5 false', () => {
      const r = score([4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      expect(r.totalScore).toBe(35);
      expect(r.interpretation).toBe(
        "Présence éventuelle d'un trouble de stress post-traumatique",
      );
      expect(r.diagnosticProvisoireDSM5).toBe(false);
    });
  });
});
