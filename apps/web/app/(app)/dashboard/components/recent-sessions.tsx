"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRecentSessions } from "@/data/mock-sessions";
import { getPatientById } from "@/data/mock-patients";
import { questionnaires } from "@/app/questionnairesData";
import Link from "next/link";

const statusColors = {
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
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

export function RecentSessions() {
  const recentSessions = getRecentSessions(5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passations récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentSessions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aucune passation récente
            </p>
          ) : (
            recentSessions.map((session) => {
              const patient = getPatientById(session.patientId);
              const questionnaire = questionnaires.find(
                (q) => q.id === session.questionnaireId
              );

              return (
                <div
                  key={session.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">
                        {patient?.initials || "Patient inconnu"}
                      </p>
                      <Badge
                        className={statusColors[session.status]}
                        variant="secondary"
                      >
                        {statusLabels[session.status]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {questionnaire?.title || session.questionnaireId}
                    </p>
                    {session.status === "completed" &&
                      session.score !== null && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Score: {session.score} - {session.interpretation}
                        </p>
                      )}
                  </div>
                  <div className="text-xs text-muted-foreground ml-4">
                    {new Date(session.sentAt).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
