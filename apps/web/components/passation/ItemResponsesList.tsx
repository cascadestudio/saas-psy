import { Badge } from "@/components/ui/badge";
import { Interfaces } from "doodle-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Scale } from "@melya/core";

type Props = {
  scale: Scale;
  responses: Record<string, number>;
  flaggedItems?: number[];
};

type Row = {
  index: number;
  label: string;
  prompt?: string;
  values: { dimension?: string; value: number; modalityLabel: string }[];
};

type Section = {
  title?: string;
  rows: Row[];
};

const YBOCS_INVERTED_ITEM_INDEXES = new Set([3, 8]);

function getRows(scale: Scale, responses: Record<string, number>): Row[] {
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
        prompt: q.prompt,
        values: value !== undefined ? [{ value, modalityLabel }] : [],
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
      values: value !== undefined ? [{ value, modalityLabel }] : [],
    };
  });
}

function groupRows(scale: Scale, rows: Row[]): Section[] {
  if (scale.id === "traumatismes-pcl5") {
    return [
      { title: "Cluster B — Intrusions", rows: rows.slice(0, 5) },
      { title: "Cluster C — Évitement", rows: rows.slice(5, 7) },
      {
        title: "Cluster D — Cognitions et humeur",
        rows: rows.slice(7, 14),
      },
      { title: "Cluster E — Hyperéveil", rows: rows.slice(14, 20) },
    ];
  }
  if (scale.id === "index-symptomes-ybocs") {
    return [
      { title: "Obsessions (items 1–5)", rows: rows.slice(0, 5) },
      { title: "Compulsions (items 6–10)", rows: rows.slice(5, 10) },
    ];
  }
  if (scale.id === "echelle-d-anxiete-sociale-de-liebowitz") {
    const performance = rows.filter((_, i) => {
      const q: any = scale.questions[i];
      return q?.type === "performance";
    });
    const interaction = rows.filter((_, i) => {
      const q: any = scale.questions[i];
      return q?.type === "interaction";
    });
    return [
      { title: "Situations de performance", rows: performance },
      { title: "Situations d'interaction sociale", rows: interaction },
    ];
  }
  return [{ rows }];
}

function ScaleLegend({ scale }: { scale: Scale }) {
  if (scale.formType === "options") return null;

  const dimensions: {
    label?: string;
    modalities: { value: number; label: string }[];
  }[] = [];
  if (scale.formType === "dual-scale") {
    if (scale.answerScales?.anxiety) {
      dimensions.push({
        label: "Anxiété",
        modalities: scale.answerScales.anxiety,
      });
    }
    if (scale.answerScales?.avoidance) {
      dimensions.push({
        label: "Évitement",
        modalities: scale.answerScales.avoidance,
      });
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

function ItemRow({
  scale,
  row,
  isFlagged,
}: {
  scale: Scale;
  row: Row;
  isFlagged: boolean;
}) {
  const isYbocsInverted =
    scale.id === "index-symptomes-ybocs" &&
    YBOCS_INVERTED_ITEM_INDEXES.has(row.index);

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 ${
        isFlagged ? "bg-red-50 border-l-4 border-l-red-500" : ""
      }`}
    >
      <div className="flex items-start gap-2 flex-1 min-w-0">
        <span className="text-xs text-muted-foreground tabular-nums shrink-0 mt-0.5 w-6">
          #{row.index + 1}
        </span>
        {isFlagged && (
          <Interfaces.Caution className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="text-sm">{row.label}</p>
            {isYbocsInverted && (
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wide text-amber-700 bg-amber-100 rounded px-1.5 py-0.5 cursor-help">
                      sens inversé
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    Sur les items de résistance, un score 0 indique une
                    résistance maximale (état le moins sévère). 4 = abandon
                    total de la résistance.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {row.prompt && (
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {row.prompt}
            </p>
          )}
        </div>
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
}

export function ItemResponsesList({
  scale,
  responses,
  flaggedItems = [],
}: Props) {
  const rows = getRows(scale, responses);
  const sections = groupRows(scale, rows);
  const flagged = new Set(flaggedItems);

  return (
    <>
      <ScaleLegend scale={scale} />
      <div className="space-y-4">
        {sections.map((section, sIdx) => (
          <div key={sIdx}>
            {section.title && (
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                {section.title}
              </p>
            )}
            <div className="border rounded-lg divide-y">
              {section.rows.map((row) => (
                <ItemRow
                  key={row.index}
                  scale={scale}
                  row={row}
                  isFlagged={flagged.has(row.index)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
