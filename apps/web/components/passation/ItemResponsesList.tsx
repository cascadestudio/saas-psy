import { Badge } from "@/components/ui/badge";
import { Interfaces } from "doodle-icons";
import type { Scale } from "@melya/core";

type Props = {
  scale: Scale;
  responses: Record<string, number>;
  flaggedItems?: number[];
};

type Row = {
  index: number;
  label: string;
  values: { dimension?: string; value: number; modalityLabel: string }[];
};

function getRows(
  scale: Scale,
  responses: Record<string, number>,
): Row[] {
  if (scale.formType === "dual-scale") {
    const anxietyScale = scale.answerScales?.anxiety ?? [];
    const avoidanceScale = scale.answerScales?.avoidance ?? [];
    return scale.questions.map((q: any, i: number) => {
      const text = typeof q === "string" ? q : q.text;
      const a = responses[`anxiety_${i}`];
      const b = responses[`avoidance_${i}`];
      const values: Row["values"] = [];
      if (a !== undefined) {
        values.push({
          dimension: "Anxiété",
          value: a,
          modalityLabel: anxietyScale.find((m) => m.value === a)?.label ?? "",
        });
      }
      if (b !== undefined) {
        values.push({
          dimension: "Évitement",
          value: b,
          modalityLabel: avoidanceScale.find((m) => m.value === b)?.label ?? "",
        });
      }
      return { index: i, label: text, values };
    });
  }

  if (scale.formType === "options") {
    return scale.questions.map((q: any, i: number) => {
      const value = responses[`option_${i}`];
      const opts: { value: number; text: string }[] = q.options ?? [];
      const modalityLabel = opts.find((o) => o.value === value)?.text ?? "";
      return {
        index: i,
        label: q.title ?? q.text ?? "",
        values:
          value !== undefined
            ? [{ value, modalityLabel }]
            : [],
      };
    });
  }

  // single-scale (PHQ-9, GAD-7, PCL-5, RSES)
  const intensity = scale.answerScales?.intensity ?? [];
  return scale.questions.map((q: any, i: number) => {
    const text = typeof q === "string" ? q : q.text;
    const value = responses[`intensity_${i}`];
    const modalityLabel =
      value !== undefined
        ? intensity.find((m) => m.value === value)?.label ?? ""
        : "";
    return {
      index: i,
      label: text,
      values:
        value !== undefined
          ? [{ value, modalityLabel }]
          : [],
    };
  });
}

function ScaleLegend({ scale }: { scale: Scale }) {
  // Y-BOCS has per-item modalities, no single legend possible.
  if (scale.formType === "options") return null;

  const dimensions: { label?: string; modalities: { value: number; label: string }[] }[] = [];
  if (scale.formType === "dual-scale") {
    if (scale.answerScales?.anxiety) {
      dimensions.push({ label: "Anxiété", modalities: scale.answerScales.anxiety });
    }
    if (scale.answerScales?.avoidance) {
      dimensions.push({ label: "Évitement", modalities: scale.answerScales.avoidance });
    }
  } else if (scale.answerScales?.intensity) {
    dimensions.push({ modalities: scale.answerScales.intensity });
  }

  if (dimensions.length === 0) return null;

  return (
    <div className="border rounded-lg p-3 bg-muted/30 space-y-2 mb-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Modalités de réponse
      </p>
      <div className="space-y-2">
        {dimensions.map((dim, i) => (
          <div key={i}>
            {dim.label && (
              <p className="text-xs font-medium mb-1">{dim.label}</p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
              {dim.modalities.map((m) => (
                <span key={m.value}>
                  <span className="font-semibold tabular-nums">{m.value}</span>
                  <span className="text-muted-foreground"> — {m.label}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ItemResponsesList({ scale, responses, flaggedItems = [] }: Props) {
  const rows = getRows(scale, responses);
  const flagged = new Set(flaggedItems);

  return (
    <>
    <ScaleLegend scale={scale} />
    <div className="border rounded-lg divide-y">
      {rows.map((row) => {
        const isFlagged = flagged.has(row.index);
        return (
          <div
            key={row.index}
            className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 ${
              isFlagged
                ? "bg-red-50 border-l-4 border-l-red-500"
                : ""
            }`}
          >
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <span className="text-xs text-muted-foreground tabular-nums shrink-0 mt-0.5 w-6">
                #{row.index + 1}
              </span>
              {isFlagged && (
                <Interfaces.Caution className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <span className="text-sm flex-1">{row.label}</span>
            </div>
            <div className="flex flex-wrap gap-2 sm:shrink-0 sm:justify-end pl-8 sm:pl-0">
              {row.values.length === 0 ? (
                <span className="text-xs text-muted-foreground italic">
                  Sans réponse
                </span>
              ) : (
                row.values.map((v, i) => (
                  <div key={i} className="flex flex-col items-end">
                    {v.dimension && (
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {v.dimension}
                      </span>
                    )}
                    <Badge variant="outline" className="text-xs font-normal">
                      <span className="font-semibold mr-1.5 tabular-nums">
                        {v.value}
                      </span>
                      <span>{v.modalityLabel}</span>
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}
