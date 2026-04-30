"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { useAuthGate } from "@/app/context/AuthGateContext";
import { usersApi, ApiError } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user, isLoading, refreshUser, logout } = useUser();
  const { openAuthGate } = useAuthGate();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      openAuthGate();
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: (formData.get("firstName") as string) || undefined,
      lastName: (formData.get("lastName") as string) || undefined,
      email: (formData.get("email") as string) || undefined,
    };

    try {
      await usersApi.update(data);
      await refreshUser();
      toast.success("Profil mis à jour");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Erreur lors de la mise à jour");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await usersApi.delete();
      toast.success("Compte supprimé");
      logout();
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Erreur lors de la suppression du compte");
      }
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="font-gelica font-normal text-3xl">Paramètres</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="font-gelica font-normal text-3xl mb-8">Paramètres</h1>

      {!user && (
        <p className="mb-6 text-sm text-muted-foreground">
          Vous n'êtes pas connecté. Les valeurs ci-dessous sont des exemples.
          Créez un compte pour personnaliser votre profil.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="space-y-4">
          <h2 className="font-body text-lg font-medium">Identité</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={user?.firstName ?? ""}
                placeholder="Marie"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={user?.lastName ?? ""}
                placeholder="Dupont"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={user?.email ?? "marie.dupont@exemple.fr"}
              required
            />
          </div>
        </section>

        <div className="pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </form>

      {user && (
        <section className="mt-10 pt-6 border-t space-y-3">
          <h2 className="font-body text-lg font-medium">Session</h2>
          <p className="text-sm text-muted-foreground">
            Vous serez redirigé vers la page d'accueil.
          </p>
          <Button type="button" variant="secondary" onClick={logout}>
            Se déconnecter
          </Button>
        </section>
      )}

      {user && (
        <section className="mt-10 pt-6 border-t space-y-3">
          <h2 className="font-body text-lg font-medium">Zone de danger</h2>
          <p className="text-sm text-muted-foreground">
            La suppression du compte efface définitivement vos patients,
            sessions et données associées. Cette action est irréversible.
          </p>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setDeleteOpen(true)}
          >
            Supprimer mon compte
          </Button>
        </section>
      )}

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer définitivement le compte ?</DialogTitle>
            <DialogDescription>
              Tous vos patients, sessions et données associées seront
              supprimés. Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDeleteOpen(false)}
              disabled={isDeleting}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Suppression..." : "Supprimer définitivement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
