"use client";

import { useScrollAnimation } from "./use-scroll-animation";
import { Interfaces } from "doodle-icons";

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

        {/* App content */}
        <div className="bg-background">
          {/* App nav bar */}
          <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-border/60">
            <div className="flex items-center gap-5">
              <span className="font-heading font-bold text-sm text-foreground">Melya</span>
              <nav className="hidden sm:flex items-center gap-4">
                <span className="text-[11px] font-body font-medium text-foreground">Tableau de bord</span>
                <span className="text-[11px] font-body text-muted-foreground">Échelles</span>
                <span className="text-[11px] font-body text-muted-foreground">Patients</span>
              </nav>
            </div>
            <Interfaces.Logout className="h-3.5 w-3.5 text-muted-foreground" fill="currentColor" />
          </div>

          {/* Dashboard header */}
          <div className="px-4 sm:px-6 pt-4 pb-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-foreground leading-tight">
                  Tableau de bord
                </h3>
                <p className="text-[10px] font-body text-muted-foreground mt-0.5">
                  Bienvenue, clement@cascadestudio.fr
                </p>
              </div>
              <button className="flex items-center gap-1.5 bg-primary text-primary-foreground text-[10px] font-body font-medium px-3 py-1.5 rounded-lg">
                <Interfaces.Send className="h-3 w-3" fill="currentColor" />
                <span className="hidden sm:inline">Envoyer une échelle</span>
              </button>
            </div>
          </div>

          {/* Two-panel layout */}
          <div className="px-4 sm:px-6 pb-5 flex flex-col sm:flex-row gap-3">
            {/* Left: Mes patients */}
            <div className="flex-1 bg-card rounded-xl border border-border p-3">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-heading font-bold text-xs text-foreground">Mes patients</p>
                  <p className="text-[9px] font-body text-muted-foreground">3 patients dans votre liste</p>
                </div>
                <button className="flex items-center gap-1 bg-primary/10 text-primary text-[9px] font-body font-medium px-2 py-1 rounded-lg">
                  <Interfaces.UserAdd className="h-3 w-3" fill="currentColor" />
                  Ajouter
                </button>
              </div>

              {/* Search bar */}
              <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-2.5 py-1.5 mb-3">
                <Interfaces.Search className="h-3 w-3 text-muted-foreground" fill="currentColor" />
                <span className="text-[9px] font-body text-muted-foreground/60">Rechercher un patient...</span>
              </div>

              {/* Patient rows */}
              <div className="space-y-0 divide-y divide-border">
                {["Sarah Elraim", "Jeanne Dupont", "Martin Dubois"].map((name) => (
                  <div key={name} className="flex items-center justify-between py-2.5">
                    <span className="text-[10px] font-body font-medium text-foreground">{name}</span>
                    <button className="flex items-center gap-1 bg-primary/90 text-primary-foreground text-[8px] font-body font-medium px-2 py-1 rounded-md">
                      <Interfaces.Send className="h-2.5 w-2.5" fill="currentColor" />
                      Envoyer une échelle
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Mes échelles */}
            <div className="flex-1 bg-card rounded-xl border border-border p-3">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-heading font-bold text-xs text-foreground">Mes échelles</p>
                  <p className="text-[9px] font-body text-muted-foreground">3 échelles favorites</p>
                </div>
                <button className="text-[9px] font-body font-medium text-primary border border-primary/30 px-2 py-1 rounded-lg">
                  Voir tout
                </button>
              </div>

              {/* Scale cards */}
              <div className="space-y-2">
                {[
                  {
                    name: "Échelle d'anxiété sociale de Liebowitz",
                    desc: "Une échelle clinique de 24 items qui mesure la peur et l'évitement dans des situations sociales et de performance",
                    category: "Anxiété sociale",
                    time: "10-15 minutes",
                  },
                  {
                    name: "Inventaire de Dépression de Beck (BDI)",
                    desc: "Une échelle d'auto-évaluation à choix multiples de 21 questions pour mesurer la sévérité de la dépression",
                    category: "Dépression",
                    time: "10-15 minutes",
                  },
                  {
                    name: "STAI - Inventaire d'Anxiété État-Trait",
                    desc: "Une échelle de 40 items évaluant l'anxiété situationnelle (état) et l'anxiété générale (trait)",
                    category: "Anxiété généralisée",
                    time: "15-20 minutes",
                  },
                ].map((scale) => (
                  <div
                    key={scale.name}
                    className="bg-background border border-border rounded-lg p-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-1.5 min-w-0">
                        <Interfaces.Star className="h-3 w-3 text-primary/40 flex-shrink-0 mt-0.5" fill="currentColor" />
                        <div className="min-w-0">
                          <p className="text-[10px] font-heading font-bold text-foreground leading-tight">
                            {scale.name}
                          </p>
                          <p className="text-[8px] font-body text-muted-foreground leading-snug mt-0.5 line-clamp-2">
                            {scale.desc}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[8px] font-body text-muted-foreground">
                              {scale.category}
                            </span>
                            <span className="flex items-center gap-0.5 text-[8px] font-body text-muted-foreground">
                              <Interfaces.Clock className="h-2.5 w-2.5" fill="currentColor" />
                              {scale.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[8px] font-body text-muted-foreground flex-shrink-0">
                        Détails
                      </span>
                    </div>
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
            <div className="absolute -inset-4 bg-gradient-to-b from-brand-orange/5 via-brand-orange/10 to-transparent rounded-3xl blur-xl" />
            <div className="relative">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
