/**
 * Utilities for displaying scores stored as ScoreResult from the backend.
 */

export interface StoredScore {
  totalScore: number;
  maxTotal: number;
  interpretation?: string;
  anxietyScore?: number;
  avoidanceScore?: number;
  anxietyPerformanceScore?: number;
  anxietyInteractionScore?: number;
  avoidancePerformanceScore?: number;
  avoidanceInteractionScore?: number;
  obsessionsScore?: number;
  compulsionsScore?: number;
  maxAnxiety?: number;
  maxAvoidance?: number;
  maxObsessions?: number;
  maxCompulsions?: number;
}

const SUBSCORE_LABELS: Record<string, string> = {
  anxietyScore: "Anxiété",
  avoidanceScore: "Évitement",
  anxietyPerformanceScore: "Anxiété performance",
  anxietyInteractionScore: "Anxiété interaction",
  avoidancePerformanceScore: "Évitement performance",
  avoidanceInteractionScore: "Évitement interaction",
  obsessionsScore: "Obsessions",
  compulsionsScore: "Compulsions",
};

// Legacy score labels for old format { total, anxiety, avoidance, ... }
const LEGACY_LABELS: Record<string, string> = {
  total: "Total",
  anxiety: "Anxiété",
  avoidance: "Évitement",
  obsessions: "Obsessions",
  compulsions: "Compulsions",
  stateAnxiety: "Anxiété état",
  traitAnxiety: "Anxiété trait",
};

/**
 * Check if a score is in the new StoredScore format (has totalScore and maxTotal).
 */
function isStoredScore(score: any): score is StoredScore {
  return score && typeof score === "object" && "totalScore" in score && "maxTotal" in score;
}

/**
 * Get the main total score from either new or legacy format.
 */
export function getMainScore(score: number | Record<string, any> | undefined): number | undefined {
  if (score === undefined || score === null) return undefined;
  if (typeof score === "number") return score;
  if (isStoredScore(score)) return score.totalScore;
  // Legacy format
  if ("total" in score) return score.total as number;
  // Sum all numeric values
  const values = Object.values(score).filter((v): v is number => typeof v === "number");
  return values.length > 0 ? values.reduce((a, b) => a + b, 0) : undefined;
}

/**
 * Get the max possible score.
 */
export function getMaxScore(score: number | Record<string, any> | undefined): number | undefined {
  if (score === undefined || score === null) return undefined;
  if (isStoredScore(score)) return score.maxTotal;
  return undefined;
}

/**
 * Get score as percentage (0-100).
 */
export function getScorePercentage(score: number | Record<string, any> | undefined): number {
  const main = getMainScore(score);
  const max = getMaxScore(score);
  if (main === undefined || !max) return 0;
  return Math.round((main / max) * 100);
}

/**
 * Get sub-scores for display.
 */
export function getSubscores(score: number | Record<string, any> | undefined): { label: string; value: number; max?: number }[] {
  if (!score || typeof score !== "object") return [];

  if (isStoredScore(score)) {
    const result: { label: string; value: number; max?: number }[] = [];
    const maxMap: Record<string, string> = {
      anxietyScore: "maxAnxiety",
      avoidanceScore: "maxAvoidance",
      obsessionsScore: "maxObsessions",
      compulsionsScore: "maxCompulsions",
    };

    for (const [key, label] of Object.entries(SUBSCORE_LABELS)) {
      const val = (score as any)[key];
      if (val !== undefined) {
        const maxKey = maxMap[key];
        result.push({ label, value: val, max: maxKey ? (score as any)[maxKey] : undefined });
      }
    }
    return result;
  }

  // Legacy format
  return Object.entries(score)
    .filter(([k]) => k !== "total")
    .map(([k, v]) => ({ label: LEGACY_LABELS[k] || k, value: v as number }));
}

/**
 * Format score for inline display (e.g. in patient list).
 */
export function formatScore(score: number | Record<string, any>): string {
  if (typeof score === "number") return String(score);

  if (isStoredScore(score)) {
    const subs = getSubscores(score);
    if (subs.length === 0) return `${score.totalScore}/${score.maxTotal}`;
    const subStr = subs.map((s) => `${s.label}: ${s.value}${s.max ? `/${s.max}` : ""}`).join(", ");
    return `${score.totalScore}/${score.maxTotal} (${subStr})`;
  }

  // Legacy format
  if ("total" in score) {
    const sub = Object.entries(score)
      .filter(([k]) => k !== "total")
      .map(([k, v]) => `${LEGACY_LABELS[k] || k}: ${v}`)
      .join(", ");
    return sub ? `${score.total} (${sub})` : String(score.total);
  }

  return Object.entries(score)
    .map(([k, v]) => `${LEGACY_LABELS[k] || k}: ${v}`)
    .join(", ");
}

/**
 * Get interpretation text from the stored score, flattening object interpretations.
 */
export function getInterpretation(score: number | Record<string, any> | undefined): string | undefined {
  if (!score || typeof score !== "object") return undefined;
  if (!isStoredScore(score)) return undefined;
  return score.interpretation;
}
