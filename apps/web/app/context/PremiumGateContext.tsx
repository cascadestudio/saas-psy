"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type PremiumGateContextType = {
  isOpen: boolean;
  currentCount: number;
  maxCount: number;
  openPremiumGate: (currentCount: number) => void;
  closePremiumGate: () => void;
};

const FREE_TIER_PATIENT_LIMIT = 5;

const PremiumGateContext = createContext<PremiumGateContextType | undefined>(
  undefined
);

export function PremiumGateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);

  const openPremiumGate = useCallback((count: number) => {
    setCurrentCount(count);
    setIsOpen(true);
  }, []);

  const closePremiumGate = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <PremiumGateContext.Provider
      value={{
        isOpen,
        currentCount,
        maxCount: FREE_TIER_PATIENT_LIMIT,
        openPremiumGate,
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
