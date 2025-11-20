"use client";

import { FavoriteButton } from "@/components/FavoriteButton";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface FavoriteButtonWrapperProps {
  questionnaireId: string;
}

export function FavoriteButtonWrapper({
  questionnaireId,
}: FavoriteButtonWrapperProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthAndFetchFavorites = async () => {
      try {
        setIsLoading(true);

        // Check if user is logged in
        const supabase = createClient();
        const { data: authData } = await supabase.auth.getSession();

        if (!authData.session) {
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }

        setIsLoggedIn(true);

        // Fetch favorites
        const response = await fetch("/api/favorites");
        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.favorites.includes(questionnaireId));
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetchFavorites();
  }, [questionnaireId]);

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <FavoriteButton
      questionnaireId={questionnaireId}
      initialIsFavorite={isFavorite}
    />
  );
}
