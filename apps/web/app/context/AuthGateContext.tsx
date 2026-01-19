"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type AuthGateContextType = {
  isOpen: boolean;
  pendingAction: (() => void) | null;
  openAuthGate: (onSuccess?: () => void) => void;
  closeAuthGate: () => void;
  executePendingAction: () => void;
};

const AuthGateContext = createContext<AuthGateContextType | undefined>(
  undefined
);

export function AuthGateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const openAuthGate = useCallback((onSuccess?: () => void) => {
    setPendingAction(() => onSuccess || null);
    setIsOpen(true);
  }, []);

  const closeAuthGate = useCallback(() => {
    setIsOpen(false);
    setPendingAction(null);
  }, []);

  const executePendingAction = useCallback(() => {
    if (pendingAction) {
      pendingAction();
    }
    closeAuthGate();
  }, [pendingAction, closeAuthGate]);

  return (
    <AuthGateContext.Provider
      value={{
        isOpen,
        pendingAction,
        openAuthGate,
        closeAuthGate,
        executePendingAction,
      }}
    >
      {children}
    </AuthGateContext.Provider>
  );
}

export function useAuthGate() {
  const context = useContext(AuthGateContext);
  if (!context) {
    throw new Error("useAuthGate must be used within AuthGateProvider");
  }
  return context;
}
