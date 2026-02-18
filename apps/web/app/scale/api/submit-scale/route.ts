import { NextResponse } from "next/server";
import { calculateScaleScore } from "@/app/utils/scale-scoring/scale-scoring";
import { sendScaleResults } from "@/app/services/email/sendScaleResults";
import { scales } from "@/app/scalesData";
import { formatScaleAnswers } from "@/app/utils/formatScaleAnswers";
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const {
      scaleId,
      scaleTitle,
      scaleAnswers,
      patientComments,
      psychologistEmail,
      patientFirstname,
      patientLastname,
    } = body;

    const scale = scales.find((s) => s.id === scaleId);

    // Calculate scores using the utility function
    const scoreResult = calculateScaleScore(
      scale,
      scaleAnswers
    );

    // Format the answers to be readable
    const readableAnswers = formatScaleAnswers(
      scale,
      scaleAnswers
    );

    // Send email using the extracted service
    const { error } = await sendScaleResults({
      scaleId,
      psychologistEmail,
      patientFirstname,
      patientLastname,
      scaleTitle,
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
