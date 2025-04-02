"use client";

import { useState, useRef } from "react";
import { Eye, ChevronDown, ChevronUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QuestionGroup } from "@/app/types";
import { EmailDialogForm } from "./EmailDialogForm";

interface QuestionnairePreviewModalProps {
  questionnaire: {
    id: string;
    title: string;
    description: string;
    category: string;
    questions: (string | QuestionGroup)[];
    estimatedTime: string;
    longDescription: string;
    answerScales: {
      anxiety?: { value: number; label: string }[];
      avoidance?: { value: number; label: string }[];
      intensity?: { value: number; label: string }[];
    };
  };
}

export function QuestionnairePreviewModal({
  questionnaire,
}: QuestionnairePreviewModalProps) {
  const [open, setOpen] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const emailButtonRef = useRef<HTMLButtonElement>(null);

  // Get the first answer scale available
  const getAnswerScale = () => {
    if (questionnaire.answerScales.intensity)
      return questionnaire.answerScales.intensity;
    if (questionnaire.answerScales.anxiety)
      return questionnaire.answerScales.anxiety;
    if (questionnaire.answerScales.avoidance)
      return questionnaire.answerScales.avoidance;
    return [
      { value: 1, label: "Pas du tout" },
      { value: 2, label: "Un peu" },
      { value: 3, label: "Modérément" },
      { value: 4, label: "Beaucoup" },
    ];
  };

  const answerScale = getAnswerScale();

  // Get all the questions for the preview
  const getAllQuestions = () => {
    const allPreviewQuestions: string[] = [];
    const allQuestions = questionnaire.questions;

    for (const item of allQuestions) {
      if (typeof item === "string") {
        allPreviewQuestions.push(item);
      } else if ("items" in item) {
        allPreviewQuestions.push(...item.items);
      }
    }

    return allPreviewQuestions;
  };

  const handleSendClick = () => {
    // Close the preview modal first
    setOpen(false);

    // Slight delay to ensure the modal is closed before opening the email form
    setTimeout(() => {
      // Trigger the EmailDialogForm programmatically
      if (emailButtonRef.current) {
        emailButtonRef.current.click();
      }
    }, 100);
  };

  const allQuestions = getAllQuestions();
  const displayedQuestions = showAllQuestions
    ? allQuestions
    : allQuestions.slice(0, 3);

  return (
    <>
      {/* Hidden email form button to click programmatically */}
      <div className="hidden">
        <EmailDialogForm ref={emailButtonRef} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4">
            <Eye className="mr-2 h-4 w-4" />
            Aperçu du questionnaire
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Aperçu du questionnaire</DialogTitle>
            <DialogDescription>
              Voici un aperçu du questionnaire tel qu'il sera présenté au
              patient.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  Bonjour [Prénom] [Nom], veuillez répondre à ce questionnaire
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Les réponses de ce questionnaire seront uniquement visibles
                  par votre psychologue.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {displayedQuestions.map((question, index) => (
                    <div key={index} className="border p-4 rounded-md">
                      <h3 className="font-medium mb-4">
                        {index + 1}. {question}
                      </h3>
                      <div>
                        <RadioGroup name={`preview_${index}`}>
                          {answerScale.map((scale) => (
                            <div
                              key={scale.value}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                id={`preview_${index}_${scale.value}`}
                                value={scale.value.toString()}
                                disabled
                              />
                              <Label
                                htmlFor={`preview_${index}_${scale.value}`}
                              >
                                {scale.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  ))}

                  {allQuestions.length > 3 && (
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        onClick={() => setShowAllQuestions(!showAllQuestions)}
                        className="mt-2"
                      >
                        {showAllQuestions ? (
                          <>
                            <ChevronUp className="mr-2 h-4 w-4" />
                            Afficher moins de questions
                          </>
                        ) : (
                          <>
                            <ChevronDown className="mr-2 h-4 w-4" />
                            Afficher toutes les questions ({allQuestions.length}
                            )
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between">
            <DialogClose asChild>
              <Button variant="outline">Fermer</Button>
            </DialogClose>
            <Button onClick={handleSendClick}>
              <Send className="mr-2 h-4 w-4" />
              Envoyer au Patient
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
