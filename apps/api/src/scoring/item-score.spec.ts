import { getItemScore, Scale, scales } from '@melya/core';
import { ScoringService } from './scoring.service';

/**
 * Le score par item affiché côté praticien (`getItemScore`) doit sommer
 * exactement au `totalScore` calculé par les scorers.
 */

/** Nombre de premiers items comptés dans le total (les suivants sont hors total). */
const TOTAL_ITEMS: Record<string, number> = {
  'bat-g': 22,
  'bat-w': 23,
};

type Item = { key: string; index: number; values: number[] };

function itemsOf(scale: Scale): Item[] {
  if (scale.formType === 'dual-scale') {
    const anxiety = (scale.answerScales?.anxiety ?? []).map((m) => m.value);
    const avoidance = (scale.answerScales?.avoidance ?? []).map((m) => m.value);
    return scale.questions.flatMap((_, i) => [
      { key: `anxiety_${i}`, index: i, values: anxiety },
      { key: `avoidance_${i}`, index: i, values: avoidance },
    ]);
  }
  if (scale.formType === 'options') {
    return scale.questions.map((q: any, i) => ({
      key: `option_${i}`,
      index: i,
      values: (q.options ?? []).map((o: { value: number }) => o.value),
    }));
  }
  const intensity = (scale.answerScales?.intensity ?? []).map((m) => m.value);
  return scale.questions.map((_, i) => ({
    key: `intensity_${i}`,
    index: i,
    values: intensity,
  }));
}

// PRNG déterministe pour des runs reproductibles.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('getItemScore ↔ scorers', () => {
  const service = new ScoringService();
  const scored = scales.filter((scale) => {
    try {
      service.calculateScore(scale.id, {});
      return true;
    } catch (e) {
      return !String(e).includes('No scorer registered');
    }
  });

  it('couvre des échelles', () => {
    expect(scored.length).toBeGreaterThan(30);
  });

  it.each(scored.map((s) => [s.id, s] as const))(
    '%s : la somme des scores par item égale le total',
    (_, scale) => {
      const rand = mulberry32(42);
      const items = itemsOf(scale);
      const lastItem = TOTAL_ITEMS[scale.id] ?? Infinity;
      for (let run = 0; run < 20; run++) {
        const responses: Record<string, number> = {};
        let expected = 0;
        for (const item of items) {
          expect(item.values.length).toBeGreaterThan(0);
          const value = item.values[Math.floor(rand() * item.values.length)];
          responses[item.key] = value;
          if (item.index < lastItem) {
            expected += getItemScore(scale, item.index, value).score;
          }
        }
        expect(service.calculateScore(scale.id, responses).totalScore).toBe(
          expected,
        );
      }
    },
  );
});
