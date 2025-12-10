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
import { Send, UserPlus, Search } from "lucide-react";

export default function DashboardPage() {
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
      patient.initials.toLowerCase().includes(query) ||
      patient.fullName?.toLowerCase().includes(query) ||
      patient.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-bold text-3xl">Tableau de bord</h1>
            <p className="text-muted-foreground mt-1">
              Bienvenue, {user.fullName || user.email}
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/send-questionnaire">
              <Send className="mr-2 h-4 w-4" />
              Envoyer une échelle
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Mes patients</CardTitle>
                <CardDescription>
                  {patients.length} patient{patients.length > 1 ? "s" : ""} dans votre liste
                </CardDescription>
              </div>
              <Button asChild size="sm">
                <Link href="/patients/create">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un patient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
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
                          Initiales
                        </th>
                        <th className="text-left p-3 font-medium text-sm">Âge</th>
                        <th className="text-left p-3 font-medium text-sm">Email</th>
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
                              <div>
                                <p className="font-medium">{patient.initials}</p>
                                {patient.fullName && (
                                  <p className="text-xs text-muted-foreground">
                                    {patient.fullName}
                                  </p>
                                )}
                              </div>
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
