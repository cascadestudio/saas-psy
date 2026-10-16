"use client";

import { Button } from "@/components/ui/button";

interface OpeningTextQuestionProps {
  questionText: string;
  helperText?: string;
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
}

/**
 * Item d'ouverture en texte libre, non scoré (ex. QIA item 1 : thèmes
 * d'inquiétude). Le patient peut poursuivre sans remplir le champ,
 * fidèle au support papier.
 */
export default function OpeningTextQuestion({
  questionText,
  helperText,
  value,
  onChange,
  onContinue,
}: OpeningTextQuestionProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-body text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
        {questionText}
      </h2>

      <div className="flex flex-col gap-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange resize-none"
          placeholder="Votre réponse…"
        />
        {helperText && (
          <p className="text-sm text-gray-500 px-1">{helperText}</p>
        )}
      </div>

      <Button className="w-full h-12 text-base" onClick={onContinue}>
        Continuer
      </Button>
    </div>
  );
}
