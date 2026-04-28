"use client";

import { useScrollAnimation } from "./use-scroll-animation";
import { Interfaces, Files } from "doodle-icons";
import Image from "next/image";

const mockSessions = [
  { patient: "Marie Dupont", scale: "Inventaire de Dépression de Beck", status: "Envoyée", statusClass: "bg-blue-100 text-blue-700", date: "28/03" },
  { patient: "Marie Dupont", scale: "STAI - Anxiété État-Trait", status: "En cours", statusClass: "bg-amber-100 text-amber-700", date: "30/03" },
  { patient: "Jean Martin", scale: "Échelle de Liebowitz", status: "Complétée", statusClass: "bg-green-100 text-green-700", date: "01/04" },
  { patient: "Sophie Bernard", scale: "PCL-5 Traumatismes", status: "Envoyée", statusClass: "bg-blue-100 text-blue-700", date: "31/03" },
];

const mockPatients = [
  { name: "Marie Dupont", hasActive: true },
  { name: "Jean Martin", hasActive: false },
  { name: "Sophie Bernard", hasActive: true },
  { name: "Lucas Moreau", hasActive: false },
];

function DashboardMockup() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
        {/* Browser chrome */}
        <div className="bg-card px-4 py-3 flex items-center gap-2 border-b border-border">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-destructive/40" />
            <div className="h-3 w-3 rounded-full bg-primary/30" />
            <div className="h-3 w-3 rounded-full bg-brand-soft-green/40" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-secondary rounded-md px-3 py-1 text-xs text-muted-foreground font-body max-w-xs mx-auto text-center">
              melya.app/dashboard
            </div>
          </div>
        </div>

        {/* App content with sidebar */}
        <div className="bg-background flex">
          {/* Left sidebar */}
          <aside className="hidden sm:flex w-32 flex-col bg-primary/10 rounded-bl-xl m-1 rounded-xl">
            <div className="flex items-center justify-center py-4">
              <Image
                src="/images/logos/logo-melya.svg"
                alt="Melya"
                width={64}
                height={20}
              />
            </div>
            <nav className="flex-1 space-y-0.5 px-2 py-2">
              <div className="relative flex items-center gap-2 px-2 py-1.5 text-[10px] font-body font-medium text-primary translate-x-0.5">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-px rounded-full bg-primary" />
                <Interfaces.Home className="h-3 w-3" fill="currentColor" />
                Tableau de bord
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] font-body text-foreground">
                <Files.FileText className="h-3 w-3" fill="currentColor" />
                Échelles
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] font-body text-foreground">
                <Interfaces.Logout className="h-3 w-3" fill="currentColor" />
                Déconnexion
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 px-4 sm:px-6 pt-4 pb-5">
            {/* Greeting */}
            <h3 className="font-normal text-base sm:text-lg text-foreground leading-tight mb-4">
              Bonjour, Claire
            </h3>

            {/* Suivi des passations */}
            <div className="mb-4">
              <h4 className="text-[11px] font-sans font-semibold text-foreground mb-2">
                Suivi des passations
              </h4>
              <div className="flex gap-2 overflow-hidden">
                {mockSessions.map((session, i) => (
                  <div
                    key={i}
                    className="bg-muted-foreground/5 rounded-lg p-2.5 min-w-[140px] flex-shrink-0"
                  >
                    <p className="text-[10px] font-body font-medium text-foreground">{session.patient}</p>
                    <p className="text-[8px] font-body text-muted-foreground mt-0.5">{session.scale}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-[7px] font-body font-medium px-1.5 py-0.5 rounded-full ${session.statusClass}`}>
                        {session.status}
                      </span>
                      <span className="text-[8px] font-body text-muted-foreground">{session.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mes patients */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-[11px] font-sans font-semibold text-foreground">
                  Mes patients
                </h4>
                <Interfaces.UserAdd className="h-3 w-3 text-muted-foreground" fill="currentColor" />
              </div>
              <div className="flex gap-1.5 mb-2">
                <span className="text-[8px] font-body font-medium bg-foreground text-background px-2 py-0.5 rounded-full">
                  Tous
                </span>
                <span className="text-[8px] font-body text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  Passation en cours
                </span>
              </div>
              <div className="bg-muted-foreground/5 rounded-lg overflow-hidden">
                {mockPatients.map((patient, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-3 py-2 ${i > 0 ? "border-t border-border/50" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-body font-medium text-foreground">{patient.name}</span>
                      {patient.hasActive && (
                        <span className="text-[7px] font-body bg-secondary text-muted-foreground px-1.5 py-0.5 rounded-full">
                          Passation en cours
                        </span>
                      )}
                    </div>
                    <Interfaces.Send className="h-3 w-3 text-primary" fill="currentColor" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardScreenshot() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={ref}
          className={`scroll-animate ${isVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl sm:text-4xl font-normal text-center text-foreground mb-4">
            Un aperçu de votre espace
          </h2>
          <p className="text-center text-muted-foreground font-body mb-12 max-w-xl mx-auto">
            Une interface pensée pour les psychologues : simple, claire et sécurisée.
          </p>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-b from-brand-orange/5 via-surface-brand-bg to-transparent rounded-3xl blur-xl" />
            <div className="relative">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
