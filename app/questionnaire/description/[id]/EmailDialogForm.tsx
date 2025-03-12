"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface EmailFormData {
  patientName: string;
  patientEmail: string;
  message: string;
}

export function EmailDialogForm() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const questionnaireId = params.id as string;

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: EmailFormData = {
      patientName: formData.get("patient-name") as string,
      patientEmail: formData.get("patient-email") as string,
      message: (formData.get("message") as string) || "",
    };

    try {
      const response = await fetch("/api/send-questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          questionnaireId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setIsEmailSent(true);
      setOpen(false);
      toast.success("Le questionnaire a été envoyé au patient avec succès.");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Échec de l'envoi du questionnaire. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Send className="mr-2 h-4 w-4" />
          Envoyer au Patient
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Envoyer le Questionnaire au Patient</DialogTitle>
          <DialogDescription>
            Le questionnaire sera envoyé à l'adresse e-mail du patient.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSendEmail}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patient-name">Nom du Patient</Label>
              <Input
                id="patient-name"
                name="patient-name"
                placeholder="Entrez le nom du patient"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient-email">Email du Patient</Label>
              <Input
                id="patient-email"
                name="patient-email"
                type="email"
                placeholder="Entrez l'email du patient"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">
                Message Supplémentaire (Optionnel)
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Ajoutez un message personnel au patient"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Envoi en cours..." : "Envoyer le Questionnaire"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
