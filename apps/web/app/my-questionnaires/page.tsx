"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { questionnaires } from "@/app/questionnairesData";
import { questionCount } from "@/app/utils/utils";
import { useUser } from "@/app/context/UserContext";
import { useEffect } from "react";

export default function MyQuestionnairesPage() {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/sign-in");
    }
  }, [user, isLoading]);

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

  const favoriteIds = user.profile?.favoriteQuestionnaires || [];

  // Filter questionnaires to get favorites
  const favoriteQuestionnaires = questionnaires.filter((q) =>
    favoriteIds.includes(q.id)
  );

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
      <h1 className="font-bold text-3xl mb-6">Mes Questionnaires Favoris</h1>

      {favoriteQuestionnaires.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            Vous n'avez pas encore de questionnaires favoris.
          </p>
          <Button asChild>
            <Link href="/">Parcourir les questionnaires</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteQuestionnaires.map((questionnaire) => (
            <Card key={questionnaire.id} className="flex flex-col">
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-1">
                  {questionnaire.category}
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
          ))}
        </div>
      )}
    </div>
  );
}
