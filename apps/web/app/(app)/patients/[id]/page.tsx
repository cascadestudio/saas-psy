"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState, useCallback } from "react";
import { patientsApi, sessionsApi, type Patient, type Session } from "@/lib/api-client";
import { scales } from "@/app/scalesData";
import { Arrow, Interfaces, Files } from "doodle-icons";
import { MoreVertical, Pencil, Archive } from "lucide-react";
import { ArchivePatientDialog } from "@/components/ArchivePatientDialog";
import { RestorePatientButton } from "@/components/RestorePatientButton";
import { EditPatientSheet } from "@/components/EditPatientSheet";
import { formatScore } from "@/lib/score-utils";

const statusColors: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-800",
  STARTED: "bg-blue-100 text-blue-800",
  SENT: "bg-orange-100 text-orange-800",
  EXPIRED: "bg-gray-100 text-gray-800",
  CREATED: "bg-gray-100 text-gray-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  COMPLETED: "Complété",
  STARTED: "Vu",
  SENT: "Envoyé",
  EXPIRED: "Expiré",
  CREATED: "Créé",
  CANCELLED: "Annulé",
};

export default function PatientDetailPage() {
  const { user, isLoading } = useUser();
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  const loadData = useCallback(async () => {
    if (!user || !patientId) return;
    setLoading(true);
    try {
      const [patientRes, sessionsRes] = await Promise.all([
        patientsApi.getById(patientId),
        sessionsApi.getByPatientId(patientId),
      ]);
      setPatient(patientRes.patient);
      // Sort sessions by date descending
      setSessions(
        sessionsRes.sessions.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (error) {
      console.error("Error loading patient data:", error);
      setPatient(null);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, [user, patientId]);

  // Load patient and sessions from API
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, loadData]);

  const handleArchived = () => {
    router.push("/patients");
  };

  const handleRestored = () => {
    loadData();
  };

  const handlePatientUpdated = (updated: Patient) => {
    setPatient(updated);
  };

  if (isLoading || loading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!patient) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Patient non trouvé</p>
        <Button asChild>
          <Link href="/patients">Retour à la liste</Link>
        </Button>
      </div>
    );
  }

  const completedSessions = sessions.filter((s) => s.status === "COMPLETED");

  // Calculate age from birthDate
  const calculateAge = (birthDate?: string) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(patient.birthDate);
  const isArchived = !!patient.archivedAt;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/patients">
            <Arrow.ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-3xl">
              {patient.firstName} {patient.lastName}
            </h1>
            {isArchived && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Archivé le {new Date(patient.archivedAt!).toLocaleDateString("fr-FR")}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1">{patient.email}</p>
        </div>
        <div className="flex items-center gap-2">
          {isArchived ? (
            <RestorePatientButton
              patient={patient}
              onRestored={handleRestored}
              size="lg"
            />
          ) : (
            <>
              <Button asChild size="lg">
                <Link href={`/send-scale?patientId=${patient.id}`}>
                  <Interfaces.Send className="mr-2 h-4 w-4" />
                  Envoyer une échelle
                </Link>
              </Button>
              <EditPatientSheet
                patient={patient}
                onPatientUpdated={handlePatientUpdated}
                open={editOpen}
                onOpenChange={setEditOpen}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setEditOpen(true)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Modifier
                  </DropdownMenuItem>
                  <ArchivePatientDialog
                    patient={patient}
                    onArchived={handleArchived}
                    trigger={
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Archive className="mr-2 h-4 w-4" />
                        Archiver
                      </DropdownMenuItem>
                    }
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Informations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {age && (
              <div className="flex items-center gap-2 text-sm">
                <Interfaces.Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{age} ans</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Interfaces.Mail className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{patient.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Files.FileText className="h-4 w-4 text-muted-foreground" />
              <span>
                Créé le{" "}
                {new Date(patient.createdAt).toLocaleDateString("fr-FR")}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Passations totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sessions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {completedSessions.length} complétée(s)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dernière passation
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sessions.length > 0 ? (
              <>
                <div className="text-lg font-semibold">
                  {new Date(sessions[0].createdAt).toLocaleDateString("fr-FR")}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {scales.find((s) => s.id === sessions[0].scaleId)
                    ?.title || "Échelle"}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Aucune passation</p>
            )}
          </CardContent>
        </Card>
      </div>

      {patient.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{patient.notes}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Historique des passations</CardTitle>
          <CardDescription>
            Toutes les passations d'échelles pour ce patient
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground mb-4">
                Aucune passation enregistrée pour ce patient
              </p>
              {!isArchived && (
                <Button asChild>
                  <Link href={`/send-scale?patientId=${patient.id}`}>
                    <Interfaces.Send className="mr-2 h-4 w-4" />
                    Envoyer la première échelle
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => {
                const scale = scales.find(
                  (s) => s.id === session.scaleId
                );

                return (
                  <div
                    key={session.id}
                    className="flex items-center justify-between border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">
                          {scale?.title || session.scaleId}
                        </p>
                        <Badge
                          className={statusColors[session.status] || statusColors.created}
                          variant="secondary"
                        >
                          {statusLabels[session.status] || session.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Créé le{" "}
                        {new Date(session.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                      {session.status === "COMPLETED" && session.score != null && (
                        <p className="text-sm font-medium text-green-700 mt-1">
                          Score: {formatScore(session.score)}
                          {session.interpretation && ` - ${session.interpretation}`}
                        </p>
                      )}
                    </div>
                    {session.status === "COMPLETED" && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/results/${session.id}`}>
                          Voir résultats
                        </Link>
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
