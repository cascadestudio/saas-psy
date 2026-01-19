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
import { ScaleProps } from "@/app/types";

export default function BaseQuestionnaire({
  scale,
  psychologistEmail,
  patientFirstname,
  patientLastname,
  children,
  isPreview = false,
  onSubmit,
}: ScaleProps) {
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
    const { patientComments: _, ...scaleAnswers } = formEntries;

    // Convert string values to numbers where applicable
    const responses: Record<string, any> = {};
    for (const [key, value] of Object.entries(scaleAnswers)) {
      const numValue = Number(value);
      responses[key] = isNaN(numValue) ? value : numValue;
    }

    try {
      // If custom submit handler provided (session mode), use it
      if (onSubmit) {
        await onSubmit(responses, patientComments);
        return;
      }

      // Default behavior: send via email API
      const submissionData = {
        scaleId: scale.id,
        scaleTitle: scale.title,
        patientFirstname,
        patientLastname,
        psychologistEmail,
        scaleAnswers: scaleAnswers,
        patientComments,
      };

      const response = await fetch("/scale/api/submit-scale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit scale");
      }

      setIsSubmitted(true);
      toast.success("Échelle envoyée avec succès.");
    } catch (error) {
      console.error("Error submitting scale:", error);
      toast.error("Une erreur est survenue lors de l'envoi de l'échelle.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && !isPreview) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Échelle envoyée avec succès</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Merci d'avoir complété cette échelle. Vos réponses ont bien été
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
            Bonjour {patientFirstname} {patientLastname}, veuillez répondre à cette
            échelle
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Les réponses de cette échelle seront uniquement visibles par
            votre psychologue.
          </p>
        </CardHeader>
        <form ref={formRef} onSubmit={handleSubmit}>
          <CardContent>
            <p className=" mb-8">
              {scale.instructions ||
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
