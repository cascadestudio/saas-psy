import { groq } from "next-sanity";

import { sanityClient } from "./client";

export type ScaleLandingSection = {
  title: string;
  body: unknown[];
};

export type ScaleLandingFaqItem = {
  question: string;
  answer: string;
};

export type ScaleLandingPage = {
  scaleId: string;
  seoTitle: string;
  seoDescription: string;
  heading: string;
  intro: string;
  sections?: ScaleLandingSection[];
  faq?: ScaleLandingFaqItem[];
  ctaLabel?: string;
  ogImage?: { asset?: { _ref: string } };
};

const scaleLandingPageFields = groq`
  scaleId,
  seoTitle,
  seoDescription,
  heading,
  intro,
  sections[]{ title, body },
  faq[]{ question, answer },
  ctaLabel,
  ogImage
`;

/**
 * Le contenu Sanity est optionnel : une échelle sans page publiée reste servie
 * avec les seules données de `@melya/core`. Le CMS enrichit la page, il n'en
 * conditionne pas l'existence.
 *
 * Un échec de Sanity est donc traité comme une absence de contenu, pas comme
 * une erreur : la page retombe sur `@melya/core` et reste indexable. Laisser
 * l'exception remonter ferait tomber le build (et le SEO) sur une panne du CMS
 * marketing, ce qui inverserait complètement la hiérarchie des priorités.
 */
export async function getScaleLandingPage(
  scaleId: string,
): Promise<ScaleLandingPage | null> {
  try {
    return await sanityClient.fetch<ScaleLandingPage | null>(
      groq`*[_type == "scaleLandingPage" && scaleId == $scaleId][0]{ ${scaleLandingPageFields} }`,
      { scaleId },
    );
  } catch (error) {
    console.error(
      `[sanity] contenu indisponible pour "${scaleId}", page servie depuis @melya/core`,
      error,
    );
    return null;
  }
}
