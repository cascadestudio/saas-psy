import type { Scale } from "@melya/core";

type Props = {
  scale: Scale;
};

export function ConsigneBlock({ scale }: Props) {
  if (!scale.instructions) return null;

  return (
    <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
      <p className="whitespace-pre-line">{scale.instructions}</p>
    </div>
  );
}
