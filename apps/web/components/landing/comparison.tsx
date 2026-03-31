"use client";

import { Interfaces } from "doodle-icons";
import { useScrollAnimation } from "./use-scroll-animation";

const without = [
  "Cotation manuelle, source d'erreurs et de perte de temps",
  "Échelles sous-utilisées faute de temps",
  "Résultats dispersés entre papier, PDFs et Excel",
];

const withMelya = [
  "Cotation automatique, fiable et instantanée",
  "Envoi d'échelles en quelques clics, avant ou après la séance",
  "Un seul espace sécurisé (serveur HDS) pour tous vos résultats",
];

export function Comparison() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 scroll-animate ${isVisible ? "visible" : ""}`}
        >
          {/* Sans Melya */}
          <div className="rounded-2xl p-6 md:p-8 bg-card/60 border border-border">
            <h3 className="text-lg font-bold text-muted-foreground mb-6">
              Sans Melya
            </h3>
            <ul className="space-y-4">
              {without.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Interfaces.Cross className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" />
                  <span className="text-muted-foreground font-body">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Avec Melya */}
          <div className="rounded-2xl p-6 md:p-8 bg-brand-orange">
            <h3 className="text-lg font-bold text-white mb-6">
              Avec Melya
            </h3>
            <ul className="space-y-4">
              {withMelya.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Interfaces.Tick className="h-5 w-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" />
                  <span className="text-white font-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
