"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleSendClick = () => {
    setOpen(false);
    router.push(`/send-scale?scaleId=${scale.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Interfaces.Unhide className="mr-2 h-4 w-4" />
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
            <Button variant="outline">Fermer</Button>
          </DialogClose>
          <Button onClick={handleSendClick}>
            <Interfaces.Send className="mr-2 h-4 w-4" />
            Envoyer au patient
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
