import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { CtaButton } from "@/components/landing/cta-button";
import { questionCount } from "@/app/utils/utils";
import { allScaleSlugs, getScaleBySlug } from "@/lib/scale-slug";
import { getScaleLandingPage } from "@/sanity/lib/queries";

export const revalidate = 60;

export function generateStaticParams() {
  return allScaleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const scale = getScaleBySlug(slug);
  if (!scale) return {};

  const content = await getScaleLandingPage(scale.id);
  const title =
    content?.seoTitle ?? `${scale.acronym} — ${scale.label} en ligne | Melya`;
  const description = content?.seoDescription ?? scale.description;
  const url = `https://www.melya.app/echelles/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

export default async function ScaleLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scale = getScaleBySlug(slug);
  if (!scale) notFound();

  const content = await getScaleLandingPage(scale.id);

  const heading =
    content?.heading ?? `${scale.acronym} — ${scale.label}`;
  const intro = content?.intro ?? scale.longDescription;
  const ctaLabel = content?.ctaLabel ?? "Essayer Melya gratuitement";

  // Les faits cliniques viennent exclusivement de @melya/core : ils suivent
  // l'échelle réellement servie en passation, sans ressaisie dans le CMS.
  const facts = [
    { label: "Items", value: String(questionCount(scale)) },
    { label: "Durée", value: scale.estimatedTime },
    { label: "Score max", value: String(scale.scoring.maxScore) },
    { label: "Domaine", value: scale.category },
  ];

  const faqJsonLd = content?.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <>
      <Navbar />
      <main>
        <section className="px-4 pt-16 pb-12">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-4">
              <div
                className="flex aspect-square h-16 items-center justify-center rounded-2xl"
                style={{ backgroundColor: scale.color }}
              >
                <Image
                  src={scale.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {scale.category}
              </span>
            </div>

            <h1 className="mt-8 font-title text-4xl md:text-5xl">{heading}</h1>
            <p className="mt-6 whitespace-pre-line text-lg text-muted-foreground">
              {intro}
            </p>

            <div className="relative mt-8 inline-flex flex-col items-center">
              <CtaButton href={`/app/echelles/${scale.id}`}>
                {ctaLabel}
              </CtaButton>
              <span className="absolute -bottom-6 font-body text-xs text-foreground/50">
                100% gratuit
              </span>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-background p-4">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-lg font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/*
          La cotation est rendue depuis @melya/core, jamais saisie dans le CMS.
          Les seuils affichés ici sont, par construction, ceux que le scoring
          applique réellement : une page publique ne peut plus annoncer une
          interprétation que l'app contredit.
        */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-title text-2xl md:text-3xl">
              Cotation et interprétation
            </h2>
            <p className="mt-4 text-muted-foreground">
              {scale.scoring.method}
            </p>

            <table className="mt-6 w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 font-medium">Score</th>
                  <th className="py-2 font-medium">Interprétation</th>
                </tr>
              </thead>
              <tbody>
                {scale.scoring.ranges.map((range) => (
                  <tr key={`${range.min}-${range.max}`} className="border-b">
                    <td className="py-2 tabular-nums">
                      {range.min} – {range.max}
                    </td>
                    <td className="py-2 text-muted-foreground">
                      {range.interpretation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-4 text-xs text-muted-foreground">
              Ce sont les seuils appliqués par Melya lors de la cotation
              automatique du {scale.acronym}.
            </p>
          </div>
        </section>

        {content?.sections?.length ? (
          <section className="px-4 py-12">
            <div className="mx-auto max-w-3xl space-y-12">
              {content.sections.map((section) => (
                <div key={section.title}>
                  <h2 className="font-title text-2xl md:text-3xl">
                    {section.title}
                  </h2>
                  <div className="prose prose-neutral mt-4 max-w-none">
                    <PortableText value={section.body as never} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {content?.faq?.length ? (
          <section className="px-4 py-12">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-title text-2xl md:text-3xl">
                Questions fréquentes
              </h2>
              <div className="mt-6 space-y-6">
                {content.faq.map((item) => (
                  <div key={item.question}>
                    <h3 className="font-medium">{item.question}</h3>
                    <p className="mt-2 whitespace-pre-line text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="px-4 pb-20">
          <div className="mx-auto max-w-3xl rounded-2xl bg-surface-brand-bg p-8 text-center">
            <h2 className="font-title text-2xl md:text-3xl">
              Envoyez le {scale.acronym} à vos patients en deux minutes
            </h2>
            <p className="mt-3 text-muted-foreground">
              Passation en ligne, cotation automatique, suivi longitudinal.
              Hébergement HDS en France.
            </p>
            <CtaButton
              href={`/app/echelles/${scale.id}`}
              className="mt-6 inline-block"
            >
              {ctaLabel}
            </CtaButton>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-xs text-muted-foreground">
            {scale.copyrightAttribution}
          </p>
        </section>
      </main>
      <Footer />

      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
    </>
  );
}
