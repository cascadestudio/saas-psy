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
  patientFirstname: string;
  patientLastname: string;
  patientEmail: string;
  psychologistEmail: string;
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
      patientFirstname: formData.get("patient-firstname") as string,
      patientLastname: formData.get("patient-lastname") as string,
      patientEmail: formData.get("patient-email") as string,
      psychologistEmail: formData.get("psychologist-email") as string,
      message: (formData.get("message") as string) || "",
    };

    try {
      const response = await fetch("/questionnaire/api/send-questionnaire", {
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
            Le questionnaire sera envoyé à l'adresse e-mail du patient. Vous
            recevrez un e-mail contenant les résultats du questionnaire lorsque
            le patient validera le questionnaire.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSendEmail}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patient-email">Votre email (psychologue)</Label>
              <Input
                id="psychologist-email"
                name="psychologist-email"
                type="email"
                placeholder="Entrez votre email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient-name">Prénom du Patient</Label>
              <Input
                id="patient-firstname"
                name="patient-firstname"
                placeholder="Entrez le prénom du patient"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient-name">Nom du Patient</Label>
              <Input
                id="patient-lastname"
                name="patient-lastname"
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
