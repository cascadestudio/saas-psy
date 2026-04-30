"use client";

import { useState } from "react";
import { Interfaces } from "doodle-icons";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useScrollAnimation } from "./use-scroll-animation";

export function Pricing() {
  const { ref, isVisible } = useScrollAnimation();
  const [isYearly, setIsYearly] = useState(true);

  const proPrice = isYearly ? "10€" : "15€";
  const proPeriod = "/mois";
  const proNote = isYearly ? "Facturé 120€/an" : "";

  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "",
      note: "",
      description: "Pour découvrir Melya à votre rythme",
      features: [
        "5 patients ou 20 passations/mois",
        "Accès à toutes les échelles disponibles",
        "Cotation automatique",
      ],
      cta: "Commencer gratuitement",
      variant: "secondary" as const,
      highlighted: false,
    },
    {
      name: "Pro",
      price: proPrice,
      period: proPeriod,
      note: proNote,
      description: "Pour les praticiens qui utilisent les échelles régulièrement",
      features: [
        "Patients illimités",
        "Passations illimitées",
        "Historique complet des passations",
      ],
      cta: "Essayer Melya",
      variant: "default" as const,
      highlighted: true,
    },
  ];

  return (
    <section id="tarifs" className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? "visible" : ""}`}
        >
          <h2 className="font-gelica text-2xl sm:text-3xl font-bold text-center text-foreground mb-6">
            Tarifs
          </h2>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span
              className={`text-sm font-body ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}
            >
              Mensuel
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative h-7 w-12 rounded-full bg-brand-orange/20 transition-colors"
              aria-label="Basculer entre mensuel et annuel"
            >
              <div
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-brand-orange transition-transform ${
                  isYearly ? "translate-x-[22px]" : "translate-x-0.5"
                }`}
              />
            </button>
            <span
              className={`text-sm font-body ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}
            >
              Annuel
            </span>
            {isYearly && (
              <Badge className="text-xs bg-surface-brand-bg text-brand-orange border-brand-orange/20">
                -33%
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 md:p-8 flex flex-col ${
                  plan.highlighted
                    ? "bg-card border-2 border-brand-orange shadow-lg"
                    : "bg-card border border-border"
                }`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-6 bg-brand-orange text-white border-transparent">
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
                {/* Fixed height for note to keep cards aligned */}
                <p className="mt-1 text-sm text-brand-orange font-body h-5">
                  {plan.note}
                </p>
                <p className="mt-3 text-muted-foreground font-body">
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Interfaces.Tick className="h-5 w-5 text-brand-soft-green flex-shrink-0 mt-0.5" fill="currentColor" />
                      <span className="text-foreground font-body text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    href="/dashboard"
                    className={`block w-full text-center font-body font-medium text-sm rounded-full px-5 py-3 transition-colors ${
                      plan.highlighted
                        ? "bg-brand-orange text-white hover:bg-brand-orange/90"
                        : "border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
