"use client";

import { useScrollAnimation } from "./use-scroll-animation";
import { Badge } from "@/components/ui/badge";

function IconCheckmark() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="0.03 0.07" />
      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      <path d="M12 20.5L17.5 26L28 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="11" y="4" width="18" height="32" rx="3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="17" y1="31" x2="23" y2="31" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="11" y1="9" x2="29" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M16 17L19 20L24 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFolder() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12C5 10.8954 5.89543 10 7 10H15L18 13H33C34.1046 13 35 13.8954 35 15V30C35 31.1046 34.1046 32 33 32H7C5.89543 32 5 31.1046 5 30V12Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="21" x2="28" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="12" y1="25" x2="22" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 32H34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 32V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 26C13 24 16 20 20 18C24 16 27 13 32 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="10" cy="26" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="18" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="32" cy="10" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

const benefits = [
  {
    title: "Zéro erreur de cotation",
    description:
      "Le calcul est automatique, basé sur les barèmes officiels. Fini les doutes sur un score fait à la main.",
    icon: IconCheckmark,
  },
  {
    title: "Vos patients remplissent depuis leur téléphone",
    description:
      "Pas d'impression, pas de papier à récupérer. Le patient répond où et quand il veut avant la séance.",
    icon: IconPhone,
  },
  {
    title: "Toutes vos passations au même endroit",
    description:
      "Plus de fichiers Excel éparpillés, de PDFs perdus ou de classeurs papier. Un patient, un historique.",
    icon: IconFolder,
  },
  {
    title: "Visualisez l'évolution séance après séance",
    description: "Suivez la progression de vos patients en un coup d'œil.",
    icon: IconChart,
    comingSoon: true,
  },
];

export function Benefits() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="fonctionnalites" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? "visible" : ""}`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-12">
            Melya allège votre charge administrative
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="relative bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
                >
                  {benefit.comingSoon && (
                    <Badge variant="accent" className="absolute top-4 right-4">
                      Bientôt disponible
                    </Badge>
                  )}
                  <div className="h-12 w-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-4 text-brand-orange">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
