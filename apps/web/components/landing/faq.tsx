"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "./use-scroll-animation";

const faqItems = [
  {
    question: "Quelles échelles psychologiques sont disponibles ?",
    answer:
      "Melya propose au lancement 5 échelles parmi les plus utilisées en TCC : BDI (dépression), STAI (anxiété), LSAS (anxiété sociale), PCL-5 (trauma) et YBOCS (TOC). De nouvelles échelles sont ajoutées régulièrement en fonction des besoins des psychologues.",
  },
  {
    question: "Mes données sont-elles vraiment sécurisées ?",
    answer:
      "Oui. Melya est hébergé sur un serveur certifié HDS (Hébergeur de Données de Santé), conforme au RGPD. Toutes les données sont chiffrées et stockées en France. Seul·e vous, en tant que praticien·ne, pouvez accéder aux données de vos patients. Aucun·e autre praticien·ne utilisant Melya n'y a accès, et même l'équipe Melya n'a pas accès à vos données cliniques grâce au chiffrement. Vous restez propriétaire de vos données à tout moment. Pour toute question relative à la sécurité : contact@cascadestudio.fr",
  },
  {
    question: "Combien coûte Melya ?",
    answer:
      "Melya est gratuit jusqu'à 5 patients ou 20 passations par mois. Au-delà, l'abonnement Pro est à 10€/mois (ou 8€/mois en abonnement annuel).",
  },
  {
    question: "Comment mes patients reçoivent-ils les questionnaires ?",
    answer:
      "Vos patients reçoivent un lien par email. Ils répondent directement depuis leur smartphone, tablette ou ordinateur, sans créer de compte.",
  },
  {
    question: "Respectez-vous le droit d'auteur des échelles ?",
    answer:
      "Oui. Les échelles proposées au lancement sont dans le domaine public ou utilisées avec les autorisations appropriées. Nous travaillons avec les éditeurs pour élargir progressivement le catalogue dans le respect des droits d'auteur.",
  },
  {
    question: "Puis-je annuler mon abonnement ?",
    answer:
      "Oui, à tout moment et sans frais. Vos données restent accessibles après l'annulation. Vous pouvez les exporter si nécessaire.",
  },
];

export function FAQ() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? "visible" : ""}`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-12">
            Questions fréquentes
          </h2>

          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left text-lg font-body font-semibold text-foreground hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
