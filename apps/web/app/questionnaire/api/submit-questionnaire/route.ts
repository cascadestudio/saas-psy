import { NextResponse } from "next/server";
import { calculateQuestionnaireScore } from "@/app/utils/questionnaire-scoring/questionnaire-scoring";
import { sendQuestionnaireResults } from "@/app/services/email/sendQuestionnaireResults";
import { scales } from "@/app/scalesData";
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

    const scale = scales.find((s) => s.id === questionnaireId);

    // Calculate scores using the utility function
    const scoreResult = calculateQuestionnaireScore(
      scale,
      questionnaireAnswers
    );

    // Format the answers to be readable
    const readableAnswers = formatQuestionnaireAnswers(
      scale,
      questionnaireAnswers
    );

    // Send email using the extracted service
    const { error } = await sendQuestionnaireResults({
      questionnaireId,
      psychologistEmail,
      patientFirstname,
      patientLastname,
      questionnaireTitle,
      scoreResult,
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
