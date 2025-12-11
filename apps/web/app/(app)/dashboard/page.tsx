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
import { questionnaires } from "@/app/questionnairesData";
import { Search, Send, Star } from "lucide-react";
import { CreatePatientSheet } from "@/components/CreatePatientSheet";

export default function DashboardPage() {
  const { user, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<MockPatient[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

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

  useEffect(() => {
    const loadFavorites = () => {
      const loadedFavorites = localStorage.getItem("favorites");
      if (loadedFavorites) {
        setFavorites(JSON.parse(loadedFavorites));
      } else {
        const mockFavorites = [
          "inventaire-de-depression-de-beck",
          "echelle-d-anxiete-sociale-de-liebowitz",
          "stai-anxiete-generalisee",
        ];
        setFavorites(mockFavorites);
        localStorage.setItem("favorites", JSON.stringify(mockFavorites));
      }
    };

    loadFavorites();
    window.addEventListener("storage", loadFavorites);
    return () => window.removeEventListener("storage", loadFavorites);
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
      patient.fullName?.toLowerCase().includes(query) ||
      patient.email.toLowerCase().includes(query)
    );
  });

  const favoriteQuestionnaires = questionnaires.filter((q) =>
    favorites.includes(q.id)
  );

  return (
    <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="font-bold text-3xl">Tableau de bord</h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue, {user.fullName || user.email}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Mes patients</CardTitle>
                <CardDescription>
                  {patients.length} patient{patients.length > 1 ? "s" : ""} dans votre liste
                </CardDescription>
              </div>
              <CreatePatientSheet
                onPatientCreated={handlePatientCreated}
                buttonSize="sm"
                buttonText="Ajouter"
              />
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
                <div className="border rounded-lg overflow-hidden max-h-[600px] overflow-y-auto">
                  <table className="w-full">
                    <tbody>
                      {filteredPatients.map((patient) => (
                        <tr
                          key={patient.id}
                          className="border-t first:border-t-0 hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{patient.fullName}</p>
                              <p className="text-xs text-muted-foreground">
                                {patient.email}
                              </p>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <Button asChild variant="default" size="sm">
                              <Link
                                href={`/send-questionnaire?patientId=${patient.id}`}
                              >
                                <Send className="mr-2 h-4 w-4" />
                                Envoyer une échelle
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Mes échelles</CardTitle>
                <CardDescription>
                  {favoriteQuestionnaires.length} échelle{favoriteQuestionnaires.length > 1 ? "s" : ""} favorite{favoriteQuestionnaires.length > 1 ? "s" : ""}
                </CardDescription>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href="/echelles">
                  Voir tout
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {favoriteQuestionnaires.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Aucune échelle favorite
              </p>
            ) : (
              <div className="space-y-3">
                {favoriteQuestionnaires.map((questionnaire) => (
                  <div
                    key={questionnaire.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <h3 className="font-medium text-sm">{questionnaire.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {questionnaire.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {questionnaire.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ⏱️ {questionnaire.estimatedTime}
                          </span>
                        </div>
                      </div>
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/questionnaire/description/${questionnaire.id}`}>
                          Détails
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        </div>
    </div>
  );
}
