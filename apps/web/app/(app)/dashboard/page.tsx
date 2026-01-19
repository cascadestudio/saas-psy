"use client";

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
import { patientsApi, favoritesApi, type Patient } from "@/lib/api-client";
import { scales } from "@/app/scalesData";
import { Interfaces } from "doodle-icons";
import { CreatePatientSheet } from "@/components/CreatePatientSheet";

export default function DashboardPage() {
  const { user, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load patients from API (only for authenticated users)
  useEffect(() => {
    const loadPatients = async () => {
      if (!user) {
        setPatientsLoading(false);
        return;
      }
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

    loadPatients();
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

  // Load favorites from API (only for authenticated users)
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) return;
      try {
        const { favorites: data } = await favoritesApi.getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Error loading favorites:", error);
        setFavorites([]);
      }
    };

    loadFavorites();
  }, [user]);

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
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="font-bold text-3xl">Tableau de bord</h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue sur Melya
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Mes patients</CardTitle>
              <CardDescription>
                Gérez vos patients et envoyez des échelles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Interfaces.User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  Créez un compte pour ajouter vos premiers patients
                </p>
                <CreatePatientSheet
                  onPatientCreated={handlePatientCreated}
                  buttonText="Ajouter un patient"
                  currentPatientCount={patients.length}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Échelles disponibles</CardTitle>
                  <CardDescription>
                    {scales.length} échelles psychométriques validées
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
              <div className="space-y-3">
                {scales.slice(0, 3).map((scale) => (
                  <div
                    key={scale.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{scale.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {scale.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {scale.category}
                          </span>
                        </div>
                      </div>
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/questionnaire/description/${scale.id}`}>
                          Détails
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const filteredPatients = patients.filter((patient) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return (
      fullName.includes(query) ||
      patient.email.toLowerCase().includes(query)
    );
  });

  const favoriteScales = scales.filter((s) =>
    favorites.includes(s.id)
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-bold text-3xl">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenue, {user.firstName || user.email}
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
                currentPatientCount={patients.length}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Interfaces.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un patient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
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
                <div className="border rounded-lg overflow-hidden max-h-[600px] overflow-y-auto">
                  <table className="w-full">
                    <tbody>
                      {filteredPatients.map((patient) => (
                        <tr
                          key={patient.id}
                          className="border-t first:border-t-0 hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => window.location.href = `/patients/${patient.id}`}
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">
                                {patient.firstName} {patient.lastName}
                              </p>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <Button
                              asChild
                              variant="default"
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Link
                                href={`/send-questionnaire?patientId=${patient.id}`}
                              >
                                <Interfaces.Send className="mr-2 h-4 w-4" />
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
                  {favoriteScales.length} échelle{favoriteScales.length > 1 ? "s" : ""} favorite{favoriteScales.length > 1 ? "s" : ""}
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
            {favoriteScales.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Aucune échelle favorite
              </p>
            ) : (
              <div className="space-y-3">
                {favoriteScales.map((scale) => (
                  <div
                    key={scale.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Interfaces.Star className="h-4 w-4 fill-primary text-primary" />
                          <h3 className="font-medium text-sm">{scale.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {scale.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {scale.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            <Interfaces.Clock className="inline h-3 w-3 mr-1" />
                            {scale.estimatedTime}
                          </span>
                        </div>
                      </div>
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/questionnaire/description/${scale.id}`}>
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
