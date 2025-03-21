import { NextResponse } from "next/server";
import { questionnaires } from "@/app/questionnairesData";
import { calculateQuestionnaireScore } from "@/app/utils/questionnaire-scoring";
import { sendQuestionnaireResults } from "@/app/services/email/sendQuestionnaireResults";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const {
      questionnaireId,
      questionnaireTitle,
      formData,
      psychologistEmail,
      patientFirstname,
      patientLastname,
    } = body;

    // Find the questionnaire data to access scoring information
    const questionnaire = questionnaires.find((q) => q.id === questionnaireId);
    if (!questionnaire) {
      return NextResponse.json(
        { error: "Questionnaire not found" },
        { status: 404 }
      );
    }

    // Calculate scores using the utility function
    const scoreResult = calculateQuestionnaireScore(questionnaire, formData);

    // Send email using the extracted service
    const { data, error } = await sendQuestionnaireResults({
      psychologistEmail,
      patientFirstname,
      patientLastname,
      questionnaireTitle,
      scoreResult,
      formData,
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data,
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
