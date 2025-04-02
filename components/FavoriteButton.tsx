"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
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
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionnaireId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }

      const data = await response.json();
      setIsFavorite(data.action === "add");

      toast.success(
        data.action === "add" ? "Ajouté aux favoris" : "Retiré des favoris"
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
      className={`${sizeClasses[size]} rounded-full`}
      onClick={toggleFavorite}
      disabled={isLoading}
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Star
        className={`${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
      />
    </Button>
  );
}
