import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { buildBatchEmailHtml, buildSessionEmailHtml } from '@melya/core';
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

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (apiKey) {
      this.resend = new Resend(apiKey);
    } else {
      this.logger.warn('RESEND_API_KEY not configured - emails will be logged but not sent');
    }
    this.fromEmail = this.configService.get<string>('EMAIL_FROM', 'noreply@melya.app');
    this.appUrl = this.configService.get<string>('NEXT_PUBLIC_APP_URL', 'http://localhost:3000');
  }

  async sendSessionEmail(params: SendSessionEmailParams): Promise<{ success: boolean; error?: string }> {
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
    this.logger.log(`Sending session email to ${patientEmail} for session ${sessionId}`);

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

  async sendBatchSessionEmail(params: SendBatchSessionEmailParams): Promise<{ success: boolean; error?: string }> {
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
    const subject = scaleCount === 1
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
    this.logger.log(`Sending batch email to ${patientEmail} for batch ${batchId} with ${scaleCount} scale(s)`);

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

  async sendWelcomeEmail(email: string, firstName?: string): Promise<{ success: boolean; error?: string }> {
    const subject = 'Bienvenue sur Melya !';
    const dashboardUrl = `${this.appUrl}/dashboard`;
    const greeting = firstName ? `Bonjour ${firstName},` : 'Bonjour,';

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
              <!-- Orange top bar -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background-color: #D6591F; padding: 32px 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.3px;">
                      Bienvenue sur Melya !
                    </h1>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding: 36px 40px;">
                    <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 26px;">
                      ${greeting}
                    </p>
                    <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 26px;">
                      Votre compte a &eacute;t&eacute; cr&eacute;&eacute; avec succ&egrave;s. Vous pouvez d&egrave;s maintenant commencer &agrave; utiliser Melya pour g&eacute;rer vos questionnaires psychom&eacute;triques.
                    </p>
                    <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 26px;">
                      Avec Melya, vous pouvez :
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 32px 0;">
                      <tr>
                        <td style="padding: 7px 0;">
                          <span style="display: inline-block; width: 7px; height: 7px; background-color: #D6591F; border-radius: 50%; margin-right: 12px; vertical-align: middle;"></span>
                          <span style="color: #374151; font-size: 15px; line-height: 22px;">Envoyer des questionnaires &agrave; vos patients en quelques clics</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 7px 0;">
                          <span style="display: inline-block; width: 7px; height: 7px; background-color: #D6591F; border-radius: 50%; margin-right: 12px; vertical-align: middle;"></span>
                          <span style="color: #374151; font-size: 15px; line-height: 22px;">Obtenir un scoring et une interpr&eacute;tation automatiques</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 7px 0;">
                          <span style="display: inline-block; width: 7px; height: 7px; background-color: #D6591F; border-radius: 50%; margin-right: 12px; vertical-align: middle;"></span>
                          <span style="color: #374151; font-size: 15px; line-height: 22px;">Suivre l'&eacute;volution de vos patients dans le temps</span>
                        </td>
                      </tr>
                    </table>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <a href="${dashboardUrl}" style="display: inline-block; padding: 14px 36px; background-color: #D6591F; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; border-radius: 100px;">
                            Acc&eacute;der &agrave; mon tableau de bord
                          </a>
                        </td>
                      </tr>
                    </table>
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

    this.logger.log(`Sending welcome email to ${email}`);

    if (!this.resend) {
      this.logger.warn(`[DEV MODE] Welcome email would be sent to: ${email}`);
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
        this.logger.error(`Failed to send welcome email: ${error.message}`);
        return { success: false, error: error.message };
      }

      this.logger.log(`Welcome email sent successfully: ${data?.id}`);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      this.logger.error(`Exception sending welcome email: ${errorMessage}`);
      return { success: false, error: errorMessage };
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<{ success: boolean; error?: string }> {
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
      this.logger.warn(`[DEV MODE] Password reset email would be sent to: ${email}`);
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
        this.logger.error(`Failed to send password reset email: ${error.message}`);
        return { success: false, error: error.message };
      }

      this.logger.log(`Password reset email sent successfully: ${data?.id}`);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      this.logger.error(`Exception sending password reset email: ${errorMessage}`);
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
