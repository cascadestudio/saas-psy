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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type QuestionnaireFormProps = {
  questionnaire: {
    id: number;
    title: string;
    description: string;
    category: string;
    questions: number;
    estimatedTime: string;
    longDescription: string;
    sampleQuestions: string[];
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

    // This is a placeholder for the actual submission logic
    // You'll implement this later
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
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
            {/* This is a minimalist form with just a few example fields */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">1. Téléphoner en public (P)</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Entrez votre nom"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  2. Participer au sein d'un petit groupe (P)
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Entrez votre email"
                />
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

              <p className="text-sm text-muted-foreground italic">
                Note: Ceci est une version minimaliste du formulaire. Les
                questions spécifiques seront implémentées ultérieurement.
              </p>
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
