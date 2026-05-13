"use client";

import { useScrollAnimation } from "./use-scroll-animation";
import { Interfaces, Files } from "doodle-icons";
import Image from "next/image";

type SessionRowData = {
  acronym: string;
  color: string;
  icon: string;
  patient: string;
  rightLabel?: string;
  badge?: { label: string; className: string };
  score?: string;
  interpretation?: string;
};

const inProgressRows: SessionRowData[] = [
  {
    acronym: "PHQ-9",
    color: "#CBCADB",
    icon: "/images/scales/phq-9.svg",
    patient: "Marie Dupont",
    badge: { label: "À relancer", className: "bg-fuchsia-100 text-fuchsia-700 ring-1 ring-fuchsia-500/30" },
    rightLabel: "il y a 8 j",
  },
  {
    acronym: "GAD-7",
    color: "#6A9BCC",
    icon: "/images/scales/gad-7.svg",
    patient: "Jean Martin",
    badge: { label: "Envoyée", className: "bg-blue-100 text-blue-700" },
    rightLabel: "hier",
  },
  {
    acronym: "PCL-5",
    color: "#C46686",
    icon: "/images/scales/pcl-5.svg",
    patient: "Sophie Bernard",
    badge: { label: "En cours", className: "bg-amber-100 text-amber-700" },
    rightLabel: "aujourd'hui",
  },
];

const recentResultsRows: SessionRowData[] = [
  {
    acronym: "LSAS",
    color: "#6A9BCC",
    icon: "/images/scales/lsas.svg",
    patient: "Lucas Moreau",
    badge: { label: "Non lu", className: "bg-violet-100 text-violet-700" },
    score: "62",
    interpretation: "Phobie sociale modérée",
  },
  {
    acronym: "RSES",
    color: "#E7BC92",
    icon: "/images/scales/rses.svg",
    patient: "Camille Petit",
    score: "28",
    interpretation: "Estime de soi élevée",
  },
];

function Row({ row }: { row: SessionRowData }) {
  return (
    <div className="flex items-center gap-2 px-2.5 py-2 border-t border-border/50 first:border-t-0">
      <div
        className="flex items-center justify-center flex-shrink-0 rounded-md"
        style={{ backgroundColor: row.color, width: 24, height: 24 }}
      >
        <Image
          src={row.icon}
          alt={row.acronym}
          width={16}
          height={16}
          className="w-3/5 h-3/5 object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-sans font-bold text-foreground leading-tight truncate">
          {row.patient}
        </p>
        <p className="text-[8px] font-body text-muted-foreground leading-snug truncate">
          {row.acronym}
        </p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {row.badge && (
          <span
            className={`text-[7px] font-body font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${row.badge.className}`}
          >
            {row.badge.label}
          </span>
        )}
        {row.score ? (
          <div className="text-right">
            <p className="text-[10px] font-sans font-bold text-foreground leading-tight">
              {row.score}
            </p>
            <p className="text-[7px] font-body text-muted-foreground leading-snug">
              {row.interpretation}
            </p>
          </div>
        ) : (
          row.rightLabel && (
            <span className="text-[8px] font-body text-muted-foreground whitespace-nowrap">
              {row.rightLabel}
            </span>
          )
        )}
      </div>
    </div>
  );
}

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
          <aside className="hidden sm:flex w-36 flex-col bg-surface-brand-bg rounded-r-xl flex-shrink-0">
            <div className="flex items-center justify-center py-4">
              <Image
                src="/images/logos/logo-melya.svg"
                alt="Melya"
                width={72}
                height={22}
              />
            </div>
            <nav className="flex-1 space-y-0.5 px-3 py-2">
              <div className="relative flex items-center gap-2 px-2 py-1.5 text-[10px] font-body font-medium text-brand-orange translate-x-0.5">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-px rounded-full bg-brand-orange" />
                <Interfaces.Home className="h-3 w-3" fill="currentColor" />
                Tableau de bord
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] font-body text-muted-foreground">
                <Interfaces.User className="h-3 w-3" fill="currentColor" />
                Mes patient·e·s
              </div>
              <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] font-body text-muted-foreground">
                <Files.FileText className="h-3 w-3" fill="currentColor" />
                Échelles
              </div>
            </nav>
            <div className="px-3 pb-4">
              <div className="border-t border-brand-orange/20 pt-2 space-y-0.5">
                <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] font-body text-muted-foreground">
                  <Interfaces.Setting className="h-3 w-3" fill="currentColor" />
                  Paramètres
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] font-body text-muted-foreground">
                  <Interfaces.Message className="h-3 w-3" fill="currentColor" />
                  Nous contacter
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="px-4 sm:px-5 pt-4 pb-5">
              {/* Greeting */}
              <h3 className="font-gelica font-normal text-base sm:text-lg text-foreground leading-tight mb-3">
                Bonjour, Claire
              </h3>

              {/* Actions */}
              <div className="flex gap-2 mb-5">
                <div className="flex items-center gap-1.5 bg-primary text-primary-foreground text-[9px] font-body font-medium px-2.5 py-1.5 rounded-md">
                  <Interfaces.Send className="h-2.5 w-2.5" fill="currentColor" />
                  Envoyer une échelle
                </div>
                <div className="flex items-center gap-1.5 bg-secondary text-foreground text-[9px] font-body font-medium px-2.5 py-1.5 rounded-md">
                  <Interfaces.UserAdd className="h-2.5 w-2.5" fill="currentColor" />
                  Créer un·e patient·e
                </div>
              </div>

              {/* Passations en cours */}
              <div className="mb-4">
                <h4 className="text-[11px] font-sans font-semibold text-foreground mb-1.5">
                  Passations en cours{" "}
                  <span className="text-muted-foreground font-normal">(3)</span>
                </h4>
                <div className="bg-muted-foreground/5 rounded-lg p-1.5">
                  <div className="rounded-md overflow-hidden">
                    {inProgressRows.map((row, i) => (
                      <Row key={i} row={row} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Résultats récents */}
              <div className="mb-3">
                <h4 className="text-[11px] font-sans font-semibold text-foreground mb-1.5">
                  Résultats récents{" "}
                  <span className="text-muted-foreground font-normal">(2)</span>
                </h4>
                <div className="bg-muted-foreground/5 rounded-lg p-1.5">
                  <div className="rounded-md overflow-hidden">
                    {recentResultsRows.map((row, i) => (
                      <Row key={i} row={row} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[9px] font-body text-muted-foreground">
                Tous mes patient·e·s
                <span>→</span>
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
          <h2 className="font-gelica text-3xl sm:text-4xl font-normal text-center text-foreground mb-4">
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
