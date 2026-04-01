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
import { CreatePatientSheet } from "@/components/CreatePatientSheet";

const STATUS_CONFIG: Record<
  Session["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  CREATED: { label: "Créée", variant: "secondary" },
  SENT: { label: "Envoyée", variant: "default" },
  STARTED: { label: "En cours", variant: "default" },
  COMPLETED: { label: "Complétée", variant: "outline" },
  EXPIRED: { label: "Expirée", variant: "destructive" },
  CANCELLED: { label: "Annulée", variant: "secondary" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  });
}

export default function DashboardPage() {
  const { user, isLoading } = useUser();
  const { openAuthGate } = useAuthGate();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);

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
    { id: "1", patientName: "Marie Dupont", scaleId: "inventaire-de-depression-de-beck", status: "SENT", date: "28/03" },
    { id: "2", patientName: "Marie Dupont", scaleId: "stai-anxiete-generalisee", status: "STARTED", date: "30/03" },
    { id: "3", patientName: "Jean Martin", scaleId: "echelle-d-anxiete-sociale-de-liebowitz", status: "COMPLETED", date: "01/04" },
    { id: "4", patientName: "Sophie Bernard", scaleId: "traumatismes-pcl5", status: "SENT", date: "31/03" },
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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-normal not-italic">
              Bienvenue sur Melya
            </h1>
          </div>
          <Button asChild>
            <Link href="/send-scale">
              <Interfaces.Send className="mr-2 h-4 w-4" />
              Envoyer une échelle
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {/* Suivi des passations - mock */}
          <div>
            <div className="mb-3">
              <h2 className="text-lg font-sans font-semibold">Suivi des passations</h2>
            </div>
            <Card className="border-0 bg-muted-foreground/5 shadow-none hover:shadow-none">
              <CardContent className="p-4">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {mockSessions.map((session) => {
                  const config = STATUS_CONFIG[session.status];
                  return (
                    <Link
                      key={session.id}
                      href={`/results/${session.id}`}
                      className="bg-background rounded-lg p-4 min-w-[200px] hover:bg-background/80 transition-colors flex-shrink-0"
                    >
                      <p className="font-medium text-sm">
                        {session.patientName}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {getScaleTitle(session.scaleId)}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant={config.variant}>{config.label}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {session.date}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
              </CardContent>
            </Card>
          </div>

          {/* Mes patients - mock */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-sans font-semibold">Mes patients</h2>
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
  const activeSessions = [...sessions].sort((a, b) => {
    const aIsPending = ["CREATED", "SENT", "STARTED"].includes(a.status);
    const bIsPending = ["CREATED", "SENT", "STARTED"].includes(b.status);
    if (aIsPending && !bIsPending) return -1;
    if (!aIsPending && bIsPending) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Sort patients: those with active sessions first
  const patientIdsWithActiveSessions = new Set(
    sessions
      .filter((s) => ["CREATED", "SENT", "STARTED"].includes(s.status))
      .map((s) => s.patientId)
  );

  const sortedPatients = [...patients].sort((a, b) => {
    const aHasActive = patientIdsWithActiveSessions.has(a.id);
    const bHasActive = patientIdsWithActiveSessions.has(b.id);
    if (aHasActive && !bHasActive) return -1;
    if (!aHasActive && bHasActive) return 1;
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl">
            Bonjour{user.firstName ? `, ${user.firstName}` : ""}
          </h1>
        </div>
        <Button asChild>
          <Link href="/send-scale">
            <Interfaces.Send className="mr-2 h-4 w-4" />
            Envoyer une échelle
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        {/* Suivi des passations */}
        <div>
          <div className="mb-3">
            <h2 className="text-lg font-sans font-semibold">Suivi des passations</h2>
          </div>
          <Card className="border-0 bg-muted-foreground/5 shadow-none hover:shadow-none">
            <CardContent className="p-4">
            {activeSessions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Aucune passation en cours
              </p>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {activeSessions.map((session) => {
                  const config = STATUS_CONFIG[session.status];
                  return (
                    <Link
                      key={session.id}
                      href={`/results/${session.id}`}
                      className="bg-background rounded-lg p-4 min-w-[200px] hover:bg-background/80 transition-colors flex-shrink-0"
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
                        <Badge variant={config.variant}>{config.label}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(session.sentAt || session.createdAt)}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
            </CardContent>
          </Card>
        </div>

        {/* Mes patients */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-sans font-semibold">Mes patients</h2>
            </div>
            <CreatePatientSheet
              onPatientCreated={handlePatientCreated}
              buttonSize="sm"
              buttonText="Ajouter"
              currentPatientCount={patients.length}
            />
          </div>
          <Card className="border-0 bg-muted-foreground/5 shadow-none hover:shadow-none">
            <CardContent className="p-4">
            {patientsLoading ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Chargement des patients...
              </p>
            ) : sortedPatients.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Aucun patient dans votre liste
              </p>
            ) : (
              <div className="rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {sortedPatients.map((patient) => (
                      <tr
                        key={patient.id}
                        className="border-t border-border/50 first:border-t-0 hover:bg-background/50 transition-colors"
                      >
                        <td className="p-3">
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
                        </td>
                        <td className="p-3 text-right">
                          <Button asChild variant="default" size="sm">
                            <Link
                              href={`/send-scale?patientId=${patient.id}`}
                            >
                              <Interfaces.Send className="mr-2 h-4 w-4" />
                              Envoyer une échelle
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
