"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Interfaces } from "doodle-icons";
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
    <div className="flex items-center gap-2">
      <Button asChild variant="outline" size="sm">
        <Link href="/dashboard">
          <Interfaces.User className="mr-2 h-4 w-4" />
          Tableau de bord
        </Link>
      </Button>
      <Button onClick={logout} variant="ghost" size="icon">
        <Interfaces.Logout className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <Button asChild size="sm" variant="default">
      <Link href="/dashboard">Accéder à l&apos;app</Link>
    </Button>
  );
}
