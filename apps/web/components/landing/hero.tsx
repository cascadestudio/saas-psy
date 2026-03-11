"use client";

import { WaitlistButton } from "./waitlist-button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-foreground">
              Vos échelles cotées automatiquement, en{" "}
              <span className="relative inline-block">
                2 minutes
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/landing/drawn-underline.svg"
                  alt=""
                  className="absolute -bottom-4 left-0 w-full h-[15px]"
                />
              </span>
            </h1>
            <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-xl">
              Melya automatise la cotation de vos échelles et questionnaires
              psychologiques. Moins de paperasse, plus de rigueur clinique, plus
              de temps avec vos patients.
            </p>

            {/* CTA — button centered, arrow fills left space */}
            <div className="relative flex justify-center pt-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/landing/arrow-right.svg"
                alt=""
                className="hidden sm:block absolute left-0 bottom-0 max-h-[88px]"
                style={{ width: "calc(50% - 130px)" }}
              />
              <WaitlistButton
                size="lg"
                className="font-body font-medium text-sm rounded-full px-8 bg-brand-orange text-white hover:bg-brand-orange/90"
              >
                Rejoindre la liste d'attente
              </WaitlistButton>
            </div>
          </div>

          {/* Right — Hero illustration */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/landing/hero-image.png"
                alt="Consultation psychologique"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Notification toasts — right, left, right */}
            <div
              className="toast-animate absolute -right-1 top-4 hidden lg:flex items-center gap-2.5 bg-card rounded-full px-4 py-2.5 shadow-md border border-border/50"
              style={{ animationDelay: "0.8s" }}
            >
              <svg
                className="w-4 h-4 text-brand-orange flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm font-body text-foreground whitespace-nowrap">
                Échelle LSAS envoyée à Mme. Martin
              </span>
            </div>
            <div
              className="toast-animate absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2.5 bg-card rounded-full px-4 py-2.5 shadow-md border border-border/50"
              style={{ animationDelay: "1.6s" }}
            >
              <svg
                className="w-4 h-4 text-brand-orange flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm font-body text-foreground whitespace-nowrap">
                Vous avez reçu un questionnaire
              </span>
            </div>
            <div
              className="toast-animate absolute -right-1 bottom-8 hidden lg:flex items-center gap-2.5 bg-card rounded-full px-4 py-2.5 shadow-md border border-border/50"
              style={{ animationDelay: "2.4s" }}
            >
              <svg
                className="w-4 h-4 text-brand-orange flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm font-body text-foreground whitespace-nowrap">
                Résultats de Mme. Martin reçus
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
