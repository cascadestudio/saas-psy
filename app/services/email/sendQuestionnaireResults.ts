import { Resend } from "resend";
import { ResultQuestionnaireEmailTemplate } from "@/app/questionnaire/api/submit-questionnaire/ResultQuestionnaireEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendQuestionnaireResultsParams {
  psychologistEmail: string;
  patientFirstname: string;
  patientLastname: string;
  questionnaireTitle: string;
  questionnaireId: string;
  scoreResult: {
    totalScore: number;
    anxietyScore?: number;
    avoidanceScore?: number;
    stateScore?: number;
    traitScore?: number;
    interpretation: string | { trait: string; state: string };
    maxTotal: number;
    maxAnxiety?: number;
    maxAvoidance?: number;
  };
  patientComments: string;
  readableAnswers: string[];
}

export async function sendQuestionnaireResults({
  psychologistEmail,
  patientFirstname,
  patientLastname,
  questionnaireTitle,
  scoreResult,
  readableAnswers,
  patientComments,
  questionnaireId,
}: SendQuestionnaireResultsParams) {
  return await resend.emails.send({
    from: "Appsy <contact@cascadestudio.fr>",
    to: [psychologistEmail],
    subject: `Résultat du questionnaire ${questionnaireTitle} pour ${patientFirstname} ${patientLastname}`,
    react: await ResultQuestionnaireEmailTemplate({
      questionnaireId,
      patientFirstname,
      patientLastname,
      questionnaireTitle,
      scoreResult,
      readableAnswers,
      patientComments,
    }),
  });
}
