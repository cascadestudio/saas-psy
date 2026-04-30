"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import { sessionsApi, patientsApi, type Session, type Patient } from "@/lib/api-client";
import { scales } from "@/app/scalesData";
import {
  getMockPatient,
  getMockSession,
  getMockSessionsByPatient,
  isMockId,
} from "@/lib/mock-data";
import { Interfaces, Files } from "doodle-icons";
import { SESSION_STATUS_CONFIG } from "@/lib/session-status";
import { getSeverityPalette } from "@/lib/severity";
import { ItemResponsesList } from "@/components/passation/ItemResponsesList";
import { AlertsBanner } from "@/components/passation/AlertsBanner";
import { TrendBlock } from "@/components/passation/TrendBlock";
import { PatientCommentsBlock } from "@/components/passation/PatientCommentsBlock";
import { PassationSkeleton } from "@/components/passation/PassationSkeleton";
import { relativeTimeFr, formatDateLongFr } from "@/lib/relative-time";

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
    if (!sessionId) return;
    if (!user) {
      const mockSession = getMockSession(sessionId);
      setSession(mockSession);
      if (mockSession?.patientId) {
        setPatient(getMockPatient(mockSession.patientId));
        setAllSessions(getMockSessionsByPatient(mockSession.patientId));
      }
      setLoading(false);
      return;
    }
    if (isMockId(sessionId)) {
      setSession(null);
      setLoading(false);
      return;
    }
    const loadData = async () => {
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
    loadData();
  }, [user, sessionId]);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/session/${sessionId}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isLoading || loading) {
    return <PassationSkeleton />;
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

  const scale = scales.find((q) => q.id === session.scaleId);
  const statusConfig = SESSION_STATUS_CONFIG[session.status];
  const headerTitle = scale?.acronym ?? "Passation";

  const scaleTitle = scale
    ? scale.title.replace(
        new RegExp(`^${scale.acronym}\\s*[-—:]\\s*`, "i"),
        "",
      )
    : "";

  const ScaleLogo = scale ? (
    <div
      className="flex items-center justify-center flex-shrink-0 rounded-md"
      style={{
        backgroundColor: scale.color ?? "#e5e7eb",
        width: 72,
        height: 72,
      }}
    >
      {scale.icon && (
        <Image
          src={scale.icon}
          alt={scale.acronym}
          width={44}
          height={44}
          className="w-3/5 h-3/5 object-contain"
        />
      )}
    </div>
  ) : null;

  const sentDate = session.sentAt
    ? new Date(session.sentAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const Header = (
    <div className="flex items-start justify-between gap-3 mb-6">
      <div className="flex items-center gap-3">
        {ScaleLogo}
        <div>
          <div className="flex items-center gap-3">
            {scaleTitle ? (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h1 className="font-normal text-3xl leading-tight border-b border-dotted border-muted-foreground/40 inline-block cursor-help">
                      {headerTitle}
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent className="bg-foreground text-background">
                    {scaleTitle}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <h1 className="font-normal text-3xl leading-tight">
                {headerTitle}
              </h1>
            )}
            <Badge className={statusConfig?.className} variant="secondary">
              {statusConfig?.label ?? session.status}
            </Badge>
          </div>
          {sentDate && (
            <p className="text-sm text-muted-foreground mt-1">
              Envoyée le {sentDate}
            </p>
          )}
        </div>
      </div>
      {session.status === "COMPLETED" ? (
        <Button variant="secondary">
          <Files.FileText />
          Imprimer les résultats
        </Button>
      ) : (
        <Button variant="secondary">
          <Interfaces.Mail />
          Renvoyer le mail
        </Button>
      )}
    </div>
  );

  const Breadcrumb = (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
      <Link
        href="/patients"
        className="hover:text-foreground transition-colors"
      >
        Patients
      </Link>
      {patient && (
        <>
          <span className="text-muted-foreground/50">/</span>
          <Link
            href={`/patients/${patient.id}`}
            className="hover:text-foreground transition-colors"
          >
            {patient.firstName} {patient.lastName}
          </Link>
        </>
      )}
    </nav>
  );

  // --- Pending / non-completed states ---
  if (session.status !== "COMPLETED") {
    return (
      <div className="container mx-auto px-4 py-6">
        {Breadcrumb}
        {Header}

        {/* Pending state */}
        <div className="border rounded-lg p-8 text-center space-y-4">
          <p className="text-muted-foreground">
            {session.status === "EXPIRED"
              ? "Cette passation a expiré. Le patient ne peut plus y répondre."
              : session.status === "CANCELLED"
              ? "Cette passation a été annulée."
              : "Les résultats seront disponibles une fois la passation complétée par le patient."}
          </p>
          {(session.status === "SENT" || session.status === "STARTED") && (
            <Button variant="secondary" size="sm" onClick={handleCopyLink}>
              <Interfaces.Copy />
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

  const score = session.score;
  const currentMain = score?.totalScore;
  const previousMain = previousSession?.score?.totalScore;
  const maxScore = score?.maxScore;
  const subscores = score?.subscores ?? [];
  const alerts = score?.alerts ?? [];
  const badgeInterpretation = score?.interpretation || null;
  const severityPalette = getSeverityPalette(
    score?.severityIndex ?? -1,
    score?.severityRangeCount ?? 0,
  );


  return (
    <div className="container mx-auto px-4 py-6">
      {Breadcrumb}
      {Header}

      <div className="space-y-6">
        {/* Alertes cliniques — bandeau prioritaire */}
        {alerts.length > 0 && <AlertsBanner alerts={alerts} />}

        {/* Score et interprétation */}
        <div>
          <h2 className="text-lg font-sans font-semibold mb-3">
            Score et interprétation
          </h2>
          <div className="border rounded-lg p-6 space-y-6">
            {/* Interprétation clinique — pastille + verdict */}
            {badgeInterpretation && (
              <div>
                <p className="text-sm font-medium mb-2">
                  Interprétation clinique
                </p>
                <div className="inline-flex items-center gap-3">
                  {(score?.severityRangeCount ?? 0) > 1 && (
                    <span
                      className={`h-3 w-3 rounded-full shrink-0 ${severityPalette.gaugeFill}`}
                      aria-hidden
                    />
                  )}
                  <span className="text-2xl font-medium">
                    {badgeInterpretation}
                  </span>
                </div>
              </div>
            )}

            {/* Score */}
            <div className="text-muted-foreground">
              Score :{" "}
              <span className="text-foreground font-semibold text-xl">
                {currentMain}
              </span>
              {maxScore !== undefined && (
                <span className="text-muted-foreground"> / {maxScore}</span>
              )}
            </div>

            {/* Subscores as mini-cards */}
            {subscores.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {subscores.map((s) => {
                  const pct = s.max ? (s.value / s.max) * 100 : 0;
                  return (
                    <div
                      key={s.label}
                      className="border rounded-md p-3 bg-muted/30"
                    >
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="text-sm font-medium">{s.label}</span>
                        <span className="text-sm tabular-nums">
                          <span className="font-semibold">{s.value}</span>
                          {s.max !== undefined && (
                            <span className="text-muted-foreground">
                              {" "}
                              / {s.max}
                            </span>
                          )}
                        </span>
                      </div>
                      {s.max !== undefined && (
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-foreground/60 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>

        {/* Évolution */}
        {scale &&
          previousSession?.completedAt &&
          previousMain !== undefined &&
          currentMain !== undefined && (
            <TrendBlock
              currentScore={currentMain}
              previousScore={previousMain}
              previousCompletedAt={previousSession.completedAt}
              higherIsBetter={scale.higherIsBetter}
            />
          )}

        {/* Réponses du patient — item par item */}
        {scale && session.responses && (
          <div>
            <h2 className="text-lg font-sans font-semibold mb-3">
              Réponses du patient
            </h2>
            <ItemResponsesList
              scale={scale}
              responses={session.responses}
              flaggedItems={alerts
                .map((a) => a.itemIndex)
                .filter((i): i is number => typeof i === "number")}
            />
          </div>
        )}

        {/* Commentaire libre du patient */}
        {session.patientComments && (
          <PatientCommentsBlock comments={session.patientComments} />
        )}

        {/* Historique longitudinal */}
        {sameScaleSessions.length > 1 && (
          <div>
            <h2 className="text-lg font-sans font-semibold mb-3">
              Historique longitudinal
            </h2>
            <ol className="relative border-l-2 border-border ml-3 space-y-6 py-2">
              {sameScaleSessions.map((s, index) => {
                const isCurrent = s.id === session.id;
                const olderSession = sameScaleSessions[index + 1];
                const sScore = s.score?.totalScore;
                const olderScore = olderSession?.score?.totalScore;
                const diff =
                  sScore !== undefined && olderScore !== undefined
                    ? sScore - olderScore
                    : null;
                const isImprovement =
                  diff !== null &&
                  ((diff < 0 && !scale?.higherIsBetter) ||
                    (diff > 0 && scale?.higherIsBetter));
                const deltaColor =
                  diff === null || diff === 0
                    ? "text-muted-foreground"
                    : isImprovement
                      ? "text-emerald-600"
                      : "text-red-600";
                const rangeCount = s.score?.severityRangeCount ?? 0;
                const hasSeverity = rangeCount > 1;
                const dotPalette = getSeverityPalette(
                  s.score?.severityIndex ?? -1,
                  rangeCount,
                );
                const RowTag = isCurrent ? "div" : Link;
                const rowProps = isCurrent
                  ? {}
                  : { href: `/passation/${s.id}` };
                return (
                  <li key={s.id} className="relative pl-6">
                    <span
                      className={`absolute -left-[7px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full ring-4 ring-background ${
                        hasSeverity ? dotPalette.gaugeFill : "bg-border"
                      }`}
                      aria-hidden
                    />
                    <RowTag
                      {...(rowProps as { href: string })}
                      className={`flex items-start justify-between gap-4 rounded-md p-3 -my-1 transition-colors ${
                        isCurrent
                          ? "bg-brand-orange/5 ring-1 ring-brand-orange/30"
                          : "hover:bg-zinc-100 cursor-pointer"
                      }`}
                    >
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-sm font-semibold ${
                              isCurrent ? "" : "text-muted-foreground"
                            }`}
                          >
                            {s.completedAt
                              ? formatDateLongFr(s.completedAt)
                              : "—"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ·{" "}
                            {s.completedAt
                              ? relativeTimeFr(s.completedAt)
                              : ""}
                          </span>
                          {isCurrent && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] uppercase tracking-wide"
                            >
                              Passation actuelle
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {s.score?.interpretation || s.interpretation}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-2 shrink-0">
                        <span
                          className={`text-2xl font-bold tabular-nums leading-none ${
                            isCurrent ? "" : "text-muted-foreground"
                          }`}
                        >
                          {sScore}
                        </span>
                        {diff !== null && diff !== 0 && (
                          <span
                            className={`text-xs font-semibold tabular-nums ${deltaColor}`}
                          >
                            {diff > 0 ? "+" : "−"}
                            {Math.abs(diff)}
                          </span>
                        )}
                      </div>
                    </RowTag>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
