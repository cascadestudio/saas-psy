import type { ScaleDomain } from "@melya/core";
import { cn } from "@/lib/utils";
import { getScaleAppearance } from "@/lib/scale-appearance";

interface DomainDotProps {
  domain: ScaleDomain | undefined;
  size?: "sm" | "lg";
  className?: string;
}

/** Point de couleur du domaine clinique d'une échelle. */
export function DomainDot({ domain, size = "sm", className }: DomainDotProps) {
  const { color } = getScaleAppearance(domain);

  return (
    <span
      aria-hidden
      className={cn(
        "print-keep-bg flex-shrink-0 rounded-full ring-1 ring-inset ring-black/15",
        size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5",
        className,
      )}
      style={{ backgroundColor: color }}
    />
  );
}

interface ScaleTagProps {
  domain: ScaleDomain | undefined;
  acronym: string;
  size?: "sm" | "lg";
  className?: string;
}

/**
 * Identité d'une échelle : point de couleur du domaine + acronyme.
 * Hérite de la taille et de la couleur de texte du parent.
 */
export function ScaleTag({ domain, acronym, size = "sm", className }: ScaleTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap",
        size === "sm" ? "gap-1.5" : "gap-2",
        className,
      )}
    >
      <DomainDot domain={domain} size={size} />
      {acronym}
    </span>
  );
}
