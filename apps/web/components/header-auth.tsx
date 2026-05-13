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
        <Button size="sm" variant="secondary" disabled>
          <Interfaces.Sync className="h-4 w-4 animate-spin" />
        </Button>
      </div>
    );
  }

  return user ? (
    <div className="flex items-center gap-2">
      <Button asChild variant="secondary" size="sm">
        <Link href="/dashboard">
          <Interfaces.User />
          Tableau de bord
        </Link>
      </Button>
      <Button onClick={logout} variant="ghost" size="icon">
        <Interfaces.Logout />
      </Button>
    </div>
  ) : (
    <Button asChild size="sm" variant="default">
      <Link href="/dashboard">Accéder à l&apos;app</Link>
    </Button>
  );
}
