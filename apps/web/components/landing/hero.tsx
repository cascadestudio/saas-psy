"use client";

import { ArrowRight } from "lucide-react";
import { WaitlistButton } from "./waitlist-button";
import Image from "next/image";

const toasts = [
  { text: "Test BDI envoyé à M. Dupont", delay: "toast-animate-delay-1" },
  { text: "Vous avez reçu un test", delay: "toast-animate-delay-2" },
  {
    text: "Vous avez reçu les résultats de M. Dupont",
    delay: "toast-animate-delay-3",
  },
];

export function Hero() {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              Envoyez vos échelles en 2 minutes, recevez les résultats cotés
              automatiquement
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-xl">
              Melya automatise la cotation de vos échelles et questionnaires
              psychologiques. Moins de paperasse, plus de rigueur clinique, plus
              de temps avec vos patients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <WaitlistButton size="lg" className="text-base">
                Rejoindre la liste d&apos;attente
              </WaitlistButton>
              <a
                href="#comment-ca-marche"
                className="inline-flex items-center gap-2 text-primary font-medium font-body hover:gap-3 transition-all self-center"
              >
                Voir comment ça marche
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right — Hero image + floating toasts */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-secondary">
              {/* Placeholder — replace with hero-photo.jpg when available */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary to-brand-cream flex items-center justify-center">
                <Image
                  src="/images/landing/hero-photo.jpg"
                  alt="Consultation psychologique"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>

            {/* Floating toasts */}
            {toasts.map((toast, i) => (
              <div
                key={i}
                className={`toast-animate ${toast.delay} absolute bg-card shadow-lg rounded-xl px-4 py-3 text-sm font-body flex items-center gap-2 ${
                  i === 0
                    ? "top-4 -right-2 sm:-right-4"
                    : i === 1
                      ? "top-1/2 -left-2 sm:-left-4 -translate-y-1/2"
                      : "bottom-4 -right-2 sm:-right-4"
                }`}
              >
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-soft-green/20 flex items-center justify-center">
                  <svg
                    className="h-3 w-3 text-brand-soft-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-foreground whitespace-nowrap">
                  {toast.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
