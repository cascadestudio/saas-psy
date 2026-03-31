"use client";

import { WaitlistButton } from "./waitlist-button";
import { useScrollAnimation } from "./use-scroll-animation";

export function FinalCTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-3xl px-4 sm:px-6 text-center scroll-animate ${isVisible ? "visible" : ""}`}
      >
        <h2 className="text-3xl sm:text-4xl font-normal text-foreground mb-4">
          Prêt·e à simplifier votre pratique clinique ?
        </h2>
        <p className="text-lg text-muted-foreground font-body mb-8 max-w-xl mx-auto">
          Rejoignez les psychologues qui utilisent Melya pour automatiser leurs
          cotations.
        </p>
        <WaitlistButton size="lg" className="font-body font-medium text-sm rounded-full px-8 bg-brand-orange text-white hover:bg-brand-orange/90">
          Rejoindre la liste d&apos;attente
        </WaitlistButton>
      </div>
    </section>
  );
}
