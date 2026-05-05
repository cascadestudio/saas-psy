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
  brand1: {
    badge: "text-foreground",
    badgeText: "text-brand-orange",
    gaugeFill: "bg-brand-orange/30",
    gaugeFillMuted: "bg-brand-orange/10",
    arcText: "text-brand-orange/30",
    pillBg: "bg-brand-orange/10",
  },
  brand2: {
    badge: "text-foreground",
    badgeText: "text-brand-orange",
    gaugeFill: "bg-brand-orange/50",
    gaugeFillMuted: "bg-brand-orange/10",
    arcText: "text-brand-orange/50",
    pillBg: "bg-brand-orange/15",
  },
  brand3: {
    badge: "text-foreground",
    badgeText: "text-brand-orange",
    gaugeFill: "bg-brand-orange/70",
    gaugeFillMuted: "bg-brand-orange/10",
    arcText: "text-brand-orange/70",
    pillBg: "bg-brand-orange/20",
  },
  brand4: {
    badge: "text-foreground",
    badgeText: "text-brand-orange",
    gaugeFill: "bg-brand-orange/85",
    gaugeFillMuted: "bg-brand-orange/10",
    arcText: "text-brand-orange/85",
    pillBg: "bg-brand-orange/25",
  },
  brand5: {
    badge: "text-foreground",
    badgeText: "text-brand-orange",
    gaugeFill: "bg-brand-orange",
    gaugeFillMuted: "bg-brand-orange/10",
    arcText: "text-brand-orange",
    pillBg: "bg-brand-orange/30",
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
  2: ["brand2", "brand5"],
  3: ["brand2", "brand4", "brand5"],
  4: ["brand1", "brand3", "brand4", "brand5"],
  5: ["brand1", "brand2", "brand3", "brand4", "brand5"],
};

export function getSeverityPalette(
  index: number,
  count: number,
  higherIsBetter = false,
): SeverityPalette {
  if (index < 0 || count <= 0) return PALETTES.neutral;
  const keys = PALETTE_BY_COUNT[count] ?? PALETTE_BY_COUNT[5];
  const clampedIndex = Math.min(index, keys.length - 1);
  const effectiveIndex = higherIsBetter ? keys.length - 1 - clampedIndex : clampedIndex;
  const key = keys[effectiveIndex] ?? "neutral";
  return PALETTES[key];
}
