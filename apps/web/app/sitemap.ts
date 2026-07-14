import type { MetadataRoute } from "next";

import { allScaleSlugs } from "@/lib/scale-slug";
import { getBlogPosts } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const scalePages: MetadataRoute.Sitemap = allScaleSlugs().map((slug) => ({
    url: `https://www.melya.app/echelles/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // getBlogPosts avale ses erreurs : si Sanity tombe, le sitemap perd les
  // articles mais reste servi avec les pages statiques.
  const posts = await getBlogPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://www.melya.app/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://www.melya.app",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.melya.app/echelles",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...scalePages,
    {
      url: "https://www.melya.app/blog",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogPages,
    {
      url: "https://www.melya.app/securite",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.melya.app/confidentialite",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://www.melya.app/mentions-legales",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
