import { getScaleById } from '@melya/core';
import { calculateSingleScaleScore } from './single-scale';

const scale = getScaleById('phq-9');

function score(values: number[]) {
  const responses: Record<string, number> = {};
  values.forEach((v, i) => (responses[`intensity_${i}`] = v));
  return calculateSingleScaleScore(scale, responses);
}

describe('PHQ-9 scoring', () => {
  describe('limits', () => {
    it('T1 — all zeros', () => {
      const r = score([0, 0, 0, 0, 0, 0, 0, 0, 0]);
      expect(r.totalScore).toBe(0);
      expect(r.interpretation).toBe('Dépression minimale');
      expect(r.alerteSuicide).toBe(false);
    });
    it('T2 — all maxed (3)', () => {
      const r = score([3, 3, 3, 3, 3, 3, 3, 3, 3]);
      expect(r.totalScore).toBe(27);
      expect(r.interpretation).toBe('Dépression sévère');
      expect(r.alerteSuicide).toBe(true);
    });
  });

  describe('threshold transitions', () => {
    const cases: [number[], number, string][] = [
      [[1, 1, 1, 1, 0, 0, 0, 0, 0], 4, 'Dépression minimale'],
      [[1, 1, 1, 1, 1, 0, 0, 0, 0], 5, 'Dépression légère'],
      [[2, 1, 1, 1, 1, 1, 1, 1, 0], 9, 'Dépression légère'],
      [[2, 2, 2, 2, 2, 0, 0, 0, 0], 10, 'Dépression modérée'],
      [[2, 2, 2, 2, 2, 2, 1, 1, 0], 14, 'Dépression modérée'],
      [[2, 2, 2, 2, 2, 2, 1, 2, 0], 15, 'Dépression modérément sévère'],
      [[3, 3, 3, 2, 2, 2, 2, 2, 0], 19, 'Dépression modérément sévère'],
      [[3, 3, 3, 3, 2, 2, 2, 2, 0], 20, 'Dépression sévère'],
    ];
    it.each(cases)('answers %j → score %i, %s', (answers, expected, interp) => {
      const r = score(answers);
      expect(r.totalScore).toBe(expected);
      expect(r.interpretation).toBe(interp);
      expect(r.alerteSuicide).toBe(false);
    });
  });

  describe('alerte suicide (item 9 ≥ 1)', () => {
    it('T13 — item 9 = 1, all others 0', () => {
      const r = score([0, 0, 0, 0, 0, 0, 0, 0, 1]);
      expect(r.totalScore).toBe(1);
      expect(r.alerteSuicide).toBe(true);
    });
    it('T15 — item 9 = 1, score moyen', () => {
      const r = score([2, 2, 2, 0, 0, 0, 0, 0, 1]);
      expect(r.alerteSuicide).toBe(true);
    });
    it('item 9 = 0 → pas d\'alerte', () => {
      const r = score([3, 3, 3, 3, 0, 0, 0, 0, 0]);
      expect(r.alerteSuicide).toBe(false);
    });
  });
});
