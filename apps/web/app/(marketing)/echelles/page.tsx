import type { Metadata } from "next";
import Link from "next/link";
import { scales } from "@melya/core";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { CtaButton } from "@/components/landing/cta-button";
import { questionCount } from "@/app/utils/utils";
import { scaleSlug } from "@/lib/scale-slug";
import { DOMAIN_ORDER, getScaleAppearance } from "@/lib/scale-appearance";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { ScaleTag } from "@/components/scale/ScaleTag";

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: "Échelles psychométriques : cotation et interprétation | Melya",
  description:
    "PHQ-9, GAD-7, LSAS, PCL-5, Y-BOCS, AUDIT… Toutes les échelles psychométriques de Melya, avec cotation, seuils d'interprétation et questionnaire officiel.",
  path: "/echelles",
});

/**
 * Page catalogue : elle mène à chaque fiche échelle, qui porte l'essentiel du
 * SEO. Les échelles sont groupées par domaine clinique (ordre du catalogue de
 * l'app) pour que le psy trouve vite celles de sa problématique.
 */
const groups = DOMAIN_ORDER.map((domain) => ({
  domain,
  label: getScaleAppearance(domain).label,
  scales: scales.filter((scale) => scale.domain === domain),
})).filter((group) => group.scales.length > 0);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/echelles#page`,
      url: `${SITE_URL}/echelles`,
      name: "Échelles psychométriques",
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: scales.length,
        itemListElement: groups
          .flatMap((group) => group.scales)
          .map((scale, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${scale.acronym} — ${scale.label}`,
            url: `${SITE_URL}/echelles/${scaleSlug(scale)}`,
          })),
      },
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
      ],
    },
  ],
};

export default function ScalesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="px-4 pt-28 pb-20 md:pt-32">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-title text-4xl md:text-5xl">
            Les échelles psychométriques
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {scales.length} échelles validées, avec pour chacune une fiche
            pratique : comment l'administrer, la coter, interpréter le score et
            suivre l'évolution du patient. Toutes peuvent être envoyées à vos
            patients et cotées automatiquement avec Melya.
          </p>

          <nav aria-label="Domaines" className="mt-8 flex flex-wrap gap-2">
            {groups.map((group) => (
              <a
                key={group.domain}
                href={`#${group.domain}`}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors hover:bg-surface-brand-bg"
              >
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: getScaleAppearance(group.domain).color,
                  }}
                />
                {group.label}
                <span className="text-muted-foreground">
                  {group.scales.length}
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-14 space-y-14">
            {groups.map((group) => (
              <section
                key={group.domain}
                id={group.domain}
                className="scroll-mt-24"
              >
                <h2 className="font-title text-2xl md:text-3xl">
                  {group.label}
                </h2>
                <ul className="mt-6 grid gap-4 md:grid-cols-2">
                  {group.scales.map((scale) => (
                    <li key={scale.id}>
                      <Link
                        href={`/echelles/${scaleSlug(scale)}`}
                        className="block h-full rounded-2xl border p-5 transition-colors hover:bg-surface-brand-bg"
                      >
                        <h3 className="font-medium">
                          <ScaleTag
                            domain={scale.domain}
                            acronym={scale.acronym}
                          />
                          <span className="mt-1 block font-normal text-foreground/80">
                            {scale.label}
                          </span>
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {scale.description}
                        </p>
                        <p className="mt-3 text-xs text-muted-foreground">
                          {scale.category} · {questionCount(scale)} items ·{" "}
                          {scale.estimatedTime}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-20 rounded-2xl bg-surface-brand-bg p-8 text-center">
            <h2 className="font-title text-2xl md:text-3xl">
              Envoyez vos échelles en deux minutes
            </h2>
            <p className="mt-3 text-muted-foreground">
              Passation en ligne, cotation automatique, historique des
              passations. Hébergement HDS en France.
            </p>
            <CtaButton className="mt-6 inline-block">
              Essayer Melya gratuitement
            </CtaButton>
          </div>
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
