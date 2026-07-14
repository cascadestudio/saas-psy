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
 * conditionne pas l'existence — et une panne Sanity ne fait pas tomber le SEO.
 */
export async function getScaleLandingPage(
  scaleId: string,
): Promise<ScaleLandingPage | null> {
  return sanityClient.fetch<ScaleLandingPage | null>(
    groq`*[_type == "scaleLandingPage" && scaleId == $scaleId][0]{ ${scaleLandingPageFields} }`,
    { scaleId },
  );
}

export async function getAllScaleLandingPages(): Promise<ScaleLandingPage[]> {
  return sanityClient.fetch<ScaleLandingPage[]>(
    groq`*[_type == "scaleLandingPage"]{ ${scaleLandingPageFields} }`,
  );
}
