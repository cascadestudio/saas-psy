import { scales, type Scale } from "@melya/core";

/**
 * Slug public d'une échelle, dérivé de l'acronyme (`phq-9`, `lsas`, `y-bocs`).
 *
 * Les `id` de `@melya/core` sont hétérogènes pour des raisons historiques
 * (`phq-9` mais aussi `echelle-d-anxiete-sociale-de-liebowitz`) et servent de
 * clé interne. Les URLs publiques, elles, doivent reprendre ce que le psy tape
 * dans Google : l'acronyme, sans accents (`ÉII` → `eii`) : Next ne retrouve
 * pas un slug accentué une fois encodé dans l'URL, la page tombait en 404.
 */
export function scaleSlug(scale: Scale): string {
  return (
    SLUG_OVERRIDES[scale.id] ??
    scale.acronym
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
  );
}

/**
 * Échelles qui partagent un acronyme : sans slug dédié, la seconde n'a pas de
 * page publique (`getScaleBySlug` renvoie toujours la première).
 */
const SLUG_OVERRIDES: Record<string, string> = {
  "bat-w": "bat-travail",
  "bat-g": "bat-general",
};

export function getScaleBySlug(slug: string): Scale | undefined {
  return scales.find((scale) => scaleSlug(scale) === slug);
}

/**
 * Sanity ne connaît que l'`id` de core (`scaleId`) ; le webhook de revalidation
 * doit le retraduire en slug public pour cibler la bonne page.
 */
export function scaleSlugById(id: string): string | undefined {
  const scale = scales.find((s) => s.id === id);
  return scale ? scaleSlug(scale) : undefined;
}

export function allScaleSlugs(): string[] {
  return scales.map(scaleSlug);
}
