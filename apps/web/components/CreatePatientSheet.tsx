"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
  buttonVariant?: "default" | "ghost" | "secondary" | "destructive" | "link" | "accent" | "success";
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

      setIsSubmitting(false);
      setOpen(false);
      pendingFormDataRef.current = null;
      onPatientCreated?.(patient.id);

      toast.success("Patient créé avec succès", {
        description: `${patient.firstName} ${patient.lastName} a été ajouté à votre liste`,
      });
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
      pendingFormDataRef.current = data;
      setOpen(false);
      openAuthGate(() => {
        if (pendingFormDataRef.current) {
          createPatient(pendingFormDataRef.current);
        }
      });
      return;
    }

    if (!user?.isPremium && currentPatientCount >= FREE_PATIENT_LIMIT) {
      openPatientLimitGate(currentPatientCount);
      return;
    }

    await createPatient(data);
  };

  return (
    <>
      <Button size={iconOnly ? "icon" : buttonSize} variant={buttonVariant} className={buttonClassName} onClick={handleOpen}>
        {!hideIcon && <Interfaces.UserAdd fill={iconOnly ? "#D6591F" : "#ffffff"} />}
        {!iconOnly && buttonText}
      </Button>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl flex flex-col gap-0 p-0 [&_label]:font-body"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="font-body">Ajouter un nouveau patient</SheetTitle>
            <SheetDescription>
              Seul l'email est obligatoire. Les autres informations peuvent être ajoutées ultérieurement.
            </SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
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
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Martin"
                    defaultValue={pendingFormDataRef.current?.firstName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Dubois"
                    defaultValue={pendingFormDataRef.current?.lastName}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Date de naissance</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  defaultValue={pendingFormDataRef.current?.birthDate}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Notes confidentielles sur le patient..."
                  rows={6}
                  defaultValue={pendingFormDataRef.current?.notes}
                />
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t bg-background">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Création..." : "Créer le patient"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
