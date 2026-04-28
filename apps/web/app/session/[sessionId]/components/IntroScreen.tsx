"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Interfaces } from "doodle-icons";
import { scales as localScales } from "@/app/scalesData";

interface IntroScreenProps {
  scaleId: string;
  title: string;
  instructions?: string;
  estimatedTime?: string;
  questionsCount: number;
  onStart: () => void;
}

export default function IntroScreen({
  scaleId,
  title,
  instructions,
  estimatedTime,
  questionsCount,
  onStart,
}: IntroScreenProps) {
  const localScale = localScales.find((s) => s.id === scaleId);

  return (
    <div className="flex flex-col gap-8">
      {localScale ? (
        <div
          className="flex overflow-hidden"
          style={{ borderRadius: 20, height: 120 }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0 p-5"
            style={{
              backgroundColor: localScale.color,
              aspectRatio: "1 / 1",
              height: "100%",
            }}
          >
            <Image
              src={localScale.icon}
              alt={localScale.acronym}
              width={56}
              height={56}
              className="w-3/5 h-3/5 object-contain"
            />
          </div>
          <div
            className="flex flex-col justify-center px-4 flex-1 min-w-0"
            style={{ backgroundColor: localScale.colorLight }}
          >
            <p className="font-heading font-bold text-black leading-tight text-2xl">
              {localScale.acronym}
            </p>
            <p className="font-body text-black/80 leading-snug mt-0.5 text-sm">
              {localScale.label}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-surface-brand-bg border border-brand-orange/20 p-8 flex items-center justify-center min-h-[120px]">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center leading-tight">
            {title}
          </h1>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700">
          <Interfaces.Checklist className="h-4 w-4 text-gray-500" />
          <span>
            <span className="font-medium">{questionsCount}</span> questions
          </span>
        </div>
        {estimatedTime && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700">
            <Interfaces.Clock className="h-4 w-4 text-gray-500" />
            <span>{estimatedTime}</span>
          </div>
        )}
      </div>

      {instructions && (
        <p className="text-base text-gray-600 leading-relaxed">
          {instructions}
        </p>
      )}

      <Button className="w-full h-12 text-base" onClick={onStart}>
        Commencer
      </Button>
    </div>
  );
}
