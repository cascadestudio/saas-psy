import { createClient } from "@/utils/supabase/server";
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

export default async function MyQuestionnairesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get user profile with favorites
  const { data: profile } = await supabase
    .from("profiles")
    .select("favorite_questionnaires")
    .eq("id", user.id)
    .single();

  console.log("User profile data:", profile);

  const favoriteIds = profile?.favorite_questionnaires || [];

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
