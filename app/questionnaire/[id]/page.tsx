import { questionnaires } from "@/app/data";
import QuestionnaireForm from "./QuestionnaireForm";

export default async function QuestionnairePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    psychologistEmail?: string;
    patientFirstname?: string;
    patientLastname?: string;
  }>;
}) {
  const { id } = await params;
  const {
    psychologistEmail = null,
    patientFirstname = null,
    patientLastname = null,
  } = await searchParams;

  const questionnaire = questionnaires.find((q) => q.id === Number(id));

  return (
    <QuestionnaireForm
      questionnaire={questionnaire || null}
      psychologistEmail={psychologistEmail}
      patientFirstname={patientFirstname}
      patientLastname={patientLastname}
    />
  );
}
