"use client";

import { useParams } from "next/navigation";
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
import { useEffect, useState } from "react";
import { sessionsApi, patientsApi, type Session, type Patient } from "@/lib/api-client";
import { scales } from "@/app/scalesData";
import { Arrow, Interfaces, Finance } from "doodle-icons";
import { Minus } from "lucide-react";

export default function ResultsPage() {
  const { user, isLoading } = useUser();
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [session, setSession] = useState<Session | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  // Load session data from API
  useEffect(() => {
    const loadData = async () => {
      if (!user || !sessionId) return;
      setLoading(true);
      try {
        const { session: sessionData } = await sessionsApi.getById(sessionId);
        setSession(sessionData);

        if (sessionData.patientId) {
          const [patientRes, sessionsRes] = await Promise.all([
            patientsApi.getById(sessionData.patientId),
            sessionsApi.getByPatientId(sessionData.patientId),
          ]);
          setPatient(patientRes.patient);
          setAllSessions(sessionsRes.sessions);
        }
      } catch (error) {
        console.error("Error loading session:", error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadData();
    }
  }, [user, sessionId]);

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

  if (!session) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Session non trouvée</p>
        <Button asChild>
          <Link href="/dashboard">Retour au tableau de bord</Link>
        </Button>
      </div>
    );
  }

  const scale = scales.find(
    (q) => q.id === session.scaleId
  );

  // Get longitudinal data (previous sessions of same scale for same patient)
  const sameQuestionnaireSessions = allSessions
    .filter(
      (s) =>
        s.scaleId === session.scaleId && s.status === "COMPLETED"
    )
    .sort(
      (a, b) =>
        new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
    );

  const currentSessionIndex = sameQuestionnaireSessions.findIndex(
    (s) => s.id === session.id
  );
  const previousSession =
    currentSessionIndex < sameQuestionnaireSessions.length - 1
      ? sameQuestionnaireSessions[currentSessionIndex + 1]
      : null;

  let trend: "up" | "down" | "stable" | null = null;
  let trendPercentage = 0;

  if (previousSession && previousSession.score !== undefined && session.score !== undefined) {
    const diff = session.score - previousSession.score;
    trendPercentage = Math.abs(
      Math.round((diff / previousSession.score) * 100)
    );

    if (diff > 0) {
      trend = "up";
    } else if (diff < 0) {
      trend = "down";
    } else {
      trend = "stable";
    }
  }

  // Get score range info
  const scoreRange = scale?.scoring?.ranges?.find(
    (range: { min: number; max: number }) =>
      session.score !== undefined &&
      session.score >= range.min &&
      session.score <= range.max
  );

  // Calculate max possible score
  const getMaxScore = () => {
    if (!scale) return 0;

    // For dual-scale scales (like Liebowitz)
    if (scale.answerScales) {
      if ("anxiety" in scale.answerScales) {
        return scale.questions.length * 3 * 2; // 2 scales, each 0-3
      }
    }

    // For BDI-style scales
    if (
      scale.questions &&
      Array.isArray(scale.questions) &&
      typeof scale.questions[0] === "object" &&
      "options" in scale.questions[0]
    ) {
      return scale.questions.length * 3; // Assuming 0-3 scale
    }

    // For STAI-style scales
    if (
      scale.questions &&
      Array.isArray(scale.questions) &&
      typeof scale.questions[0] === "object" &&
      "items" in scale.questions[0]
    ) {
      const totalItems = scale.questions.reduce(
        (acc: number, q: any) => {
          if (typeof q === "object" && "items" in q && Array.isArray(q.items)) {
            return acc + q.items.length;
          }
          return acc;
        },
        0
      );
      return totalItems * 4; // 1-4 scale
    }

    // For simple scales
    if (scale.questions && Array.isArray(scale.questions)) {
      return scale.questions.length * 4; // Assuming 0-4 scale
    }

    return 100; // Default
  };

  const maxScore = getMaxScore();
  const scorePercentage =
    session.score !== undefined ? Math.round((session.score / maxScore) * 100) : 0;

  return (
    <div className="flex-1 w-full flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/patients/${patient?.id}`}>
            <Arrow.ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="font-bold text-3xl">Résultats de passation</h1>
          <p className="text-muted-foreground mt-1">
            {patient?.firstName} {patient?.lastName} - {scale?.title}
          </p>
        </div>
        <Button variant="outline" disabled>
          <Interfaces.Download className="mr-2 h-4 w-4" />
          Exporter PDF
        </Button>
      </div>

      {/* Main Score Card */}
      <Card>
        <CardHeader>
          <CardTitle>Score et interprétation</CardTitle>
          <CardDescription>
            Complété le{" "}
            {session.completedAt &&
              new Date(session.completedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Score Gauge */}
            <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg">
              <div className="text-6xl font-bold text-primary mb-2">
                {session.score}
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                sur {maxScore} ({scorePercentage}%)
              </div>
              {scoreRange && (
                <Badge className="text-base px-4 py-2">
                  {scoreRange.interpretation}
                </Badge>
              )}
            </div>

            {/* Interpretation */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Interprétation clinique</h4>
                <p className="text-sm text-muted-foreground">
                  {session.interpretation}
                </p>
              </div>

              {/* Trend indicator */}
              {trend && previousSession && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Évolution</h4>
                  <div className="flex items-center gap-2">
                    {trend === "down" && (
                      <>
                        <Finance.TrendUp className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-green-600">
                          Amélioration de {trendPercentage}% depuis la dernière
                          passation
                        </span>
                      </>
                    )}
                    {trend === "up" && (
                      <>
                        <Finance.TrendUp className="h-5 w-5 text-orange-600" />
                        <span className="text-sm text-orange-600">
                          Augmentation de {trendPercentage}% depuis la dernière
                          passation
                        </span>
                      </>
                    )}
                    {trend === "stable" && (
                      <>
                        <Minus className="h-5 w-5 text-gray-600" />
                        <span className="text-sm text-gray-600">
                          Score stable depuis la dernière passation
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Passation précédente le{" "}
                    {new Date(previousSession.completedAt!).toLocaleDateString(
                      "fr-FR"
                    )}{" "}
                    : {previousSession.score}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Longitudinal History */}
      {sameQuestionnaireSessions.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Historique longitudinal</CardTitle>
            <CardDescription>
              Évolution des scores au fil du temps ({
                sameQuestionnaireSessions.length
              }{" "}
              passation(s))
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sameQuestionnaireSessions.map((s, index) => {
                const isCurrent = s.id === session.id;
                return (
                  <div
                    key={s.id}
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      isCurrent ? "bg-primary/5 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium text-muted-foreground w-8">
                        T{index}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {new Date(s.completedAt!).toLocaleDateString("fr-FR")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {s.interpretation}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold">{s.score}</div>
                      {isCurrent && (
                        <Badge variant="outline">Actuel</Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Questionnaire Details */}
      <Card>
        <CardHeader>
          <CardTitle>À propos de ce scale</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">
              {scale?.longDescription || scale?.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Catégorie</p>
              <p className="font-medium">{scale?.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Durée estimée
              </p>
              <p className="font-medium">{scale?.estimatedTime}</p>
            </div>
          </div>

          {scale?.scoring && (
            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Méthode de cotation</h4>
              <p className="text-sm text-muted-foreground">
                {scale.scoring.method}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
