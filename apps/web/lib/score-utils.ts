import type { ScoreResult, Subscore } from "@melya/core";

export function getMainScore(
  score: ScoreResult | null | undefined,
): number | undefined {
  return score?.totalScore;
}

export function getMaxScore(
  score: ScoreResult | null | undefined,
): number | undefined {
  return score?.maxScore;
}

export function getSubscores(
  score: ScoreResult | null | undefined,
): Subscore[] {
  return score?.subscores ?? [];
}

export function getInterpretation(
  score: ScoreResult | null | undefined,
): string | undefined {
  return score?.interpretation || undefined;
}

export function formatScore(score: ScoreResult | null | undefined): string {
  if (!score) return "—";
  const { totalScore, maxScore, subscores } = score;
  if (!subscores || subscores.length === 0) return `${totalScore}/${maxScore}`;
  const subStr = subscores
    .map((s) => `${s.label}: ${s.value}/${s.max}`)
    .join(", ");
  return `${totalScore}/${maxScore} (${subStr})`;
}
