"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { ScaleCard } from "@/components/ScaleCard";
import { scales } from "@/app/scalesData";
import { getScaleAppearance } from "@/lib/scale-appearance";
import { Interfaces } from "doodle-icons";

export default function EchellesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(scales.map((s) => s.category)));
    return uniqueCategories.sort();
  }, []);

  const filteredScales = scales.filter((s) => {
    if (selectedCategory && s.category !== selectedCategory) {
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
            className="pl-10"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          aria-pressed={selectedCategory === null}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${selectedCategory === null ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"}`}
          onClick={() => setSelectedCategory(null)}
        >
          Toutes
        </button>
        {categories.map((category) => {
          const { bg } = getScaleAppearance(category);
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              aria-pressed={active}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${active ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span
                className="h-2.5 w-2.5 rounded-[4px]"
                style={{ backgroundColor: bg }}
              />
              {category}
            </button>
          );
        })}
      </div>

      {filteredScales.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">
            Aucune échelle trouvée
            {searchQuery && ` pour "${searchQuery}"`}
            {selectedCategory && ` dans la catégorie "${selectedCategory}"`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredScales.map((scale) => (
            <ScaleCard key={scale.id} scale={scale} />
          ))}
        </div>
      )}

      {filteredScales.length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          {filteredScales.length} échelle{filteredScales.length > 1 ? "s" : ""} disponible{filteredScales.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
