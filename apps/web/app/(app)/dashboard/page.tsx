"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

function daysSinceSent(dateStr: string) {
  const days = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days === 0) return "Aujourd'hui";
  if (days === 1) return "Il y a 1 jour";
  return `Il y a ${days} jours`;
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
  const [sessionFilter, setSessionFilter] = useState<"all" | "SENT" | "STARTED" | "COMPLETED">("all");
  const [sendScaleOpen, setSendScaleOpen] = useState(false);
  const [sendScalePatientId, setSendScalePatientId] = useState<string | undefined>();

  // Open auth modal if redirected from password reset
  useEffect(() => {
    if (searchParams.get("login") === "true") {
      openAuthGate();
      router.replace("/dashboard");
    }
  }, [searchParams, openAuthGate, router]);

  // Load patients and sessions from API (only for authenticated users)
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

  // Mock data for anonymous users
  const mockSessions: {
    id: string;
    patientName: string;
    scaleId: string;
    status: Session["status"];
    date: string;
  }[] = [
    {
      id: "1",
      patientName: "Marie Dupont",
      scaleId: "inventaire-de-depression-de-beck",
      status: "SENT",
      date: "28/03",
    },
    {
      id: "2",
      patientName: "Marie Dupont",
      scaleId: "stai-anxiete-generalisee",
      status: "STARTED",
      date: "30/03",
    },
    {
      id: "3",
      patientName: "Jean Martin",
      scaleId: "echelle-d-anxiete-sociale-de-liebowitz",
      status: "COMPLETED",
      date: "01/04",
    },
    {
      id: "4",
      patientName: "Sophie Bernard",
      scaleId: "traumatismes-pcl5",
      status: "SENT",
      date: "31/03",
    },
  ];

  const mockPatients = [
    { id: "1", name: "Marie Dupont", hasActive: true },
    { id: "2", name: "Jean Martin", hasActive: false },
    { id: "3", name: "Sophie Bernard", hasActive: true },
    { id: "4", name: "Lucas Moreau", hasActive: false },
  ];

  const getScaleTitle = (scaleId: string) => {
    return scales.find((s) => s.id === scaleId)?.title ?? scaleId;
  };

  // Anonymous user view with mock data
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-4xl font-normal not-italic">
            Bienvenue sur Melya
          </h1>
        </div>

        <div className="space-y-6">
          {/* Suivi des passations - mock */}
          <div>
            <div className="mb-3">
              <h2 className="text-lg font-sans font-semibold">
                Suivi des passations
              </h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {mockSessions.map((session) => {
                const config = SESSION_STATUS_CONFIG[session.status];
                return (
                  <Link
                    key={session.id}
                    href={`/results/${session.id}`}
                    className="bg-muted-foreground/5 rounded-lg p-4 min-w-[200px] hover:bg-muted-foreground/10 transition-colors flex-shrink-0"
                  >
                    <p className="font-medium text-sm">{session.patientName}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getScaleTitle(session.scaleId)}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <Badge className={config.className} variant="secondary">
                        {config.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {session.date}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mes patients - mock */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-sans font-semibold">
                  Mes patients
                </h2>
              </div>
              <CreatePatientSheet
                onPatientCreated={handlePatientCreated}
                buttonSize="sm"
                buttonText="Ajouter"
                currentPatientCount={0}
              />
            </div>
            <Card className="border-0 bg-muted-foreground/5 shadow-none hover:shadow-none">
              <CardContent className="p-4">
                <div className="rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {mockPatients.map((patient) => (
                        <tr
                          key={patient.id}
                          className="border-t border-border/50 first:border-t-0 hover:bg-background/50 transition-colors"
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{patient.name}</p>
                              {patient.hasActive && (
                                <Badge variant="secondary" className="text-xs">
                                  Passation en cours
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => openAuthGate()}
                            >
                              <Interfaces.Send className="mr-2 h-4 w-4" />
                              Envoyer une échelle
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Sort sessions: pending first, then completed
  const sortedSessions = [...sessions].sort((a, b) => {
    const aIsPending = ["SENT", "STARTED"].includes(a.status);
    const bIsPending = ["SENT", "STARTED"].includes(b.status);
    if (aIsPending && !bIsPending) return -1;
    if (!aIsPending && bIsPending) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const activeSessions =
    sessionFilter === "all"
      ? sortedSessions
      : sortedSessions.filter((s) => s.status === sessionFilter);

  // Sort patients: those with active sessions first
  const patientIdsWithActiveSessions = new Set(
    sessions
      .filter((s) => ["SENT", "STARTED"].includes(s.status))
      .map((s) => s.patientId),
  );

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

  return (
    <div className="container mx-auto px-4 py-6">
      <GlobalSearchBar patients={patients} sessions={sessions} />
      <div className="mb-6">
        <h1 className="font-normal text-3xl">
          Bonjour{user.firstName ? `, ${user.firstName}` : ""}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Suivi des passations */}
        <div>
          <div className="mb-3">
            <h2 className="text-lg font-sans font-semibold">
              Suivi des passations
            </h2>
          </div>
          <div className="flex gap-2 mb-3">
            {(["all", "SENT", "STARTED", "COMPLETED"] as const).map((filter) => {
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
            })}
          </div>
          {activeSessions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Aucune passation en cours
            </p>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {activeSessions.map((session) => {
                const config = SESSION_STATUS_CONFIG[session.status];
                return (
                  <Link
                    key={session.id}
                    href={`/results/${session.id}`}
                    className="bg-muted-foreground/5 rounded-lg p-4 min-w-[200px] hover:bg-muted-foreground/10 transition-colors flex-shrink-0"
                  >
                    <p className="font-medium text-sm">
                      {session.patient
                        ? `${session.patient.firstName} ${session.patient.lastName}`
                        : "Patient"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getScaleTitle(session.scaleId)}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <Badge className={config.className} variant="secondary">
                        {config.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {daysSinceSent(session.sentAt || session.createdAt)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Mes patients */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-lg font-sans font-semibold">Mes patients</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <CreatePatientSheet
                      onPatientCreated={handlePatientCreated}
                      iconOnly
                      buttonVariant="ghost"
                      currentPatientCount={patients.length}
                    />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ajouter un patient</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
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
          <Card className="border-0 bg-muted-foreground/5 shadow-none hover:shadow-none">
            <CardContent className="p-4">
              {patientsLoading ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Chargement des patients...
                </p>
              ) : filteredPatients.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  {patientFilter === "active"
                    ? "Aucune passation en cours"
                    : "Aucun patient dans votre liste"}
                </p>
              ) : (
                <div className="rounded-lg overflow-hidden">
                  {filteredPatients.map((patient) => (
                    <Link
                      key={patient.id}
                      href={`/patients/${patient.id}`}
                      className="flex items-center justify-between p-3 border-t border-border/50 first:border-t-0 hover:bg-background/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {patient.firstName} {patient.lastName}
                        </p>
                        {patientIdsWithActiveSessions.has(patient.id) && (
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
                              fill="#f97316"
                              onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                setSendScalePatientId(patient.id);
                                setSendScaleOpen(true);
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Envoyer une échelle</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
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
    </div>
  );
}
