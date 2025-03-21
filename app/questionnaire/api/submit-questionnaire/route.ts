import { NextResponse } from "next/server";
import { calculateQuestionnaireScore } from "@/app/utils/questionnaire-scoring";
import { sendQuestionnaireResults } from "@/app/services/email/sendQuestionnaireResults";
import { questionnaires } from "@/app/questionnairesData";
import { formatQuestionnaireAnswers } from "@/app/utils/formatQuestionnaireAnswers";
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const {
      questionnaireId,
      questionnaireTitle,
      questionnaireAnswers,
      patientComments,
      psychologistEmail,
      patientFirstname,
      patientLastname,
    } = body;

    const questionnaire = questionnaires.find((q) => q.id === questionnaireId);

    // Calculate scores using the utility function
    const scoreResult = calculateQuestionnaireScore(
      questionnaire,
      questionnaireAnswers
    );

    // Format the answers to be readable
    const readableAnswers = formatQuestionnaireAnswers(
      questionnaire,
      questionnaireAnswers
    );

    console.log("readableAnswers", readableAnswers);

    // Send email using the extracted service
    const { error } = await sendQuestionnaireResults({
      psychologistEmail,
      patientFirstname,
      patientLastname,
      questionnaireTitle,
      scoreResult,
      questionnaireAnswers,
      patientComments,
      readableAnswers,
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      score: scoreResult,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
