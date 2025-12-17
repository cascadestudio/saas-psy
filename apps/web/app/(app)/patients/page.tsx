"use client";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import { getAllPatients, type MockPatient } from "@/data/mock-patients";
import { getSessionsByPatientId } from "@/data/mock-sessions";
import { Interfaces } from "doodle-icons";
import { CreatePatientSheet } from "@/components/CreatePatientSheet";

export default function PatientsPage() {
  const { user, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<MockPatient[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/sign-in");
    }
  }, [user, isLoading]);

  useEffect(() => {
    setPatients(getAllPatients());
  }, []);

  const handlePatientCreated = (patientId: string) => {
    // Refresh patient list
    setPatients(getAllPatients());
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
    return (
      patient.fullName?.toLowerCase().includes(query) ||
      patient.email.toLowerCase().includes(query)
    );
  });

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
            {filteredPatients.length === 0 ? (
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
                        Passations
                      </th>
                      <th className="text-left p-3 font-medium text-sm">
                        Dernière passation
                      </th>
                      <th className="text-right p-3 font-medium text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => {
                      const sessions = getSessionsByPatientId(patient.id);
                      const lastSession = sessions.sort(
                        (a, b) =>
                          new Date(b.sentAt).getTime() -
                          new Date(a.sentAt).getTime()
                      )[0];

                      return (
                        <tr
                          key={patient.id}
                          className="border-t hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-3">
                            <p className="font-medium">{patient.fullName}</p>
                          </td>
                          <td className="p-3 text-sm">{patient.age} ans</td>
                          <td className="p-3 text-sm text-muted-foreground">
                            {patient.email}
                          </td>
                          <td className="p-3 text-sm">
                            {patient.sessionsCount}
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">
                            {lastSession
                              ? new Date(lastSession.sentAt).toLocaleDateString(
                                  "fr-FR"
                                )
                              : "-"}
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
