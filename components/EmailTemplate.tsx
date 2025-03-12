import * as React from "react";

interface EmailTemplateProps {
  patientName: string;
  message: string;
  questionnaireUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  patientName,
  message,
  questionnaireUrl,
}) => (
  <div>
    <h1>Hello {patientName},</h1>
    <p>Your healthcare provider has sent you a questionnaire to complete.</p>
    {message ? <p>{message}</p> : ""}
    <p>Please click the link below to access your questionnaire:</p>
    <a
      href={questionnaireUrl}
      className="inline-block bg-indigo-600 text-white px-5 py-2.5 no-underline rounded mt-2.5 hover:bg-indigo-700"
    >
      Access Questionnaire
    </a>
    <p className="mt-5">
      If you have any questions, please contact your healthcare provider.
    </p>
  </div>
);
