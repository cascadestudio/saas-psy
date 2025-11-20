"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage, Message } from "@/components/form-message";
import Link from "next/link";

export function SignInForm() {
  const router = useRouter();
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
      await api.auth.login(email, password);
      router.push("/");
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError) {
        setMessage({ error: error.message });
      } else {
        setMessage({ error: "Email ou mot de passe incorrect" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col min-w-64 max-w-64 mx-auto"
    >
      <h1 className="text-2xl font-medium">Se connecter</h1>
      <p className="text-sm text-foreground">
        Vous n'avez pas de compte ?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          S'inscrire
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Mot de passe</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Votre mot de passe"
          required
        />
        <SubmitButton pendingText="Connexion..." isLoading={isLoading}>
          Se connecter
        </SubmitButton>
        {message && <FormMessage message={message} />}
      </div>
    </form>
  );
}

