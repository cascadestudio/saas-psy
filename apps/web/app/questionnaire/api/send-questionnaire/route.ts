import { Resend } from "resend";
import { NextResponse } from "next/server";
import { SendQuestionnaireEmailTemplate } from "./SendQuestionnaireEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      patientFirstname,
      patientLastname,
      patientEmail,
      psychologistEmail,
      message,
      questionnaireId,
    } = await request.json();

    // Generate the questionnaire URL with psychologistEmail as a query parameter
    const questionnaireUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/questionnaire/${questionnaireId}?psychologistEmail=${encodeURIComponent(psychologistEmail)}&patientFirstname=${encodeURIComponent(patientFirstname)}&patientLastname=${encodeURIComponent(patientLastname)}`;

    const { data, error } = await resend.emails.send({
      //   from: "Acme <onboarding@resend.dev>",
      from: "Zazo <contact@cascadestudio.fr>",
      //   to: ["contact@cascadestudio.fr"],
      to: [patientEmail],
      //   to: ["delivered@resend.dev"], // Test address that always works
      subject: "Votre questionnaire de santé",
      react: await SendQuestionnaireEmailTemplate({
        patientFirstname,
        patientLastname,
        message,
        questionnaireUrl,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
