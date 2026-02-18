"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="text-sm text-muted-foreground mb-1">
            {scale.category}
          </div>
          {!isLoadingFavorites && (
            <FavoriteButton
              scaleId={scale.id}
              initialIsFavorite={isFavorite}
              size="sm"
            />
          )}
        </div>
        <CardTitle>{scale.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {scale.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{questionCount(scale)} questions</span>
          <span>{scale.estimatedTime}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/questionnaire/description/${scale.id}`}
          className="w-full"
        >
          <Button className="w-full">Voir les détails</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
