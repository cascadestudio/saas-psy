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

interface QuestionnaireCardProps {
  questionnaire: {
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

export function QuestionnaireCard({
  questionnaire,
  isLoadingFavorites,
  isFavorite,
}: QuestionnaireCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="text-sm text-muted-foreground mb-1">
            {questionnaire.category}
          </div>
          {!isLoadingFavorites && (
            <FavoriteButton
              questionnaireId={questionnaire.id}
              initialIsFavorite={isFavorite}
              size="sm"
            />
          )}
        </div>
        <CardTitle>{questionnaire.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {questionnaire.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{questionCount(questionnaire)} questions</span>
          <span>{questionnaire.estimatedTime}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/questionnaire/description/${questionnaire.id}`}
          className="w-full"
        >
          <Button className="w-full">Voir les détails</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
