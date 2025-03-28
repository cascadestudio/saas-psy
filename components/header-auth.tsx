import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { UserCircle } from "lucide-react";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <span className="text-muted-foreground">Bonjour, {user.email} !</span>
      <Button asChild variant="outline" size="sm">
        <Link href="/dashboard">
          <UserCircle className="mr-2 h-4 w-4" />
          Tableau de bord
        </Link>
      </Button>
      <form action={signOutAction}>
        <Button type="submit" variant="outline" size="sm">
          Déconnexion
        </Button>
      </form>
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
