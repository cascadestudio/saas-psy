import { questionnaires } from "@/app/data";
import QuestionnaireForm from "./QuestionnaireForm";

export default function QuestionnairePage({
  params,
}: {
  params: { id: string };
}) {
  const questionnaireId = params.id;
  const questionnaire = questionnaires.find(
    (q) => q.id === Number(questionnaireId)
  );

  return <QuestionnaireForm questionnaire={questionnaire || null} />;
}
