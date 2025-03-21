import { NextResponse } from "next/server";
import { Resend } from "resend";
import { questionnaires } from "@/app/questionnairesData";
import { ResultQuestionnaireEmailTemplate } from "@/components/ResultQuestionnaireEmailTemplate";
import { calculateQuestionnaireScore } from "@/app/utils/questionnaire-scoring";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Format form responses for email
    const formDataString = Object.entries(formData)
      .filter(([key]) => !key.includes("comments"))
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    // Send email
    const { data, error } = await resend.emails.send({
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
