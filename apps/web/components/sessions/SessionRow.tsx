import Link from "next/link";
import { ScaleTag } from "@/components/scale/ScaleTag";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { scales } from "@/app/scalesData";
import { formatScore } from "@/lib/score-utils";
import { SESSION_STATUS_CONFIG } from "@/lib/session-status";
import { type Session } from "@/lib/api-client";

export function relativeDayLabel(dateStr: string) {
  const then = new Date(dateStr);
  then.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const d = Math.round((now.getTime() - then.getTime()) / 86400000);
  if (d === 0) return "aujourd'hui";
  if (d === 1) return "hier";
  return `il y a ${d} j`;
}

// Statut d'une passation non complétée, en texte (pas de badge : on réserve les
// badges à ce qui demande une action, cf. « À relancer » et les alertes).
function pendingStatusText(session: Session) {
  switch (session.status) {
    case "SENT":
      return `Envoyée ${relativeDayLabel(session.sentAt ?? session.createdAt)}`;
    case "STARTED":
      return `Commencée ${relativeDayLabel(session.startedAt ?? session.sentAt ?? session.createdAt)}`;
    default:
      return SESSION_STATUS_CONFIG[session.status]?.label ?? session.status;
  }
}

export function SessionRow({
  session,
  primaryText,
  secondaryText,
  rightLabel,
  relaunch = false,
}: {
  session: Session;
  primaryText?: string;
  secondaryText: string;
  /** Texte à droite pour une passation complétée sans score numérique. */
  rightLabel?: string;
  relaunch?: boolean;
}) {
  const scale = scales.find((s) => s.id === session.scaleId);
  const alerts = session.score?.alerts ?? [];
  const criticalCount = alerts.filter((a) => a.severity === "critical").length;
  const warningCount = alerts.filter((a) => a.severity === "warning").length;
  const score = typeof session.score === "number" ? session.score : null;
  const unread = session.status === "COMPLETED" && !session.viewedAt;
  const titleWeight = unread ? "font-bold" : "font-medium";

  return (
    <Link
      href={`/app/passation/${session.id}`}
      className="relative flex items-center gap-3 overflow-hidden rounded-xl bg-muted-foreground/5 px-4 py-2.5 transition-colors hover:bg-muted-foreground/10"
    >
      {/* Non lu : liseré orange à gauche (forme distincte des points de domaine). */}
      {unread && (
        <span aria-label="Non lu" className="absolute inset-y-0 left-0 w-[3px] bg-primary" />
      )}
      <div className="flex-1 min-w-0">
        {primaryText ? (
          <>
            <p className={cn("font-sans text-black leading-tight text-base truncate", titleWeight)}>
              {primaryText}
            </p>
            <p className="text-xs text-muted-foreground leading-snug mt-0.5">
              <ScaleTag domain={scale?.domain} acronym={scale?.acronym ?? session.scaleId} />
            </p>
          </>
        ) : (
          <>
            <p className={cn("font-sans text-black leading-tight text-base", titleWeight)}>
              <ScaleTag domain={scale?.domain} acronym={scale?.acronym ?? session.scaleId} />
            </p>
            <p className="text-xs text-muted-foreground leading-snug truncate">
              {secondaryText}
            </p>
          </>
        )}
      </div>
      <div className="flex-shrink-0 flex items-center gap-3">
        {relaunch && (
          <Badge
            variant="secondary"
            className="pointer-events-none bg-fuchsia-100 text-fuchsia-700 ring-1 ring-fuchsia-500/30"
          >
            À relancer
          </Badge>
        )}
        {criticalCount > 0 && (
          <Badge
            variant="secondary"
            className="pointer-events-none bg-red-100 text-red-700 border-red-200"
          >
            ⚠ {criticalCount > 1 ? `${criticalCount} alertes` : "Alerte critique"}
          </Badge>
        )}
        {warningCount > 0 && criticalCount === 0 && (
          <Badge
            variant="secondary"
            className="pointer-events-none bg-amber-100 text-amber-700 border-amber-200"
          >
            {warningCount > 1 ? `${warningCount} vigilances` : "Vigilance"}
          </Badge>
        )}
        {session.status === "COMPLETED" ? (
          score != null ? (
            <div className="text-right min-w-[90px]">
              <p className="font-sans font-bold text-black text-sm leading-tight">
                {formatScore(score)}
              </p>
              {typeof session.interpretation === "string" && (
                <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                  {session.interpretation}
                </p>
              )}
            </div>
          ) : rightLabel ? (
            <p className="text-xs text-muted-foreground whitespace-nowrap">{rightLabel}</p>
          ) : null
        ) : (
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            {pendingStatusText(session)}
          </p>
        )}
      </div>
    </Link>
  );
}
