import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { CtaButton } from "@/components/landing/cta-button";
import { getBlogPost, getBlogPosts } from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  const url = `https://www.melya.app/blog/${slug}`;
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription,
      url,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="px-4 py-16">
        <article className="mx-auto max-w-3xl">
          <time
            dateTime={post.publishedAt}
            className="text-xs uppercase tracking-wide text-muted-foreground"
          >
            {dateFormatter.format(new Date(post.publishedAt))}
          </time>
          <h1 className="mt-3 font-title text-4xl md:text-5xl">{post.title}</h1>
          <p className="mt-6 text-lg text-muted-foreground">{post.excerpt}</p>

          <div className="prose prose-neutral mt-12 max-w-none">
            <PortableText value={post.body as never} />
          </div>

          <div className="mt-16 rounded-2xl bg-surface-brand-bg p-8 text-center">
            <h2 className="font-title text-2xl">
              Automatisez vos échelles avec Melya
            </h2>
            <p className="mt-3 text-muted-foreground">
              Passation en ligne, cotation automatique, suivi longitudinal.
              Hébergement HDS en France.
            </p>
            <CtaButton className="mt-6 inline-block">
              Essayer Melya gratuitement
            </CtaButton>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
