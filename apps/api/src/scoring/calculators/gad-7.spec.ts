import { getScaleById } from '@melya/core';
import { calculateSingleScaleScore } from './single-scale';

const scale = getScaleById('gad-7');

function score(values: number[]) {
  const responses: Record<string, number> = {};
  values.forEach((v, i) => (responses[`intensity_${i}`] = v));
  return calculateSingleScaleScore(scale, responses);
}

describe('GAD-7 scoring', () => {
  describe('limits', () => {
    it('T1 — all zeros', () => {
      const r = score([0, 0, 0, 0, 0, 0, 0]);
      expect(r.totalScore).toBe(0);
      expect(r.interpretation).toBe('Anxiété minimale');
    });
    it('T2 — all maxed', () => {
      const r = score([3, 3, 3, 3, 3, 3, 3]);
      expect(r.totalScore).toBe(21);
      expect(r.interpretation).toBe('Anxiété sévère');
    });
  });

  describe('threshold transitions', () => {
    const cases: [number[], number, string][] = [
      [[1, 1, 1, 1, 0, 0, 0], 4, 'Anxiété minimale'],
      [[1, 1, 1, 1, 1, 0, 0], 5, 'Anxiété légère'],
      [[2, 2, 2, 1, 1, 1, 0], 9, 'Anxiété légère'],
      [[2, 2, 2, 2, 1, 1, 0], 10, 'Anxiété modérée'],
      [[3, 3, 2, 2, 2, 2, 0], 14, 'Anxiété modérée'],
      [[3, 3, 3, 2, 2, 2, 0], 15, 'Anxiété sévère'],
    ];
    it.each(cases)('answers %j → score %i, %s', (answers, expected, interp) => {
      const r = score(answers);
      expect(r.totalScore).toBe(expected);
      expect(r.interpretation).toBe(interp);
    });
  });

  it('does not set alerteSuicide for GAD-7', () => {
    const r = score([3, 3, 3, 3, 3, 3, 3]);
    expect(r.alerteSuicide).toBeUndefined();
  });
});
