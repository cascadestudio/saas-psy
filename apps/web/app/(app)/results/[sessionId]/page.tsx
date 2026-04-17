"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import { sessionsApi, patientsApi, type Session, type Patient } from "@/lib/api-client";
import { scales } from "@/app/scalesData";
import { Arrow, Interfaces, Finance, Files } from "doodle-icons";
import {
  getMainScore,
  getMaxScore,
  getScorePercentage,
  getSubscores,
  getInterpretation as getStoredInterpretation,
} from "@/lib/score-utils";
import { SESSION_STATUS_CONFIG } from "@/lib/session-status";

export default function ResultsPage() {
  const { user, isLoading } = useUser();
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [session, setSession] = useState<Session | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

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

  const handleCopyLink = () => {
    const link = `${window.location.origin}/session/${sessionId}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isLoading || loading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) return null;

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

  const scale = scales.find((q) => q.id === session.scaleId);
  const statusConfig = SESSION_STATUS_CONFIG[session.status];
  const backHref = patient ? `/patients/${patient.id}` : "/dashboard";

  // --- Pending / non-completed states ---
  if (session.status !== "COMPLETED") {
    return (
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <Button asChild variant="ghost" size="icon" className="-ml-2">
            <Link href={backHref}>
              <Arrow.ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-normal text-3xl">Résultats de passation</h1>
        </div>

        {/* Subline */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pl-10">
          {patient && (
            <span className="flex items-center gap-1.5">
              <Interfaces.User className="h-3.5 w-3.5" />
              {patient.firstName} {patient.lastName}
            </span>
          )}
          {scale && (
            <span className="flex items-center gap-1.5">
              <Files.FileText className="h-3.5 w-3.5" />
              {scale.title}
            </span>
          )}
          <Badge className={statusConfig?.className} variant="secondary">
            {statusConfig?.label ?? session.status}
          </Badge>
        </div>

        {/* Pending state */}
        <div className="bg-muted-foreground/5 rounded-lg p-8 text-center space-y-4">
          <p className="text-muted-foreground">
            {session.status === "EXPIRED"
              ? "Cette passation a expiré. Le patient ne peut plus y répondre."
              : session.status === "CANCELLED"
              ? "Cette passation a été annulée."
              : "Les résultats seront disponibles une fois la passation complétée par le patient."}
          </p>
          {session.sentAt && (
            <p className="text-xs text-muted-foreground">
              Envoyée le{" "}
              {new Date(session.sentAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
          {(session.status === "SENT" || session.status === "STARTED") && (
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              <Interfaces.Copy className="mr-2 h-4 w-4" />
              {copied ? "Lien copié !" : "Copier le lien de passation"}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // --- Completed state ---
  const sameScaleSessions = allSessions
    .filter((s) => s.scaleId === session.scaleId && s.status === "COMPLETED")
    .sort(
      (a, b) =>
        new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
    );

  const currentSessionIndex = sameScaleSessions.findIndex(
    (s) => s.id === session.id
  );
  const previousSession =
    currentSessionIndex < sameScaleSessions.length - 1
      ? sameScaleSessions[currentSessionIndex + 1]
      : null;

  const currentMain = getMainScore(session.score);
  const previousMain = getMainScore(previousSession?.score);
  const maxScore = getMaxScore(session.score);
  const scorePercentage = getScorePercentage(session.score);
  const subscores = getSubscores(session.score);

  let trend: "up" | "down" | "stable" | null = null;
  let trendPercentage = 0;

  if (previousMain !== undefined && currentMain !== undefined) {
    const diff = currentMain - previousMain;
    trendPercentage = Math.abs(Math.round((diff / previousMain) * 100));
    if (diff > 0) trend = "up";
    else if (diff < 0) trend = "down";
    else trend = "stable";
  }

  const storedInterpretation = getStoredInterpretation(session.score);
  const displayInterpretation = storedInterpretation || session.interpretation;

  const scoreRange =
    !storedInterpretation && scale?.scoring?.ranges
      ? scale.scoring.ranges.find(
          (range: { min: number; max: number }) =>
            currentMain !== undefined &&
            currentMain >= range.min &&
            currentMain <= range.max
        )
      : null;

  const badgeInterpretation =
    storedInterpretation ||
    scoreRange?.interpretation ||
    (typeof session.interpretation === "string" ? session.interpretation : null);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <Button asChild variant="ghost" size="icon" className="-ml-2">
          <Link href={backHref}>
            <Arrow.ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="font-normal text-3xl">Résultats de passation</h1>
      </div>

      {/* Subline */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pl-10">
        {patient && (
          <span className="flex items-center gap-1.5">
            <Interfaces.User className="h-3.5 w-3.5" />
            {patient.firstName} {patient.lastName}
          </span>
        )}
        {scale && (
          <span className="flex items-center gap-1.5">
            <Files.FileText className="h-3.5 w-3.5" />
            {scale.title}
          </span>
        )}
        {session.completedAt && (
          <span className="flex items-center gap-1.5">
            <Interfaces.Calendar className="h-3.5 w-3.5" />
            {new Date(session.completedAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        )}
      </div>

      <div className="space-y-6">
        {/* Score et interprétation */}
        <div>
          <h2 className="text-lg font-sans font-semibold mb-3">
            Score et interprétation
          </h2>
          <div className="bg-muted-foreground/5 rounded-lg p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Score */}
              <div className="flex flex-col items-center justify-center sm:w-48 shrink-0">
                <div className="text-7xl font-bold text-primary leading-none mb-1">
                  {currentMain}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  sur {maxScore || "?"} ({scorePercentage}%)
                </div>
                {subscores.length > 0 && (
                  <div className="text-xs text-muted-foreground mt-1 text-center">
                    {subscores
                      .map(
                        (s) =>
                          `${s.label}: ${s.value}${s.max ? `/${s.max}` : ""}`
                      )
                      .join(" · ")}
                  </div>
                )}
                {badgeInterpretation && (
                  <Badge className="mt-3 text-sm px-3 py-1">
                    {badgeInterpretation}
                  </Badge>
                )}
              </div>

              {/* Interpretation + trend */}
              <div className="flex-1 space-y-4 sm:border-l sm:pl-6">
                {displayInterpretation && (
                  <div>
                    <p className="text-sm font-medium mb-1">Interprétation clinique</p>
                    <p className="text-sm text-muted-foreground">
                      {displayInterpretation}
                    </p>
                  </div>
                )}

                {trend && previousSession && (
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Évolution</p>
                    <div className="flex items-center gap-2">
                      {trend === "down" && (
                        <>
                          <Finance.TrendUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">
                            Amélioration de {trendPercentage}% depuis la dernière
                            passation
                          </span>
                        </>
                      )}
                      {trend === "up" && (
                        <>
                          <Finance.TrendUp className="h-4 w-4 text-brand-orange" />
                          <span className="text-sm text-brand-orange">
                            Augmentation de {trendPercentage}% depuis la dernière
                            passation
                          </span>
                        </>
                      )}
                      {trend === "stable" && (
                        <>
                          <span className="inline-block w-4 h-0.5 bg-gray-500 rounded" />
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
                      : {previousMain}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Historique longitudinal */}
        {sameScaleSessions.length > 1 && (
          <div>
            <h2 className="text-lg font-sans font-semibold mb-3">
              Historique longitudinal
            </h2>
            <div className="bg-muted-foreground/5 rounded-lg overflow-hidden">
              {sameScaleSessions.map((s, index) => {
                const isCurrent = s.id === session.id;
                return (
                  <Link
                    key={s.id}
                    href={`/results/${s.id}`}
                    className={`flex items-center justify-between p-4 border-t border-border/50 first:border-t-0 transition-colors ${
                      isCurrent
                        ? "bg-primary/5 pointer-events-none"
                        : "hover:bg-background/50 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground w-6">
                        T{sameScaleSessions.length - 1 - index}
                      </span>
                      <div>
                        <p className="text-sm font-medium">
                          {new Date(s.completedAt!).toLocaleDateString("fr-FR")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getStoredInterpretation(s.score) || s.interpretation}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold">
                        {getMainScore(s.score)}
                      </span>
                      {isCurrent && (
                        <Badge variant="outline" className="text-xs">
                          Actuel
                        </Badge>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
