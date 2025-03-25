import { Resend } from "resend";
import { ResultQuestionnaireEmailTemplate } from "@/app/questionnaire/api/submit-questionnaire/ResultQuestionnaireEmailTemplate";

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
    stateScore?: number;
    traitScore?: number;
    interpretation: string;
    maxTotal: number;
    maxAnxiety?: number;
    maxAvoidance?: number;
  };
  questionnaireAnswers: Record<string, any>;
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
}: SendQuestionnaireResultsParams) {
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
        stateScore: scoreResult.stateScore,
        traitScore: scoreResult.traitScore,
        interpretation: scoreResult.interpretation,
        maxTotal: scoreResult.maxTotal,
        maxAnxiety: scoreResult.maxAnxiety,
        maxAvoidance: scoreResult.maxAvoidance,
      },
      readableAnswers: readableAnswers,
      patientComments: patientComments,
    }),
  });
}
