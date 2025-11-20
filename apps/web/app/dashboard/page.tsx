"use client";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { UserProfileForm } from "./components/user-profile-form";
import { useUser } from "@/app/context/UserContext";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isLoading } = useUser();

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

  return (
    <div className="flex-1 w-full flex flex-col gap-6">
      <h1 className="font-bold text-3xl">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profil Utilisateur</CardTitle>
            <CardDescription>
              Gérez vos informations personnelles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserProfileForm user={user} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Questionnaires</CardTitle>
            <CardDescription>Accédez à vos questionnaires</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>Consultez et gérez vos questionnaires</p>
            <Button asChild>
              <Link href="/my-questionnaires">Voir mes questionnaires</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
