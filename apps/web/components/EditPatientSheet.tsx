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
import { patientsApi, ApiError, type Patient } from "@/lib/api-client";
import { toast } from "sonner";

interface EditPatientSheetProps {
  patient: Patient;
  onPatientUpdated?: (patient: Patient) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditPatientSheet({
  patient,
  onPatientUpdated,
  open,
  onOpenChange,
}: EditPatientSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && isSubmitting) return;
    onOpenChange(newOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      birthDate: (formData.get("birthDate") as string) || undefined,
      notes: (formData.get("notes") as string) || undefined,
    };

    try {
      const { patient: updated } = await patientsApi.update(patient.id, data);

      toast.success("Patient modifié avec succès", {
        description: `${updated.firstName} ${updated.lastName} a été mis à jour`,
      });

      onOpenChange(false);
      onPatientUpdated?.(updated);
    } catch (error) {
      console.error("Error updating patient:", error);
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Erreur lors de la modification du patient");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format birthDate for input[type="date"] (YYYY-MM-DD)
  const formatBirthDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier le patient</DialogTitle>
          <DialogDescription>
            Modifiez les informations du patient.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="edit-email">Email *</Label>
            <Input
              id="edit-email"
              name="email"
              type="email"
              required
              autoFocus
              defaultValue={patient.email}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-firstName">Prénom</Label>
              <Input
                id="edit-firstName"
                name="firstName"
                defaultValue={patient.firstName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-lastName">Nom</Label>
              <Input
                id="edit-lastName"
                name="lastName"
                defaultValue={patient.lastName}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-birthDate">Date de naissance</Label>
            <Input
              id="edit-birthDate"
              name="birthDate"
              type="date"
              defaultValue={formatBirthDate(patient.birthDate)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-notes">Notes</Label>
            <Textarea
              id="edit-notes"
              name="notes"
              placeholder="Notes confidentielles sur le patient..."
              rows={3}
              defaultValue={patient.notes || ""}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
