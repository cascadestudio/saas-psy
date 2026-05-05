"use client";

import { useState } from "react";
import Link from "next/link";
import { Interfaces } from "doodle-icons";
import { useAuthGate } from "@/app/context/AuthGateContext";
import { useUser } from "@/app/context/UserContext";
import { api, ApiError } from "@/lib/api-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage, Message } from "@/components/form-message";

type Mode = "signup" | "signin";

export function AuthGateModal() {
  const { isOpen, closeAuthGate, executePendingAction, reason } =
    useAuthGate();
  const { login, refreshUser } = useUser();
  const [mode, setMode] = useState<Mode>("signup");

  const handleSuccess = () => {
    refreshUser();
    executePendingAction();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeAuthGate();
      setMode("signup");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="px-6 pt-6 pb-2">
          <DialogHeader className="space-y-2">
            <DialogTitle className="font-gelica text-2xl leading-tight">
              {mode === "signup"
                ? reason || "Créez votre compte Melya"
                : "Bon retour !"}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {mode === "signup"
                ? "Gratuit. Aucune carte bancaire requise."
                : "Connectez-vous pour reprendre votre travail."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6">
          {mode === "signup" ? (
            <SignUpForm onSuccess={handleSuccess} login={login} />
          ) : (
            <SignInForm onSuccess={handleSuccess} login={login} />
          )}

          <p className="mt-3 text-xs text-muted-foreground">
            <span className="text-primary">*</span> Champs obligatoires
          </p>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "signup" ? (
              <>
                Déjà un compte ?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="text-primary font-medium hover:underline"
                >
                  Se connecter
                </button>
              </>
            ) : (
              <>
                Pas encore de compte ?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-primary font-medium hover:underline"
                >
                  Créer un compte
                </button>
              </>
            )}
          </p>
        </div>

        <div className="border-t bg-muted/30 px-6 py-3">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <Interfaces.Gift className="h-3.5 w-3.5" />
              Gratuit
            </li>
            <li className="flex items-center gap-1.5">
              <Interfaces.Shield className="h-3.5 w-3.5" />
              Hébergement HDS
            </li>
            <li className="flex items-center gap-1.5">
              <Interfaces.Lock className="h-3.5 w-3.5" />
              Données chiffrées
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SignInForm({
  onSuccess,
  login,
}: {
  onSuccess: () => void;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
}) {
  const { closeAuthGate } = useAuthGate();
  const [message, setMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setMessage({ error: "L'email et le mot de passe sont requis" });
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        onSuccess();
      } else {
        setMessage({
          error: result.error || "Email ou mot de passe incorrect",
        });
      }
    } catch {
      setMessage({ error: "Une erreur est survenue" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">
          Email <span className="text-primary">*</span>
        </Label>
        <Input
          id="signin-email"
          name="email"
          type="email"
          placeholder="vous@exemple.com"
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="signin-password">
            Mot de passe <span className="text-primary">*</span>
          </Label>
          <Link
            href="/forgot-password"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
            onClick={closeAuthGate}
          >
            Oublié ?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="signin-password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Votre mot de passe"
            required
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            {showPassword ? (
              <Interfaces.Hide className="h-4 w-4" />
            ) : (
              <Interfaces.Unhide className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <SubmitButton
        pendingText="Connexion..."
        isLoading={isLoading}
        className="w-full"
      >
        Se connecter
      </SubmitButton>

      {message && <FormMessage message={message} />}
    </form>
  );
}

function SignUpForm({
  onSuccess,
  login,
}: {
  onSuccess: () => void;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
}) {
  const [message, setMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    if (!email || !password) {
      setMessage({ error: "L'email et le mot de passe sont requis" });
      setIsLoading(false);
      return;
    }

    try {
      await api.auth.register({ email, password, firstName, lastName });
      const loginResult = await login(email, password);
      if (loginResult.success) {
        onSuccess();
      } else {
        setMessage({ error: "Inscription réussie, mais erreur de connexion" });
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setMessage({ error: error.message });
      } else {
        setMessage({ error: "Une erreur est survenue lors de l'inscription" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-firstName">Prénom</Label>
        <Input id="signup-firstName" name="firstName" placeholder="Jean" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-lastName">Nom</Label>
        <Input id="signup-lastName" name="lastName" placeholder="Dupont" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">
          Email <span className="text-primary">*</span>
        </Label>
        <Input
          id="signup-email"
          name="email"
          type="email"
          placeholder="vous@exemple.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">
          Mot de passe <span className="text-primary">*</span>
        </Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Minimum 8 caractères"
            minLength={8}
            required
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            {showPassword ? (
              <Interfaces.Hide className="h-4 w-4" />
            ) : (
              <Interfaces.Unhide className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <SubmitButton
        pendingText="Création du compte..."
        isLoading={isLoading}
        className="w-full"
      >
        Créer mon compte
      </SubmitButton>

      {message && <FormMessage message={message} />}
    </form>
  );
}
