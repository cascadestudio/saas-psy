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
  Link,
} from "@react-email/components";

interface ResultQuestionnaireEmailTemplateProps {
  patientFirstname: string;
  patientLastname: string;
  questionnaireTitle: string;
  scoreDetails: {
    total: number;
    anxiety?: number;
    avoidance?: number;
    interpretation: string;
    maxTotal?: number;
    maxAnxiety?: number;
    maxAvoidance?: number;
  };
  formResponses: string;
  patientComments?: string;
}

export const ResultQuestionnaireEmailTemplate = ({
  patientFirstname,
  patientLastname,
  questionnaireTitle,
  scoreDetails,
  formResponses,
  patientComments,
}: ResultQuestionnaireEmailTemplateProps) => {
  const maxTotal = scoreDetails.maxTotal || 144;
  const maxAnxiety = scoreDetails.maxAnxiety || 72;
  const maxAvoidance = scoreDetails.maxAvoidance || 72;

  return (
    <Html>
      <Head />
      <Preview>
        Résultats du questionnaire {questionnaireTitle} pour {patientFirstname}{" "}
        {patientLastname}
      </Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Résultats du Questionnaire</Heading>
          <Hr style={hrStyle} />

          <Section style={sectionStyle}>
            <Text style={subheadingStyle}>Informations du Patient</Text>
            <Text style={textStyle}>
              <strong>Patient:</strong> {patientFirstname} {patientLastname}
            </Text>
            <Text style={textStyle}>
              <strong>Questionnaire:</strong> {questionnaireTitle}
            </Text>
          </Section>

          <Section style={sectionStyle}>
            <Text style={subheadingStyle}>Résultats</Text>
            <Text style={scoreStyle}>
              <strong>Score total:</strong> {scoreDetails.total}/{maxTotal}
            </Text>
            {scoreDetails.anxiety !== undefined && (
              <Text style={scoreStyle}>
                <strong>Score d'anxiété:</strong> {scoreDetails.anxiety}/
                {maxAnxiety}
              </Text>
            )}
            {scoreDetails.avoidance !== undefined && (
              <Text style={scoreStyle}>
                <strong>Score d'évitement:</strong> {scoreDetails.avoidance}/
                {maxAvoidance}
              </Text>
            )}
            <Text style={interpretationStyle}>
              <strong>Interprétation:</strong> {scoreDetails.interpretation}
            </Text>
          </Section>

          <Section style={sectionStyle}>
            <Text style={subheadingStyle}>Réponses Détaillées</Text>
            <Text style={responsesStyle}></Text>
          </Section>

          {patientComments && (
            <Section style={sectionStyle}>
              <Text style={subheadingStyle}>Commentaires Additionnels</Text>
              <Text style={commentsStyle}>{patientComments}</Text>
            </Section>
          )}

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

const subheadingStyle = {
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "15px",
  borderBottom: "1px solid #e6ebf1",
  paddingBottom: "8px",
};

const hrStyle = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const sectionStyle = {
  backgroundColor: "#ffffff",
  padding: "20px 30px",
  borderRadius: "5px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
};

const textStyle = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "10px",
};

const scoreStyle = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "10px",
  fontWeight: "bold",
};

const interpretationStyle = {
  color: "#2563eb",
  fontSize: "16px",
  lineHeight: "24px",
  marginTop: "15px",
  padding: "10px",
  backgroundColor: "#eff6ff",
  borderRadius: "5px",
  borderLeft: "4px solid #2563eb",
};

const responsesStyle = {
  color: "#333",
  fontSize: "14px",
  lineHeight: "20px",
  fontFamily: "monospace",
  whiteSpace: "pre-wrap" as const,
  backgroundColor: "#f8fafc",
  padding: "15px",
  borderRadius: "5px",
  overflowX: "auto" as const,
};

const commentsStyle = {
  color: "#333",
  fontSize: "15px",
  lineHeight: "22px",
  fontStyle: "italic",
  padding: "10px",
  backgroundColor: "#f8fafc",
  borderRadius: "5px",
};

const footerStyle = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  margin: "20px 0",
};
