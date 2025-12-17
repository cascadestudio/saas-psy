"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addPatient } from "@/data/mock-patients";
import { toast } from "sonner";
import { Interfaces } from "doodle-icons";

interface CreatePatientSheetProps {
  onPatientCreated?: (patientId: string) => void;
  buttonSize?: "sm" | "lg";
  buttonText?: string;
}

export function CreatePatientSheet({
  onPatientCreated,
  buttonSize = "lg",
  buttonText = "Ajouter un patient"
}: CreatePatientSheetProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const fullName = formData.get("fullName") as string;
    const birthDate = formData.get("birthDate") as string;
    const notes = formData.get("notes") as string;

    // Calculate age from birth date
    let age = 0;
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        age--;
      }
    }

    try {
      const newPatient = addPatient({
        fullName: fullName || email.split("@")[0],
        initials: fullName
          ? fullName.split(" ").map(n => n[0]).join(".") + "."
          : email.split("@")[0].substring(0, 2).toUpperCase() + ".",
        email,
        age,
        birthDate: birthDate || undefined,
        notes: notes || undefined,
      });

      toast.success("Patient créé avec succès", {
        description: `${newPatient.fullName} a été ajouté à votre liste`,
      });

      setOpen(false);
      e.currentTarget.reset();

      // Callback with new patient ID
      if (onPatientCreated) {
        onPatientCreated(newPatient.id);
      }
    } catch (error) {
      toast.error("Erreur lors de la création du patient");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={buttonSize}>
          <Interfaces.UserAdd className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
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

          <div className="space-y-2">
            <Label htmlFor="fullName">
              Nom complet
            </Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Martin Dubois"
            />
            <p className="text-xs text-muted-foreground">
              Optionnel - peut être ajouté plus tard
            </p>
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
  );
}
