"use client";

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
          <h2 className="font-gelica text-3xl sm:text-4xl font-normal text-center text-foreground mb-12">
            Comment ça marche ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div
                  className="mx-auto mb-4 h-12 w-12 rounded-full flex items-center justify-center bg-brand-orange"
                >
                  <span className="text-lg font-heading font-bold text-white">
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
        </div>
      </div>
    </section>
  );
}
