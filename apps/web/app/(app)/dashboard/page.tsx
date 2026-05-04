"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { useAuthGate } from "@/app/context/AuthGateContext";
import { useEffect, useState, Suspense } from "react";
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
import { MOCK_PATIENTS, MOCK_SESSIONS } from "@/lib/mock-data";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

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

function SessionCard({
  session,
  footer,
}: {
  session: Session;
  footer: React.ReactNode;
}) {
  const meta = getScaleMeta(session.scaleId);
  const patientName = session.patient
    ? `${session.patient.firstName} ${session.patient.lastName}`
    : "Patient";

  return (
    <Link
      href={`/passation/${session.id}`}
      className="flex flex-col gap-10 rounded-3xl bg-card p-4 hover:shadow-sm transition-all"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center flex-shrink-0 rounded-full"
          style={{
            backgroundColor: meta.color,
            width: 36,
            height: 36,
          }}
        >
          {meta.icon && (
            <Image
              src={meta.icon}
              alt={meta.acronym}
              width={34}
              height={34}
              className="object-contain translate-x-[0.2rem] translate-y-[0.1rem]"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-black leading-tight text-base truncate">
            {patientName}
          </p>
          <p className="text-xs text-muted-foreground leading-snug truncate">
            {meta.acronym}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">{footer}</div>
    </Link>
  );
}

function LoginParamHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openAuthGate } = useAuthGate();

  useEffect(() => {
    if (searchParams.get("login") === "true") {
      openAuthGate();
      router.replace("/dashboard");
    }
  }, [searchParams, openAuthGate, router]);

  return null;
}

export default function DashboardPage() {
  const { user, isLoading } = useUser();
  const { openAuthGate } = useAuthGate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendScaleOpen, setSendScaleOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setPatients(MOCK_PATIENTS);
      setSessions(MOCK_SESSIONS);
      setLoading(false);
      return;
    }
    const loadData = async () => {
      setLoading(true);
      try {
        const [pRes, sRes] = await Promise.all([
          patientsApi.getAll(),
          sessionsApi.getRecent(50),
        ]);
        setPatients(pRes.patients);
        setSessions(sRes.sessions);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
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

  if (isLoading || loading) {
    return <DashboardSkeleton />;
  }

  const isToRelaunch = (s: Session) =>
    daysSince(s.lastReminderAt || s.sentAt || s.createdAt) >=
    PENDING_THRESHOLD_DAYS;

  const inProgress = sessions
    .filter((s) => s.status === "SENT" || s.status === "STARTED")
    .sort((a, b) => {
      const aRelaunch = isToRelaunch(a) ? 1 : 0;
      const bRelaunch = isToRelaunch(b) ? 1 : 0;
      if (aRelaunch !== bRelaunch) return bRelaunch - aRelaunch;
      return (
        new Date(b.sentAt || b.createdAt).getTime() -
        new Date(a.sentAt || a.createdAt).getTime()
      );
    });

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

  const firstName = user?.firstName ? `, ${user.firstName}` : "";

  return (
    <div className="container mx-auto px-4 py-6">
      <Suspense fallback={null}>
        <LoginParamHandler />
      </Suspense>
      {!user && (
        <div className="mb-6 rounded-lg bg-surface-brand-bg px-4 py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-brand-orange">
            Vous explorez Melya avec des données d'exemple. Créez un compte pour
            ajouter vos vrais patients.
          </p>
          <Button size="sm" onClick={() => openAuthGate()}>
            Se connecter
          </Button>
        </div>
      )}
      <div className="mb-8">
        <h1 className="font-gelica font-normal text-4xl">
          {user ? `Bonjour${firstName}` : "Bienvenue sur Melya"}
        </h1>
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
          buttonSize="lg"
        />
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-sans font-semibold mb-3">
            Passations en cours{" "}
            <span className="text-muted-foreground font-normal text-sm">
              ({inProgress.length})
            </span>
          </h2>
          {inProgress.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">
              Vos passations en cours apparaîtront ici.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {inProgress.map((s) => {
                const config = SESSION_STATUS_CONFIG[s.status];
                const relaunch = isToRelaunch(s);
                return (
                  <SessionCard
                    key={s.id}
                    session={s}
                    footer={
                      <>
                        <div className="flex items-center gap-2 min-w-0">
                          <Badge
                            className={cn(
                              "pointer-events-none",
                              config.className,
                            )}
                            variant="secondary"
                          >
                            {config.label}
                          </Badge>
                          {relaunch && (
                            <Badge
                              variant="secondary"
                              className="pointer-events-none bg-fuchsia-100 text-fuchsia-700 ring-1 ring-fuchsia-500/30"
                            >
                              À relancer
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          envoyée {relativeDayLabel(s.sentAt || s.createdAt)}
                        </span>
                      </>
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
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recentResults.map((s) => {
                const unread = !s.viewedAt;
                const score = typeof s.score === "number" ? s.score : null;
                return (
                  <SessionCard
                    key={s.id}
                    session={s}
                    footer={
                      <>
                        <div className="flex items-center gap-2 min-w-0">
                          {score != null && (
                            <span className="font-bold text-black text-sm">
                              {formatScore(score)}
                            </span>
                          )}
                          {typeof s.interpretation === "string" && (
                            <span className="text-xs text-muted-foreground truncate">
                              {s.interpretation}
                            </span>
                          )}
                        </div>
                        {unread && (
                          <Badge
                            variant="secondary"
                            className="pointer-events-none bg-violet-100 text-violet-700"
                          >
                            Non lu
                          </Badge>
                        )}
                      </>
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
