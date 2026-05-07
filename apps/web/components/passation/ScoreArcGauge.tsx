import type { Scale } from "@melya/core";
import { getSeverityPalette } from "@/lib/severity";

type Props = {
  scale: Scale;
  score: number;
  maxScore?: number;
  severityIndex: number;
  interpretation?: string | null;
};

const ARC_DEGREES = 180;
const START_ANGLE = -90;
const SIZE = 300;
const STROKE = 18;
const SEGMENT_GAP_DEG = 10;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
) {
  const start = polar(cx, cy, r, startDeg);
  const end = polar(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export function ScoreArcGauge({
  scale,
  score,
  maxScore,
  severityIndex,
  interpretation,
}: Props) {
  const ranges = scale.scoring.ranges;
  const totalMin = ranges[0]?.min ?? 0;
  const totalMax = ranges[ranges.length - 1]?.max ?? scale.scoring.maxScore;
  const span = totalMax - totalMin;
  const denom = span + 1;

  const pct =
    span > 0 ? Math.min(1, Math.max(0, (score - totalMin) / span)) : 0;

  const hasSeverity = ranges.length > 1 && severityIndex >= 0;

  const radius = (SIZE - STROKE) / 2;
  const cx = SIZE / 2;
  const cy = SIZE / 2;

  const markerAngle = START_ANGLE + pct * ARC_DEGREES;
  const marker = polar(cx, cy, radius, markerAngle);

  let cursor = 0;
  const segments = ranges.map((r, i) => {
    const frac = (r.max - r.min + 1) / denom;
    const segStart = START_ANGLE + cursor * ARC_DEGREES;
    const segEnd = START_ANGLE + (cursor + frac) * ARC_DEGREES;
    cursor += frac;
    const palette = getSeverityPalette(i, ranges.length, scale.higherIsBetter);
    const a = segStart + SEGMENT_GAP_DEG / 2;
    const b = segEnd - SEGMENT_GAP_DEG / 2;
    return {
      d: arcPath(cx, cy, radius, a, b),
      color: palette.arcText,
      key: i,
    };
  });

  return (
    <div className="max-w-[200px] sm:max-w-[300px] mx-auto w-full">
      <div className="flex flex-col items-center">
        <div className="relative w-full pb-10 sm:pb-4">
          <svg
            width="100%"
            height="auto"
            viewBox={`0 0 ${SIZE} ${SIZE / 2 + STROKE + 12}`}
            className="block overflow-visible"
          >
            {ranges.length > 1 ? (
              segments.map((s) => (
                <path
                  key={s.key}
                  d={s.d}
                  fill="none"
                  className={s.color}
                  stroke="currentColor"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                />
              ))
            ) : (
              <>
                <path
                  d={arcPath(
                    cx,
                    cy,
                    radius,
                    START_ANGLE,
                    START_ANGLE + ARC_DEGREES,
                  )}
                  fill="none"
                  className="text-foreground/10"
                  stroke="currentColor"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                />
                {pct > 0 && (
                  <path
                    d={arcPath(
                      cx,
                      cy,
                      radius,
                      START_ANGLE,
                      START_ANGLE + pct * ARC_DEGREES,
                    )}
                    fill="none"
                    className="text-brand-orange/30"
                    stroke="currentColor"
                    strokeWidth={STROKE}
                    strokeLinecap="round"
                  />
                )}
              </>
            )}
            {hasSeverity && (
              <circle
                cx={marker.x}
                cy={marker.y}
                r={STROKE / 2 + 3}
                fill="white"
                className="text-brand-orange"
                stroke="currentColor"
                strokeWidth={6}
              />
            )}
            {ranges.length >= 2 &&
              (() => {
                let cumulative = 0;
                return ranges.slice(0, -1).map((r, i) => {
                  cumulative += (r.max - r.min + 1) / denom;
                  const boundaryAngle =
                    START_ANGLE + cumulative * ARC_DEGREES;
                  const tickInner = polar(
                    cx,
                    cy,
                    radius - STROKE / 2 - 2,
                    boundaryAngle,
                  );
                  const tickOuter = polar(
                    cx,
                    cy,
                    radius + STROKE / 2 + 4,
                    boundaryAngle,
                  );
                  const labelPos = polar(
                    cx,
                    cy,
                    radius + STROKE / 2 + 18,
                    boundaryAngle,
                  );
                  return (
                    <g key={i}>
                      <line
                        x1={tickInner.x}
                        y1={tickInner.y}
                        x2={tickOuter.x}
                        y2={tickOuter.y}
                        className="stroke-muted-foreground/40"
                        strokeWidth={1.5}
                      />
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-muted-foreground tabular-nums"
                        fontSize="12"
                      >
                        {ranges[i + 1].min}
                      </text>
                    </g>
                  );
                });
              })()}
          </svg>
          <div
            className="absolute inset-x-0 flex flex-col items-center"
            style={{ top: "28%" }}
          >
            <div className="flex items-baseline gap-1.5">
              <span
                className={"text-7xl font-semibold tabular-nums leading-none"}
              >
                {score}
              </span>
              {maxScore !== undefined && (
                <span className="text-base text-muted-foreground tabular-nums">
                  / {maxScore}
                </span>
              )}
            </div>
            {interpretation && (
              <span className="mt-4 text-base font-medium text-foreground text-center max-w-[140px] sm:max-w-[200px]">
                {interpretation}
              </span>
            )}
          </div>
        </div>
        {ranges.length >= 2 && (
          <ul className="mt-4 flex flex-col gap-1 text-xs text-muted-foreground">
            {ranges.slice(1).map((r) => (
              <li key={r.min} className="flex items-baseline gap-2">
                <span className="tabular-nums">≥ {r.min}</span>
                <span>—</span>
                <span>{r.interpretation}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

type MiniProps = {
  value: number;
  max?: number;
  label: string;
};

const MINI_SIZE = 64;
const MINI_STROKE = 6;

export function MiniScoreArc({ value, max, label }: MiniProps) {
  const pct = max && max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const radius = (MINI_SIZE - MINI_STROKE) / 2;
  const cx = MINI_SIZE / 2;
  const cy = MINI_SIZE / 2;
  const fullEnd = START_ANGLE + ARC_DEGREES;
  const fillEnd = START_ANGLE + pct * ARC_DEGREES;

  return (
    <svg
      width={MINI_SIZE}
      height={MINI_SIZE}
      viewBox={`0 0 ${MINI_SIZE} ${MINI_SIZE}`}
      role="img"
      aria-label={label}
      className="block"
    >
      <path
        d={arcPath(cx, cy, radius, START_ANGLE, fullEnd)}
        fill="none"
        className="text-foreground/15"
        stroke="currentColor"
        strokeWidth={MINI_STROKE}
        strokeLinecap="round"
      />
      {pct > 0 && (
        <path
          d={arcPath(cx, cy, radius, START_ANGLE, fillEnd)}
          fill="none"
          className="text-foreground/70"
          stroke="currentColor"
          strokeWidth={MINI_STROKE}
          strokeLinecap="round"
        />
      )}
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        className="tabular-nums"
        fontSize="11"
        fontWeight="600"
      >
        <tspan className="fill-foreground">{value}</tspan>
        {max !== undefined && (
          <tspan className="fill-foreground/40" fontWeight="400">
            /{max}
          </tspan>
        )}
      </text>
    </svg>
  );
}
