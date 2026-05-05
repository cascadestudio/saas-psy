import Link from "next/link";
import Image from "next/image";
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

export function SessionRow({
  session,
  secondaryText,
  relaunch = false,
}: {
  session: Session;
  secondaryText: string;
  relaunch?: boolean;
}) {
  const scale = scales.find((s) => s.id === session.scaleId);
  const config = SESSION_STATUS_CONFIG[session.status as keyof typeof SESSION_STATUS_CONFIG];
  const alerts = session.score?.alerts ?? [];
  const criticalCount = alerts.filter((a) => a.severity === "critical").length;
  const warningCount = alerts.filter((a) => a.severity === "warning").length;
  const score = typeof session.score === "number" ? session.score : null;
  const unread = session.status === "COMPLETED" && !session.viewedAt;

  return (
    <Link
      href={`/passation/${session.id}`}
      className="flex items-center gap-3 px-3 py-2.5 border-t border-border/50 first:border-t-0 hover:bg-background/50 transition-colors"
    >
      <div
        className="flex items-center justify-center flex-shrink-0 rounded-md"
        style={{
          backgroundColor: scale?.color ?? "#e5e7eb",
          width: 40,
          height: 40,
        }}
      >
        {scale?.icon && (
          <Image
            src={scale.icon}
            alt={scale.acronym}
            width={24}
            height={24}
            className="w-3/5 h-3/5 object-contain"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-heading font-bold text-black leading-tight text-base">
          {scale?.acronym ?? session.scaleId}
        </p>
        <p className="text-xs text-muted-foreground leading-snug truncate">
          {secondaryText}
        </p>
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
        {unread && (
          <Badge
            variant="secondary"
            className="pointer-events-none bg-violet-100 text-violet-700"
          >
            Non lu
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
        {session.status === "COMPLETED" && score != null ? (
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
        ) : (
          <Badge
            className={cn("pointer-events-none", config?.className)}
            variant="secondary"
          >
            {config?.label ?? session.status}
          </Badge>
        )}
      </div>
    </Link>
  );
}
