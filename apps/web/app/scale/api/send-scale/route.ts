import { Resend } from "resend";
import { NextResponse } from "next/server";
import { SendScaleEmailTemplate } from "./SendScaleEmailTemplate";

export async function POST(request: Request) {
  try {
    const {
      patientFirstname,
      patientLastname,
      patientEmail,
      psychologistEmail,
      message,
      scaleId,
    } = await request.json();

    // Generate the scale URL with psychologistEmail as a query parameter
    const scaleUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/scale/${scaleId}?psychologistEmail=${encodeURIComponent(psychologistEmail)}&patientFirstname=${encodeURIComponent(patientFirstname)}&patientLastname=${encodeURIComponent(patientLastname)}`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      //   from: "Acme <onboarding@resend.dev>",
      from: "Melya <contact@cascadestudio.fr>",
      //   to: ["contact@cascadestudio.fr"],
      to: [patientEmail],
      //   to: ["delivered@resend.dev"], // Test address that always works
      subject: "Votre échelle d'évaluation",
      react: await SendScaleEmailTemplate({
        patientFirstname,
        patientLastname,
        message,
        scaleUrl,
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
