// Apparence des échelles : l'acronyme identifie l'échelle, un point de couleur
// indique son domaine clinique. Les tuiles restent neutres (pas de fond coloré).

import type { ScaleDomain } from "@melya/core";

export interface DomainAppearance {
  /** Libellé du domaine. */
  label: string;
  /** Couleur du point de domaine. */
  color: string;
}

// Palette du color-picker de référence (cf. public/mockups/scale-cards.html).
// Teintes encore libres pour de futurs domaines : salmon, sable, blush, bleu clair.
const PALETTE = {
  gold: "#F2C33E",
  terracotta: "#DB6A45",
  ochre: "#A66A24",
  green: "#23380F",
  navy: "#12213F",
  blue: "#2E62C3",
  sage: "#CBD8CE",
} as const;

/** Ordre d'affichage des domaines (sections du catalogue, filtres). */
export const DOMAIN_ORDER: ScaleDomain[] = [
  "anxiete",
  "humeur",
  "trauma",
  "toc",
  "estime",
  "addictions",
  "hypersensibilite",
];

const DOMAIN_APPEARANCE: Record<ScaleDomain, DomainAppearance> = {
  anxiete: { label: "Anxiété", color: PALETTE.blue },
  humeur: { label: "Humeur", color: PALETTE.navy },
  trauma: { label: "Trauma", color: PALETTE.terracotta },
  toc: { label: "TOC", color: PALETTE.sage },
  estime: { label: "Estime de soi", color: PALETTE.gold },
  addictions: { label: "Addictions", color: PALETTE.ochre },
  hypersensibilite: { label: "Hypersensibilité", color: PALETTE.green },
};

// Échelle inconnue (id absent du catalogue, données de session orphelines).
const FALLBACK_APPEARANCE: DomainAppearance = { label: "Autre", color: PALETTE.sage };

export function getScaleAppearance(domain: ScaleDomain | undefined): DomainAppearance {
  return (domain && DOMAIN_APPEARANCE[domain]) ?? FALLBACK_APPEARANCE;
}
