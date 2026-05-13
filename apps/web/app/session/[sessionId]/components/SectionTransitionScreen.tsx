"use client";

import { Button } from "@/components/ui/button";

interface SectionTransitionScreenProps {
  title: string;
  description: string;
  onContinue: () => void;
}

export default function SectionTransitionScreen({
  title,
  description,
  onContinue,
}: SectionTransitionScreenProps) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-body text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
        {title}
      </h2>
      <div className="flex flex-col gap-4 text-base text-gray-600 leading-relaxed">
        {description.split(/\n\n+/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <Button className="w-full h-12 text-base" onClick={onContinue}>
        Continuer
      </Button>
    </div>
  );
}
