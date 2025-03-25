import { ReactNode } from "react";

export type QuestionGroup = {
  title: string;
  items: string[];
};

export type QuestionnaireProps = {
  questionnaire: {
    id: string;
    title: string;
    description: string;
    category: string;
    questions: (string | QuestionGroup)[]; // Using the QuestionGroup type here
    estimatedTime: string;
    longDescription: string;
    answerScales: {
      anxiety?: { value: number; label: string }[];
      avoidance?: { value: number; label: string }[];
      intensity?: { value: number; label: string }[];
    };
    scoring?: {
      ranges: { min: number; max: number; interpretation: string }[];
      method: string;
    };
  };
  psychologistEmail: string;
  patientFirstname: string;
  patientLastname: string;
  children?: ReactNode;
};
