import type { Scale } from "@melya/core";
import { ScaleInstructions } from "@/components/scale/ScaleInstructions";

type Props = {
  scale: Scale;
};

export function ConsigneBlock({ scale }: Props) {
  if (!scale.instructions) return null;

  return (
    <ScaleInstructions
      text={scale.instructions}
      className="text-sm text-muted-foreground leading-relaxed"
    />
  );
}
