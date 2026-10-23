"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** Hauteur de la navbar fixe + marge : une section est « en cours » une fois passée sous cette ligne. */
const ACTIVE_LINE_PX = 140;

/**
 * Sommaire de la fiche, avec la section en cours de lecture en gras.
 *
 * On recalcule au scroll plutôt qu'avec un IntersectionObserver : on veut la
 * dernière section dont le titre est passé sous la navbar, y compris quand
 * une section longue occupe tout l'écran sans qu'aucun titre ne soit visible.
 */
export function TableOfContents({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      let current: string | null = null;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_LINE_PX) {
          current = id;
        }
      }
      // En bas de page, la dernière section n'atteint jamais la ligne.
      if (atBottom && current) current = items[items.length - 1].id;
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active ? "location" : undefined}
              className={cn(
                "hover:text-foreground",
                active && "font-semibold text-foreground",
              )}
            >
              {item.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
