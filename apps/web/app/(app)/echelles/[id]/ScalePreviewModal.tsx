"use client";

import { useState } from "react";
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
import ScalePreview from "./ScalePreview";
import { SendScaleSheet } from "@/components/SendScaleSheet";

interface ScalePreviewModalProps {
  scale: {
    id: string;
    title: string;
    description: string;
    category: string;
    questions: any[];
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

export function ScalePreviewModal({ scale }: ScalePreviewModalProps) {
  const [open, setOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);

  const handleSendClick = () => {
    setOpen(false);
    setSendOpen(true);
  };

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Interfaces.Unhide />
          Aperçu de l'échelle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Aperçu de l'échelle</DialogTitle>
          <DialogDescription>
            Voici un aperçu de l'échelle telle qu'elle sera présentée au patient.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <ScalePreview scale={scale} />
        </div>

        <div className="flex justify-between">
          <DialogClose asChild>
            <Button variant="secondary">Fermer</Button>
          </DialogClose>
          <Button onClick={handleSendClick}>
            <Interfaces.Send />
            Envoyer au patient
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    <SendScaleSheet
      open={sendOpen}
      onOpenChange={setSendOpen}
      defaultScaleIds={[scale.id]}
    />
    </>
  );
}
