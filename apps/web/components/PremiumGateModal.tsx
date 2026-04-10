"use client";

import { usePremiumGate } from "@/app/context/PremiumGateContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Interfaces } from "doodle-icons";

export function PremiumGateModal() {
  const { isOpen, closePremiumGate, gateType, currentCount, maxCount, featureName } = usePremiumGate();

  const isPatientLimit = gateType === "patient_limit";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closePremiumGate()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Interfaces.Star className="h-5 w-5 text-primary" />
            {isPatientLimit ? "Limite atteinte" : "Fonctionnalité Premium"}
          </DialogTitle>
          <DialogDescription>
            {isPatientLimit
              ? `Vous avez atteint la limite de ${maxCount} patients du plan gratuit`
              : `${featureName} est une fonctionnalité réservée aux abonnés Premium`}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {isPatientLimit && (
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center">
                  <span className="text-2xl font-bold">{currentCount}/{maxCount}</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3 mb-6">
            <p className="text-sm text-center text-muted-foreground">
              Passez à Premium pour débloquer :
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <Interfaces.Tick className="h-4 w-4 text-primary" />
                Patients illimités
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Interfaces.Tick className="h-4 w-4 text-primary" />
                Archivage des patients
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Interfaces.Tick className="h-4 w-4 text-primary" />
                Export PDF des résultats
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Interfaces.Tick className="h-4 w-4 text-primary" />
                Support prioritaire
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <Button className="w-full" size="lg">
              <Interfaces.Star className="mr-2 h-4 w-4" />
              Passer à Premium
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={closePremiumGate}
            >
              Rester en gratuit
            </Button>
          </div>
        </div>

        {isPatientLimit && (
          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground text-center">
              Vous pouvez aussi libérer de la place en supprimant des patients existants.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
