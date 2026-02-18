"use client";

import { useState } from "react";
import Link from "next/link";
import { authApi } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);

    try {
      await authApi.resetPassword(token, newPassword);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Mot de passe mis à jour</h1>
          <p className="text-gray-500">
            Votre mot de passe a été réinitialisé avec succès.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            Vous pouvez maintenant vous reconnecter avec votre nouveau mot de passe.
          </p>
        </div>

        <Link href="/dashboard?login=true" className="block mt-2">
          <Button className="w-full">
            Se reconnecter
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Nouveau mot de passe</h1>
        <p className="text-gray-500">
          Choisissez un nouveau mot de passe pour votre compte.
        </p>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="newPassword">Nouveau mot de passe</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Au moins 8 caractères"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength={8}
          />
          <p className="text-xs text-muted-foreground">
            Minimum 8 caractères
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Retapez votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength={8}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Mise à jour..." : "Réinitialiser le mot de passe"}
        </Button>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:underline"
          >
            Retour à l'application
          </Link>
        </div>
      </div>
    </form>
  );
}
