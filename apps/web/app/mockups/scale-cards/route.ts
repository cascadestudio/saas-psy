import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Sert le mockup HTML statique (support de design review, non wrappé par le layout Next).
// Lecture disque à chaque requête + no-store : les éditions du .html apparaissent immédiatement,
// sans le cache mémoire du handler d'assets `public/`.
export const dynamic = "force-dynamic";

export async function GET() {
  const filePath = join(process.cwd(), "public", "mockups", "scale-cards.html");
  const html = await readFile(filePath, "utf8");
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
