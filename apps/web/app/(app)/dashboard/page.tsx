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

  // Anonymous user view
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

        <Card>
          <CardHeader>
            <CardTitle>Mes patients</CardTitle>
            <CardDescription>
              Gérez vos patients et envoyez des échelles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Interfaces.User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                Créez un compte pour ajouter vos premiers patients
              </p>
              <CreatePatientSheet
                onPatientCreated={handlePatientCreated}
                buttonText="Ajouter un patient"
                currentPatientCount={patients.length}
              />
            </div>
          </CardContent>
        </Card>
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

  const getScaleTitle = (scaleId: string) => {
    return scales.find((s) => s.id === scaleId)?.title ?? scaleId;
  };

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
        <Card>
          <CardHeader>
            <CardTitle>Suivi des passations</CardTitle>
            <CardDescription>
              {activeSessions.length} passation
              {activeSessions.length > 1 ? "s" : ""} en cours ou récente
              {activeSessions.length > 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                      href={
                        session.status === "COMPLETED"
                          ? `/sessions/${session.id}`
                          : `/sessions/${session.id}`
                      }
                      className="border rounded-lg p-4 min-w-[200px] hover:bg-muted/50 transition-colors flex-shrink-0"
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

        {/* Mes patients */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Mes patients</CardTitle>
                <CardDescription>
                  {patients.length} patient{patients.length > 1 ? "s" : ""}
                </CardDescription>
              </div>
              <CreatePatientSheet
                onPatientCreated={handlePatientCreated}
                buttonSize="sm"
                buttonText="Ajouter"
                currentPatientCount={patients.length}
              />
            </div>
          </CardHeader>
          <CardContent>
            {patientsLoading ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Chargement des patients...
              </p>
            ) : sortedPatients.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Aucun patient dans votre liste
              </p>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {sortedPatients.map((patient) => (
                      <tr
                        key={patient.id}
                        className="border-t first:border-t-0 hover:bg-muted/50 transition-colors"
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
  );
}
