"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ScaleCard } from "@/components/ScaleCard";
import { scales } from "@/app/scalesData";
import { Interfaces } from "doodle-icons";
import { useUser } from "@/app/context/UserContext";
import { favoritesApi } from "@/lib/api-client";

export default function EchellesPage() {
  const { user, isLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);

  // Load favorites from API (only for authenticated users)
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavoritesLoading(false);
        return;
      }
      setFavoritesLoading(true);
      try {
        const { favorites: data } = await favoritesApi.getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Error loading favorites:", error);
        setFavorites([]);
      } finally {
        setFavoritesLoading(false);
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

  // Filtrer les échelles par titre, description ou catégorie
  const filteredScales = scales
    .filter((s) => {
      const query = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
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
          <Interfaces.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une échelle par nom, catégorie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredScales.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucune échelle trouvée pour "{searchQuery}"
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredScales.map((scale) => (
            <ScaleCard
              key={scale.id}
              scale={scale}
              isLoadingFavorites={favoritesLoading}
              isFavorite={favorites.includes(scale.id)}
            />
          ))}
        </div>
      )}

      {filteredScales.length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          {filteredScales.length} échelle{filteredScales.length > 1 ? "s" : ""} disponible{filteredScales.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
