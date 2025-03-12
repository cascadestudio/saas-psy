import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { questionnaireId, questionnaireTitle, patientName, formData } = body;

    // Format the form data for the email
    const formDataString = Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    // Send the email
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["contact@cascadestudio.fr"],
      subject: `Résultat du questionnaire ${questionnaireTitle} pour ${patientName}`,
      text: `
Patient Name: ${patientName}
Questionnaire: ${questionnaireTitle} (ID: ${questionnaireId})

Form Responses:
${formDataString}
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
