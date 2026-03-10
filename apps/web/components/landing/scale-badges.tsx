"use client";

import { useScrollAnimation } from "./use-scroll-animation";

const scales = [
  { acronym: "BDI", label: "Dépression", icon: "icon-bdi.svg" },
  { acronym: "STAI", label: "Anxiété", icon: "icon-stai.svg" },
  { acronym: "LSAS", label: "Anxiété sociale", icon: "icon-lsas.svg" },
  { acronym: "PCL-5", label: "Trauma", icon: "icon-pcl5.svg" },
  { acronym: "YBOCS", label: "TOC", icon: "icon-ybocs.svg" },
];

export function ScaleBadges() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-12 md:py-16">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 sm:px-6 scroll-animate ${isVisible ? "visible" : ""}`}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 md:flex-wrap md:justify-center md:overflow-visible scrollbar-hide">
          {scales.map((scale) => (
            <div
              key={scale.acronym}
              className="flex-shrink-0 flex items-center gap-3 bg-card border border-border rounded-xl px-5 py-3 shadow-sm"
            >
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-heading font-bold text-primary">
                  {scale.acronym.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-heading font-semibold text-sm text-foreground whitespace-nowrap">
                  {scale.acronym}
                </p>
                <p className="text-xs text-muted-foreground font-body whitespace-nowrap">
                  {scale.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground font-body mt-6 text-sm md:text-base">
          Accédez aux échelles psychométriques les plus utilisées, validées
          scientifiquement
        </p>
      </div>
    </section>
  );
}
