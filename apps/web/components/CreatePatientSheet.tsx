"use client";

import { useState, useRef } from "react";
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
import { useUser } from "@/app/context/UserContext";
import { useAuthGate } from "@/app/context/AuthGateContext";
import { usePremiumGate, FREE_PATIENT_LIMIT } from "@/app/context/PremiumGateContext";

interface CreatePatientSheetProps {
  onPatientCreated?: (patientId: string) => void;
  buttonSize?: "sm" | "lg";
  buttonText?: string;
  buttonVariant?: "default" | "ghost" | "outline" | "secondary" | "destructive" | "link";
  buttonClassName?: string;
  iconOnly?: boolean;
  hideIcon?: boolean;
  currentPatientCount?: number;
}

interface PatientFormData {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  notes: string;
}

export function CreatePatientSheet({
  onPatientCreated,
  buttonSize = "lg",
  buttonText = "Ajouter un patient",
  buttonVariant = "default",
  buttonClassName,
  iconOnly = false,
  hideIcon = false,
  currentPatientCount = 0,
}: CreatePatientSheetProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const { openAuthGate } = useAuthGate();
  const { openPatientLimitGate } = usePremiumGate();
  const pendingFormDataRef = useRef<PatientFormData | null>(null);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && isSubmitting) return;
    setOpen(newOpen);
  };

  const handleOpen = () => {
    // Check patient limit only for authenticated users
    if (user && !user.isPremium && currentPatientCount >= FREE_PATIENT_LIMIT) {
      openPatientLimitGate(currentPatientCount);
      return;
    }
    setOpen(true);
  };

  const createPatient = async (data: PatientFormData) => {
    setIsSubmitting(true);
    setOpen(true);
    try {
      const { patient } = await patientsApi.create({
        firstName: data.firstName || data.email.split("@")[0],
        lastName: data.lastName || "",
        email: data.email,
        birthDate: data.birthDate || undefined,
        notes: data.notes || undefined,
      });

      toast.success("Patient créé avec succès", {
        description: `${patient.firstName} ${patient.lastName} a été ajouté à votre liste`,
      });

      setIsSubmitting(false);
      setOpen(false);
      pendingFormDataRef.current = null;
      onPatientCreated?.(patient.id);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: PatientFormData = {
      email: formData.get("email") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      birthDate: formData.get("birthDate") as string,
      notes: formData.get("notes") as string,
    };

    if (!user) {
      // Store form data and trigger auth gate
      pendingFormDataRef.current = data;
      setOpen(false);
      openAuthGate(() => {
        // After successful auth, create the patient automatically
        if (pendingFormDataRef.current) {
          createPatient(pendingFormDataRef.current);
        }
      });
      return;
    }

    // Check patient limit
    if (!user?.isPremium && currentPatientCount >= FREE_PATIENT_LIMIT) {
      openPatientLimitGate(currentPatientCount);
      return;
    }

    await createPatient(data);
  };

  return (
    <>
      <Button size={iconOnly ? "icon" : buttonSize} variant={buttonVariant} className={buttonClassName} onClick={handleOpen}>
        {!hideIcon && <Interfaces.UserAdd className={iconOnly ? "h-4 w-4" : "mr-2 h-4 w-4"} fill={iconOnly ? "#D6591F" : "#ffffff"} />}
        {!iconOnly && buttonText}
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
              defaultValue={pendingFormDataRef.current?.email}
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
                defaultValue={pendingFormDataRef.current?.firstName}
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
                defaultValue={pendingFormDataRef.current?.lastName}
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
              defaultValue={pendingFormDataRef.current?.birthDate}
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
              defaultValue={pendingFormDataRef.current?.notes}
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
