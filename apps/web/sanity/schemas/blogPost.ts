import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Article de blog (`/blog/<slug>`).
 *
 * Contrairement à `scaleLandingPage`, il n'y a pas d'échelle rattachée et donc
 * pas de bloc de cotation généré depuis `@melya/core`. Un article qui parle de
 * seuils doit renvoyer vers la page de l'échelle plutôt que de les recopier :
 * un chiffre saisi ici ne suit pas les corrections faites dans le scoring.
 */
export const blogPost = defineType({
  name: "blogPost",
  title: "Article de blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre de l'article (H1)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "L'adresse de l'article : melya.app/blog/<slug>. Une fois publié, ne le change plus — les liens et le référencement acquis pointent dessus.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "Titre SEO",
      description:
        "Titre affiché dans les résultats Google. Environ 60 caractères. Si vide, le titre de l'article est utilisé.",
      type: "string",
      validation: (rule) => rule.max(70),
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
      name: "excerpt",
      title: "Accroche",
      description:
        "Le chapô de l'article, aussi affiché dans la liste des articles.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraphe", value: "normal" },
            { title: "Titre de section", value: "h2" },
            { title: "Sous-titre", value: "h3" },
            { title: "Citation", value: "blockquote" },
          ],
          lists: [
            { title: "Liste à puces", value: "bullet" },
            { title: "Liste numérotée", value: "number" },
          ],
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
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ogImage",
      title: "Image de partage",
      description:
        "Image affichée quand l'article est partagé. Format paysage, 1200x630.",
      type: "image",
    }),
  ],
  orderings: [
    {
      title: "Plus récents",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt" },
  },
});
