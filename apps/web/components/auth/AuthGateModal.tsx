"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage, Message } from "@/components/form-message";

export function AuthGateModal() {
  const { isOpen, closeAuthGate, executePendingAction } = useAuthGate();
  const { login, refreshUser } = useUser();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeAuthGate()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connexion requise</DialogTitle>
          <DialogDescription>
            Créez un compte gratuit pour sauvegarder vos données
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Se connecter</TabsTrigger>
            <TabsTrigger value="signup">S'inscrire</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="mt-4">
            <SignInForm
              onSuccess={() => {
                refreshUser();
                executePendingAction();
              }}
              login={login}
            />
          </TabsContent>

          <TabsContent value="signup" className="mt-4">
            <SignUpForm
              onSuccess={() => {
                refreshUser();
                executePendingAction();
              }}
              login={login}
            />
          </TabsContent>
        </Tabs>

        <div className="border-t pt-4 mt-2">
          <p className="text-sm font-medium mb-2">Compte gratuit inclut :</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>&#10003; 5 patients</li>
            <li>&#10003; Scoring automatique</li>
            <li>&#10003; Historique illimité</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Embedded Sign In Form
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
        setMessage({ error: result.error || "Email ou mot de passe incorrect" });
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
        <Label htmlFor="signin-email">Email</Label>
        <Input
          id="signin-email"
          name="email"
          type="email"
          placeholder="vous@exemple.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signin-password">Mot de passe</Label>
        <Input
          id="signin-password"
          type="password"
          name="password"
          placeholder="Votre mot de passe"
          required
        />
        <Link
          href="/forgot-password"
          className="text-[11px] text-muted-foreground/60 hover:text-primary transition-colors w-fit"
          onClick={closeAuthGate}
        >
          Mot de passe oublié ?
        </Link>
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

// Embedded Sign Up Form
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
      // Register the user
      await api.auth.register({
        email,
        password,
        firstName,
        lastName,
      });

      // Auto-login after successful registration
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="signup-firstName">Prénom</Label>
          <Input id="signup-firstName" name="firstName" placeholder="Jean" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-lastName">Nom</Label>
          <Input id="signup-lastName" name="lastName" placeholder="Dupont" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          name="email"
          type="email"
          placeholder="vous@exemple.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">Mot de passe</Label>
        <Input
          id="signup-password"
          type="password"
          name="password"
          placeholder="Minimum 8 caractères"
          minLength={8}
          required
        />
      </div>

      <SubmitButton
        pendingText="Inscription..."
        isLoading={isLoading}
        className="w-full"
      >
        S'inscrire
      </SubmitButton>

      {message && <FormMessage message={message} />}
    </form>
  );
}
