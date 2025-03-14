import { questionnaires } from "@/app/data";
import QuestionnaireForm from "./QuestionnaireForm";

export default async function QuestionnairePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    psychologistEmail?: string;
    patientFirstname?: string;
    patientLastname?: string;
  };
}) {
  const { id } = params;
  const questionnaire = questionnaires.find((q) => q.id === Number(id));
  const psychologistEmail = searchParams.psychologistEmail || null;
  const patientFirstname = searchParams.patientFirstname || null;
  const patientLastname = searchParams.patientLastname || null;

  return (
    <QuestionnaireForm
      questionnaire={questionnaire || null}
      psychologistEmail={psychologistEmail}
      patientFirstname={patientFirstname}
      patientLastname={patientLastname}
    />
  );
}
