"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState, useCallback } from "react";
import {
  patientsApi,
  sessionsApi,
  type Patient,
  type Session,
} from "@/lib/api-client";
import { scales } from "@/app/scalesData";
import { Interfaces, Food } from "doodle-icons";
import { ArchivePatientDialog } from "@/components/ArchivePatientDialog";
import { RestorePatientButton } from "@/components/RestorePatientButton";
import { EditPatientSheet } from "@/components/EditPatientSheet";
import { SendScaleSheet } from "@/components/SendScaleSheet";
import { formatScore } from "@/lib/score-utils";
import { SESSION_STATUS_CONFIG } from "@/lib/session-status";
import { cn } from "@/lib/utils";
import { getMockPatient, getMockSessionsByPatient, isMockId } from "@/lib/mock-data";
import { useAuthGate } from "@/app/context/AuthGateContext";

export default function PatientDetailPage() {
  const { user, isLoading } = useUser();
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [sendScaleOpen, setSendScaleOpen] = useState(false);

  const { openAuthGate } = useAuthGate();

  const loadData = useCallback(async () => {
    if (!patientId) return;
    if (!user) {
      const mockPatient = getMockPatient(patientId);
      setPatient(mockPatient);
      setSessions(
        getMockSessionsByPatient(patientId).sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
      setLoading(false);
      return;
    }
    if (isMockId(patientId)) {
      setPatient(null);
      setSessions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [patientRes, sessionsRes] = await Promise.all([
        patientsApi.getById(patientId),
        sessionsApi.getByPatientId(patientId),
      ]);
      setPatient(patientRes.patient);
      setSessions(
        sessionsRes.sessions.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    } catch (error) {
      console.error("Error loading patient data:", error);
      setPatient(null);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, [user, patientId]);

  useEffect(() => {
    loadData();
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

  if (!patient) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Patient non trouvé</p>
        <Button asChild>
          <Link href="/dashboard">Retour à la liste</Link>
        </Button>
      </div>
    );
  }

  const calculateAge = (birthDate?: string) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const age = calculateAge(patient.birthDate);
  const isArchived = !!patient.archivedAt;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <h1 className="font-gelica font-normal text-3xl">
          {patient.firstName} {patient.lastName}
        </h1>
        {isArchived && (
          <Badge
            variant="secondary"
            className="bg-surface-brand-bg text-brand-orange"
          >
            Archivé le{" "}
            {new Date(patient.archivedAt!).toLocaleDateString("fr-FR")}
          </Badge>
        )}
        {isArchived ? (
          <RestorePatientButton
            patient={patient}
            onRestored={handleRestored}

          />
        ) : !user ? (
          <Button
            className="ml-auto"
            onClick={() => openAuthGate()}
          >
            <Interfaces.Send />
            Envoyer une échelle
          </Button>
        ) : (
          <>
            <EditPatientSheet
              patient={patient}
              onPatientUpdated={handlePatientUpdated}
              open={editOpen}
              onOpenChange={setEditOpen}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
                  <Interfaces.Setting />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-muted">
                <DropdownMenuItem
                  onClick={() => setEditOpen(true)}
                  className="cursor-pointer"
                >
                  <Interfaces.Pencil className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <ArchivePatientDialog
                  patient={patient}
                  onArchived={handleArchived}
                  trigger={
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="cursor-pointer"
                    >
                      <Interfaces.Delete className="mr-2 h-4 w-4" />
                      Archiver
                    </DropdownMenuItem>
                  }
                />
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="ml-auto" onClick={() => setSendScaleOpen(true)}>
              <Interfaces.Send />
              Envoyer une échelle
            </Button>
          </>
        )}
      </div>

      {/* Subline */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
        {age && (
          <span className="flex items-center gap-1.5">
            <Food.Cake className="h-3.5 w-3.5" />
            {age} ans
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Interfaces.Mail className="h-3.5 w-3.5" />
          {patient.email}
        </span>
      </div>

      <div className="space-y-6">
        {/* Notes */}
        {patient.notes && (
          <div>
            <h2 className="text-lg font-sans font-semibold mb-3">Notes</h2>
            <div className="bg-muted-foreground/5 rounded-lg p-4">
              <p className="text-sm whitespace-pre-wrap">{patient.notes}</p>
            </div>
          </div>
        )}

        {/* Historique des passations */}
        <div>
          <h2 className="text-lg font-sans font-semibold mb-3">
            Historique des passations
          </h2>
          {sessions.length === 0 ? (
            <div className="bg-muted-foreground/5 rounded-lg p-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Aucune passation enregistrée pour ce patient
              </p>
              {!isArchived && (
                <Button
                  size="sm"
                  onClick={() =>
                    user ? setSendScaleOpen(true) : openAuthGate()
                  }
                >
                  <Interfaces.Send />
                  Envoyer la première échelle
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {sessions.map((session) => {
                const scale = scales.find((s) => s.id === session.scaleId);
                const config =
                  SESSION_STATUS_CONFIG[
                    session.status as keyof typeof SESSION_STATUS_CONFIG
                  ];

                return (
                  <Link
                    key={session.id}
                    href={`/passation/${session.id}`}
                    className="flex overflow-hidden hover:opacity-90 transition-opacity"
                    style={{ borderRadius: 12, height: 64 }}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: scale?.color ?? "#e5e7eb",
                        aspectRatio: "1 / 1",
                        height: "100%",
                      }}
                    >
                      {scale && (
                        <Image
                          src={scale.icon}
                          alt={scale.acronym}
                          width={32}
                          height={32}
                          className="w-3/5 h-3/5 object-contain"
                        />
                      )}
                    </div>
                    <div className="flex items-center px-4 flex-1 min-w-0 gap-4 bg-muted-foreground/5">
                      <div className="min-w-0">
                        <p className="font-heading font-bold text-black leading-tight text-base">
                          {scale?.acronym || session.scaleId}
                        </p>
                        <p
                          className="text-xs text-black/50 leading-snug"
                          title={new Date(session.createdAt).toLocaleDateString("fr-FR")}
                        >
                          {(() => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const sessionDay = new Date(session.createdAt);
                            sessionDay.setHours(0, 0, 0, 0);
                            const diff = Math.round((today.getTime() - sessionDay.getTime()) / 86400000);
                            return diff === 0 ? "aujourd'hui" : diff === 1 ? "hier" : `il y a ${diff} j`;
                          })()}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center flex-shrink-0">
                        {session.status === "COMPLETED" && session.score != null ? (
                          <div className="text-right">
                            <p className="font-sans font-bold text-black text-base leading-tight">
                              {formatScore(session.score)}
                            </p>
                            {session.interpretation && (
                              <p className="font-sans text-xs text-black/70 leading-snug">
                                {session.interpretation}
                              </p>
                            )}
                          </div>
                        ) : (
                          <Badge className={cn("pointer-events-none", config?.className)} variant="secondary">
                            {config?.label ?? session.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <SendScaleSheet
        open={sendScaleOpen}
        onOpenChange={setSendScaleOpen}
        defaultPatientId={patient.id}
        onSent={loadData}
      />
    </div>
  );
}
