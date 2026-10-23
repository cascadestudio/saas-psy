import type { Metadata } from "next";

export const SITE_URL = "https://www.melya.app";

const OG_IMAGE = { url: "/opengraph-image.png", width: 1200, height: 630 };

/**
 * Metadata complète d'une page publique.
 *
 * Next remplace `openGraph` et `twitter` en bloc au lieu de les fusionner avec
 * le layout racine : une page qui ne définit que son titre hérite de l'og:url
 * de l'accueil, et une page qui définit `openGraph` perd l'image, le siteName
 * et la locale. On reconstruit donc tout ici, pour chaque page.
 */
export function pageMetadata({
  title,
  description,
  path,
  openGraph,
}: {
  title: string;
  description?: string;
  /** Chemin absolu (`/echelles`), ou `""` pour l'accueil. */
  path: string;
  openGraph?: Partial<NonNullable<Metadata["openGraph"]>>;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Melya",
      locale: "fr_FR",
      type: "website",
      images: [OG_IMAGE],
      ...openGraph,
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
