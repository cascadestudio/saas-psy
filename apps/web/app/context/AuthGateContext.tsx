"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type OpenAuthGateOptions = {
  onSuccess?: () => void;
  reason?: string;
};

type AuthGateContextType = {
  isOpen: boolean;
  pendingAction: (() => void) | null;
  reason: string | null;
  openAuthGate: (
    optionsOrOnSuccess?: OpenAuthGateOptions | (() => void)
  ) => void;
  closeAuthGate: () => void;
  executePendingAction: () => void;
};

const AuthGateContext = createContext<AuthGateContextType | undefined>(
  undefined
);

export function AuthGateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [reason, setReason] = useState<string | null>(null);

  const openAuthGate = useCallback(
    (optionsOrOnSuccess?: OpenAuthGateOptions | (() => void)) => {
      if (typeof optionsOrOnSuccess === "function") {
        setPendingAction(() => optionsOrOnSuccess);
        setReason(null);
      } else {
        setPendingAction(() => optionsOrOnSuccess?.onSuccess || null);
        setReason(optionsOrOnSuccess?.reason ?? null);
      }
      setIsOpen(true);
    },
    []
  );

  const closeAuthGate = useCallback(() => {
    setIsOpen(false);
    setPendingAction(null);
    setReason(null);
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
        reason,
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
