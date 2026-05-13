import { Badge } from "@/components/ui/badge";
import { Interfaces } from "doodle-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Scale, ScoreAlertSeverity } from "@melya/core";

type FlaggedItem = { index: number; severity: ScoreAlertSeverity };

type Props = {
  scale: Scale;
  responses: Record<string, number>;
  flaggedItems?: FlaggedItem[];
};

const FLAG_STYLES: Record<
  ScoreAlertSeverity,
  { row: string; text: string }
> = {
  critical: {
    row: "bg-destructive/5 border-l-4 border-l-destructive/30",
    text: "text-destructive",
  },
  warning: {
    row: "bg-amber-50 border-l-4 border-l-amber-300",
    text: "text-amber-600",
  },
  info: {
    row: "bg-sky-50 border-l-4 border-l-sky-300",
    text: "text-sky-600",
  },
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
      {
        title: "Cluster B — Intrusions (Reviviscences)",
        rows: rows.slice(0, 5),
      },
      { title: "Cluster C — Évitement", rows: rows.slice(5, 7) },
      {
        title:
          "Cluster D — Altérations négatives des cognitions et de l’humeur",
        rows: rows.slice(7, 14),
      },
      {
        title:
          "Cluster E — Altérations de l’éveil et de la réactivité (Hyper-éveil)",
        rows: rows.slice(14, 20),
      },
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

export function scaleLegendHasContent(scale: Scale): boolean {
  if (scale.formType === "options") return false;
  if (scale.formType === "dual-scale") {
    return !!(scale.answerScales?.anxiety || scale.answerScales?.avoidance);
  }
  return !!(scale.answerScales?.intensity);
}

export function ScaleLegend({ scale }: { scale: Scale }) {
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
    <div className="space-y-2">
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
                  <span className="text-foreground/70"> — {m.label}</span>
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
  flagSeverity,
}: {
  scale: Scale;
  row: Row;
  flagSeverity?: ScoreAlertSeverity;
}) {
  const isYbocsInverted =
    scale.id === "index-symptomes-ybocs" &&
    YBOCS_INVERTED_ITEM_INDEXES.has(row.index);

  const isOptions = scale.formType === "options";
  const flagStyles = flagSeverity ? FLAG_STYLES[flagSeverity] : null;

  return (
    <div
      className={`grid gap-2 p-3 ${
        isOptions
          ? "grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_1fr]"
          : "grid-cols-[auto_1fr_auto]"
      } items-center ${flagStyles?.row ?? ""}`}
    >
      {/* Numéro */}
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-xs text-muted-foreground tabular-nums w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">
          {row.index + 1}
        </span>
      </div>

      {/* Question */}
      <div className="flex items-center gap-1.5 flex-wrap min-w-0">
        {row.prompt ? (
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm border-b border-dotted border-muted-foreground/40 cursor-help">{row.label}</p>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                {row.prompt}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p className="text-sm">{row.label}</p>
        )}
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

      {/* Réponse */}
      <div className={`flex flex-wrap gap-2 ${isOptions ? "sm:col-start-3 col-start-2 justify-start sm:justify-end" : "shrink-0 justify-end"} items-center text-right ${flagStyles?.text ?? ""}`}>
        {flagSeverity && (
          <Interfaces.Caution className={`h-4 w-4 [&_path]:fill-current ${flagStyles?.text ?? ""}`} />
        )}
        {row.values.length === 0 ? (
          <span className="text-xs text-foreground/70 italic">
            Sans réponse
          </span>
        ) : (
          row.values.map((v, i) => (
            <div key={i} className="flex flex-col items-end">
              {v.dimension && (
                <span className="text-xs uppercase tracking-wide text-foreground/70">
                  {v.dimension}
                </span>
              )}
              <span className="text-sm italic text-right">{v.modalityLabel}</span>
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
  const flagged = new Map(flaggedItems.map((f) => [f.index, f.severity]));

  const followUp = scale.followUpItem;
  const followUpValue = followUp ? responses[followUp.key] : undefined;
  const followUpLabel =
    followUp && followUpValue !== undefined
      ? followUp.options.find((o) => o.value === followUpValue)?.label ?? ""
      : "";

  return (
    <>
      <div className="space-y-6">
        {sections.map((section, sIdx) => (
          <div key={sIdx}>
            {section.title && (
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                {section.title}
              </p>
            )}
            <div className="bg-muted rounded-2xl divide-y divide-foreground/10 overflow-hidden">
              {section.rows.map((row) => (
                <ItemRow
                  key={row.index}
                  scale={scale}
                  row={row}
                  flagSeverity={flagged.get(row.index)}
                />
              ))}
            </div>
          </div>
        ))}
        {followUp && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
              Impact fonctionnel <span className="font-normal normal-case tracking-normal">(non scoré)</span>
            </p>
            <div className="bg-muted rounded-2xl p-3 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
              <p className="text-sm flex-1">{followUp.questionText}</p>
              <div className="sm:shrink-0 sm:justify-end">
                {followUpValue === undefined ? (
                  <span className="text-xs text-muted-foreground italic">
                    Sans réponse
                  </span>
                ) : (
                  <Badge variant="outline" className="text-xs font-normal">
                    <span className="font-semibold mr-1.5 tabular-nums">
                      {followUpValue}
                    </span>
                    <span>{followUpLabel}</span>
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
