"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Interfaces } from "doodle-icons";
import { formatScore } from "@/lib/score-utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CreatePatientSheet } from "@/components/CreatePatientSheet";
import { SendScaleSheet } from "@/components/SendScaleSheet";
import { PatientRow } from "@/components/PatientRow";
import { SESSION_STATUS_CONFIG } from "@/lib/session-status";

type DisplaySession = {
  id: string;
  patientName: string;
  scaleId: string;
  scaleAcronym: string;
  scaleColor: string;
  scaleIcon: string | null;
  status: Session["status"];
  dateLabel: string;
  score: number | null;
  interpretation: string | null;
};

function getScaleMeta(scaleId: string) {
  const scale = scales.find((s) => s.id === scaleId);
  return {
    acronym: scale?.acronym ?? scaleId,
    color: scale?.color ?? "#e5e7eb",
    icon: scale?.icon ?? null,
  };
}

function shortDateLabel(dateStr: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sessionDay = new Date(dateStr);
  sessionDay.setHours(0, 0, 0, 0);
  const diff = Math.round(
    (today.getTime() - sessionDay.getTime()) / 86400000,
  );
  if (diff === 0) return "aujourd'hui";
  if (diff === 1) return "hier";
  return `il y a ${diff} j`;
}

type DisplayPatient = {
  id: string;
  name: string;
  hasActive: boolean;
};

const MOCK_SESSIONS: DisplaySession[] = [
  {
    id: "1",
    patientName: "Marie Dupont",
    scaleId: "inventaire-de-depression-de-beck",
    scaleAcronym: getScaleMeta("inventaire-de-depression-de-beck").acronym,
    scaleColor: getScaleMeta("inventaire-de-depression-de-beck").color,
    scaleIcon: getScaleMeta("inventaire-de-depression-de-beck").icon,
    status: "SENT",
    dateLabel: "il y a 3 j",
    score: null,
    interpretation: null,
  },
  {
    id: "2",
    patientName: "Marie Dupont",
    scaleId: "stai-anxiete-generalisee",
    scaleAcronym: getScaleMeta("stai-anxiete-generalisee").acronym,
    scaleColor: getScaleMeta("stai-anxiete-generalisee").color,
    scaleIcon: getScaleMeta("stai-anxiete-generalisee").icon,
    status: "STARTED",
    dateLabel: "hier",
    score: null,
    interpretation: null,
  },
  {
    id: "3",
    patientName: "Jean Martin",
    scaleId: "echelle-d-anxiete-sociale-de-liebowitz",
    scaleAcronym: getScaleMeta("echelle-d-anxiete-sociale-de-liebowitz").acronym,
    scaleColor: getScaleMeta("echelle-d-anxiete-sociale-de-liebowitz").color,
    scaleIcon: getScaleMeta("echelle-d-anxiete-sociale-de-liebowitz").icon,
    status: "COMPLETED",
    dateLabel: "aujourd'hui",
    score: 42,
    interpretation: "Anxiété modérée",
  },
  {
    id: "4",
    patientName: "Sophie Bernard",
    scaleId: "traumatismes-pcl5",
    scaleAcronym: getScaleMeta("traumatismes-pcl5").acronym,
    scaleColor: getScaleMeta("traumatismes-pcl5").color,
    scaleIcon: getScaleMeta("traumatismes-pcl5").icon,
    status: "SENT",
    dateLabel: "il y a 2 j",
    score: null,
    interpretation: null,
  },
];

const MOCK_PATIENTS: DisplayPatient[] = [
  { id: "1", name: "Marie Dupont", hasActive: true },
  { id: "2", name: "Jean Martin", hasActive: false },
  { id: "3", name: "Sophie Bernard", hasActive: true },
  { id: "4", name: "Lucas Moreau", hasActive: false },
];

function SessionCard({
  session,
  href,
  onClick,
}: {
  session: DisplaySession;
  href?: string;
  onClick?: () => void;
}) {
  const config = SESSION_STATUS_CONFIG[session.status];
  const isCompleted =
    session.status === "COMPLETED" && session.score != null;

  const className =
    "flex overflow-hidden hover:opacity-90 transition-opacity flex-shrink-0 text-left";
  const style = { borderRadius: 12, height: 96, width: 300 } as const;

  const content = (
    <>
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: session.scaleColor,
          aspectRatio: "1 / 1",
          height: "100%",
        }}
      >
        {session.scaleIcon && (
          <Image
            src={session.scaleIcon}
            alt={session.scaleAcronym}
            width={32}
            height={32}
            className="w-3/5 h-3/5 object-contain"
          />
        )}
      </div>
      <div className="flex px-4 py-3 flex-1 min-w-0 gap-3 bg-muted-foreground/5 relative">
        <div className="min-w-0 flex flex-col justify-between flex-1">
          <div className="min-w-0 pr-16">
            <p className="font-heading font-bold text-black leading-tight text-base">
              {session.scaleAcronym}
            </p>
            <p className="text-xs text-black/70 leading-snug truncate">
              {session.patientName}
            </p>
          </div>
          <p className="text-xs text-black/50 leading-snug">
            {session.dateLabel}
          </p>
        </div>
        <div className="absolute top-3 right-4 flex items-start">
          {isCompleted ? (
            <div className="text-right">
              <p className="font-sans font-bold text-black text-base leading-tight">
                {formatScore(session.score!)}
              </p>
              {session.interpretation && (
                <p className="font-sans text-xs text-black/70 leading-snug">
                  {session.interpretation}
                </p>
              )}
            </div>
          ) : (
            <Badge
              className={cn("pointer-events-none", config.className)}
              variant="secondary"
            >
              {config.label}
            </Badge>
          )}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {content}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={className} style={style}>
      {content}
    </button>
  );
}

export default function DashboardPage() {
  const { user, isLoading } = useUser();
  const { openAuthGate } = useAuthGate();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [patientFilter, setPatientFilter] = useState<"all" | "active">("all");
  const [sessionFilter, setSessionFilter] = useState<
    "all" | "SENT" | "STARTED" | "COMPLETED"
  >("all");
  const [sendScaleOpen, setSendScaleOpen] = useState(false);
  const [sendScalePatientId, setSendScalePatientId] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (searchParams.get("login") === "true") {
      openAuthGate();
      router.replace("/dashboard");
    }
  }, [searchParams, openAuthGate, router]);

  useEffect(() => {
    if (!user) {
      setPatientsLoading(false);
      return;
    }

    const loadData = async () => {
      setPatientsLoading(true);
      try {
        const { patients: data } = await patientsApi.getAll();
        setPatients(data);
      } catch (error) {
        console.error("Error loading patients:", error);
      } finally {
        setPatientsLoading(false);
      }
      try {
        const { sessions: data } = await sessionsApi.getRecent(20);
        setSessions(data);
      } catch (error) {
        console.error("Error loading sessions:", error);
      }
    };

    loadData();
  }, [user]);

  const handlePatientCreated = async () => {
    try {
      const { patients: data } = await patientsApi.getAll();
      setPatients(data);
    } catch (error) {
      console.error("Error refreshing patients:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  // Derive display data
  const patientIdsWithActiveSessions = new Set(
    sessions
      .filter((s) => ["SENT", "STARTED"].includes(s.status))
      .map((s) => s.patientId),
  );

  const sortedSessions = [...sessions].sort((a, b) => {
    const aIsPending = ["SENT", "STARTED"].includes(a.status);
    const bIsPending = ["SENT", "STARTED"].includes(b.status);
    if (aIsPending && !bIsPending) return -1;
    if (!aIsPending && bIsPending) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const filteredSessions =
    sessionFilter === "all"
      ? sortedSessions
      : sortedSessions.filter((s) => s.status === sessionFilter);

  const sortedPatients = [...patients].sort((a, b) => {
    const aHasActive = patientIdsWithActiveSessions.has(a.id);
    const bHasActive = patientIdsWithActiveSessions.has(b.id);
    if (aHasActive && !bHasActive) return -1;
    if (!aHasActive && bHasActive) return 1;
    return 0;
  });

  const filteredPatients =
    patientFilter === "active"
      ? sortedPatients.filter((p) => patientIdsWithActiveSessions.has(p.id))
      : sortedPatients;

  const displaySessions: DisplaySession[] = user
    ? filteredSessions.map((s) => {
        const meta = getScaleMeta(s.scaleId);
        return {
          id: s.id,
          patientName: s.patient
            ? `${s.patient.firstName} ${s.patient.lastName}`
            : "Patient",
          scaleId: s.scaleId,
          scaleAcronym: meta.acronym,
          scaleColor: meta.color,
          scaleIcon: meta.icon,
          status: s.status,
          dateLabel: shortDateLabel(s.sentAt || s.createdAt),
          score: typeof s.score === "number" ? s.score : null,
          interpretation:
            typeof s.interpretation === "string" ? s.interpretation : null,
        };
      })
    : MOCK_SESSIONS;

  const displayPatients: DisplayPatient[] = user
    ? filteredPatients.map((p) => ({
        id: p.id,
        name: `${p.firstName} ${p.lastName}`,
        hasActive: patientIdsWithActiveSessions.has(p.id),
      }))
    : MOCK_PATIENTS;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-normal text-4xl">
          {user
            ? `Bonjour${user.firstName ? `, ${user.firstName}` : ""}`
            : "Bienvenue sur Melya"}
        </h1>
      </div>

      <div className="space-y-12">
        {/* Suivi des passations */}
        <div>
          <div className="mb-3">
            <h2 className="text-xl font-sans font-semibold">
              Suivi des passations
            </h2>
          </div>
          {user && (
            <div className="flex gap-2 mb-3">
              {(["all", "SENT", "STARTED", "COMPLETED"] as const).map(
                (filter) => {
                  const label =
                    filter === "all"
                      ? "Toutes"
                      : SESSION_STATUS_CONFIG[filter].label;
                  return (
                    <button
                      key={filter}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${sessionFilter === filter ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}
                      onClick={() => setSessionFilter(filter)}
                    >
                      {label}
                    </button>
                  );
                },
              )}
            </div>
          )}
          {displaySessions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Aucune passation en cours
            </p>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {displaySessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  {...(user
                    ? { href: `/results/${session.id}` }
                    : { onClick: openAuthGate })}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mes patients */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-xl font-sans font-semibold">Mes patients</h2>
            <CreatePatientSheet
              onPatientCreated={handlePatientCreated}
              currentPatientCount={user ? patients.length : 0}
              buttonSize="sm"
            />
          </div>
          {user && (
            <div className="flex gap-2 mb-3">
              <button
                className={`px-3 py-1 text-sm rounded-full transition-colors ${patientFilter === "all" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}
                onClick={() => setPatientFilter("all")}
              >
                Tous
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-full transition-colors ${patientFilter === "active" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}
                onClick={() => setPatientFilter("active")}
              >
                Passation en cours
              </button>
            </div>
          )}
          <Card className="border-0 bg-muted-foreground/5 shadow-none hover:shadow-none">
            <CardContent className="p-4">
              {patientsLoading && user ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Chargement des patients...
                </p>
              ) : displayPatients.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  {patientFilter === "active"
                    ? "Aucune passation en cours"
                    : "Aucun patient dans votre liste"}
                </p>
              ) : (
                <div className="rounded-lg overflow-hidden">
                  {displayPatients.map((patient) => (
                    <PatientRow
                      key={patient.id}
                      patient={patient}
                      {...(user
                        ? {
                            href: `/patients/${patient.id}`,
                            onSendClick: (e: React.MouseEvent) => {
                              e.preventDefault();
                              setSendScalePatientId(patient.id);
                              setSendScaleOpen(true);
                            },
                          }
                        : { onRowClick: openAuthGate })}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {user && (
        <SendScaleSheet
          open={sendScaleOpen}
          onOpenChange={setSendScaleOpen}
          defaultPatientId={sendScalePatientId}
          onSent={async () => {
            try {
              const [pRes, sRes] = await Promise.all([
                patientsApi.getAll(),
                sessionsApi.getRecent(20),
              ]);
              setPatients(pRes.patients);
              setSessions(sRes.sessions);
            } catch (error) {
              console.error("Error refreshing data:", error);
            }
          }}
        />
      )}
    </div>
  );
}
