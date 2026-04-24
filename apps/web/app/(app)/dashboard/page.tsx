"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { useAuthGate } from "@/app/context/AuthGateContext";
import { useEffect, useState } from "react";
import {
  patientsApi,
  sessionsApi,
  type Patient,
  type Session,
} from "@/lib/api-client";
import { scales } from "@/app/scalesData";
import { Interfaces, Arrow } from "doodle-icons";
import { formatScore } from "@/lib/score-utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreatePatientSheet } from "@/components/CreatePatientSheet";
import { SendScaleSheet } from "@/components/SendScaleSheet";
import { SESSION_STATUS_CONFIG } from "@/lib/session-status";

const PENDING_THRESHOLD_DAYS = 7;
const RECENT_WINDOW_DAYS = 30;

function getScaleMeta(scaleId: string) {
  const scale = scales.find((s) => s.id === scaleId);
  return {
    acronym: scale?.acronym ?? scaleId,
    title: scale?.title ?? scaleId,
    color: scale?.color ?? "#e5e7eb",
    icon: scale?.icon ?? null,
  };
}

function daysSince(dateStr: string) {
  const then = new Date(dateStr);
  then.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((now.getTime() - then.getTime()) / 86400000);
}

function relativeDayLabel(dateStr: string) {
  const d = daysSince(dateStr);
  if (d === 0) return "aujourd'hui";
  if (d === 1) return "hier";
  return `il y a ${d} j`;
}

function SessionRow({
  session,
  rightSlot,
}: {
  session: Session;
  rightSlot: React.ReactNode;
}) {
  const meta = getScaleMeta(session.scaleId);
  const patientName = session.patient
    ? `${session.patient.firstName} ${session.patient.lastName}`
    : "Patient";

  return (
    <Link
      href={`/passation/${session.id}`}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted-foreground/5 transition-colors"
    >
      <div
        className="flex items-center justify-center flex-shrink-0 rounded-md"
        style={{
          backgroundColor: meta.color,
          width: 40,
          height: 40,
        }}
      >
        {meta.icon && (
          <Image
            src={meta.icon}
            alt={meta.acronym}
            width={24}
            height={24}
            className="w-3/5 h-3/5 object-contain"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-heading font-bold text-black leading-tight text-base">
          {meta.acronym}
        </p>
        <p className="text-xs text-muted-foreground leading-snug truncate">
          {patientName}
        </p>
      </div>
      <div className="flex-shrink-0">{rightSlot}</div>
    </Link>
  );
}

export default function DashboardPage() {
  const { user, isLoading } = useUser();
  const { openAuthGate } = useAuthGate();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sendScaleOpen, setSendScaleOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("login") === "true") {
      openAuthGate();
      router.replace("/dashboard");
    }
  }, [searchParams, openAuthGate, router]);

  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      try {
        const [pRes, sRes] = await Promise.all([
          patientsApi.getAll(),
          sessionsApi.getRecent(50),
        ]);
        setPatients(pRes.patients);
        setSessions(sRes.sessions);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };
    loadData();
  }, [user]);

  const refreshData = async () => {
    try {
      const [pRes, sRes] = await Promise.all([
        patientsApi.getAll(),
        sessionsApi.getRecent(50),
      ]);
      setPatients(pRes.patients);
      setSessions(sRes.sessions);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-xl mx-auto text-center py-16">
          <h1 className="font-normal text-4xl mb-4">Bienvenue sur Melya</h1>
          <p className="text-muted-foreground mb-8">
            Envoyez des échelles psychométriques à vos patients, suivez leurs
            résultats et leur évolution.
          </p>
          <Button size="lg" onClick={() => openAuthGate()}>
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  const toRelaunch = sessions
    .filter(
      (s) =>
        (s.status === "SENT" || s.status === "STARTED") &&
        daysSince(s.sentAt || s.createdAt) >= PENDING_THRESHOLD_DAYS,
    )
    .sort(
      (a, b) =>
        new Date(a.sentAt || a.createdAt).getTime() -
        new Date(b.sentAt || b.createdAt).getTime(),
    );

  const recentResults = sessions
    .filter(
      (s) =>
        s.status === "COMPLETED" &&
        s.completedAt &&
        daysSince(s.completedAt) <= RECENT_WINDOW_DAYS,
    )
    .sort((a, b) => {
      const aUnread = !a.viewedAt ? 1 : 0;
      const bUnread = !b.viewedAt ? 1 : 0;
      if (aUnread !== bUnread) return bUnread - aUnread;
      return (
        new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
      );
    });

  const firstName = user.firstName ? `, ${user.firstName}` : "";

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="font-normal text-4xl">Bonjour{firstName}</h1>
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        <Button onClick={() => setSendScaleOpen(true)}>
          <Interfaces.Send />
          Envoyer une échelle
        </Button>
        <CreatePatientSheet
          onPatientCreated={refreshData}
          currentPatientCount={patients.length}
          buttonVariant="secondary"
        />
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-sans font-semibold mb-3">
            À relancer{" "}
            <span className="text-muted-foreground font-normal text-sm">
              ({toRelaunch.length})
            </span>
          </h2>
          {toRelaunch.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">
              Aucune passation à relancer.
            </p>
          ) : (
            <div className="flex flex-col">
              {toRelaunch.map((s) => {
                const config = SESSION_STATUS_CONFIG[s.status];
                return (
                  <SessionRow
                    key={s.id}
                    session={s}
                    rightSlot={
                      <div className="flex items-center gap-3">
                        <Badge
                          className={cn(
                            "pointer-events-none",
                            config.className,
                          )}
                          variant="secondary"
                        >
                          {config.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground w-20 text-right">
                          envoyée {relativeDayLabel(s.sentAt || s.createdAt)}
                        </span>
                      </div>
                    }
                  />
                );
              })}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-sans font-semibold mb-3">
            Résultats récents{" "}
            <span className="text-muted-foreground font-normal text-sm">
              ({recentResults.length})
            </span>
          </h2>
          {recentResults.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">
              Aucun résultat récent.
            </p>
          ) : (
            <div className="flex flex-col">
              {recentResults.map((s) => {
                const unread = !s.viewedAt;
                const score = typeof s.score === "number" ? s.score : null;
                return (
                  <SessionRow
                    key={s.id}
                    session={s}
                    rightSlot={
                      <div className="flex items-center gap-3">
                        {unread && (
                          <Badge
                            variant="secondary"
                            className="pointer-events-none bg-brand-orange/10 text-brand-orange"
                          >
                            Non lu
                          </Badge>
                        )}
                        <div className="text-right min-w-[90px]">
                          {score != null && (
                            <p className="font-sans font-bold text-black text-sm leading-tight">
                              {formatScore(score)}
                            </p>
                          )}
                          {typeof s.interpretation === "string" && (
                            <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                              {s.interpretation}
                            </p>
                          )}
                        </div>
                      </div>
                    }
                  />
                );
              })}
            </div>
          )}
        </section>

        <div>
          <Link
            href="/patients"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Tous mes patients
            <Arrow.ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <SendScaleSheet
        open={sendScaleOpen}
        onOpenChange={setSendScaleOpen}
        onSent={refreshData}
      />
    </div>
  );
}
