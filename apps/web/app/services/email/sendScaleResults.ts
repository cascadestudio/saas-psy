import { Resend } from "resend";
import { ResultScaleEmailTemplate } from "@/app/scale/api/submit-scale/ResultScaleEmailTemplate";

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface SendScaleResultsParams {
  psychologistEmail: string;
  patientFirstname: string;
  patientLastname: string;
  scaleTitle: string;
  scaleId: string;
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

export async function sendScaleResults({
  psychologistEmail,
  patientFirstname,
  patientLastname,
  scaleTitle,
  scoreResult,
  readableAnswers,
  patientComments,
  scaleId,
}: SendScaleResultsParams) {
  const resend = getResendClient();
  return await resend.emails.send({
    from: "Melya <contact@cascadestudio.fr>",
    to: [psychologistEmail],
    subject: `Résultat du questionnaire ${scaleTitle} pour ${patientFirstname} ${patientLastname}`,
    react: await ResultScaleEmailTemplate({
      scaleId,
      patientFirstname,
      patientLastname,
      scaleTitle,
      scoreResult,
      readableAnswers,
      patientComments,
    }),
  });
}
