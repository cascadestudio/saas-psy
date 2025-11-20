"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { UserCircle } from "lucide-react";
import { useUser } from "@/app/context/UserContext";

export default function AuthButton() {
  const { user, isLoading, logout } = useUser();

  if (isLoading) {
    return (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" disabled>
          Chargement...
        </Button>
      </div>
    );
  }

  return user ? (
    <div className="flex items-center gap-4">
      <span className="text-muted-foreground">
        Bonjour, {user.firstName || user.email} !
      </span>
      <Button asChild variant="outline" size="sm">
        <Link href="/dashboard">
          <UserCircle className="mr-2 h-4 w-4" />
          Tableau de bord
        </Link>
      </Button>
      <Button onClick={logout} variant="outline" size="sm">
        Déconnexion
      </Button>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/sign-in">Connexion</Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href="/sign-up">Inscription</Link>
      </Button>
    </div>
  );
}
