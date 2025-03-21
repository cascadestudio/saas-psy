import { Resend } from "resend";
import { ResultQuestionnaireEmailTemplate } from "@/app/questionnaire/api/submit-questionnaire/ResultQuestionnaireEmailTemplate";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendQuestionnaireResultsParams {
  psychologistEmail: string;
  patientFirstname: string;
  patientLastname: string;
  questionnaireTitle: string;
  scoreResult: {
    totalScore: number;
    anxietyScore?: number;
    avoidanceScore?: number;
    interpretation: string;
    maxTotal: number;
    maxAnxiety?: number;
    maxAvoidance?: number;
  };
  formData: Record<string, any>;
}

export async function sendQuestionnaireResults({
  psychologistEmail,
  patientFirstname,
  patientLastname,
  questionnaireTitle,
  scoreResult,
  formData,
}: SendQuestionnaireResultsParams) {
  // Format form responses for email
  const formDataString = Object.entries(formData)
    .filter(([key]) => !key.includes("comments"))
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  return await resend.emails.send({
    from: "Appsy <contact@cascadestudio.fr>",
    to: [psychologistEmail],
    subject: `Résultat du questionnaire ${questionnaireTitle} pour ${patientFirstname} ${patientLastname}`,
    react: await ResultQuestionnaireEmailTemplate({
      patientFirstname,
      patientLastname,
      questionnaireTitle,
      scoreDetails: {
        total: scoreResult.totalScore,
        anxiety: scoreResult.anxietyScore,
        avoidance: scoreResult.avoidanceScore,
        interpretation: scoreResult.interpretation,
        maxTotal: scoreResult.maxTotal,
        maxAnxiety: scoreResult.maxAnxiety,
        maxAvoidance: scoreResult.maxAvoidance,
      },
      formResponses: formDataString,
      comments: formData.comments,
    }),
  });
}
