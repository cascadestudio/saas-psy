import type { Metadata } from "next";
import Link from "next/link";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { getBlogPosts } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Le blog de Melya — psychométrie et pratique clinique",
  description:
    "Guides pratiques sur les échelles psychométriques, le suivi longitudinal, le scoring et la conformité RGPD, pour les psychologues.",
  alternates: { canonical: "https://www.melya.app/blog" },
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Navbar />
      <main className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-title text-4xl md:text-5xl">Le blog</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Psychométrie, suivi longitudinal et pratique clinique.
          </p>

          {posts.length === 0 ? (
            <p className="mt-12 text-muted-foreground">
              Aucun article pour le moment.
            </p>
          ) : (
            <ul className="mt-12 space-y-8">
              {posts.map((post) => (
                <li key={post.slug} className="border-b pb-8">
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <time
                      dateTime={post.publishedAt}
                      className="text-xs uppercase tracking-wide text-muted-foreground"
                    >
                      {dateFormatter.format(new Date(post.publishedAt))}
                    </time>
                    <h2 className="mt-2 font-title text-2xl group-hover:text-brand-orange">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
