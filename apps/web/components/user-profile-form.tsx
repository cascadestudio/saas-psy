"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useUser } from "@/app/context/UserContext";

interface UserProfileFormProps {
  user: User;
}

export function UserProfileForm({ user }: UserProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(user.email || "");
  const { refreshUser } = useUser();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ email });

      if (error) {
        throw error;
      }

      toast.success("Profil mis à jour avec succès");
      refreshUser();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Échec de la mise à jour du profil");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="user-id">ID Utilisateur</Label>
        <Input id="user-id" value={user.id} disabled className="bg-muted" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="created-at">Compte créé le</Label>
        <Input
          id="created-at"
          value={new Date(user.created_at).toLocaleString()}
          disabled
          className="bg-muted"
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Mise à jour..." : "Mettre à jour le profil"}
      </Button>
    </form>
  );
}
