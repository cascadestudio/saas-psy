"use client";

import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import { addPatient } from "@/data/mock-patients";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function CreatePatientPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/sign-in");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const fullName = formData.get("fullName") as string;
    const initials = formData.get("initials") as string;
    const email = formData.get("email") as string;
    const birthDate = formData.get("birthDate") as string;
    const notes = formData.get("notes") as string;

    // Calculate age from birth date
    let age = 0;
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        age--;
      }
    }

    try {
      const newPatient = addPatient({
        fullName,
        initials: initials || fullName.split(" ").map(n => n[0]).join(".") + ".",
        email,
        age,
        birthDate: birthDate || undefined,
        notes: notes || undefined,
      });

      toast.success("Patient créé avec succès", {
        description: `${newPatient.initials} a été ajouté à votre liste`,
      });

      // Redirect to patient list or ask to send questionnaire
      router.push(`/patients/${newPatient.id}`);
    } catch (error) {
      toast.error("Erreur lors de la création du patient");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/patients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="font-bold text-3xl">Ajouter un nouveau patient</h1>
          <p className="text-muted-foreground mt-1">
            Remplissez les informations du patient
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Informations du patient</CardTitle>
          <CardDescription>
            Les champs marqués d'un astérisque (*) sont obligatoires
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Nom complet *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Martin Dubois"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Le nom complet sera visible uniquement par vous
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initials">
                  Initiales
                </Label>
                <Input
                  id="initials"
                  name="initials"
                  placeholder="M.D."
                  maxLength={10}
                />
                <p className="text-xs text-muted-foreground">
                  Optionnel - Généré automatiquement si vide
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="patient@example.com"
                required
              />
              <p className="text-xs text-muted-foreground">
                Nécessaire pour l'envoi des questionnaires
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">
                Date de naissance
              </Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                max={new Date().toISOString().split("T")[0]}
              />
              <p className="text-xs text-muted-foreground">
                Optionnel - Utilisé pour calculer l'âge
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">
                Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Notes confidentielles sur le patient..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Ces notes sont privées et conformes RGPD
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Création..." : "Créer le patient"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/patients">Annuler</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
