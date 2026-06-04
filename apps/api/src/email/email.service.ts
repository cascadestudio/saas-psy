import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import {
  buildBatchEmailHtml,
  buildPractitionerCompletionEmailHtml,
  buildSessionEmailHtml,
} from '@melya/core';
import { PrismaService } from '../prisma/prisma.service';

interface SendSessionEmailParams {
  patientEmail: string;
  patientFirstName: string;
  patientLastName: string;
  sessionId: string;
  scaleName: string;
  practitionerName: string;
  message?: string;
}

interface SendBatchSessionEmailParams {
  patientEmail: string;
  patientFirstName: string;
  patientLastName: string;
  batchId: string;
  scaleNames: string[];
  practitionerName: string;
  message?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend | null = null;
  private readonly fromEmail: string;
  private readonly appUrl: string;
  // Onboarding sequence is sent personally by Clément (founder), not the
  // neutral "Melya" sender used for patient/transactional emails. The human
  // From address also means replies land directly in Clément's inbox, so no
  // separate Reply-To is needed.
  private readonly onboardingFrom = 'Clément de Melya <clement@melya.app>';

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (apiKey) {
      this.resend = new Resend(apiKey);
    } else {
      this.logger.warn(
        'RESEND_API_KEY not configured - emails will be logged but not sent',
      );
    }
    this.fromEmail = this.configService.get<string>(
      'EMAIL_FROM',
      'noreply@melya.app',
    );
    this.appUrl = this.configService.get<string>(
      'APP_URL',
      'http://localhost:3000',
    );
  }

  async sendSessionEmail(
    params: SendSessionEmailParams,
  ): Promise<{ success: boolean; error?: string }> {
    const {
      patientEmail,
      patientFirstName,
      patientLastName,
      sessionId,
      scaleName,
      practitionerName,
      message,
    } = params;

    const questionnaireUrl = `${this.appUrl}/session/${sessionId}`;
    const subject = 'Votre questionnaire est disponible';

    const html = buildSessionEmailHtml({
      patientFirstName,
      patientLastName,
      scaleName,
      practitionerName,
      message,
      questionnaireUrl,
      logoUrl: `${this.appUrl}/images/logos/logo-melya.svg`,
    });

    // Log the attempt
    this.logger.log(
      `Sending session email to ${patientEmail} for session ${sessionId}`,
    );

    if (!this.resend) {
      // Dev mode without Resend - log and simulate success
      this.logger.warn(`[DEV MODE] Email would be sent to: ${patientEmail}`);
      this.logger.warn(`[DEV MODE] Questionnaire URL: ${questionnaireUrl}`);

      await this.logEmail({
        to: patientEmail,
        subject,
        sessionId,
        status: 'sent',
        providerId: 'dev-mode',
      });

      return { success: true };
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: `Melya <${this.fromEmail}>`,
        to: [patientEmail],
        subject,
        html,
      });

      if (error) {
        this.logger.error(`Failed to send email: ${error.message}`);

        await this.logEmail({
          to: patientEmail,
          subject,
          sessionId,
          status: 'failed',
          error: error.message,
        });

        return { success: false, error: error.message };
      }

      this.logger.log(`Email sent successfully: ${data?.id}`);

      await this.logEmail({
        to: patientEmail,
        subject,
        sessionId,
        status: 'sent',
        providerId: data?.id,
      });

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      this.logger.error(`Exception sending email: ${errorMessage}`);

      await this.logEmail({
        to: patientEmail,
        subject,
        sessionId,
        status: 'failed',
        error: errorMessage,
      });

      return { success: false, error: errorMessage };
    }
  }

  async sendBatchSessionEmail(
    params: SendBatchSessionEmailParams,
  ): Promise<{ success: boolean; error?: string }> {
    const {
      patientEmail,
      patientFirstName,
      patientLastName,
      batchId,
      scaleNames,
      practitionerName,
      message,
    } = params;

    const portalUrl = `${this.appUrl}/p/${batchId}`;
    const scaleCount = scaleNames.length;
    const subject =
      scaleCount === 1
        ? 'Votre questionnaire est disponible'
        : `${scaleCount} questionnaires à compléter`;

    const html = buildBatchEmailHtml({
      patientFirstName,
      patientLastName,
      scaleNames,
      practitionerName,
      message,
      portalUrl,
      logoUrl: `${this.appUrl}/images/logos/logo-melya.svg`,
    });

    // Log the attempt
    this.logger.log(
      `Sending batch email to ${patientEmail} for batch ${batchId} with ${scaleCount} scale(s)`,
    );

    if (!this.resend) {
      // Dev mode without Resend - log and simulate success
      this.logger.warn(`[DEV MODE] Email would be sent to: ${patientEmail}`);
      this.logger.warn(`[DEV MODE] Portal URL: ${portalUrl}`);

      await this.logEmail({
        to: patientEmail,
        subject,
        sessionId: batchId,
        status: 'sent',
        providerId: 'dev-mode',
      });

      return { success: true };
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: `Melya <${this.fromEmail}>`,
        to: [patientEmail],
        subject,
        html,
      });

      if (error) {
        this.logger.error(`Failed to send batch email: ${error.message}`);

        await this.logEmail({
          to: patientEmail,
          subject,
          sessionId: batchId,
          status: 'failed',
          error: error.message,
        });

        return { success: false, error: error.message };
      }

      this.logger.log(`Batch email sent successfully: ${data?.id}`);

      await this.logEmail({
        to: patientEmail,
        subject,
        sessionId: batchId,
        status: 'sent',
        providerId: data?.id,
      });

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      this.logger.error(`Exception sending batch email: ${errorMessage}`);

      await this.logEmail({
        to: patientEmail,
        subject,
        sessionId: batchId,
        status: 'failed',
        error: errorMessage,
      });

      return { success: false, error: errorMessage };
    }
  }

  async sendPractitionerCompletionEmail(params: {
    practitionerEmail: string;
    practitionerFirstName: string;
    patientFirstName: string;
    patientLastName: string;
    sessionId: string;
    scaleName: string;
  }): Promise<{ success: boolean; error?: string }> {
    const {
      practitionerEmail,
      practitionerFirstName,
      patientFirstName,
      patientLastName,
      sessionId,
      scaleName,
    } = params;

    const sessionUrl = `${this.appUrl}/passation/${sessionId}`;
    const subject = `${patientFirstName} ${patientLastName} a complété ${scaleName}`;

    const html = buildPractitionerCompletionEmailHtml({
      practitionerFirstName,
      patientFirstName,
      patientLastName,
      scaleName,
      sessionUrl,
      logoUrl: `${this.appUrl}/images/logos/logo-melya.svg`,
    });

    this.logger.log(
      `Sending completion email to practitioner ${practitionerEmail} for session ${sessionId}`,
    );

    if (!this.resend) {
      this.logger.warn(
        `[DEV MODE] Completion email would be sent to: ${practitionerEmail}`,
      );
      this.logger.warn(`[DEV MODE] Session URL: ${sessionUrl}`);

      await this.logEmail({
        to: practitionerEmail,
        subject,
        sessionId,
        status: 'sent',
        providerId: 'dev-mode',
      });

      return { success: true };
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: `Melya <${this.fromEmail}>`,
        to: [practitionerEmail],
        subject,
        html,
      });

      if (error) {
        this.logger.error(`Failed to send completion email: ${error.message}`);

        await this.logEmail({
          to: practitionerEmail,
          subject,
          sessionId,
          status: 'failed',
          error: error.message,
        });

        return { success: false, error: error.message };
      }

      this.logger.log(`Completion email sent successfully: ${data?.id}`);

      await this.logEmail({
        to: practitionerEmail,
        subject,
        sessionId,
        status: 'sent',
        providerId: data?.id,
      });

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      this.logger.error(`Exception sending completion email: ${errorMessage}`);

      await this.logEmail({
        to: practitionerEmail,
        subject,
        sessionId,
        status: 'failed',
        error: errorMessage,
      });

      return { success: false, error: errorMessage };
    }
  }

  // ------------------------------------------------------------------
  // Onboarding sequence (time-based): J+0 welcome, J+3 scales, J+14 feedback.
  // All three are sent personally by Clément (see onboardingFrom).
  // ------------------------------------------------------------------

  /** Mail 1 — sent immediately on registration. */
  async sendWelcomeEmail(
    email: string,
    firstName?: string,
  ): Promise<{ success: boolean; error?: string }> {
    const greeting = firstName ? `Bonjour ${firstName},` : 'Bonjour,';
    const appUrl = this.appUrl;
    const p =
      'margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 26px;';

    const body = `
      <p style="${p}">${greeting}</p>
      <p style="${p}">
        Tu fais partie des premiers psychologues à tester Melya, merci de nous
        faire confiance à ce stade.
      </p>
      <p style="${p}">
        Ton accès est actif. Tu peux dès maintenant accéder à
        <a href="${appUrl}/dashboard" style="color: #D6591F; font-weight: 600;">ton tableau de bord</a>.
      </p>
      <p style="${p}">Pour démarrer, trois choses simples :</p>
      <p style="margin: 0 0 8px 0; color: #374151; font-size: 16px; line-height: 26px;">→ Crée ton premier patient</p>
      <p style="margin: 0 0 8px 0; color: #374151; font-size: 16px; line-height: 26px;">→ Envoie-lui une échelle — ça prend moins d'une minute</p>
      <p style="margin: 0 0 24px 0; color: #374151; font-size: 16px; line-height: 26px;">→ Regarde ce que tu reçois</p>
      <p style="${p}">
        Si tu bloques quelque part, réponds directement à ce mail. C'est Clément
        qui te lira : pas un bot, pas un support externalisé.
      </p>
      <p style="${p}">On est vraiment curieux de savoir ce que tu en penses !</p>
      <p style="margin: 24px 0 4px 0; color: #374151; font-size: 16px; line-height: 24px;">
        Clément, Adrien et James,<br>co-fondateurs de Melya
      </p>
    `;

    return this.sendOnboarding(
      email,
      'Bienvenue dans Melya (tes échelles psychométriques) 👋',
      this.buildOnboardingHtml(body),
      'welcome',
    );
  }

  /** Mail 2 — sent at J+3 (time-based). Available free scales, BDI excluded. */
  async sendOnboardingDay3Email(
    email: string,
    firstName?: string,
  ): Promise<{ success: boolean; error?: string }> {
    const greeting = firstName ? `Bonjour ${firstName},` : 'Bonjour,';
    const p =
      'margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 26px;';

    const scales: { name: string; text: string }[] = [
      {
        name: 'PHQ-9 — Dépression',
        text: "L'outil de référence pour dépister et suivre la sévérité d'un épisode dépressif. 9 items, score de 0 à 27. À noter : un score ≥ 1 à l'item 9 (idéation suicidaire) nécessite une attention clinique immédiate — indépendamment du score total.",
      },
      {
        name: 'GAD-7 — Anxiété généralisée',
        text: "7 items pour mesurer la sévérité de l'anxiété. Rapide à administrer, très utile en suivi. Un score élevé ne signifie pas automatiquement un TAG — il reste un outil de dépistage, pas de diagnostic.",
      },
      {
        name: 'PCL-5 — PTSD',
        text: "En 20 items répartis en 4 clusters DSM-5. Le score total seul appauvrit la lecture clinique — scorer par dimension (intrusion, évitement, cognitions, hyperéveil) change ce que tu peux conclure sur l'évolution de ton patient.",
      },
      {
        name: 'LSAS — Anxiété sociale',
        text: "24 situations évaluées sur deux dimensions indépendantes : la peur et l'évitement. Un patient peut avoir une peur élevée avec peu d'évitement — ou l'inverse. Les deux sous-scores racontent des histoires très différentes.",
      },
      {
        name: 'Y-BOCS — TOC',
        text: '10 items, 5 sur les obsessions, 5 sur les compulsions. Sous thérapie EPR, les compulsions diminuent souvent avant les obsessions ; sans scorer les deux séparément, tu rates cette dissociation.',
      },
      {
        name: 'RSES — Estime de soi',
        text: "10 items dont 5 inversés : c'est le piège le plus fréquent sur cette échelle. Melya gère l'inversion automatiquement. Utile en suivi transversal pour objectiver ce que la thérapie change sur l'image de soi.",
      },
    ];

    const scalesHtml = scales
      .map(
        (s) => `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 18px 0;">
        <tr>
          <td style="padding: 0 0 0 14px; border-left: 3px solid #D6591F;">
            <p style="margin: 0 0 4px 0; color: #1f2937; font-size: 15px; font-weight: 700; line-height: 22px;">${s.name}</p>
            <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 22px;">${s.text}</p>
          </td>
        </tr>
      </table>`,
      )
      .join('');

    const body = `
      <p style="${p}">${greeting}</p>
      <p style="${p}">
        Si tu n'as pas encore eu le temps d'explorer, voilà ce qui t'attend sur
        Melya en ce moment.
      </p>
      ${scalesHtml}
      <p style="${p}">
        Pour chaque échelle : envoi en quelques secondes par email ou QR code,
        scoring automatique, suivi longitudinal séance après séance. Tout hébergé
        en France, conforme RGPD.
      </p>
      <p style="${p}">
        Si tu as la moindre question ou si quelque chose te bloque, réponds
        directement à ce mail.
      </p>
      <p style="margin: 24px 0 4px 0; color: #374151; font-size: 16px; line-height: 24px;">
        Clément de Melya
      </p>
      <p style="margin: 20px 0 0 0; color: #9ca3af; font-size: 12px; line-height: 18px;">
        Tu reçois ces emails parce que tu testes Melya. Si tu ne souhaites plus
        en recevoir, réponds simplement « stop » à ce mail.
      </p>
    `;

    return this.sendOnboarding(
      email,
      'Voici les échelles gratuites disponibles sur Melya :)',
      this.buildOnboardingHtml(body),
      'onboarding-day3',
    );
  }

  /** Mail 3 — sent at J+14 (time-based). Structured first feedback. */
  async sendOnboardingDay14Email(
    email: string,
    firstName?: string,
  ): Promise<{ success: boolean; error?: string }> {
    const greeting = firstName ? `Bonjour ${firstName},` : 'Bonjour,';
    const p =
      'margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 26px;';
    const q =
      'margin: 0 0 6px 0; color: #1f2937; font-size: 16px; font-weight: 700; line-height: 24px;';
    const qd =
      'margin: 0 0 20px 0; color: #4b5563; font-size: 15px; line-height: 23px;';

    const body = `
      <p style="${p}">${greeting}</p>
      <p style="${p}">
        Ça fait deux semaines que tu as accès à Melya. On a trois questions pour
        toi, ça prend 5 minutes :
      </p>
      <p style="${q}">① Qu'est-ce qui t'a vraiment aidé jusqu'ici ?</p>
      <p style="${qd}">Une fonctionnalité, un gain de temps concret, quelque chose que tu n'attendais pas.</p>
      <p style="${q}">② Qu'est-ce qui t'a frustré ou manqué ?</p>
      <p style="${qd}">Sois honnête : c'est exactement ce dont on a besoin pour améliorer le produit.</p>
      <p style="${q}">③ Tu en parlerais à un collègue aujourd'hui ?</p>
      <p style="${qd}">Oui / Pas encore / Non, et pourquoi.</p>
      <p style="${p}">
        Tu peux répondre directement à ce mail. Pas de formulaire, pas de lien
        externe.
      </p>
      <p style="${p}">
        Merci d'avance : ces retours sont directement intégrés dans ce qu'on
        développe.
      </p>
      <p style="margin: 24px 0 4px 0; color: #374151; font-size: 16px; line-height: 24px;">
        Clément, James et Adrien,<br>co-fondateurs de Melya
      </p>
    `;

    return this.sendOnboarding(
      email,
      '2 semaines — on aimerait ton avis',
      this.buildOnboardingHtml(body),
      'onboarding-day14',
    );
  }

  /** Shared light layout for the founder-voiced onboarding sequence. */
  private buildOnboardingHtml(innerBody: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #faf8f6; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #faf8f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 580px;">
          <tr>
            <td style="padding: 0 0 24px 0; text-align: center;">
              <img src="${this.appUrl}/images/logos/logo-melya.svg" alt="Melya" width="120" height="34" style="display: inline-block; border: 0;" />
            </td>
          </tr>
          <tr>
            <td style="background-color: #ffffff; border-radius: 20px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06); padding: 36px 40px;">
              ${innerBody}
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px 0 40px; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 18px;">
                Melya &mdash; Plateforme de questionnaires psychom&eacute;triques
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
  }

  /** Sends an onboarding email from Clément (replies land in his inbox). */
  private async sendOnboarding(
    to: string,
    subject: string,
    html: string,
    label: string,
  ): Promise<{ success: boolean; error?: string }> {
    this.logger.log(`Sending ${label} email to ${to}`);

    if (!this.resend) {
      this.logger.warn(`[DEV MODE] ${label} email would be sent to: ${to}`);
      return { success: true };
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: this.onboardingFrom,
        to: [to],
        subject,
        html,
      });

      if (error) {
        this.logger.error(`Failed to send ${label} email: ${error.message}`);
        return { success: false, error: error.message };
      }

      this.logger.log(`${label} email sent successfully: ${data?.id}`);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      this.logger.error(`Exception sending ${label} email: ${errorMessage}`);
      return { success: false, error: errorMessage };
    }
  }

  async sendSignupNotificationEmail(params: {
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  }): Promise<void> {
    const to = 'clement@melya.app';
    const fullName =
      `${params.firstName ?? ''} ${params.lastName ?? ''}`.trim() ||
      '(non renseigné)';
    const subject = `Nouvelle inscription Melya — ${params.email}`;
    const html = `
      <p>Nouvelle inscription sur Melya :</p>
      <ul>
        <li><strong>Email :</strong> ${params.email}</li>
        <li><strong>Nom :</strong> ${fullName}</li>
        <li><strong>Date :</strong> ${new Date().toISOString()}</li>
      </ul>
      <p>Fiche Attio : <a href="https://app.attio.com/melyaapp/people">ouvrir Attio</a></p>
    `;

    if (!this.resend) {
      this.logger.warn(
        `[DEV MODE] Signup notification would be sent to ${to} for ${params.email}`,
      );
      return;
    }

    const { error } = await this.resend.emails.send({
      from: `Melya <${this.fromEmail}>`,
      to: [to],
      subject,
      html,
    });

    if (error) {
      this.logger.error(`Failed to send signup notification: ${error.message}`);
    }
  }

  async sendPasswordResetEmail(
    email: string,
    resetToken: string,
  ): Promise<{ success: boolean; error?: string }> {
    const resetUrl = `${this.appUrl}/reset-password/${resetToken}`;
    const subject = 'Réinitialisation de votre mot de passe - Melya';

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #faf8f6; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #faf8f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 580px;">
          <!-- Logo header -->
          <tr>
            <td style="padding: 0 0 24px 0; text-align: center;">
              <img src="${this.appUrl}/images/logos/logo-melya.svg" alt="Melya" width="120" height="34" style="display: inline-block; border: 0;" />
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 20px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06); overflow: hidden;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <!-- Orange top bar -->
                <tr>
                  <td style="background-color: #D6591F; padding: 32px 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.3px;">
                      R&eacute;initialisation du mot de passe
                    </h1>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding: 36px 40px;">
                    <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 26px;">
                      Vous avez demand&eacute; la r&eacute;initialisation de votre mot de passe.
                    </p>
                    <p style="margin: 0 0 32px 0; color: #374151; font-size: 16px; line-height: 26px;">
                      Cliquez sur le bouton ci-dessous pour cr&eacute;er un nouveau mot de passe. Ce lien est valable <strong>1 heure</strong>.
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <a href="${resetUrl}" style="display: inline-block; padding: 14px 36px; background-color: #D6591F; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; border-radius: 100px;">
                            R&eacute;initialiser mon mot de passe
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 28px 0 0 0; color: #6b7280; font-size: 14px; line-height: 22px;">
                      Si vous n'avez pas demand&eacute; cette r&eacute;initialisation, ignorez simplement cet email.
                    </p>
                    <p style="margin: 14px 0 0 0; color: #6b7280; font-size: 13px; line-height: 20px;">
                      Ou copiez ce lien dans votre navigateur :<br>
                      <a href="${resetUrl}" style="color: #D6591F; word-break: break-all;">${resetUrl}</a>
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 40px 28px 40px; text-align: center; border-top: 1px solid #f3f4f6;">
                    <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 18px;">
                      Melya &mdash; Plateforme de questionnaires psychom&eacute;triques
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    this.logger.log(`Sending password reset email to ${email}`);

    if (!this.resend) {
      this.logger.warn(
        `[DEV MODE] Password reset email would be sent to: ${email}`,
      );
      this.logger.warn(`[DEV MODE] Reset URL: ${resetUrl}`);
      return { success: true };
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: `Melya <${this.fromEmail}>`,
        to: [email],
        subject,
        html,
      });

      if (error) {
        this.logger.error(
          `Failed to send password reset email: ${error.message}`,
        );
        return { success: false, error: error.message };
      }

      this.logger.log(`Password reset email sent successfully: ${data?.id}`);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      this.logger.error(
        `Exception sending password reset email: ${errorMessage}`,
      );
      return { success: false, error: errorMessage };
    }
  }

  private async logEmail(data: {
    to: string;
    subject: string;
    sessionId: string;
    status: string;
    providerId?: string;
    error?: string;
  }) {
    try {
      await this.prisma.emailLog.create({
        data: {
          to: data.to,
          from: this.fromEmail,
          subject: data.subject,
          sessionId: data.sessionId,
          status: data.status,
          provider: 'resend',
          providerId: data.providerId,
          error: data.error,
        },
      });
    } catch (err) {
      this.logger.error(`Failed to log email: ${err}`);
    }
  }
}
