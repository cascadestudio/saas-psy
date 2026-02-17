"use client";

import { FavoriteButton } from "@/components/FavoriteButton";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";

interface FavoriteButtonWrapperProps {
  scaleId: string;
}

export function FavoriteButtonWrapper({
  scaleId,
}: FavoriteButtonWrapperProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);

        // Check if user is logged in
        if (!user) {
          setIsLoading(false);
          return;
        }

        // Fetch favorites
        const response = await fetch("/api/favorites");
        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.favorites.includes(scaleId));
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [scaleId, user]);

  if (isLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <FavoriteButton
      scaleId={scaleId}
      initialIsFavorite={isFavorite}
    />
  );
}
