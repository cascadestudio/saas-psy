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
    psychologistEmail = process.env.NODE_ENV === "development"
      ? "contact@cascadestudio.fr"
      : undefined,
    patientFirstname = process.env.NODE_ENV === "development"
      ? "John"
      : undefined,
    patientLastname = process.env.NODE_ENV === "development"
      ? "Doe"
      : undefined,
  } = await searchParams;

  if (
    !psychologistEmail ||
    !patientFirstname ||
    !patientLastname ||
    typeof psychologistEmail !== "string" ||
    typeof patientFirstname !== "string" ||
    typeof patientLastname !== "string"
  ) {
    return notFound();
  }

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
