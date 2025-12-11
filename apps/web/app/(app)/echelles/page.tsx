"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { QuestionnaireCard } from "@/components/QuestionnaireCard";
import { questionnaires } from "@/app/questionnairesData";
import { Search } from "lucide-react";
import { useUser } from "@/app/context/UserContext";

export default function EchellesPage() {
  const { user, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/sign-in");
    }
  }, [user, isLoading]);

  // Simuler le chargement des favoris depuis une API
  useEffect(() => {
    const loadFavorites = () => {
      // TODO: Remplacer par un vrai appel API
      const loadedFavorites = localStorage.getItem("favorites");
      if (loadedFavorites) {
        setFavorites(JSON.parse(loadedFavorites));
      } else {
        // Mock favorites pour la démo
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

    // Écouter les changements de favoris
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

  // Filtrer les questionnaires par titre, description ou catégorie
  const filteredQuestionnaires = questionnaires
    .filter((q) => {
      const query = searchQuery.toLowerCase();
      return (
        q.title.toLowerCase().includes(query) ||
        q.description.toLowerCase().includes(query) ||
        q.category.toLowerCase().includes(query)
      );
    })
    // Trier pour afficher les favoris en premier
    .sort((a, b) => {
      const aIsFavorite = favorites.includes(a.id);
      const bIsFavorite = favorites.includes(b.id);

      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-bold text-3xl mb-2">Échelles psychométriques</h1>
        <p className="text-muted-foreground">
          Parcourez notre catalogue d'échelles et questionnaires validés scientifiquement
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une échelle par nom, catégorie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredQuestionnaires.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucune échelle trouvée pour "{searchQuery}"
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuestionnaires.map((questionnaire) => (
            <QuestionnaireCard
              key={questionnaire.id}
              questionnaire={questionnaire}
              isLoadingFavorites={false}
              isFavorite={favorites.includes(questionnaire.id)}
            />
          ))}
        </div>
      )}

      {filteredQuestionnaires.length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          {filteredQuestionnaires.length} échelle{filteredQuestionnaires.length > 1 ? "s" : ""} disponible{filteredQuestionnaires.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
