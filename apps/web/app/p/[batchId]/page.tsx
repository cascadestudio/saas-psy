"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PortalSession {
  id: string;
  scaleId: string;
  scaleTitle: string;
  scaleDescription: string;
  estimatedTime: string;
  status: string;
  isCompleted: boolean;
  completedAt: string | null;
}

interface PortalData {
  batchId: string;
  patientFirstName: string;
  patientLastName: string;
  totalCount: number;
  pendingCount: number;
  completedCount: number;
  allCompleted: boolean;
  sessions: PortalSession[];
}

export default function PatientPortalPage() {
  const params = useParams();
  const batchId = params.batchId as string;

  const [portal, setPortal] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPortal() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
        const res = await fetch(`${apiUrl}/sessions/portal/${batchId}`);

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Portail introuvable");
        }

        const data = await res.json();
        setPortal(data.portal);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    }

    if (batchId) {
      fetchPortal();
    }
  }, [batchId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto" />
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-brand-white rounded-lg shadow-sm p-8">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Portail non disponible
            </h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!portal) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <span className="text-2xl font-bold text-indigo-600">M</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Bonjour {portal.patientFirstName},
          </h1>
          {portal.allCompleted ? (
            <p className="text-gray-600 mt-2">
              Tous vos questionnaires sont complets.
            </p>
          ) : (
            <p className="text-gray-600 mt-2">
              {portal.pendingCount === 1
                ? "Vous avez 1 questionnaire à compléter"
                : `Vous avez ${portal.pendingCount} questionnaires à compléter`}
            </p>
          )}
        </div>

        {/* All completed message */}
        {portal.allCompleted && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="py-6">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <div className="text-center">
                  <p className="font-medium text-green-900">
                    Merci pour vos réponses !
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Tous vos questionnaires ont été complétés avec succès.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sessions list */}
        <div className="space-y-3">
          {portal.sessions.map((session) => (
            <Card
              key={session.id}
              className={session.isCompleted ? "opacity-75" : ""}
            >
              <CardContent className="py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {session.isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-indigo-300 flex-shrink-0" />
                      )}
                      <h3
                        className={`font-medium truncate ${
                          session.isCompleted
                            ? "text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {session.scaleTitle}
                      </h3>
                    </div>
                    {session.scaleDescription && (
                      <p className="text-sm text-gray-500 mt-1 ml-7 line-clamp-1">
                        {session.scaleDescription}
                      </p>
                    )}
                    {session.estimatedTime && !session.isCompleted && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1 ml-7">
                        <Clock className="h-3 w-3" />
                        <span>{session.estimatedTime}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {session.isCompleted ? (
                      <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                        Terminé
                      </span>
                    ) : (
                      <Button asChild size="sm">
                        <Link href={`/session/${session.id}`}>
                          Commencer
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress indicator */}
        {portal.totalCount > 1 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            {portal.completedCount} sur {portal.totalCount} questionnaire
            {portal.totalCount > 1 ? "s" : ""} complété
            {portal.completedCount > 1 ? "s" : ""}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          Melya - Plateforme de questionnaires psychométriques
        </div>
      </div>
    </div>
  );
}
