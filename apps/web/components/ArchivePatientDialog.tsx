"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { patientsApi, type Patient } from "@/lib/api-client";
import { useUser } from "@/app/context/UserContext";
import { usePremiumGate } from "@/app/context/PremiumGateContext";

interface ArchivePatientDialogProps {
  patient: Patient;
  onArchived?: () => void;
  trigger?: React.ReactNode;
}

export function ArchivePatientDialog({
  patient,
  onArchived,
  trigger,
}: ArchivePatientDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { openPremiumFeatureGate } = usePremiumGate();

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && !user?.isPremium) {
      // User is not premium, show premium gate
      openPremiumFeatureGate("L'archivage des patients");
      return;
    }
    setOpen(newOpen);
  };

  const handleArchive = async () => {
    setIsLoading(true);
    try {
      await patientsApi.archive(patient.id);
      setOpen(false);
      onArchived?.();
    } catch (error) {
      console.error("Error archiving patient:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {trigger ? (
        <div onClick={() => handleOpenChange(true)}>{trigger}</div>
      ) : (
        <Button variant="outline" size="sm" onClick={() => handleOpenChange(true)}>
          Archiver
        </Button>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archiver ce patient ?</DialogTitle>
            <DialogDescription>
              <span className="font-medium text-foreground">
                {patient.firstName} {patient.lastName}
              </span>{" "}
              sera déplacé dans les archives. Les passations existantes seront
              conservées et resteront consultables.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button onClick={handleArchive} disabled={isLoading}>
              {isLoading ? "Archivage..." : "Archiver"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
