import type { Scale } from "@melya/core";
import { getSeverityPalette } from "@/lib/severity";

type Props = {
  scale: Scale;
  score: number;
  severityIndex: number;
};

/**
 * Horizontal segmented gauge: one segment per scale.scoring.range, colored
 * with the severity palette, with a marker at the current score's position.
 *
 * Hidden when there's only one range (e.g. RSES) or no usable score.
 */
export function SeverityGauge({ scale, score, severityIndex }: Props) {
  const ranges = scale.scoring.ranges;
  if (ranges.length <= 1) return null;

  const totalMin = ranges[0].min;
  const totalMax = ranges[ranges.length - 1].max;
  const span = totalMax - totalMin;
  if (span <= 0) return null;

  const markerPct = Math.min(
    100,
    Math.max(0, ((score - totalMin) / span) * 100),
  );

  return (
    <div>
      <div className="flex h-2.5 rounded-full overflow-hidden ring-1 ring-border">
        {ranges.map((r, i) => {
          const widthPct = ((r.max - r.min + 1) / (span + 1)) * 100;
          const palette = getSeverityPalette(i, ranges.length);
          const isActive = i === severityIndex;
          return (
            <div
              key={i}
              className={`h-full ${
                isActive ? palette.gaugeFill : palette.gaugeFillMuted
              }`}
              style={{ width: `${widthPct}%` }}
              title={`${r.interpretation} (${r.min}–${r.max})`}
            />
          );
        })}
      </div>
      <div className="relative h-3 mt-1">
        <div
          className="absolute -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${markerPct}%` }}
        >
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-foreground" />
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
        <span>{totalMin}</span>
        <span>{totalMax}</span>
      </div>
    </div>
  );
}
