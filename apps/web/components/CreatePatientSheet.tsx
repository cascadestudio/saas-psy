"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { patientsApi, ApiError } from "@/lib/api-client";
import { toast } from "sonner";
import { Interfaces } from "doodle-icons";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { usePremiumGate, FREE_PATIENT_LIMIT } from "@/app/context/PremiumGateContext";

interface CreatePatientSheetProps {
  onPatientCreated?: (patientId: string) => void;
  buttonSize?: "sm" | "lg";
  buttonText?: string;
  currentPatientCount?: number;
}

export function CreatePatientSheet({
  onPatientCreated,
  buttonSize = "lg",
  buttonText = "Ajouter un patient",
  currentPatientCount = 0,
}: CreatePatientSheetProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { requireAuth } = useRequireAuth();
  const { openPatientLimitGate } = usePremiumGate();

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Check auth before opening the dialog
      if (!requireAuth(() => handleOpenChange(true))) {
        return; // Auth gate modal opened, action stored for later
      }

      // Check patient limit (only for authenticated users)
      if (currentPatientCount >= FREE_PATIENT_LIMIT) {
        openPatientLimitGate(currentPatientCount);
        return; // Premium gate modal opened
      }
    }
    setOpen(newOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const birthDate = formData.get("birthDate") as string;
    const notes = formData.get("notes") as string;

    try {
      const { patient } = await patientsApi.create({
        firstName: firstName || email.split("@")[0],
        lastName: lastName || "",
        email,
        birthDate: birthDate || undefined,
        notes: notes || undefined,
      });

      toast.success("Patient créé avec succès", {
        description: `${patient.firstName} ${patient.lastName} a été ajouté à votre liste`,
      });

      setIsSubmitting(false);
      setOpen(false);

      // Refresh patient list
      onPatientCreated?.(patient.id);
      return;
    } catch (error) {
      console.error("Error creating patient:", error);
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Erreur lors de la création du patient");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button size={buttonSize} onClick={() => handleOpenChange(true)}>
        <Interfaces.UserAdd className="mr-2 h-4 w-4" />
        {buttonText}
      </Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau patient</DialogTitle>
          <DialogDescription>
            Seul l'email est obligatoire. Les autres informations peuvent être ajoutées ultérieurement.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="patient@example.com"
              required
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Nécessaire pour l'envoi des questionnaires
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                Prénom
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Martin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Nom
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Dubois"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">
              Date de naissance
            </Label>
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">
              Notes
            </Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Notes confidentielles sur le patient..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Création..." : "Créer le patient"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
}
