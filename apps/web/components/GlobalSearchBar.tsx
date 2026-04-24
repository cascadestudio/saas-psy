"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Interfaces } from "doodle-icons";
import { scales } from "@/app/scalesData";
import {
  patientsApi,
  sessionsApi,
  type Patient,
  type Session,
} from "@/lib/api-client";

type Category = "patients" | "echelles" | "passations" | "resultats";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "patients", label: "Patients" },
  { key: "echelles", label: "Échelles" },
  { key: "passations", label: "Passations" },
  { key: "resultats", label: "Résultats" },
];

type SearchResult = {
  id: string;
  title: string;
  subtitle?: string;
  category: Category;
  href: string;
};

export function GlobalSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    new Set<Category>(CATEGORIES.map((c) => c.key)),
  );
  const [isOpen, setIsOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchedPatients, setSearchedPatients] = useState<Patient[] | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const loadData = useCallback(async () => {
    if (dataLoaded) return;
    setDataLoaded(true);
    try {
      const [patientsRes, sessionsRes] = await Promise.all([
        patientsApi.getAll("active"),
        sessionsApi.getRecent(50),
      ]);
      setPatients(patientsRes.patients);
      setSessions(sessionsRes.sessions);
    } catch (error) {
      console.error("Error loading search data:", error);
      setDataLoaded(false);
    }
  }, [dataLoaded]);

  const toggleCategory = (key: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Debounced patient search via API
  useEffect(() => {
    if (!query.trim() || !activeCategories.has("patients")) {
      setSearchedPatients(null);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const { patients: results } = await patientsApi.search(query);
        setSearchedPatients(results);
      } catch {
        setSearchedPatients(null);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query, activeCategories]);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getScaleTitle = useCallback((scaleId: string) => {
    return scales.find((s) => s.id === scaleId)?.title ?? scaleId;
  }, []);

  const getPatientName = useCallback(
    (session: Session) => {
      if (session.patient)
        return `${session.patient.firstName} ${session.patient.lastName}`;
      const p = patients.find((p) => p.id === session.patientId);
      return p ? `${p.firstName} ${p.lastName}` : "Patient";
    },
    [patients],
  );

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const items: SearchResult[] = [];

    // Patients
    if (activeCategories.has("patients")) {
      const source = searchedPatients ?? patients;
      const filtered =
        searchedPatients ??
        source.filter(
          (p) =>
            `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
            p.email?.toLowerCase().includes(q),
        );
      filtered.slice(0, 5).forEach((p) =>
        items.push({
          id: `patient-${p.id}`,
          title: `${p.firstName} ${p.lastName}`,
          subtitle: p.email,
          category: "patients",
          href: `/patients/${p.id}`,
        }),
      );
    }

    // Échelles
    if (activeCategories.has("echelles")) {
      scales
        .filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.description?.toLowerCase().includes(q) ||
            s.category?.toLowerCase().includes(q),
        )
        .slice(0, 5)
        .forEach((s) =>
          items.push({
            id: `scale-${s.id}`,
            title: s.title,
            subtitle: s.category,
            category: "echelles",
            href: `/echelles/${s.id}`,
          }),
        );
    }

    // Passations (pending sessions)
    if (activeCategories.has("passations")) {
      sessions
        .filter((s) => ["CREATED", "SENT", "STARTED"].includes(s.status))
        .filter(
          (s) =>
            getScaleTitle(s.scaleId).toLowerCase().includes(q) ||
            getPatientName(s).toLowerCase().includes(q),
        )
        .slice(0, 5)
        .forEach((s) =>
          items.push({
            id: `session-${s.id}`,
            title: getScaleTitle(s.scaleId),
            subtitle: getPatientName(s),
            category: "passations",
            href: `/results/${s.id}`,
          }),
        );
    }

    // Résultats (completed sessions)
    if (activeCategories.has("resultats")) {
      sessions
        .filter((s) => s.status === "COMPLETED")
        .filter(
          (s) =>
            getScaleTitle(s.scaleId).toLowerCase().includes(q) ||
            getPatientName(s).toLowerCase().includes(q),
        )
        .slice(0, 5)
        .forEach((s) =>
          items.push({
            id: `result-${s.id}`,
            title: getScaleTitle(s.scaleId),
            subtitle: getPatientName(s),
            category: "resultats",
            href: `/results/${s.id}`,
          }),
        );
    }

    return items;
  }, [
    query,
    activeCategories,
    searchedPatients,
    patients,
    sessions,
    getScaleTitle,
    getPatientName,
  ]);

  const groupedResults = useMemo(() => {
    const groups: Partial<Record<Category, SearchResult[]>> = {};
    for (const r of results) {
      (groups[r.category] ??= []).push(r);
    }
    return groups;
  }, [results]);

  const categoryLabel = (key: Category) =>
    CATEGORIES.find((c) => c.key === key)!.label;

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-3 rounded-full border border-border bg-muted-foreground/5 px-4 py-2.5">
        <Interfaces.Search
          className="h-5 w-5 flex-shrink-0 text-muted-foreground"
          fill="currentColor"
        />
        <input
          type="text"
          placeholder="Rechercher..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            loadData();
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground mr-1">Dans :</span>
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleCategory(key)}
              className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
                activeCategories.has(key)
                  ? "border-brand-orange/30 bg-brand-orange/10 text-brand-orange"
                  : "border-border bg-background text-muted-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results dropdown */}
      {isOpen && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[400px] overflow-y-auto rounded-xl border border-border bg-background shadow-lg">
          {results.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              Aucun résultat pour &ldquo;{query}&rdquo;
            </p>
          ) : (
            Object.entries(groupedResults).map(([category, items]) => (
              <div key={category}>
                <p className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {categoryLabel(category as Category)}
                </p>
                {items!.map((item) => (
                  <button
                    key={item.id}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-muted-foreground/5 transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                      router.push(item.href);
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p className="text-xs text-muted-foreground truncate">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
