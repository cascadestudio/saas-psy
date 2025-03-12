"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type QuestionnaireFormProps = {
  questionnaire: {
    id: number;
    title: string;
    description: string;
    category: string;
    questions: string[];
    estimatedTime: string;
    longDescription: string;
    answerScales?: {
      anxiety: { value: number; label: string }[];
      avoidance: { value: number; label: string }[];
    };
    scoring?: {
      ranges: { min: number; max: number; interpretation: string }[];
      method: string;
    };
  } | null;
};

export default function QuestionnaireForm({
  questionnaire,
}: QuestionnaireFormProps) {
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
            Bonjour Jean-Pierre, veuillez répondre à ce questionnaire
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Les réponses de ce questionnaire seront uniquement visibles par
            votre psychologue.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="border-t pt-4">
                <h3 className="font-medium text-lg mb-4">Instructions</h3>
                <p className="mb-4">
                  Ce questionnaire évalue deux aspects de l'anxiété sociale :
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>
                    <strong>Peur/Anxiété</strong> : Le niveau d'anxiété que vous
                    ressentez dans chaque situation
                  </li>
                  <li>
                    <strong>Évitement</strong> : La fréquence à laquelle vous
                    évitez chaque situation
                  </li>
                </ul>
                <p className="mb-4">
                  Pour chaque situation, veuillez évaluer à la fois votre niveau
                  d'anxiété et votre fréquence d'évitement.
                </p>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div></div>
                  <div className="text-center font-medium">Peur/Anxiété</div>
                  <div className="text-center font-medium">Évitement</div>
                </div>

                {questionnaire.questions.map((question, index) => (
                  <div key={index} className="border-t pt-4 pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                      <div className="font-medium">
                        {index + 1}. {question}
                      </div>

                      <div>
                        <RadioGroup
                          name={`anxiety_${index}`}
                          required
                          className="space-y-1"
                        >
                          {questionnaire.answerScales?.anxiety.map((scale) => (
                            <div
                              key={scale.value}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={scale.value.toString()}
                                id={`anxiety_${index}_${scale.value}`}
                              />
                              <Label
                                htmlFor={`anxiety_${index}_${scale.value}`}
                                className="text-sm"
                              >
                                {scale.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <RadioGroup
                          name={`avoidance_${index}`}
                          required
                          className="space-y-1"
                        >
                          {questionnaire.answerScales?.avoidance.map(
                            (scale) => (
                              <div
                                key={scale.value}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={scale.value.toString()}
                                  id={`avoidance_${index}_${scale.value}`}
                                />
                                <Label
                                  htmlFor={`avoidance_${index}_${scale.value}`}
                                  className="text-sm"
                                >
                                  {scale.label}
                                </Label>
                              </div>
                            )
                          )}
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Commentaires additionnels</Label>
                <Textarea
                  id="comments"
                  name="comments"
                  placeholder="Ajoutez des commentaires si nécessaire"
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <CardFooter className="px-0 pt-6">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? "Envoi en cours..."
                  : "Soumettre le questionnaire"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
