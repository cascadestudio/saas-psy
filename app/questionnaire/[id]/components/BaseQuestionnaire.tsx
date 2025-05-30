"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { QuestionnaireProps } from "@/app/types";

export default function BaseQuestionnaire({
  questionnaire,
  psychologistEmail,
  patientFirstname,
  patientLastname,
  children,
  isPreview = false,
}: QuestionnaireProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());

    // Extract patientComments and remove it from formEntries
    const patientComments = formEntries.patientComments as string;
    const { patientComments: _, ...questionnaireAnswers } = formEntries;

    const submissionData = {
      questionnaireId: questionnaire.id,
      questionnaireTitle: questionnaire.title,
      patientFirstname,
      patientLastname,
      psychologistEmail,
      questionnaireAnswers: questionnaireAnswers,
      patientComments,
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

      setIsSubmitted(true);
      toast.success("Questionnaire envoyé avec succès.");
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      toast.error("Une erreur est survenue lors de l'envoi du questionnaire.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && !isPreview) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Questionnaire envoyé avec succès</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Merci d’avoir complété ce questionnaire. Vos réponses ont bien été
              transmises à votre praticien.
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
            <p className=" mb-8">
              {questionnaire.instructions ||
                "Évaluez l'intensité de vos symptômes pour chaque situation"}
            </p>
            {children}
            {!isPreview && (
              <div className="mt-6 space-y-2">
                <h3 className="text-md font-medium">
                  Commentaires additionnels
                </h3>
                <textarea
                  name="patientComments"
                  className="w-full min-h-[120px] p-3 border rounded-md"
                  placeholder="Si vous souhaitez ajouter des commentaires ou des précisions, vous pouvez les écrire ici..."
                />
              </div>
            )}
          </CardContent>
          {!isPreview && (
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours..." : "Soumettre"}
              </Button>
            </CardFooter>
          )}
        </form>
      </Card>
    </div>
  );
}
