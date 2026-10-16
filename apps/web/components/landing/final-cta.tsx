"use client";

import { useScrollAnimation } from "./use-scroll-animation";
import { CtaButton } from "./cta-button";

export function FinalCTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-3xl px-4 sm:px-6 text-center scroll-animate ${isVisible ? "visible" : ""}`}
      >
        <h2 className="font-gelica text-3xl sm:text-4xl font-normal text-foreground mb-4">
          Prêt·e à simplifier votre pratique clinique ?
        </h2>
        <p className="text-lg text-muted-foreground font-body mb-8 max-w-xl mx-auto">
          Rejoignez les psychologue·s qui utilisent Melya pour automatiser leurs
          cotations.
        </p>
        <div className="relative inline-flex flex-col items-center">
          <CtaButton>Je souhaite essayer Melya</CtaButton>
          <span className="absolute -bottom-6 text-xs text-foreground/50 font-body">
            100% gratuit
          </span>
        </div>
      </div>
    </section>
  );
}
