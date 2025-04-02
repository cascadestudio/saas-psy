import { createClient } from "@/utils/supabase/server";
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

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
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
