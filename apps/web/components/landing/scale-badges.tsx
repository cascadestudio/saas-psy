"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollAnimation } from "./use-scroll-animation";
import { scales as scalesData } from "@/app/scalesData";
import { questionCount } from "@/app/utils/utils";
import { Interfaces, Files } from "doodle-icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const scales = [
  {
    id: "inventaire-de-depression-de-beck",
    acronym: "BDI",
    label: "Inventaire de Dépression de Beck",
    icon: "/images/scales/bdi.svg",
    color: "#CBCADB",
  },
  {
    id: "echelle-d-anxiete-sociale-de-liebowitz",
    acronym: "LSAS",
    label: "Échelle d'anxiété sociale de Liebowitz",
    icon: "/images/scales/lsas.svg",
    color: "#6A9BCC",
  },
  {
    id: "traumatismes-pcl5",
    acronym: "PCL-5",
    label: "Liste de Vérification du TSPT",
    icon: "/images/scales/pcl-5.svg",
    color: "#C46686",
  },
  {
    id: "stai-anxiete-generalisee",
    acronym: "STAI",
    label: "Inventaire d'Anxiété État-Trait",
    icon: "/images/scales/stai.svg",
    color: "#6A9BCC",
  },
  {
    id: "index-symptomes-ybocs",
    acronym: "Y-BOCS",
    label: "Index des Symptômes Obsessionnels-Compulsifs",
    icon: "/images/scales/y-bocs.svg",
    color: "#BCD1CA",
  },
];

type BadgeScale = (typeof scales)[number];

function ScaleBadge({ scale, onClick }: { scale: BadgeScale; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 flex overflow-hidden text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
      style={{
        borderRadius: 20,
        aspectRatio: "340 / 120",
        width: "clamp(280px, 22vw, 340px)",
      }}
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
        style={{ backgroundColor: `${scale.color}80` }}
      >
        <p className="font-heading font-bold text-black leading-tight text-[clamp(1.25rem,1.8vw,1.75rem)]">
          {scale.acronym}
        </p>
        <p className="font-body text-black/80 leading-snug mt-0.5 text-[clamp(0.65rem,0.85vw,0.8rem)]">
          {scale.label}
        </p>
      </div>
    </button>
  );
}

export function ScaleBadges() {
  const { ref, isVisible } = useScrollAnimation();
  const [selected, setSelected] = useState<BadgeScale | null>(null);

  const fullScale = selected ? scalesData.find((s) => s.id === selected.id) : null;

  return (
    <section className="py-12 md:py-16">
      <div ref={ref} className={`scroll-animate ${isVisible ? "visible" : ""}`}>
        <div className="overflow-hidden w-full">
          <div className="animate-marquee flex gap-6 w-max">
            {[...scales, ...scales].map((scale, i) => (
              <ScaleBadge
                key={`${scale.acronym}-${i}`}
                scale={scale}
                onClick={() => setSelected(scale)}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-muted-foreground font-body mt-6 text-sm md:text-base px-4">
          Accédez aux échelles psychométriques les plus utilisées, validées
          scientifiquement
        </p>
      </div>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto p-0">
          {selected && (
            <>
              {/* Colored header */}
              <div
                className="flex items-center gap-4 px-6 py-8"
                style={{ backgroundColor: selected.color }}
              >
                <div
                  className="flex items-center justify-center rounded-2xl p-3 flex-shrink-0"
                  style={{ backgroundColor: `${selected.color}CC` }}
                >
                  <Image
                    src={selected.icon}
                    alt={selected.acronym}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <SheetHeader className="text-left space-y-0.5">
                  <SheetTitle className="font-heading text-2xl font-bold text-black leading-tight">
                    {selected.acronym}
                  </SheetTitle>
                  <p className="font-body text-black/70 text-sm leading-snug">
                    {selected.label}
                  </p>
                </SheetHeader>
              </div>

              {/* Body */}
              <div className="px-6 py-6 space-y-6">
                {fullScale && (
                  <>
                    {/* Meta */}
                    <div className="flex flex-col gap-2.5 text-sm font-body text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <Interfaces.Bookmark className="h-4 w-4 flex-shrink-0" fill="currentColor" />
                        {fullScale.category}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Files.FileText className="h-4 w-4 flex-shrink-0" fill="currentColor" />
                        {questionCount(fullScale)} questions
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Interfaces.Clock className="h-4 w-4 flex-shrink-0" fill="currentColor" />
                        {fullScale.estimatedTime}
                      </span>
                    </div>

                    {/* Description */}
                    <div>
                      <p className="font-body text-muted-foreground leading-relaxed text-sm">
                        {fullScale.longDescription}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}
