"use client";

import Link from "next/link";
import { getScaleAppearance } from "@/lib/scale-appearance";

interface ScaleCardProps {
  scale: {
    id: string;
    acronym: string;
    label: string;
    category: string;
  };
}

export function ScaleCard({ scale }: ScaleCardProps) {
  const { bg, darkInk } = getScaleAppearance(scale.category);

  return (
    <Link
      href={`/app/echelles/${scale.id}`}
      className="group flex flex-col justify-start rounded-[18px] p-[18px] min-h-[158px] transition-transform hover:-translate-y-[3px] hover:shadow-lg"
      style={{ backgroundColor: bg }}
    >
      <span
        className="font-gelica not-italic font-semibold text-[26px] leading-none tracking-tight tabular-nums"
        style={{ color: darkInk ? "#FCF9F3" : "#23201C" }}
      >
        {scale.acronym}
      </span>
      <span
        className="mt-2.5 text-[13.5px] leading-snug line-clamp-4"
        style={{ color: darkInk ? "rgba(255,255,255,0.80)" : "rgba(0,0,0,0.66)" }}
      >
        {scale.label}
      </span>
    </Link>
  );
}
