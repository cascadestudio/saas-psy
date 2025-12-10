"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPatients } from "@/data/mock-patients";
import { getSessionStats } from "@/data/mock-sessions";

export function DashboardStats() {
  const patients = getAllPatients();
  const sessionStats = getSessionStats();

  const stats = [
    {
      title: "Patients actifs",
      value: patients.length,
      description: "Total de patients dans votre liste",
    },
    {
      title: "Questionnaires en cours",
      value: sessionStats.inProgress,
      description: "En attente de réponse",
    },
    {
      title: "Passations complétées",
      value: sessionStats.completed,
      description: "Ce mois-ci",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
