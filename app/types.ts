import { ReactNode } from "react";

export type QuestionGroup = {
  title: string;
  items: string[];
};

export type QuestionOption = {
  value: number;
  text: string;
};

export type BDIQuestion = {
  title: string;
  options: QuestionOption[];
};

export type LiebovitshQuestion = {
  title: string;
  options: QuestionOption[];
  category?: string;
};

export type BaseQuestion = {
  id: number;
  text: string;
  type: string;
};

export type QuestionnaireProps = {
  questionnaire: {
    id: string;
    title: string;
    description: string;
    instructions?: string;
    category: string;
    questions: (
      | string
      | QuestionGroup
      | BDIQuestion
      | LiebovitshQuestion
      | BaseQuestion
    )[];
    estimatedTime: string;
    longDescription: string;
    answerScales?: {
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
  isPreview?: boolean;
};
