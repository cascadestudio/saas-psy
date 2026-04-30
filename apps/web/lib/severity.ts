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
    badge: "bg-emerald-100 text-emerald-900 border-emerald-300",
    badgeText: "text-emerald-700",
    gaugeFill: "bg-emerald-500",
    gaugeFillMuted: "bg-emerald-200",
  },
  lime: {
    badge: "bg-lime-100 text-lime-900 border-lime-300",
    badgeText: "text-lime-700",
    gaugeFill: "bg-lime-500",
    gaugeFillMuted: "bg-lime-200",
  },
  amber: {
    badge: "bg-amber-100 text-amber-900 border-amber-300",
    badgeText: "text-amber-700",
    gaugeFill: "bg-amber-500",
    gaugeFillMuted: "bg-amber-200",
  },
  orange: {
    badge: "bg-orange-100 text-orange-900 border-orange-300",
    badgeText: "text-orange-700",
    gaugeFill: "bg-orange-500",
    gaugeFillMuted: "bg-orange-200",
  },
  red: {
    badge: "bg-red-100 text-red-900 border-red-300",
    badgeText: "text-red-700",
    gaugeFill: "bg-red-500",
    gaugeFillMuted: "bg-red-200",
  },
  neutral: {
    badge: "bg-muted text-foreground border-border",
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
