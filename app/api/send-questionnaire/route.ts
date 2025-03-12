import { Resend } from "resend";
import { NextResponse } from "next/server";
import { EmailTemplate } from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { patientName, patientEmail, message, questionnaireId } =
      await request.json();
    console.log(patientName, patientEmail, message);
    // Generate the questionnaire URL
    const questionnaireUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/questionnaire/${questionnaireId}`;

    const { data, error } = await resend.emails.send({
      //   from: "Acme <onboarding@resend.dev>",
      from: "Cascade <contact@cascadestudio.fr>",
      //   to: ["contact@cascadestudio.fr"],
      to: [patientEmail],
      //   to: ["delivered@resend.dev"], // Test address that always works
      subject: "Votre Questionnaire de Santé",
      react: await EmailTemplate({
        patientName,
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
