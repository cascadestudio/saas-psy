"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { ScaleCard } from "@/components/ScaleCard";
import { scales } from "@/app/scalesData";
import type { ScaleDomain } from "@melya/core";
import { DOMAIN_ORDER, getScaleAppearance } from "@/lib/scale-appearance";
import { DomainDot } from "@/components/scale/ScaleTag";
import { Interfaces } from "doodle-icons";

export default function EchellesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<ScaleDomain | null>(null);

  const domains = useMemo(
    () => DOMAIN_ORDER.filter((d) => scales.some((s) => s.domain === d)),
    [],
  );

  const filteredScales = scales.filter((s) => {
    if (selectedDomain && s.domain !== selectedDomain) {
      return false;
    }
    const query = searchQuery.toLowerCase();
    if (!query) return true;
    return (
      s.title.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query)
    );
  });

  const sections = domains
    .map((domain) => ({
      domain,
      scales: filteredScales.filter((s) => s.domain === domain),
    }))
    .filter((section) => section.scales.length > 0);

  const chipClass = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${active ? "border-foreground bg-background text-foreground" : "border-border bg-background text-muted-foreground hover:bg-muted-foreground/5 hover:text-foreground"}`;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-gelica font-normal text-3xl">Échelles psychométriques</h1>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Interfaces.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une échelle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full pl-10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          aria-pressed={selectedDomain === null}
          className={chipClass(selectedDomain === null)}
          onClick={() => setSelectedDomain(null)}
        >
          Toutes
        </button>
        {domains.map((domain) => (
          <button
            key={domain}
            aria-pressed={selectedDomain === domain}
            className={chipClass(selectedDomain === domain)}
            onClick={() => setSelectedDomain(domain)}
          >
            <DomainDot domain={domain} />
            {getScaleAppearance(domain).label}
          </button>
        ))}
      </div>

      {sections.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">
            Aucune échelle trouvée
            {searchQuery && ` pour "${searchQuery}"`}
            {selectedDomain &&
              ` dans le domaine "${getScaleAppearance(selectedDomain).label}"`}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.domain}>
              {!selectedDomain && (
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <DomainDot domain={section.domain} size="lg" />
                  {getScaleAppearance(section.domain).label}
                </h2>
              )}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {section.scales.map((scale) => (
                  <ScaleCard key={scale.id} scale={scale} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {filteredScales.length > 0 && (
        <div className="mt-8 text-center text-sm text-muted-foreground">
          {filteredScales.length} échelle{filteredScales.length > 1 ? "s" : ""} disponible{filteredScales.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
