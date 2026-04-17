export interface BatchEmailParams {
  patientFirstName: string;
  patientLastName: string;
  scaleNames: string[];
  practitionerName: string;
  message?: string;
  portalUrl: string;
  logoUrl?: string;
}

export interface SessionEmailParams {
  patientFirstName: string;
  patientLastName: string;
  scaleName: string;
  practitionerName: string;
  message?: string;
  questionnaireUrl: string;
  logoUrl?: string;
}

export function buildBatchEmailHtml(params: BatchEmailParams): string {
  const { patientFirstName, patientLastName, scaleNames, practitionerName, message, portalUrl, logoUrl } = params;
  const scaleCount = scaleNames.length;

  const scaleListHtml = scaleNames
    .map(
      (name) => `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
            <span style="display: inline-block; width: 7px; height: 7px; background-color: #D6591F; border-radius: 50%; margin-right: 12px; vertical-align: middle;"></span>
            <span style="color: #374151; font-size: 15px;">${name}</span>
          </td>
        </tr>
      `,
    )
    .join('');

  const messageHtml = message
    ? `<div style="margin: 0 0 24px 0; padding: 16px 20px; background-color: #fdf5f2; border-left: 3px solid #D6591F; border-radius: 8px;">
        <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 22px; font-style: italic;">
          &ldquo;${message}&rdquo;
        </p>
      </div>`
    : '';

  return `<!DOCTYPE html>
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
              ${logoUrl
                ? `<img src="${logoUrl}" alt="Melya" width="120" height="34" style="display: inline-block; border: 0;" />`
                : `<span style="font-size: 22px; font-weight: 700; color: #D6591F; letter-spacing: -0.5px;">melya</span>`}
            </td>
          </tr>
          <tr>
            <td style="background-color: #ffffff; border-radius: 20px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06); overflow: hidden;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background-color: #D6591F; padding: 32px 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.3px;">
                      ${scaleCount === 1 ? 'Questionnaire de suivi' : `${scaleCount} questionnaires &agrave; compl&eacute;ter`}
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 36px 40px;">
                    <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 26px;">
                      Bonjour ${patientFirstName} ${patientLastName},
                    </p>
                    <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 26px;">
                      ${practitionerName} vous a envoy&eacute; ${scaleCount === 1 ? 'un questionnaire' : `${scaleCount} questionnaires`} &agrave; compl&eacute;ter :
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 24px 0; background-color: #faf8f6; border-radius: 12px;">
                      <tr>
                        <td style="padding: 16px 20px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            ${scaleListHtml}
                          </table>
                        </td>
                      </tr>
                    </table>
                    ${messageHtml}
                    <p style="margin: 0 0 32px 0; color: #374151; font-size: 16px; line-height: 26px;">
                      Cliquez sur le bouton ci-dessous pour acc&eacute;der &agrave; vos questionnaires :
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <a href="${portalUrl}" style="display: inline-block; padding: 14px 36px; background-color: #D6591F; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; border-radius: 100px;">
                            Acc&eacute;der aux questionnaires
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 28px 0 0 0; color: #6b7280; font-size: 13px; line-height: 20px;">
                      Ou copiez ce lien dans votre navigateur :<br>
                      <a href="${portalUrl}" style="color: #D6591F; word-break: break-all;">${portalUrl}</a>
                    </p>
                  </td>
                </tr>
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
</html>`;
}

export function buildSessionEmailHtml(params: SessionEmailParams): string {
  const { patientFirstName, patientLastName, scaleName, practitionerName, message, questionnaireUrl, logoUrl } = params;

  const messageHtml = message
    ? `<div style="margin: 20px 0; padding: 16px 20px; background-color: #fdf5f2; border-left: 3px solid #D6591F; border-radius: 8px;">
        <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 22px; font-style: italic;">
          &ldquo;${message}&rdquo;
        </p>
      </div>`
    : '';

  return `<!DOCTYPE html>
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
              ${logoUrl
                ? `<img src="${logoUrl}" alt="Melya" width="120" height="34" style="display: inline-block; border: 0;" />`
                : `<span style="font-size: 22px; font-weight: 700; color: #D6591F; letter-spacing: -0.5px;">melya</span>`}
            </td>
          </tr>
          <tr>
            <td style="background-color: #ffffff; border-radius: 20px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06); overflow: hidden;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background-color: #D6591F; padding: 32px 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.3px;">
                      Questionnaire de suivi
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 36px 40px;">
                    <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 26px;">
                      Bonjour ${patientFirstName} ${patientLastName},
                    </p>
                    <p style="margin: 0 0 16px 0; color: #374151; font-size: 16px; line-height: 26px;">
                      ${practitionerName} vous a envoy&eacute; le questionnaire <strong>${scaleName}</strong> &agrave; compl&eacute;ter.
                    </p>
                    ${messageHtml}
                    <p style="margin: 0 0 32px 0; color: #374151; font-size: 16px; line-height: 26px;">
                      Cliquez sur le bouton ci-dessous pour acc&eacute;der au questionnaire :
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <a href="${questionnaireUrl}" style="display: inline-block; padding: 14px 36px; background-color: #D6591F; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; border-radius: 100px;">
                            Acc&eacute;der au questionnaire
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 28px 0 0 0; color: #6b7280; font-size: 13px; line-height: 20px;">
                      Ou copiez ce lien dans votre navigateur :<br>
                      <a href="${questionnaireUrl}" style="color: #D6591F; word-break: break-all;">${questionnaireUrl}</a>
                    </p>
                  </td>
                </tr>
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
</html>`;
}
