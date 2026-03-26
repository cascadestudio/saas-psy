import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { ScaleBadges } from "@/components/landing/scale-badges";
import { Benefits } from "@/components/landing/benefits";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Comparison } from "@/components/landing/comparison";
// import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
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
    url: "https://melya.app",
    images: ["/images/landing/og-image.png"],
  },
  alternates: {
    canonical: "https://melya.app",
  },
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <ScaleBadges />
        <Benefits />
        <HowItWorks />
        <Comparison />
        {/* <Pricing /> */}
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
