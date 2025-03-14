import * as React from "react";

interface EmailTemplateProps {
  patientFirstname: string;
  patientLastname: string;
  message: string;
  questionnaireUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  patientFirstname,
  patientLastname,
  message,
  questionnaireUrl,
}) => (
  <div>
    <h1>
      Bonjour {patientFirstname} {patientLastname},
    </h1>
    <p>
      Votre professionnel de santé vous a envoyé un questionnaire à compléter.
    </p>
    {message ? (
      <>
        <p>Message du professionnel de santé :</p>
        <p>{message}</p>
      </>
    ) : (
      ""
    )}
    <p>
      Veuillez cliquer sur le lien ci-dessous pour accéder à votre questionnaire
      :
    </p>
    <a
      href={questionnaireUrl}
      className="inline-block bg-indigo-600 text-white px-5 py-2.5 no-underline rounded mt-2.5 hover:bg-indigo-700"
    >
      Accéder au Questionnaire
    </a>
    <p className="mt-5">
      Si vous avez des questions, veuillez contacter votre professionnel de
      santé.
    </p>
  </div>
);
