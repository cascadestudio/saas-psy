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

export type QuestionnaireProps = {
  questionnaire: {
    id: number;
    title: string;
    description: string;
    category: string;
    questions: string[];
    estimatedTime: string;
    longDescription: string;
    answerScales?: Record<string, { value: number; label: string }[]>;
    scoring?: {
      ranges: { min: number; max: number; interpretation: string }[];
      method: string;
    };
  } | null;
  psychologistEmail: string | null;
  patientFirstname: string | null;
  patientLastname: string | null;
  children?: ReactNode; // This allows passing rendered questions as children
};

export default function BaseQuestionnaire({
  questionnaire,
  psychologistEmail,
  patientFirstname,
  patientLastname,
  children, // Accept children for question rendering
}: QuestionnaireProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!questionnaire) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Questionnaire non trouvé</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Le questionnaire demandé n'existe pas ou a été supprimé.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());

    try {
      // Send the form data to our API endpoint
      const response = await fetch("/api/submit-questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionnaireId: questionnaire.id,
          questionnaireTitle: questionnaire.title,
          patientFirstname,
          patientLastname,
          psychologistEmail,
          formData: formEntries,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit questionnaire");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      // Handle error (you could add error state and display a message)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Merci pour votre participation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Votre questionnaire a été soumis avec succès.</p>
          </CardContent>
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
        <form onSubmit={handleSubmit}>
          <CardContent>
            {/* Render children (specific questionnaire content) if provided */}
            {children || (
              <p>Veuillez utiliser un composant de questionnaire spécifique.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Envoi en cours..." : "Soumettre"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
