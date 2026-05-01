"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Interfaces } from "doodle-icons";
import { toast } from "sonner";
import SessionRunner from "./components/SessionRunner";

interface SessionData {
  id: string;
  scaleId: string;
  batchId: string | null;
  patientFirstName: string;
  patientLastName: string;
  status: string;
  scale: {
    id: string;
    title: string;
    description: string;
    instructions: string;
    sectionIntros?: { startIndex: number; text: string }[];
    copyrightAttribution?: string;
    formType?: string;
    questions: any[];
    answerScales?: any;
    scoring?: any;
    estimatedTime: string;
  } | null;
}

export default function SessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSession() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
        const res = await fetch(`${apiUrl}/sessions/patient/${sessionId}`);

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Session introuvable");
        }

        const data = await res.json();
        setSession(data.session);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    }

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

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
              Questionnaire non disponible
            </h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const scaleData = session.scale;

  if (!scaleData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Échelle non trouvée
            </h1>
            <p className="text-gray-600">
              L&apos;échelle demandée n&apos;est pas disponible.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Build scale object for ScaleFactory
  const scale = {
    id: scaleData.id,
    title: scaleData.title,
    description: scaleData.description,
    instructions: scaleData.instructions,
    sectionIntros: scaleData.sectionIntros,
    copyrightAttribution: scaleData.copyrightAttribution,
    category: "",
    formType: scaleData.formType,
    questions: scaleData.questions,
    estimatedTime: scaleData.estimatedTime,
    longDescription: scaleData.instructions,
    answerScales: scaleData.answerScales,
    scoring: scaleData.scoring,
  };

  return (
    <SessionScaleWrapper
      sessionId={session.id}
      batchId={session.batchId}
      scale={scale}
      patientFirstName={session.patientFirstName}
      patientLastName={session.patientLastName}
    />
  );
}

interface WrapperProps {
  sessionId: string;
  batchId: string | null;
  scale: any;
  patientFirstName: string;
  patientLastName: string;
}

function SessionScaleWrapper({
  sessionId,
  batchId,
  scale,
  patientFirstName,
  patientLastName,
}: WrapperProps) {
  const router = useRouter();

  const handleSubmit = async (
    responses: Record<string, any>,
    comments?: string,
  ) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
    const res = await fetch(`${apiUrl}/sessions/patient/${sessionId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        responses,
        patientComments: comments,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      const message = data.message || "Erreur lors de l'envoi";
      toast.error("Erreur", { description: message });
      throw new Error(message);
    }

    if (batchId) {
      toast.success("Réponses enregistrées", {
        description: "Vos réponses ont été enregistrées avec succès.",
      });
      router.push(`/p/${batchId}`);
    } else {
      router.push(`/session/${sessionId}/merci?scale=${scale.id}`);
    }
  };

  return (
    <SessionRunner
      scale={scale}
      onSubmit={handleSubmit}
    />
  );
}
