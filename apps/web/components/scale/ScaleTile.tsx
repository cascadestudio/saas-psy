import type { ReactNode } from "react";
import type { ScaleDomain } from "@melya/core";
import { cn } from "@/lib/utils";
import { ScaleTag } from "@/components/scale/ScaleTag";

type Size = "sm" | "md" | "lg";

const ACRONYM_SIZE: Record<Size, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-[26px]",
};

const SUBTITLE_SIZE: Record<Size, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-[13.5px]",
};

interface ScaleTileProps {
  domain: ScaleDomain | undefined;
  acronym: string;
  subtitle?: ReactNode;
  size?: Size;
  /** Contenu sous le sous-titre (durée, méta). */
  meta?: ReactNode;
  /** Élément aligné à droite (CTA, coche…). */
  aside?: ReactNode;
  className?: string;
  acronymClassName?: string;
  subtitleClassName?: string;
  /** Balise de l'acronyme : `h1` quand la tuile sert de titre de page. */
  acronymAs?: "p" | "h1";
}

/**
 * Tuile d'une échelle : surface neutre, acronyme en Gelica précédé du point de
 * domaine. À utiliser quand l'échelle est le sujet de la surface. Quand elle est
 * secondaire (ligne de session, en-tête patient), utiliser `ScaleTag`.
 */
export function ScaleTile({
  domain,
  acronym,
  subtitle,
  size = "md",
  meta,
  aside,
  className,
  acronymClassName,
  subtitleClassName,
  acronymAs: Acronym = "p",
}: ScaleTileProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-[18px] bg-muted-foreground/5 px-5 py-4",
        className,
      )}
    >
      <div className="min-w-0 flex-1 text-muted-foreground">
        <Acronym
          className={cn(
            "font-gelica not-italic font-semibold leading-none tracking-tight tabular-nums text-foreground",
            ACRONYM_SIZE[size],
            acronymClassName,
          )}
        >
          <ScaleTag domain={domain} acronym={acronym} size={size === "sm" ? "sm" : "lg"} />
        </Acronym>
        {subtitle && (
          <p className={cn("mt-2 leading-snug", SUBTITLE_SIZE[size], subtitleClassName)}>
            {subtitle}
          </p>
        )}
        {meta}
      </div>
      {aside}
    </div>
  );
}
