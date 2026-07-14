import type { MetadataRoute } from "next";

import { allScaleSlugs } from "@/lib/scale-slug";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const scalePages: MetadataRoute.Sitemap = allScaleSlugs().map((slug) => ({
    url: `https://www.melya.app/echelles/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
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
