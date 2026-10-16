"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Interfaces } from "doodle-icons";
import Link from "next/link";
import Image from "next/image";
import { scales } from "@/app/scalesData";
import { ScaleTile } from "@/components/scale/ScaleTile";

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
  practitionerMessage: string | null;
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
          err instanceof Error ? err.message : "Une erreur est survenue",
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
        <Interfaces.Sync className="h-8 w-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
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
        <div className="text-center mt-6 mb-10">
          <div className="mb-12">
            <Image
              src="/images/logos/logo-melya.svg"
              alt="Melya"
              width={120}
              height={40}
              className="mx-auto"
            />
          </div>
          <h1 className="font-heading text-4xl font-normal text-gray-900">
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
                <Interfaces.Tick2 className="h-8 w-8 text-green-600" />
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

        {/* Practitioner message */}
        {portal.practitionerMessage && !portal.allCompleted && (
          <Card className="mb-6">
            <CardContent className="py-4">
              <p className="text-sm font-medium text-gray-900 mb-1">
                Message de votre psychologue
              </p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {portal.practitionerMessage}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Sessions list */}
        <div className="space-y-3 my-10">
          {portal.sessions.map((session) => {
            const scaleData = scales.find((s) => s.id === session.scaleId);
            const cardSubtitle =
              scaleData?.patientIntroSubtitle === undefined
                ? scaleData?.label ?? session.scaleDescription
                : scaleData.patientIntroSubtitle;
            return (
              <div key={session.id} className="flex items-center gap-4">
                <ScaleTile
                  domain={scaleData?.domain}
                  acronym={scaleData?.acronym ?? session.scaleTitle}
                  subtitle={cardSubtitle}
                  subtitleClassName="truncate"
                  className={`flex-1 min-w-0 flex-col items-stretch gap-3 rounded-[20px] sm:flex-row sm:items-center ${session.isCompleted ? "opacity-60" : ""}`}
                  meta={
                    session.estimatedTime && !session.isCompleted && (
                      <div className="flex items-center gap-1 text-xs mt-1.5">
                        <Interfaces.Clock className="h-3 w-3" fill="currentColor" />
                        <span>{session.estimatedTime}</span>
                      </div>
                    )
                  }
                  aside={
                    <div className="flex-shrink-0 flex sm:block justify-center sm:justify-end">
                      {session.isCompleted ? (
                        <Button variant="success" disabled className="disabled:opacity-100">
                          <Interfaces.Tick2 className="fill-white" />
                          Complété
                        </Button>
                      ) : (
                        <Button asChild>
                          <Link href={`/session/${session.id}`}>Commencer</Link>
                        </Button>
                      )}
                    </div>
                  }
                />
              </div>
            );
          })}
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
