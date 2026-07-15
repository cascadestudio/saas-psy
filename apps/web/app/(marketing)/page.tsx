import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { ScaleBadges } from "@/components/landing/scale-badges";
import { Benefits } from "@/components/landing/benefits";
import { HowItWorks } from "@/components/landing/how-it-works";
import { DashboardScreenshot } from "@/components/landing/dashboard-screenshot";
import { Comparison } from "@/components/landing/comparison";
// import { Pricing } from "@/components/landing/pricing";
import { FAQ, faqItems } from "@/components/landing/faq";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Melya — Automatisez la passation de vos échelles psychologiques",
  description:
    "Envoyez vos échelles en 2 minutes, recevez les résultats cotés automatiquement. Melya simplifie la passation des questionnaires psychométriques pour les psychologues. Hébergé en France sur serveur certifié HDS.",
  openGraph: {
    title: "Melya — Automatisez la passation de vos échelles psychologiques",
    description:
      "Envoyez vos échelles en 2 minutes, recevez les résultats cotés automatiquement.",
    url: "https://www.melya.app",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "https://www.melya.app",
  },
};

const SITE_URL = "https://www.melya.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Melya",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logos/logo-melya.svg`,
      email: "clement@melya.app",
      sameAs: [
        "https://www.linkedin.com/company/melya-app",
        "https://www.instagram.com/melya_app/",
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "Melya",
      url: SITE_URL,
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      description:
        "Plateforme d'échelles psychométriques pour psychologues : envoi, passation en ligne, scoring automatique et suivi longitudinal. Hébergé en France sur serveur certifié HDS.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ScaleBadges />
        <SocialProof />
        <Benefits />
        <DashboardScreenshot />
        <Comparison />
        {/* <Pricing /> */}
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
