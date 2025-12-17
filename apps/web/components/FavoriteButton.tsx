"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Interfaces } from "doodle-icons";
import { toast } from "sonner";

interface FavoriteButtonProps {
  questionnaireId: string;
  initialIsFavorite?: boolean;
  size?: "sm" | "md" | "lg";
}

export function FavoriteButton({
  questionnaireId,
  initialIsFavorite = false,
  size = "md",
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async () => {
    try {
      setIsLoading(true);

      // TODO: Remplacer par un vrai appel API
      // Pour le moment, on utilise le localStorage
      const storedFavorites = localStorage.getItem("favorites");
      const favorites: string[] = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      const newIsFavorite = !isFavorite;
      let updatedFavorites: string[];

      if (newIsFavorite) {
        // Ajouter aux favoris
        updatedFavorites = [...favorites, questionnaireId];
      } else {
        // Retirer des favoris
        updatedFavorites = favorites.filter((id) => id !== questionnaireId);
      }

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(newIsFavorite);

      toast.success(
        newIsFavorite ? "Ajouté aux favoris" : "Retiré des favoris"
      );

      // Recharger la page pour mettre à jour l'affichage
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Erreur lors de la mise à jour des favoris");
    } finally {
      setIsLoading(false);
    }
  };

  // Determine size classes
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`${sizeClasses[size]} rounded-full hover:bg-primary/10`}
      onClick={toggleFavorite}
      disabled={isLoading}
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Interfaces.Star
        className={`${isFavorite ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary"} transition-colors`}
      />
    </Button>
  );
}
