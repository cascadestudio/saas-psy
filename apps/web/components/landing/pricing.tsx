"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WaitlistButton } from "./waitlist-button";
import { useScrollAnimation } from "./use-scroll-animation";

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    period: "",
    description: "Pour découvrir Melya à votre rythme",
    features: [
      "5 patients ou 20 passations/mois",
      "Accès à toutes les échelles disponibles",
      "Cotation automatique",
    ],
    cta: "Commencer gratuitement",
    variant: "outline" as const,
    highlighted: false,
  },
  {
    name: "Pro",
    price: "10€",
    period: "/mois",
    description: "Pour les praticiens qui utilisent les échelles régulièrement",
    annualNote: "8€/mois en abonnement annuel",
    features: [
      "Patients illimités",
      "Passations illimitées",
      "Historique complet des passations",
    ],
    cta: "Rejoindre la liste d'attente",
    variant: "default" as const,
    highlighted: true,
  },
];

export function Pricing() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="tarifs" className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? "visible" : ""}`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-12">
            Tarifs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 md:p-8 ${
                  plan.highlighted
                    ? "bg-card border-2 border-primary shadow-lg"
                    : "bg-card border border-border"
                }`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-6">
                    Recommandé
                  </Badge>
                )}

                <h3 className="text-xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-heading font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground font-body">
                      {plan.period}
                    </span>
                  )}
                </div>
                {plan.annualNote && (
                  <p className="mt-1 text-sm text-primary font-body">
                    {plan.annualNote}
                  </p>
                )}
                <p className="mt-3 text-muted-foreground font-body">
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-brand-soft-green flex-shrink-0 mt-0.5" />
                      <span className="text-foreground font-body text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <WaitlistButton
                    variant={plan.variant}
                    className="w-full"
                    size="lg"
                  >
                    {plan.cta}
                  </WaitlistButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
