"use client";

import { useState, ReactNode, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { QuestionnaireResults } from "./QuestionnaireResults";
import DevTools from "./DevTools";
export type QuestionnaireProps = {
  questionnaire: {
    id: string;
    title: string;
    description: string;
    category: string;
    questions: string[];
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

export default function BaseQuestionnaire({
  questionnaire,
  psychologistEmail,
  patientFirstname,
  patientLastname,
  children,
}: QuestionnaireProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());

    const scoreDetails = {
      total: 0,
      interpretation: "",
    };

    const submissionData = {
      questionnaireId: questionnaire.id,
      questionnaireTitle: questionnaire.title,
      patientFirstname,
      patientLastname,
      psychologistEmail,
      formData: formEntries,
      scoreDetails,
    };

    try {
      const response = await fetch("/questionnaire/api/submit-questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit questionnaire");
      }

      setSubmissionData(submissionData);
      setIsSubmitted(true);
      toast.success("Questionnaire envoyé avec succès.");
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      toast.error("Une erreur est survenue lors de l'envoi du questionnaire.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Questionnaire envoyé avec succès</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Merci d'avoir complété ce questionnaire. Vos réponses ont été
              enregistrées.
            </p>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Bonjour {patientFirstname} {patientLastname}, veuillez répondre à ce
            questionnaire
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Les réponses de ce questionnaire seront uniquement visibles par
            votre psychologue.
          </p>
        </CardHeader>
        <form ref={formRef} onSubmit={handleSubmit}>
          <CardContent>
            {children || (
              <p>Veuillez utiliser un composant de questionnaire spécifique.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Envoi en cours..." : "Soumettre"}
            </Button>
            <DevTools
              formRef={formRef}
              questionnaireData={{
                id: questionnaire.id,
                title: questionnaire.title,
              }}
              patientInfo={{
                firstname: patientFirstname,
                lastname: patientLastname,
                psychologistEmail: psychologistEmail,
              }}
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
