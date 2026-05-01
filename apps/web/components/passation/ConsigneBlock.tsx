"use client";

import { useState } from "react";
import { Arrow } from "doodle-icons";
import type { Scale } from "@melya/core";

type Props = {
  scale: Scale;
};

export function ConsigneBlock({ scale }: Props) {
  const [open, setOpen] = useState(false);

  const sections = scale.sectionIntros ?? [];
  const hasSections = sections.length > 0;
  const fallback = !hasSections ? scale.instructions : null;

  if (!hasSections && !fallback) return null;

  return (
    <div className="border rounded-lg">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/40 rounded-lg"
        aria-expanded={open}
      >
        <span className="text-sm font-medium">
          Consigne envoyée au patient
        </span>
        <Arrow.ArrowDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
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
      )}
    </div>
  );
}
