"use client";

import Link from "next/link";
import { FavoriteButton } from "@/components/FavoriteButton";
import { questionCount } from "@/app/utils/utils";

interface ScaleCardProps {
  scale: {
    id: string;
    title: string;
    description: string;
    category: string;
    questions: any[];
    estimatedTime: string;
  };
  isLoadingFavorites: boolean;
  isFavorite: boolean;
}

export function ScaleCard({
  scale,
  isLoadingFavorites,
  isFavorite,
}: ScaleCardProps) {
  return (
    <Link
      href={`/scale/description/${scale.id}`}
      className="bg-muted-foreground/5 rounded-lg p-4 flex flex-col gap-3 hover:bg-muted-foreground/10 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs text-muted-foreground">{scale.category}</span>
        {!isLoadingFavorites && (
          <FavoriteButton
            scaleId={scale.id}
            initialIsFavorite={isFavorite}
            size="sm"
          />
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm leading-snug mb-1">{scale.title}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {scale.description}
        </p>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{questionCount(scale)} questions</span>
        <span>{scale.estimatedTime}</span>
      </div>
    </Link>
  );
}
