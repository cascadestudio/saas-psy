import Link from "next/link";
import { ArrowLeft, Clock, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmailDialogForm } from "./EmailDialogForm";
import { questionnaires } from "@/app/questionnairesData";
import DevTools from "./DevTools";
import { questionCount, getExampleQuestions } from "@/app/utils/utils";
import { FavoriteButtonWrapper } from "./FavoriteButtonWrapper";
import { QuestionnairePreviewModal } from "./QuestionnairePreviewModal";

export default async function QuestionnairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const questionnaire = questionnaires.find((q) => q.id === id);

  if (!questionnaire) {
    return (
      <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
        Questionnaire non trouvé
      </div>
    );
  }

  const exampleQuestions = getExampleQuestions(questionnaire);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
      <Link href="/" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux questionnaires
      </Link>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="text-sm text-muted-foreground mb-1">
              {questionnaire.category}
            </div>
            <FavoriteButtonWrapper questionnaireId={id} />
          </div>
          <CardTitle className="text-2xl">{questionnaire.title}</CardTitle>
          <CardDescription>{questionnaire.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{questionCount(questionnaire)} questions</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{questionnaire.estimatedTime}</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">
              {questionnaire.longDescription}
            </p>
          </div>
          {exampleQuestions.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">
                Exemples de questions
              </h3>
              <ul className="list-disc pl-5 text-muted-foreground">
                {exampleQuestions.map((question: string, index: number) => (
                  <li key={index} className="mb-1">
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <QuestionnairePreviewModal questionnaire={questionnaire} />
        </CardContent>
        <CardFooter>
          <EmailDialogForm />
        </CardFooter>
      </Card>
      <DevTools />
    </div>
  );
}
