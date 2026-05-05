"use client";

import Link from "next/link";
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
import { Interfaces, Arrow } from "doodle-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreatePatientSheet } from "@/components/CreatePatientSheet";
import { SendScaleSheet } from "@/components/SendScaleSheet";
import { MOCK_PATIENTS, MOCK_SESSIONS } from "@/lib/mock-data";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { SessionRow, relativeDayLabel } from "@/components/sessions/SessionRow";

const PENDING_THRESHOLD_DAYS = 7;
const RECENT_WINDOW_DAYS = 30;

function daysSince(dateStr: string) {
  const then = new Date(dateStr);
  then.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((now.getTime() - then.getTime()) / 86400000);
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
            <Card className="border-0 bg-muted-foreground/5 shadow-none hover:shadow-none">
              <CardContent className="p-4">
                <div className="rounded-lg overflow-hidden">
                  {inProgress.map((s) => (
                    <SessionRow
                      key={s.id}
                      session={s}
                      secondaryText={
                        s.patient
                          ? `${s.patient.firstName} ${s.patient.lastName}`
                          : "Patient"
                      }
                      relaunch={isToRelaunch(s)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
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
            <Card className="border-0 bg-muted-foreground/5 shadow-none hover:shadow-none">
              <CardContent className="p-4">
                <div className="rounded-lg overflow-hidden">
                  {recentResults.map((s) => (
                    <SessionRow
                      key={s.id}
                      session={s}
                      secondaryText={
                        s.patient
                          ? `${s.patient.firstName} ${s.patient.lastName}`
                          : "Patient"
                      }
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
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
