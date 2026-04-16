"use client";

import Link from "next/link";
import Image from "next/image";

interface ScaleCardProps {
  scale: {
    id: string;
    acronym: string;
    label: string;
    icon: string;
    color: string;
    colorLight: string;
  };
}

export function ScaleCard({ scale }: ScaleCardProps) {
  return (
    <Link
      href={`/echelles/${scale.id}`}
      className="flex overflow-hidden hover:opacity-90 transition-opacity"
      style={{ borderRadius: 20, aspectRatio: "340 / 120" }}
    >
      <div
        className="flex items-center justify-center flex-shrink-0 p-5"
        style={{
          backgroundColor: scale.color,
          aspectRatio: "1 / 1",
          height: "100%",
        }}
      >
        <Image
          src={scale.icon}
          alt={scale.acronym}
          width={56}
          height={56}
          className="w-3/5 h-3/5 object-contain"
        />
      </div>
      <div
        className="flex flex-col justify-center px-4 flex-1 min-w-0"
        style={{ backgroundColor: scale.colorLight }}
      >
        <p className="font-heading font-bold text-black leading-tight text-2xl">
          {scale.acronym}
        </p>
        <p className="font-body text-black/80 leading-snug mt-0.5 text-sm">
          {scale.label}
        </p>
      </div>
    </Link>
  );
}
