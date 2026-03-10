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
          &ldquo;La cotation manuelle est tellement chronophage qu&apos;on finit
          par renoncer à utiliser les échelles, alors qu&apos;on sait
          qu&apos;elles peuvent être essentielles à la rigueur clinique du
          suivi.&rdquo;
        </blockquote>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
            <Image
              src="/images/landing/renata-photo.jpg"
              alt="Renata Dujmusic"
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Placeholder initials */}
            <span className="absolute inset-0 flex items-center justify-center text-sm font-heading font-bold text-primary">
              RD
            </span>
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
