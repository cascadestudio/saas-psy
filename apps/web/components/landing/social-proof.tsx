"use client";

import Image from "next/image";
import { useScrollAnimation } from "./use-scroll-animation";

export function SocialProof() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-3xl px-4 sm:px-6 text-center scroll-animate ${isVisible ? "visible" : ""}`}
      >
        <blockquote className="text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground font-body italic">
          &ldquo;Avec Melya, j&apos;envoie mes échelles en quelques clics et
          je reçois les résultats cotés avant même la séance. Ça m&apos;a
          permis de réintégrer les questionnaires dans mon suivi sans y
          passer des heures.&rdquo;
        </blockquote>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden bg-surface-brand-bg flex-shrink-0">
            <Image
              src="/images/landing/renata-illustration.png"
              alt="Renata Dujmusic"
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="text-left">
            <p className="font-heading font-semibold text-foreground">
              Renata Dujmusic
            </p>
            <p className="text-sm text-muted-foreground font-body">
              Psychologue en TCC
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
