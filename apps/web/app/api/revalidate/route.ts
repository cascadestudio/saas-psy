import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { scaleSlugById } from "@/lib/scale-slug";

/**
 * Webhook appelé par Sanity à chaque publication.
 *
 * Sans lui, les pages ne se rafraîchissent qu'au bout de 60 s (`revalidate`),
 * et encore : la première requête après expiration sert la version périmée et
 * ne fait que déclencher la régénération en arrière-plan. L'éditeur doit donc
 * recharger deux fois et croit que la publication n'a pas fonctionné.
 *
 * La signature est vérifiée avec `SANITY_REVALIDATE_SECRET` : sans ça,
 * n'importe qui pourrait forcer la régénération de vos pages en boucle.
 */
type WebhookPayload = {
  _type: string;
  scaleId?: string;
  slug?: string;
};

function pathsToRevalidate(body: WebhookPayload): string[] {
  if (body._type === "scaleLandingPage" && body.scaleId) {
    const slug = scaleSlugById(body.scaleId);
    // Une échelle retirée de @melya/core n'a plus de page publique : on ne
    // revalide rien plutôt que de fabriquer une URL qui n'existe pas.
    return slug ? [`/echelles/${slug}`, "/sitemap.xml"] : [];
  }

  if (body._type === "blogPost" && body.slug) {
    return [`/blog/${body.slug}`, "/blog", "/sitemap.xml"];
  }

  return [];
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new Response("Signature invalide", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Payload sans _type", { status: 400 });
    }

    const paths = pathsToRevalidate(body);
    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: paths.length > 0, paths });
  } catch (error) {
    console.error("[revalidate] échec du webhook Sanity", error);
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return new Response(message, { status: 500 });
  }
}
