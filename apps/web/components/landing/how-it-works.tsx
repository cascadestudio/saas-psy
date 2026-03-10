"use client";

import Image from "next/image";
import { useScrollAnimation } from "./use-scroll-animation";

const steps = [
  {
    number: "1",
    title: "Choisissez votre patient et vos échelles",
    description:
      "Sélectionnez un patient existant ou créez-en un en quelques secondes, puis choisissez une ou plusieurs échelles à lui envoyer.",
  },
  {
    number: "2",
    title: "Le patient répond en ligne",
    description:
      "Votre patient·e reçoit un lien par email, remplit le questionnaire depuis son téléphone ou ordinateur, sans créer de compte.",
  },
  {
    number: "3",
    title: "Recevez les résultats cotés automatiquement",
    description:
      "Scores calculés selon les barèmes officiels, disponibles instantanément dans votre espace sécurisé.",
  },
];

export function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="comment-ca-marche" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? "visible" : ""}`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-12">
            Comment ça marche ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-lg font-heading font-bold text-primary-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Browser frame mockup */}
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
              {/* Browser chrome */}
              <div className="bg-card px-4 py-3 flex items-center gap-2 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/40" />
                  <div className="h-3 w-3 rounded-full bg-primary/30" />
                  <div className="h-3 w-3 rounded-full bg-brand-soft-green/40" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-secondary rounded-md px-3 py-1 text-xs text-muted-foreground font-body max-w-xs mx-auto text-center">
                    melya.app/dashboard
                  </div>
                </div>
              </div>
              {/* Screenshot */}
              <div className="relative aspect-[16/9] bg-secondary">
                <Image
                  src="/images/landing/screenshot-dashboard.png"
                  alt="Dashboard Melya"
                  fill
                  className="object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Placeholder gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-secondary/80 flex items-center justify-center">
                  <span className="text-muted-foreground font-body text-sm">
                    Aperçu du dashboard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
