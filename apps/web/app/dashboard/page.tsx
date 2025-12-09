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
import { useUser } from "@/app/context/UserContext";
import { useEffect } from "react";
import { DashboardStats } from "./components/dashboard-stats";
import { RecentSessions } from "./components/recent-sessions";
import { Send, Users, BarChart3 } from "lucide-react";

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
    <div className="flex-1 w-full flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl">Tableau de bord</h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue, {user.fullName || user.email}
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/send-questionnaire">
            <Send className="mr-2 h-4 w-4" />
            Envoyer un questionnaire
          </Link>
        </Button>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentSessions />

        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Accédez rapidement aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/patients">
                <Users className="mr-2 h-4 w-4" />
                Gérer mes patients
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/my-questionnaires">
                <BarChart3 className="mr-2 h-4 w-4" />
                Voir mes questionnaires favoris
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
