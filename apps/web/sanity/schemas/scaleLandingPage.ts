import { defineField, defineType } from "sanity";
import { scales } from "@melya/core";

/**
 * Page marketing publique d'une échelle (`/echelles/<slug>`).
 *
 * Périmètre volontairement restreint au **contenu marketing**. Tout ce qui est
 * clinique — items, consignes, seuils de scoring, interprétations, mention de
 * copyright — vient de `@melya/core` et n'est pas éditable ici : c'est de la
 * donnée produit, elle ne doit pas dépendre d'une saisie CMS.
 *
 * Le schéma est contraint (pas de HTML libre, pas de champ « questionnaire »)
 * pour qu'il soit structurellement impossible de republier les items d'une
 * échelle sous copyright sur une page publique.
 */
export const scaleLandingPage = defineType({
  name: "scaleLandingPage",
  title: "Page échelle",
  type: "document",
  fields: [
    defineField({
      name: "scaleId",
      title: "Échelle",
      description:
        "L'échelle décrite par cette page. Les données cliniques (durée, nombre d'items, cotation) sont reprises automatiquement de l'application.",
      type: "string",
      options: {
        list: scales.map((s) => ({
          title: `${s.acronym} — ${s.label}`,
          value: s.id,
        })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "Titre SEO",
      description:
        "Titre affiché dans l'onglet du navigateur et dans les résultats Google. Environ 60 caractères : au-delà, Google tronque.",
      type: "string",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Description SEO",
      description:
        "Texte affiché sous le titre dans les résultats Google. Environ 155 caractères.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(170),
    }),
    defineField({
      name: "heading",
      title: "Titre de la page (H1)",
      description: "Le grand titre en haut de la page.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Accroche",
      description:
        "Un ou deux paragraphes sous le titre. C'est ce que lit le psy qui arrive de Google.",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      description:
        "Le corps de la page. Par exemple : « Pour qui ? », « Quand l'utiliser en consultation ? », « Comment Melya l'automatise ». N'y écris pas la cotation ni les seuils d'interprétation : la page les affiche automatiquement, tels que l'application les calcule.",
      type: "array",
      of: [
        {
          type: "object",
          name: "section",
          fields: [
            defineField({
              name: "title",
              title: "Titre de section",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Contenu",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [
                    { title: "Paragraphe", value: "normal" },
                    { title: "Sous-titre", value: "h3" },
                  ],
                  lists: [{ title: "Liste à puces", value: "bullet" }],
                  marks: {
                    decorators: [
                      { title: "Gras", value: "strong" },
                      { title: "Italique", value: "em" },
                    ],
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Lien",
                        fields: [
                          {
                            name: "href",
                            type: "url",
                            title: "URL",
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      description:
        "Les questions que se pose un psy avant de tester. Alimente aussi le balisage FAQ de Google.",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Réponse",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "Texte du bouton",
      description:
        "Le bouton principal de la page. Par défaut : « Essayer Melya gratuitement ».",
      type: "string",
    }),
    defineField({
      name: "ogImage",
      title: "Image de partage",
      description:
        "Image affichée quand la page est partagée sur LinkedIn, X, WhatsApp. Format paysage, 1200x630.",
      type: "image",
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "scaleId" },
  },
});
