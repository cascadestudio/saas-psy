"use client";

import Link from "next/link";
import type { ScaleDomain } from "@melya/core";
import { ScaleTile } from "@/components/scale/ScaleTile";

interface ScaleCardProps {
  scale: {
    id: string;
    acronym: string;
    label: string;
    domain: ScaleDomain;
  };
}

export function ScaleCard({ scale }: ScaleCardProps) {
  return (
    <Link
      href={`/app/echelles/${scale.id}`}
      className="group block rounded-[18px]"
    >
      <ScaleTile
        domain={scale.domain}
        acronym={scale.acronym}
        subtitle={scale.label}
        size="lg"
        className="h-full min-h-[140px] items-start px-[18px] pb-[18px] pt-3 transition-colors group-hover:bg-muted-foreground/10"
        subtitleClassName="mt-2.5 line-clamp-4"
      />
    </Link>
  );
}
