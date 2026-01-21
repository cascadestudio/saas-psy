"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState, useCallback } from "react";
import { patientsApi, type Patient } from "@/lib/api-client";
import { Interfaces } from "doodle-icons";
import { CreatePatientSheet } from "@/components/CreatePatientSheet";
import { RestorePatientButton } from "@/components/RestorePatientButton";

export default function PatientsPage() {
  const { user, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePatients, setActivePatients] = useState<Patient[]>([]);
  const [archivedPatients, setArchivedPatients] = useState<Patient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");

  const loadPatients = useCallback(async () => {
    if (!user) {
      setPatientsLoading(false);
      return;
    }
    setPatientsLoading(true);
    try {
      const [activeRes, archivedRes] = await Promise.all([
        patientsApi.getAll("active"),
        patientsApi.getAll("archived"),
      ]);
      setActivePatients(activeRes.patients);
      setArchivedPatients(archivedRes.patients);
    } catch (error) {
      console.error("Error loading patients:", error);
      setActivePatients([]);
      setArchivedPatients([]);
    } finally {
      setPatientsLoading(false);
    }
  }, [user]);

  // Load patients from API (only for authenticated users)
  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  const handlePatientCreated = async () => {
    // Refresh patient list from API
    await loadPatients();
  };

  const handlePatientRestored = async () => {
    // Refresh patient list from API
    await loadPatients();
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
      <div className="flex-1 w-full flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl">Gestion des patients</h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos patients et leur suivi
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Interfaces.User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">Commencez à suivre vos patients</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Créez un compte gratuit pour ajouter vos patients, leur envoyer des échelles et suivre leur évolution.
              </p>
              <CreatePatientSheet
                onPatientCreated={handlePatientCreated}
                buttonText="Ajouter votre premier patient"
                currentPatientCount={activePatients.length}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const patients = activeTab === "active" ? activePatients : archivedPatients;

  const filteredPatients = patients.filter((patient) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return (
      fullName.includes(query) ||
      patient.email.toLowerCase().includes(query)
    );
  });

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

  return (
    <div className="flex-1 w-full flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl">Gestion des patients</h1>
          <p className="text-muted-foreground mt-1">
            {activePatients.length} patient{activePatients.length > 1 ? "s" : ""} actif{activePatients.length > 1 ? "s" : ""}
            {archivedPatients.length > 0 && (
              <span className="ml-1">
                ({archivedPatients.length} archivé{archivedPatients.length > 1 ? "s" : ""})
              </span>
            )}
          </p>
        </div>
        <CreatePatientSheet onPatientCreated={handlePatientCreated} currentPatientCount={activePatients.length} />
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "active" | "archived")}>
        <TabsList>
          <TabsTrigger value="active">
            Actifs ({activePatients.length})
          </TabsTrigger>
          <TabsTrigger value="archived">
            Archivés ({archivedPatients.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Interfaces.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un patient (nom, email)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {patientsLoading ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Chargement des patients...
                  </p>
                ) : filteredPatients.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    {searchQuery
                      ? "Aucun patient trouvé"
                      : activeTab === "active"
                        ? "Aucun patient actif"
                        : "Aucun patient archivé"}
                  </p>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-3 font-medium text-sm">
                            Nom complet
                          </th>
                          <th className="text-left p-3 font-medium text-sm">Âge</th>
                          <th className="text-left p-3 font-medium text-sm">
                            Email
                          </th>
                          <th className="text-left p-3 font-medium text-sm">
                            {activeTab === "active" ? "Créé le" : "Archivé le"}
                          </th>
                          <th className="text-right p-3 font-medium text-sm">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPatients.map((patient) => {
                          const age = calculateAge(patient.birthDate);

                          return (
                            <tr
                              key={patient.id}
                              className="border-t hover:bg-muted/50 transition-colors"
                            >
                              <td className="p-3">
                                <p className="font-medium">
                                  {patient.firstName} {patient.lastName}
                                </p>
                              </td>
                              <td className="p-3 text-sm">
                                {age ? `${age} ans` : "-"}
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">
                                {patient.email}
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">
                                {activeTab === "active"
                                  ? new Date(patient.createdAt).toLocaleDateString("fr-FR")
                                  : patient.archivedAt
                                    ? new Date(patient.archivedAt).toLocaleDateString("fr-FR")
                                    : "-"}
                              </td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {activeTab === "archived" && (
                                    <RestorePatientButton
                                      patient={patient}
                                      onRestored={handlePatientRestored}
                                    />
                                  )}
                                  <Button asChild variant="ghost" size="sm">
                                    <Link href={`/patients/${patient.id}`}>
                                      Voir détails
                                    </Link>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
