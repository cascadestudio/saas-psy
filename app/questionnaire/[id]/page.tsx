import { notFound } from "next/navigation";
import { questionnaires } from "@/app/questionnairesData";
import QuestionnaireFactory from "@/components/questionnaires/QuestionnaireFactory";

export default async function QuestionnairePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let { id } = await params;
  const {
    psychologistEmail = null,
    patientFirstname = null,
    patientLastname = null,
  } = await searchParams;

  const questionnaire = questionnaires.find((q) => q.id === id) || null;

  if (!questionnaire) {
    return notFound();
  }

  return (
    <QuestionnaireFactory
      questionnaire={questionnaire}
      psychologistEmail={psychologistEmail}
      patientFirstname={patientFirstname}
      patientLastname={patientLastname}
    />
  );
}
