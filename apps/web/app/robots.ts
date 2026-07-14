import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/app",
          "/app/",
          "/session/",
          "/p/",
          "/protected",
          "/sign-in",
          "/sign-up",
          "/forgot-password",
          "/reset-password/",
        ],
      },
    ],
    sitemap: "https://www.melya.app/sitemap.xml",
    host: "https://www.melya.app",
  };
}
