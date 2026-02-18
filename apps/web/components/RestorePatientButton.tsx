"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { patientsApi, type Patient } from "@/lib/api-client";
import { Interfaces } from "doodle-icons";
import { useUser } from "@/app/context/UserContext";
import { usePremiumGate } from "@/app/context/PremiumGateContext";

interface RestorePatientButtonProps {
  patient: Patient;
  onRestored?: () => void;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export function RestorePatientButton({
  patient,
  onRestored,
  variant = "outline",
  size = "sm",
}: RestorePatientButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { openPremiumFeatureGate } = usePremiumGate();

  const handleRestore = async () => {
    // Check premium status
    if (!user?.isPremium) {
      openPremiumFeatureGate("La restauration des patients");
      return;
    }

    setIsLoading(true);
    try {
      await patientsApi.restore(patient.id);
      onRestored?.();
    } catch (error) {
      console.error("Error restoring patient:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleRestore}
      disabled={isLoading}
    >
      <Interfaces.Sync className="mr-2 h-4 w-4" />
      {isLoading ? "Restauration..." : "Restaurer"}
    </Button>
  );
}
