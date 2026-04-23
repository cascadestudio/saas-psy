"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreatePatientSheet } from "@/components/CreatePatientSheet";
import { SendScaleSheet } from "@/components/SendScaleSheet";
import { GlobalSearchBar } from "@/components/GlobalSearchBar";
import { SESSION_STATUS_CONFIG } from "@/lib/session-status";

type DisplaySession = {
  id: string;
  patientName: string;
  scaleTitle: string;
  status: Session["status"];
  dateLabel: string;
};

type DisplayPatient = {
  id: string;
  name: string;
  hasActive: boolean;
};

function getScaleTitle(scaleId: string) {
  return scales.find((s) => s.id === scaleId)?.title ?? scaleId;
}

function daysSinceSent(dateStr: string) {
  const days = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days === 0) return "Aujourd'hui";
  if (days === 1) return "Il y a 1 jour";
  return `Il y a ${days} jours`;
}

const MOCK_SESSIONS: DisplaySession[] = [
  {
    id: "1",
    patientName: "Marie Dupont",
    scaleTitle: getScaleTitle("inventaire-de-depression-de-beck"),
    status: "SENT",
    dateLabel: "28/03",
  },
  {
    id: "2",
    patientName: "Marie Dupont",
    scaleTitle: getScaleTitle("stai-anxiete-generalisee"),
    status: "STARTED",
    dateLabel: "30/03",
  },
  {
    id: "3",
    patientName: "Jean Martin",
    scaleTitle: getScaleTitle("echelle-d-anxiete-sociale-de-liebowitz"),
    status: "COMPLETED",
    dateLabel: "01/04",
  },
  {
    id: "4",
    patientName: "Sophie Bernard",
    scaleTitle: getScaleTitle("traumatismes-pcl5"),
    status: "SENT",
    dateLabel: "31/03",
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
  const className =
    "bg-muted-foreground/5 rounded-lg p-4 min-w-[200px] hover:bg-muted-foreground/10 transition-colors flex-shrink-0 text-left";
  const content = (
    <>
      <p className="font-medium text-sm">{session.patientName}</p>
      <p className="text-sm text-muted-foreground mt-1">{session.scaleTitle}</p>
      <div className="flex items-center justify-between mt-3">
        <Badge className={config.className} variant="secondary">
          {config.label}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {session.dateLabel}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
}

function PatientRow({
  patient,
  href,
  onRowClick,
  onSendClick,
}: {
  patient: DisplayPatient;
  href?: string;
  onRowClick?: () => void;
  onSendClick?: (e: React.MouseEvent) => void;
}) {
  const rowClassName =
    "flex items-center justify-between p-3 border-t border-border/50 first:border-t-0 hover:bg-background/50 transition-colors";
  const inner = (
    <>
      <div className="flex items-center gap-2">
        <p className="font-medium">{patient.name}</p>
        {patient.hasActive && (
          <Badge variant="secondary" className="text-xs">
            Passation en cours
          </Badge>
        )}
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Interfaces.Send
              className="h-4 w-4 flex-shrink-0"
              fill="#D6591F"
              onClick={onSendClick}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Envoyer une échelle</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={rowClassName}>
        {inner}
      </Link>
    );
  }
  return (
    <button onClick={onRowClick} className={`w-full ${rowClassName}`}>
      {inner}
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
    ? filteredSessions.map((s) => ({
        id: s.id,
        patientName: s.patient
          ? `${s.patient.firstName} ${s.patient.lastName}`
          : "Patient",
        scaleTitle: getScaleTitle(s.scaleId),
        status: s.status,
        dateLabel: daysSinceSent(s.sentAt || s.createdAt),
      }))
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
      <GlobalSearchBar patients={user ? patients : []} sessions={user ? sessions : []} />
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
