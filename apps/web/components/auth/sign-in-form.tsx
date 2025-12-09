"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage, Message } from "@/components/form-message";

export function SignInForm() {
  const router = useRouter();
  const { login } = useUser();
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
        router.push("/dashboard");
        router.refresh();
      } else {
        setMessage({ error: result.error || "Email ou mot de passe incorrect" });
      }
    } catch (error) {
      setMessage({ error: "Une erreur est survenue" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-w-80 max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-8 border rounded-lg bg-card"
      >
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold">Connexion Démo</h1>
          <p className="text-sm text-muted-foreground">
            Prototype de démonstration SaaS Psy
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="demo@psychologue.fr"
              defaultValue="demo@psychologue.fr"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              type="password"
              name="password"
              placeholder="demo2025"
              defaultValue="demo2025"
              required
            />
          </div>

          <SubmitButton pendingText="Connexion..." isLoading={isLoading}>
            Se connecter
          </SubmitButton>

          {message && <FormMessage message={message} />}
        </div>

        <div className="border-t pt-4">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Identifiants de démo :</strong>
            <br />
            Email: demo@psychologue.fr
            <br />
            Mot de passe: demo2025
          </p>
        </div>
      </form>
    </div>
  );
}

