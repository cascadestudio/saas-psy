"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Interfaces } from "doodle-icons";
import { getScaleById } from "@melya/core";

function ThankYou() {
  const searchParams = useSearchParams();
  const scaleId = searchParams.get("scale");
  const scale = scaleId ? getScaleById(scaleId) : undefined;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <Interfaces.Tick2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Merci pour vos réponses
          </h1>
          <p className="text-gray-600 mb-6">
            Votre questionnaire a bien été envoyé à votre praticien. Vous pouvez
            fermer cette page.
          </p>
          <p className="text-sm text-gray-500">
            Les résultats seront consultés lors de votre prochain rendez-vous.
          </p>
        </div>
        {scale?.copyrightAttribution && (
          <p className="text-[11px] text-gray-400 leading-relaxed mt-6 px-2">
            {scale.copyrightAttribution}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYou />
    </Suspense>
  );
}
