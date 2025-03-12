import { questionnaires } from "@/app/data";
import QuestionnaireForm from "./QuestionnaireForm";

export default async function QuestionnairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const questionnaire = questionnaires.find((q) => q.id === Number(id));

  return <QuestionnaireForm questionnaire={questionnaire || null} />;
}
