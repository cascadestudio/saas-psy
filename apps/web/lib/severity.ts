/**
 * Maps a score to a severity index given the scale's ranges, and exposes a
 * semantic color palette for visual rendering of the verdict.
 *
 * Assumes lower = better (true for all symptom scales: PHQ-9, GAD-7, PCL-5,
 * Y-BOCS, LSAS). For scales where higher = better (RSES), no severity coloring
 * is applied (those scales have no ranges in scalesData).
 */

export type Range = { min: number; max: number; interpretation: string };

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

export function getSeverityIndex(
  score: number | undefined,
  ranges: Range[] | undefined,
): number | null {
  if (score === undefined || !ranges || ranges.length === 0) return null;
  const idx = ranges.findIndex((r) => score >= r.min && score <= r.max);
  return idx === -1 ? null : idx;
}

export function getSeverityPalette(
  index: number | null,
  count: number,
): SeverityPalette {
  if (index === null) return PALETTES.neutral;
  const keys = PALETTE_BY_COUNT[count] ?? PALETTE_BY_COUNT[5];
  const key = keys[Math.min(index, keys.length - 1)] ?? "neutral";
  return PALETTES[key];
}

export function getRangePalette(
  rangeIndex: number,
  count: number,
): SeverityPalette {
  return getSeverityPalette(rangeIndex, count);
}
