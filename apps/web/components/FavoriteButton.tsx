"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Interfaces } from "doodle-icons";
import { toast } from "sonner";
import { favoritesApi } from "@/lib/api-client";

interface FavoriteButtonProps {
  scaleId: string;
  initialIsFavorite?: boolean;
  size?: "sm" | "md" | "lg";
}

export function FavoriteButton({
  scaleId,
  initialIsFavorite = false,
  size = "md",
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async () => {
    try {
      setIsLoading(true);

      const { action } = await favoritesApi.toggleFavorite(scaleId);
      const newIsFavorite = action === "add";
      setIsFavorite(newIsFavorite);

      toast.success(
        newIsFavorite ? "Ajouté aux favoris" : "Retiré des favoris"
      );
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
        className="transition-colors"
        fill={isFavorite ? "#D97757" : "currentColor"}
      />
    </Button>
  );
}
