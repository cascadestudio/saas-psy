// Apparence des cartes d'échelle : une teinte par domaine (palette design review).
// La couleur est dérivée de `category` en attendant un champ `domain` dédié dans @melya/core.
// `darkInk: true` => fond foncé, texte clair. `false` => fond clair, texte foncé.

export interface DomainAppearance {
  /** Libellé de domaine (regroupe plusieurs `category`). */
  domain: string;
  /** Couleur de fond de la carte / pastille de filtre. */
  bg: string;
  /** true = fond foncé (texte clair), false = fond clair (texte foncé). */
  darkInk: boolean;
}

// Palette du color-picker de référence.
const PALETTE = {
  gold: "#F2C33E",
  salmon: "#F0A883",
  terracotta: "#DB6A45",
  ochre: "#A66A24",
  green: "#23380F",
  navy: "#12213F",
  blue: "#2E62C3",
  sage: "#CBD8CE",
} as const;

const DEFAULT_APPEARANCE: DomainAppearance = {
  domain: "Autre",
  bg: PALETTE.sage,
  darkInk: false,
};

// category (fr) -> apparence de domaine
const CATEGORY_MAP: Record<string, DomainAppearance> = {
  "Anxiété sociale": { domain: "Anxiété", bg: PALETTE.blue, darkInk: true },
  "Anxiété généralisée": { domain: "Anxiété", bg: PALETTE.blue, darkInk: true },
  Dépression: { domain: "Humeur", bg: PALETTE.navy, darkInk: true },
  Traumatismes: { domain: "Trauma", bg: PALETTE.terracotta, darkInk: true },
  "Troubles Obsessionnels Compulsifs": { domain: "TOC", bg: PALETTE.sage, darkInk: false },
  "Estime de soi": { domain: "Estime & personnalité", bg: PALETTE.gold, darkInk: false },
  Addictions: { domain: "Addictions", bg: PALETTE.ochre, darkInk: true },
  Hypersensibilité: { domain: "Hypersensibilité", bg: PALETTE.green, darkInk: true },
};

export function getScaleAppearance(category: string): DomainAppearance {
  return CATEGORY_MAP[category] ?? DEFAULT_APPEARANCE;
}
