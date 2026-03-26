"use client";

import { useScrollAnimation } from "./use-scroll-animation";
import { Badge } from "@/components/ui/badge";
import { Interfaces, Finance } from "doodle-icons";

const benefits = [
  {
    title: "Zéro erreur de cotation",
    description:
      "Le calcul est automatique, basé sur les barèmes officiels. Fini les doutes sur un score fait à la main.",
    icon: Interfaces.Tick,
  },
  {
    title: "Vos patients remplissent depuis leur téléphone",
    description:
      "Pas d'impression, pas de papier à récupérer. Le patient répond où et quand il veut avant la séance.",
    icon: Interfaces.Tablet,
  },
  {
    title: "Toutes vos passations au même endroit",
    description:
      "Plus de fichiers Excel éparpillés, de PDFs perdus ou de classeurs papier. Un patient, un historique.",
    icon: Interfaces.Folder,
  },
  {
    title: "Visualisez l'évolution séance après séance",
    description: "Suivez la progression de vos patients en un coup d'œil.",
    icon: Finance.TrendUp,
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
                    <Icon className="h-6 w-6" fill="currentColor" />
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
