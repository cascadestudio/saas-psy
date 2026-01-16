"use client";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import { patientsApi, type Patient } from "@/lib/api-client";
import { Interfaces } from "doodle-icons";
import { CreatePatientSheet } from "@/components/CreatePatientSheet";

export default function PatientsPage() {
  const { user, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/sign-in");
    }
  }, [user, isLoading]);

  // Load patients from API
  useEffect(() => {
    const loadPatients = async () => {
      if (!user) return;
      setPatientsLoading(true);
      try {
        const { patients: data } = await patientsApi.getAll();
        setPatients(data);
      } catch (error) {
        console.error("Error loading patients:", error);
        setPatients([]);
      } finally {
        setPatientsLoading(false);
      }
    };

    if (user) {
      loadPatients();
    }
  }, [user]);

  const handlePatientCreated = async () => {
    // Refresh patient list from API
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

  if (!user) {
    return null;
  }

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
            {patients.length} patient{patients.length > 1 ? "s" : ""} dans votre
            liste
          </p>
        </div>
        <CreatePatientSheet onPatientCreated={handlePatientCreated} />
      </div>

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
                  : "Aucun patient dans votre liste"}
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
                        Créé le
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
                            {new Date(patient.createdAt).toLocaleDateString("fr-FR")}
                          </td>
                          <td className="p-3 text-right">
                            <Button asChild variant="ghost" size="sm">
                              <Link href={`/patients/${patient.id}`}>
                                Voir détails
                              </Link>
                            </Button>
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
    </div>
  );
}
