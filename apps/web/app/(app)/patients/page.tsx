"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import {
  patientsApi,
  sessionsApi,
  type Patient,
  type Session,
} from "@/lib/api-client";
import { CreatePatientSheet } from "@/components/CreatePatientSheet";
import { SendScaleSheet } from "@/components/SendScaleSheet";
import { PatientRow, type PatientRowData } from "@/components/PatientRow";
import { MOCK_PATIENTS, MOCK_SESSIONS } from "@/lib/mock-data";
import { useAuthGate } from "@/app/context/AuthGateContext";

export default function PatientsPage() {
  const { user, isLoading } = useUser();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "archived">("all");
  const [sendScaleOpen, setSendScaleOpen] = useState(false);
  const [sendScalePatientId, setSendScalePatientId] = useState<
    string | undefined
  >();

  const { openAuthGate } = useAuthGate();

  const loadData = async () => {
    if (!user) {
      setPatients(MOCK_PATIENTS);
      setSessions(MOCK_SESSIONS);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [activeRes, archivedRes, sessionsRes] = await Promise.all([
        patientsApi.getAll("active"),
        patientsApi.getAll("archived"),
        sessionsApi.getRecent(50),
      ]);
      setPatients([...activeRes.patients, ...archivedRes.patients]);
      setSessions(sessionsRes.sessions);
    } catch (error) {
      console.error("Error loading patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  const patientIdsWithActiveSessions = new Set(
    sessions
      .filter((s) => ["SENT", "STARTED"].includes(s.status))
      .map((s) => s.patientId),
  );

  const sortedPatients = [...patients].sort((a, b) => {
    const aArchived = !!a.archivedAt;
    const bArchived = !!b.archivedAt;
    if (aArchived !== bArchived) return aArchived ? 1 : -1;
    const aHasActive = patientIdsWithActiveSessions.has(a.id);
    const bHasActive = patientIdsWithActiveSessions.has(b.id);
    if (aHasActive !== bHasActive) return aHasActive ? -1 : 1;
    return a.lastName.localeCompare(b.lastName);
  });

  const filteredPatients = sortedPatients.filter((p) => {
    if (filter === "active") return patientIdsWithActiveSessions.has(p.id);
    if (filter === "archived") return !!p.archivedAt;
    return !p.archivedAt;
  });

  const displayPatients: PatientRowData[] = filteredPatients.map((p) => ({
    id: p.id,
    name: `${p.firstName} ${p.lastName}`,
    hasActive: patientIdsWithActiveSessions.has(p.id),
  }));

  const activeCount = patients.filter((p) => !p.archivedAt).length;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="font-gelica font-normal text-3xl">Patients</h1>
        <CreatePatientSheet
          onPatientCreated={loadData}
          currentPatientCount={activeCount}
          buttonSize="sm"
        />
      </div>

      <div className="flex gap-2 mb-3">
        {(
          [
            { key: "all", label: "Tous" },
            { key: "active", label: "Passation en cours" },
            { key: "archived", label: "Archivés" },
          ] as const
        ).map((f) => (
          <button
            key={f.key}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filter === f.key
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground"
            }`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card className="border-0 bg-muted-foreground/5 shadow-none hover:shadow-none">
        <CardContent className="p-4">
          {loading ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Chargement des patients...
            </p>
          ) : displayPatients.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              {filter === "active"
                ? "Aucune passation en cours"
                : filter === "archived"
                  ? "Aucun patient archivé"
                  : "Aucun patient dans votre liste"}
            </p>
          ) : (
            <div className="rounded-lg overflow-hidden">
              {displayPatients.map((patient) => (
                <PatientRow
                  key={patient.id}
                  patient={patient}
                  href={`/patients/${patient.id}`}
                  onSendClick={(e) => {
                    e.preventDefault();
                    if (!user) {
                      openAuthGate();
                      return;
                    }
                    setSendScalePatientId(patient.id);
                    setSendScaleOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <SendScaleSheet
        open={sendScaleOpen}
        onOpenChange={setSendScaleOpen}
        defaultPatientId={sendScalePatientId}
        onSent={loadData}
      />
    </div>
  );
}
