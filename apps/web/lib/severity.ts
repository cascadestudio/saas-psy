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
  /** Tailwind text-* utility — used as currentColor for SVG strokes/fills. */
  arcText: string;
  /** Soft tinted background for interpretation pills. */
  pillBg: string;
};

const PALETTES: Record<string, SeverityPalette> = {
  emerald: {
    badge: "text-foreground",
    badgeText: "text-emerald-700",
    gaugeFill: "bg-emerald-500",
    gaugeFillMuted: "bg-emerald-200",
    arcText: "text-emerald-500",
    pillBg: "bg-emerald-100",
  },
  lime: {
    badge: "text-foreground",
    badgeText: "text-lime-700",
    gaugeFill: "bg-lime-500",
    gaugeFillMuted: "bg-lime-200",
    arcText: "text-lime-500",
    pillBg: "bg-lime-100",
  },
  amber: {
    badge: "text-foreground",
    badgeText: "text-amber-700",
    gaugeFill: "bg-amber-500",
    gaugeFillMuted: "bg-amber-200",
    arcText: "text-amber-500",
    pillBg: "bg-amber-100",
  },
  orange: {
    badge: "text-foreground",
    badgeText: "text-orange-700",
    gaugeFill: "bg-orange-500",
    gaugeFillMuted: "bg-orange-200",
    arcText: "text-orange-500",
    pillBg: "bg-orange-100",
  },
  red: {
    badge: "text-foreground",
    badgeText: "text-red-700",
    gaugeFill: "bg-red-500",
    gaugeFillMuted: "bg-red-200",
    arcText: "text-red-500",
    pillBg: "bg-red-100",
  },
  neutral: {
    badge: "text-foreground",
    badgeText: "text-muted-foreground",
    gaugeFill: "bg-muted-foreground",
    gaugeFillMuted: "bg-muted",
    arcText: "text-muted-foreground",
    pillBg: "bg-muted",
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
