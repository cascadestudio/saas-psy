"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage, Message } from "@/components/form-message";
import Link from "next/link";

export function SignUpForm() {
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
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    if (!email || !password) {
      setMessage({ error: "L'email et le mot de passe sont requis" });
      setIsLoading(false);
      return;
    }

    try {
      await api.auth.register({
        email,
        password,
        firstName,
        lastName,
      });
      setMessage({
        success: "Inscription réussie ! Redirection vers la connexion...",
      });
      setTimeout(() => {
        router.push("/sign-in");
      }, 1500);
    } catch (error) {
      if (error instanceof ApiError) {
        setMessage({ error: error.message });
      } else {
        setMessage({ error: "Une erreur est survenue lors de l'inscription" });
      }
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col min-w-64 max-w-64 mx-auto"
    >
      <h1 className="text-2xl font-medium">S'inscrire</h1>
      <p className="text-sm text text-foreground">
        Vous avez déjà un compte ?{" "}
        <Link className="text-primary font-medium underline" href="/sign-in">
          Se connecter
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="firstName">Prénom</Label>
        <Input name="firstName" placeholder="Jean" />
        <Label htmlFor="lastName">Nom</Label>
        <Input name="lastName" placeholder="Dupont" />
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" placeholder="you@example.com" required />
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          type="password"
          name="password"
          placeholder="Votre mot de passe"
          minLength={6}
          required
        />
        <SubmitButton pendingText="Inscription..." isLoading={isLoading}>
          S'inscrire
        </SubmitButton>
        {message && <FormMessage message={message} />}
      </div>
    </form>
  );
}

