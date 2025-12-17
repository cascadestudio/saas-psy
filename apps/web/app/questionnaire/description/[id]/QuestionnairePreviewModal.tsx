"use client";

import { useState, useRef } from "react";
import { Interfaces } from "doodle-icons";
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
import { Card } from "@/components/ui/card";
import { QuestionnaireProps } from "@/app/types";
import { EmailDialogForm } from "./EmailDialogForm";
import QuestionnaireFactory from "@/app/questionnaire/[id]/components/QuestionnaireFactory";

interface QuestionnairePreviewModalProps {
  questionnaire: {
    id: string;
    title: string;
    description: string;
    category: string;
    questions: any[]; // Using any type to accommodate all question formats
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
}

export function QuestionnairePreviewModal({
  questionnaire,
}: QuestionnairePreviewModalProps) {
  const [open, setOpen] = useState(false);
  const emailButtonRef = useRef<HTMLButtonElement>(null);

  // Create dummy props for preview mode
  const previewProps: QuestionnaireProps = {
    questionnaire: questionnaire,
    psychologistEmail: "preview@example.com",
    patientFirstname: "[Prénom]",
    patientLastname: "[Nom]",
    children: undefined,
    // Add a preview flag to disable actual form submission
    isPreview: true,
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

  return (
    <>
      {/* Hidden email form button to click programmatically */}
      <div className="hidden">
        <EmailDialogForm ref={emailButtonRef} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4">
            <Interfaces.Unhide className="mr-2 h-4 w-4" />
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
            <div className="preview-container">
              <QuestionnaireFactory {...previewProps} />
            </div>
          </div>

          <div className="flex justify-between">
            <DialogClose asChild>
              <Button variant="outline">Fermer</Button>
            </DialogClose>
            <Button onClick={handleSendClick}>
              <Interfaces.Send className="mr-2 h-4 w-4" />
              Envoyer au Patient
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
