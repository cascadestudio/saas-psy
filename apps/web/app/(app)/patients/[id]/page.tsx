"use client";

import { redirect, useParams, useRouter } from "next/navigation";
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
import { useUser } from "@/app/context/UserContext";
import { useEffect } from "react";
import { getPatientById } from "@/data/mock-patients";
import { getSessionsByPatientId } from "@/data/mock-sessions";
import { questionnaires } from "@/app/questionnairesData";
import { Arrow, Interfaces, Files } from "doodle-icons";

const statusColors = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  sent: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  expired: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

const statusLabels = {
  completed: "Complété",
  in_progress: "Vu",
  sent: "Envoyé",
  expired: "Expiré",
};

export default function PatientDetailPage() {
  const { user, isLoading } = useUser();
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/sign-in");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const patient = getPatientById(patientId);

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

  const sessions = getSessionsByPatientId(patientId).sort(
    (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  );
  const completedSessions = sessions.filter((s) => s.status === "completed");

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/patients">
            <Arrow.ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="font-bold text-3xl">{patient.fullName}</h1>
          <p className="text-muted-foreground mt-1">{patient.email}</p>
        </div>
        <Button asChild size="lg">
          <Link href={`/send-questionnaire?patientId=${patient.id}`}>
            <Interfaces.Send className="mr-2 h-4 w-4" />
            Envoyer une échelle
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Informations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Interfaces.Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{patient.age} ans</span>
            </div>
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
                  {new Date(sessions[0].sentAt).toLocaleDateString("fr-FR")}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {questionnaires.find((q) => q.id === sessions[0].questionnaireId)
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
              <Button asChild>
                <Link href={`/send-questionnaire?patientId=${patient.id}`}>
                  <Interfaces.Send className="mr-2 h-4 w-4" />
                  Envoyer la première échelle
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => {
                const questionnaire = questionnaires.find(
                  (q) => q.id === session.questionnaireId
                );

                return (
                  <div
                    key={session.id}
                    className="flex items-center justify-between border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">
                          {questionnaire?.title || session.questionnaireId}
                        </p>
                        <Badge
                          className={statusColors[session.status]}
                          variant="secondary"
                        >
                          {statusLabels[session.status]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Envoyé le{" "}
                        {new Date(session.sentAt).toLocaleDateString("fr-FR")}
                      </p>
                      {session.status === "completed" && session.score !== null && (
                        <p className="text-sm font-medium text-green-700 dark:text-green-400 mt-1">
                          Score: {session.score} - {session.interpretation}
                        </p>
                      )}
                    </div>
                    {session.status === "completed" && (
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
