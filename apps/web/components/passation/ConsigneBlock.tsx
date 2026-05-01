import type { Scale } from "@melya/core";

type Props = {
  scale: Scale;
};

export function ConsigneBlock({ scale }: Props) {
  const sections = scale.sectionIntros ?? [];
  const hasSections = sections.length > 0;
  const fallback = !hasSections ? scale.instructions : null;

  if (!hasSections && !fallback) return null;

  return (
    <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70">
        Consigne envoyée au patient
      </p>
      {hasSections ? (
        sections.map((s, i) => (
          <div key={i}>
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70 mb-1">
              Avant l'item {s.startIndex + 1}
            </p>
            <p className="whitespace-pre-line">{s.text}</p>
          </div>
        ))
      ) : (
        <p className="whitespace-pre-line">{fallback}</p>
      )}
    </div>
  );
}
