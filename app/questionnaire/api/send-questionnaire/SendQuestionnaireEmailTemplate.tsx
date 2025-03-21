import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Button,
  Link,
} from "@react-email/components";

interface EmailTemplateProps {
  patientFirstname: string;
  patientLastname: string;
  message: string;
  questionnaireUrl: string;
}

export const SendQuestionnaireEmailTemplate = ({
  patientFirstname,
  patientLastname,
  message,
  questionnaireUrl,
}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Votre questionnaire de santé à compléter</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Questionnaire de Santé</Heading>
          <Hr style={hrStyle} />
          <Section style={sectionStyle}>
            <Text style={textStyle}>
              Bonjour {patientFirstname} {patientLastname},
            </Text>
            <Text style={textStyle}>
              Votre psychologue vous a envoyé un questionnaire à compléter.
            </Text>
            {message && (
              <Text style={textStyle}>
                Message de votre psychologue: {message}
              </Text>
            )}
            <Text style={textStyle}>
              Veuillez cliquer sur le bouton ci-dessous pour accéder au
              questionnaire:
            </Text>
            <Button href={questionnaireUrl} style={buttonStyle}>
              Accéder au questionnaire
            </Button>
            <Text style={textStyle}>
              Ou copiez et collez ce lien dans votre navigateur:
            </Text>
            <Text style={linkTextStyle}>
              <Link href={questionnaireUrl} style={linkStyle}>
                {questionnaireUrl}
              </Link>
            </Text>
          </Section>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            © {new Date().getFullYear()} Cascade. Tous droits réservés.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const bodyStyle = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Arial, sans-serif",
};

const containerStyle = {
  margin: "0 auto",
  padding: "20px 0",
  width: "100%",
  maxWidth: "600px",
};

const headingStyle = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const hrStyle = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const sectionStyle = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "5px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const textStyle = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "14px",
};

const buttonStyle = {
  backgroundColor: "#4f46e5",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  margin: "20px 0",
  padding: "10px 0",
};

const linkTextStyle = {
  fontSize: "14px",
  color: "#666",
  marginBottom: "30px",
};

const linkStyle = {
  color: "#4f46e5",
  textDecoration: "underline",
  wordBreak: "break-all" as const,
};

const footerStyle = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  margin: "20px 0",
};
