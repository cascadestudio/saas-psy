import Link from "next/link";
import { scales, type Scale } from "@melya/core";

import { CtaButton } from "@/components/landing/cta-button";
import { DomainDot, ScaleTag } from "@/components/scale/ScaleTag";
import { questionCount } from "@/app/utils/utils";
import { scaleSlug } from "@/lib/scale-slug";
import { SITE_URL } from "@/lib/seo";
import { TableOfContents } from "./TableOfContents";
import type {
  Block,
  GuideSection,
  ScaleGuideContent,
} from "@/content/echelles/types";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(isoDate: string) {
  return dateFormatter.format(new Date(isoDate));
}

/** `**gras**` → <strong>. Aucun autre balisage n'est interprété. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-foreground">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4 text-muted-foreground leading-relaxed">
      {blocks.map((block, i) =>
        typeof block === "string" ? (
          <p key={i}>
            <Inline text={block} />
          </p>
        ) : (
          <ul key={i} className="list-disc space-y-2 pl-5">
            {block.list.map((item, j) => (
              <li key={j}>
                <Inline text={item} />
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-title text-2xl md:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function jsonLd(scale: Scale, content: ScaleGuideContent, url: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#page`,
        url,
        name: content.seoTitle,
        headline: content.heading,
        description: content.seoDescription,
        inLanguage: "fr-FR",
        dateModified: content.updatedAt,
        audience: {
          "@type": "MedicalAudience",
          audienceType: "Clinician",
        },
        about: { "@type": "MedicalCondition", name: scale.category },
        publisher: { "@id": `${SITE_URL}/#organization` },
        ...(content.reviewedBy && {
          lastReviewed: content.reviewedBy.date,
          reviewedBy: {
            "@type": "Person",
            name: content.reviewedBy.name,
            jobTitle: content.reviewedBy.jobTitle,
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Échelles",
            item: `${SITE_URL}/echelles`,
          },
          { "@type": "ListItem", position: 3, name: scale.acronym, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

/**
 * Fiche pratique d'une échelle, dans l'ordre des recherches des psys : ce qui
 * est le plus demandé (l'essentiel, cotation, interprétation) d'abord, les
 * références à la fin.
 */
export function ScaleGuide({
  scale,
  content,
}: {
  scale: Scale;
  content: ScaleGuideContent;
}) {
  const url = `${SITE_URL}/echelles/${scaleSlug(scale)}`;
  const appHref = `/app/echelles/${scale.id}`;

  const facts = [
    { label: "Items", value: String(questionCount(scale)) },
    { label: "Durée", value: scale.estimatedTime },
    {
      label: "Score",
      // Certaines échelles ne partent pas de 0 (PSWQ : 16 à 80).
      value: `${Math.min(...scale.scoring.ranges.map((r) => r.min))} – ${scale.scoring.maxScore}`,
    },
    { label: "Public", value: content.audience },
    { label: "Passation", value: content.administrationMode },
  ];

  const sections: { id: string; section: GuideSection }[] = [
    { id: "administration", section: content.administration },
    { id: "cotation", section: content.scoring },
    { id: "interpretation", section: content.interpretation },
    { id: "vigilance", section: content.vigilance },
    { id: "suivi", section: content.followUp },
    ...(content.extraSections ?? []).map((section, i) => ({
      id: `section-${i + 1}`,
      section,
    })),
  ];

  const toc = [
    ...sections.map(({ id, section }) => ({ id, title: section.title })),
    { id: "faq", title: "Questions fréquentes" },
    { id: "sources", title: "Questionnaire officiel et sources" },
  ];

  const related = content.related
    .map((id) => scales.find((s) => s.id === id))
    .filter((s): s is Scale => Boolean(s));

  const { questionnaire } = content;

  const tocList = <TableOfContents items={toc} />;

  return (
    <>
      <main className="px-4 pt-28 pb-20 md:pt-32 lg:px-8">
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)_260px] lg:grid-rows-[auto_1fr] lg:gap-x-12">
          <aside className="hidden lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:block">
            <nav
              aria-label="Sommaire"
              className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto"
            >
              <p className="text-sm font-semibold">Sommaire</p>
              {tocList}
            </nav>
          </aside>

          {/* `lg:contents` : en desktop, l'en-tête et le corps de l'article deviennent deux cellules de la grille. */}
          <article className="lg:contents">
            <div className="mx-auto w-full max-w-3xl lg:col-start-2 lg:row-start-1">
              <nav
                aria-label="Fil d'Ariane"
                className="text-sm text-muted-foreground"
              >
                <Link href="/echelles" className="hover:text-foreground">
                  Échelles
                </Link>
                <span className="mx-2">›</span>
                <span className="text-foreground">{scale.acronym}</span>
              </nav>

              <header className="mt-8">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <DomainDot domain={scale.domain} />
                  {scale.category}
                </span>
                <h1 className="mt-4 font-title text-4xl md:text-5xl">
                  {content.heading}
                </h1>
                <p className="mt-4 text-sm text-muted-foreground">
                  Mis à jour le {formatDate(content.updatedAt)}
                  {content.reviewedBy && (
                    <>
                      {" · "}Relu par {content.reviewedBy.name},{" "}
                      {content.reviewedBy.jobTitle.toLowerCase()}, le{" "}
                      {formatDate(content.reviewedBy.date)}
                    </>
                  )}
                </p>
              </header>

              <section
                aria-labelledby="essentiel"
                className="mt-10 rounded-2xl border p-6"
              >
                <h2
                  id="essentiel"
                  className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  L'essentiel
                </h2>
                <div className="mt-4 space-y-3 text-lg leading-relaxed">
                  {content.essentials.map((line, i) => (
                    <p key={i}>
                      <Inline text={line} />
                    </p>
                  ))}
                </div>

                {/*
                  Séparateurs verticaux seulement. Sur une ligne (sm+) :
                  divide-x. Sur 2 colonnes (mobile) : trait à droite de la
                  colonne de gauche ; la dernière case prend toute la largeur.
                */}
                <dl className="mt-6 grid grid-cols-2 gap-y-4 sm:grid-cols-5 sm:divide-x max-sm:[&>*:nth-child(odd):not(:last-child)]:border-r [&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="px-4 first:pl-0 max-sm:odd:pl-0"
                    >
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 font-medium">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                {/* En desktop, ces boutons vivent dans la colonne sticky de droite. */}
                <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:hidden">
                  <CtaButton href={appHref}>
                    Envoyer le {scale.acronym} à un patient
                  </CtaButton>
                  {questionnaire.kind === "download" && (
                    <a
                      href={questionnaire.file}
                      download
                      className="rounded-full border px-6 py-3 font-body text-sm font-medium transition-colors hover:bg-surface-brand-bg"
                    >
                      Télécharger le PDF officiel
                    </a>
                  )}
                </div>
              </section>

              <nav aria-label="Sommaire" className="mt-10 lg:hidden">
                <p className="text-sm font-semibold">Sommaire</p>
                {tocList}
              </nav>
            </div>

            <div className="mx-auto w-full max-w-3xl lg:col-start-2 lg:row-start-2">
              <div className="mt-14 space-y-14">
                {sections.map(({ id, section }) => (
                  <Section key={id} id={id} title={section.title}>
                    {id === "cotation" && (
                      <p className="mb-4 rounded-xl bg-surface-brand-bg p-4 leading-relaxed">
                        {scale.scoring.method}
                      </p>
                    )}
                    {id === "interpretation" && (
                      // Les seuils viennent de @melya/core : ce sont, par
                      // construction, ceux que la cotation de l'app applique.
                      <table className="mb-6 w-full text-left text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 font-medium">Score</th>
                            <th className="py-2 font-medium">Interprétation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scale.scoring.ranges.map((range) => (
                            <tr
                              key={`${range.min}-${range.max}`}
                              className="border-b"
                            >
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
                    )}
                    <Blocks blocks={section.body} />
                  </Section>
                ))}

                <Section id="faq" title="Questions fréquentes">
                  {/*
                <details> plutôt que l'Accordion Radix : Radix ne rend pas le
                contenu fermé dans le HTML, et Google ne verrait pas les
                réponses.
              */}
                  <div className="space-y-3">
                    {content.faq.map((item) => (
                      <details
                        key={item.question}
                        className="group rounded-xl border px-5 open:shadow-sm"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                          <h3>{item.question}</h3>
                          <span
                            aria-hidden
                            className="text-muted-foreground transition-transform group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <p className="pb-5 leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </Section>

                <Section id="sources" title="Questionnaire officiel et sources">
                  <div className="space-y-8">
                    <div className="rounded-xl border p-5">
                      <h3 className="font-semibold">Questionnaire officiel</h3>
                      {questionnaire.kind === "download" && (
                        <>
                          <p className="mt-2 text-muted-foreground">
                            Version diffusée par {questionnaire.publisher}, au
                            format PDF, avec sa mention de droits d'origine.
                          </p>
                          <a
                            href={questionnaire.file}
                            download
                            className="mt-4 inline-block rounded-full border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-surface-brand-bg"
                          >
                            Télécharger le {scale.acronym} (PDF)
                          </a>
                        </>
                      )}
                      {questionnaire.kind === "link" && (
                        <p className="mt-2 text-muted-foreground">
                          Le questionnaire est diffusé par{" "}
                          {questionnaire.publisher} :{" "}
                          <a
                            href={questionnaire.url}
                            target="_blank"
                            rel="noopener"
                            className="underline underline-offset-2 hover:text-foreground"
                          >
                            consulter la source officielle
                          </a>
                          .
                        </p>
                      )}
                      {questionnaire.kind === "none" && (
                        <p className="mt-2 text-muted-foreground">
                          {questionnaire.reason}
                        </p>
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold">Version française</h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        {content.frenchVersion.summary}
                      </p>
                      {!content.frenchVersion.validated && (
                        <p className="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
                          {content.frenchVersion.warning ??
                            "Cette version française n'a pas fait l'objet d'une étude de validation publiée sur population française."}
                        </p>
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Citer le {scale.acronym} (APA 7)
                      </h3>
                      <p className="mt-2 rounded-lg bg-muted px-4 py-3 text-sm leading-relaxed">
                        {content.apaCitation}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Références</h3>
                      <ol className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                        {content.sources.map((source) => (
                          <li key={source.citation}>
                            {source.citation}
                            {source.url && (
                              <>
                                {" "}
                                <a
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener"
                                  className="break-all underline underline-offset-2 hover:text-foreground"
                                >
                                  {source.url.replace(/^https:\/\//, "")}
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {scale.copyrightAttribution}
                    </p>
                  </div>
                </Section>

                {related.length > 0 && (
                  <section aria-labelledby="related">
                    <h2 id="related" className="font-title text-2xl">
                      Échelles proches
                    </h2>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {related.map((s) => (
                        <li key={s.id}>
                          <Link
                            href={`/echelles/${scaleSlug(s)}`}
                            className="block h-full rounded-xl border p-4 transition-colors hover:bg-surface-brand-bg"
                          >
                            <ScaleTag
                              domain={s.domain}
                              acronym={s.acronym}
                              className="font-medium"
                            />
                            <p className="mt-1 text-sm text-muted-foreground">
                              {s.label}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <div className="mt-16 rounded-2xl bg-surface-brand-bg p-8 text-center">
                <h2 className="font-title text-2xl md:text-3xl">
                  Envoyez le {scale.acronym} à vos patients en deux minutes
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Passation en ligne, cotation automatique, historique des
                  passations. Hébergement HDS en France.
                </p>
                <CtaButton href={appHref} className="mt-6 inline-block">
                  Essayer Melya gratuitement
                </CtaButton>
              </div>
            </div>
          </article>

          <aside className="hidden lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:block">
            <div className="sticky top-28 rounded-2xl border p-5">
              <p className="font-title text-lg leading-snug">
                Faites passer le {scale.acronym} en ligne
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Le patient répond depuis son téléphone, le score est calculé
                automatiquement.
              </p>
              <CtaButton href={appHref} className="mt-4 block px-4 text-center">
                Envoyer le {scale.acronym} à un patient
              </CtaButton>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                100% gratuit
              </p>
              {questionnaire.kind === "download" && (
                <a
                  href={questionnaire.file}
                  download
                  className="mt-4 block rounded-full border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:bg-surface-brand-bg"
                >
                  Télécharger le PDF officiel
                </a>
              )}
            </div>
          </aside>
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(scale, content, url)),
        }}
      />
    </>
  );
}
