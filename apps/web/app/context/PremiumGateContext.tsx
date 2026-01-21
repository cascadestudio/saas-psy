"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type GateType = "patient_limit" | "premium_feature";

type PremiumGateContextType = {
  isOpen: boolean;
  gateType: GateType;
  currentCount: number;
  maxCount: number;
  featureName: string;
  openPatientLimitGate: (currentCount: number) => void;
  openPremiumFeatureGate: (featureName: string) => void;
  closePremiumGate: () => void;
};

const FREE_TIER_PATIENT_LIMIT = 5;

const PremiumGateContext = createContext<PremiumGateContextType | undefined>(
  undefined
);

export function PremiumGateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [gateType, setGateType] = useState<GateType>("patient_limit");
  const [currentCount, setCurrentCount] = useState(0);
  const [featureName, setFeatureName] = useState("");

  const openPatientLimitGate = useCallback((count: number) => {
    setGateType("patient_limit");
    setCurrentCount(count);
    setIsOpen(true);
  }, []);

  const openPremiumFeatureGate = useCallback((feature: string) => {
    setGateType("premium_feature");
    setFeatureName(feature);
    setIsOpen(true);
  }, []);

  const closePremiumGate = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <PremiumGateContext.Provider
      value={{
        isOpen,
        gateType,
        currentCount,
        maxCount: FREE_TIER_PATIENT_LIMIT,
        featureName,
        openPatientLimitGate,
        openPremiumFeatureGate,
        closePremiumGate,
      }}
    >
      {children}
    </PremiumGateContext.Provider>
  );
}

export function usePremiumGate() {
  const context = useContext(PremiumGateContext);
  if (!context) {
    throw new Error("usePremiumGate must be used within PremiumGateProvider");
  }
  return context;
}

export const FREE_PATIENT_LIMIT = FREE_TIER_PATIENT_LIMIT;
