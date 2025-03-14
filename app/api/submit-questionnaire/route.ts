import { NextResponse } from "next/server";
import { Resend } from "resend";
import { questionnaires } from "@/app/data";
import { SubmitQuestionnaireEmailTemplate } from "@/components/SubmitQuestionnaireEmailTemplate";

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

    // Calculate the score
    let totalScore = 0;
    let anxietyScore = 0;
    let avoidanceScore = 0;
    let interpretation = "";
    let scoreDetails = "";

    if (questionnaire) {
      // Extract all anxiety and avoidance scores
      const anxietyValues = Object.entries(formData)
        .filter(([key]) => key.startsWith("anxiety_"))
        .map(([_, value]) => parseInt(value as string, 10));

      const avoidanceValues = Object.entries(formData)
        .filter(([key]) => key.startsWith("avoidance_"))
        .map(([_, value]) => parseInt(value as string, 10));

      // Calculate sub-scores
      anxietyScore = anxietyValues.reduce((sum, value) => sum + value, 0);
      avoidanceScore = avoidanceValues.reduce((sum, value) => sum + value, 0);

      // Calculate total score
      totalScore = anxietyScore + avoidanceScore;

      // Determine interpretation based on scoring ranges
      if (questionnaire.scoring?.ranges) {
        const matchingRange = questionnaire.scoring.ranges.find(
          (range) => totalScore >= range.min && totalScore <= range.max
        );

        if (matchingRange) {
          interpretation = matchingRange.interpretation;
        }
      }

      // Create score details
      scoreDetails = `
Score total: ${totalScore}/144
Score d'anxiété: ${anxietyScore}/72
Score d'évitement: ${avoidanceScore}/72
Interprétation: ${interpretation}
      `;
    }

    // Format the form data for the email
    const formDataString = Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    // Send the email
    const { data, error } = await resend.emails.send({
      from: "Cascade <contact@cascadestudio.fr>",
      to: [psychologistEmail],
      subject: `Résultat du questionnaire ${questionnaireTitle} pour ${patientFirstname} ${patientLastname}`,
      react: await SubmitQuestionnaireEmailTemplate({
        patientFirstname,
        patientLastname,
        questionnaireTitle,
        scoreDetails: {
          total: totalScore,
          anxiety: anxietyScore,
          avoidance: avoidanceScore,
          interpretation,
          maxTotal: 144,
          maxAnxiety: 72,
          maxAvoidance: 72,
        },
        formResponses: formDataString,
        comments: formData.comments || undefined,
      }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      score: {
        total: totalScore,
        anxiety: anxietyScore,
        avoidance: avoidanceScore,
        interpretation,
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
