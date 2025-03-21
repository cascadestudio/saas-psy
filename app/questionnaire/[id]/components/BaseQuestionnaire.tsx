"use client";

import { useState, ReactNode } from "react";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());

    // Calculate scores here based on your scoring logic
    const scoreDetails = {
      total: 0, // Calculate this based on your scoring method
      interpretation: "", // Set this based on the total score
      // Add anxiety and avoidance if needed
    };

    const submissionData = {
      questionnaireId: questionnaire.id,
      questionnaireTitle: questionnaire.title,
      patientFirstname,
      patientLastname,
      psychologistEmail,
      formData: formEntries,
      scoreDetails,
      // Add comments if needed
    };

    // Skip API call in development mode
    if (process.env.NODE_ENV === "development") {
      console.log("Dev mode: Skipping API call", submissionData);
      setSubmissionData(submissionData);
      setIsSubmitted(true);
      setIsSubmitting(false);
      toast.success("Questionnaire envoyé avec succès (mode développement)");
      return;
    }

    try {
      // Send the form data to our API endpoint
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
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      toast.error("Une erreur est survenue lors de l'envoi du questionnaire.");
    } finally {
      setIsSubmitting(false);
      toast.success("Questionnaire envoyé avec succès.");
    }
  };

  if (isSubmitted && submissionData) {
    return <QuestionnaireResults data={submissionData} />;
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
        <form onSubmit={handleSubmit}>
          <CardContent>
            {/* Render children (specific questionnaire content) if provided */}
            {children || (
              <p>Veuillez utiliser un composant de questionnaire spécifique.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Envoi en cours..." : "Soumettre"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
