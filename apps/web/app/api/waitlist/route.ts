import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
    });

    if (error) {
      console.error(`[Waitlist] Resend error:`, error.message);
      return NextResponse.json(
        { error: "Erreur lors de l'inscription" },
        { status: 500 }
      );
    }

    console.log(`[Waitlist] New signup: ${email}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
