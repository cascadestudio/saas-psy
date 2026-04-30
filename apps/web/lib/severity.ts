/**
 * Maps a severity index (from ScoreResult.severityIndex) to a Tailwind color
 * palette. Lower index = better health for symptom scales; for scales where
 * higher = better (RSES), the backend already inverts the index meaning so the
 * front always reads it the same way.
 */

export type SeverityPalette = {
  badge: string;
  badgeText: string;
  gaugeFill: string;
  gaugeFillMuted: string;
};

const PALETTES: Record<string, SeverityPalette> = {
  emerald: {
    badge: "text-foreground",
    badgeText: "text-emerald-700",
    gaugeFill: "bg-emerald-500",
    gaugeFillMuted: "bg-emerald-200",
  },
  lime: {
    badge: "text-foreground",
    badgeText: "text-lime-700",
    gaugeFill: "bg-lime-500",
    gaugeFillMuted: "bg-lime-200",
  },
  amber: {
    badge: "text-foreground",
    badgeText: "text-amber-700",
    gaugeFill: "bg-amber-500",
    gaugeFillMuted: "bg-amber-200",
  },
  orange: {
    badge: "text-foreground",
    badgeText: "text-orange-700",
    gaugeFill: "bg-orange-500",
    gaugeFillMuted: "bg-orange-200",
  },
  red: {
    badge: "text-foreground",
    badgeText: "text-red-700",
    gaugeFill: "bg-red-500",
    gaugeFillMuted: "bg-red-200",
  },
  neutral: {
    badge: "text-foreground",
    badgeText: "text-muted-foreground",
    gaugeFill: "bg-muted-foreground",
    gaugeFillMuted: "bg-muted",
  },
};

const PALETTE_BY_COUNT: Record<number, string[]> = {
  1: ["neutral"],
  2: ["emerald", "red"],
  3: ["emerald", "amber", "red"],
  4: ["emerald", "amber", "orange", "red"],
  5: ["emerald", "lime", "amber", "orange", "red"],
};

export function getSeverityPalette(
  index: number,
  count: number,
): SeverityPalette {
  if (index < 0 || count <= 0) return PALETTES.neutral;
  const keys = PALETTE_BY_COUNT[count] ?? PALETTE_BY_COUNT[5];
  const key = keys[Math.min(index, keys.length - 1)] ?? "neutral";
  return PALETTES[key];
}
