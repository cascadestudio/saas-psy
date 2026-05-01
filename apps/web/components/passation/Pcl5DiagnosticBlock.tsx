type Props = {
  responses: Record<string, number>;
};

const CLUSTERS = [
  { key: "B", label: "Intrusions", from: 0, to: 4, required: 1 },
  { key: "C", label: "Évitement", from: 5, to: 6, required: 1 },
  { key: "D", label: "Cognitions/humeur", from: 7, to: 13, required: 2 },
  { key: "E", label: "Hyperéveil", from: 14, to: 19, required: 2 },
] as const;

const ENDORSED_THRESHOLD = 2;

export function Pcl5DiagnosticBlock({ responses }: Props) {
  const counts = CLUSTERS.map((c) => {
    let n = 0;
    for (let i = c.from; i <= c.to; i++) {
      const v = responses[`intensity_${i}`];
      if (typeof v === "number" && v >= ENDORSED_THRESHOLD) n++;
    }
    return { ...c, endorsed: n, met: n >= c.required };
  });

  const allMet = counts.every((c) => c.met);

  return (
    <div>
      <h2 className="text-lg font-sans font-semibold mb-3">
        Critères DSM-5 (par symptom-count)
      </h2>
      <div className="border rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              allMet ? "bg-amber-500" : "bg-emerald-500"
            }`}
            aria-hidden
          />
          <p className="text-sm font-medium">
            {allMet
              ? "Critères atteints — diagnostic provisoire de TSPT"
              : "Critères non atteints"}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {counts.map((c) => (
            <div
              key={c.key}
              className={`flex items-baseline justify-between rounded-md px-3 py-2 ${
                c.met ? "bg-muted/40" : "bg-muted/20"
              }`}
            >
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {c.key}
                </span>{" "}
                · {c.label}
              </span>
              <span
                className={`tabular-nums font-semibold ${
                  c.met ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {c.endorsed}
                <span className="text-muted-foreground font-normal">
                  {" "}
                  / ≥ {c.required}
                </span>
              </span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Un item est endossé s'il est coté ≥ 2 (« Modérément » ou plus).
          Diagnostic posé si ≥ 1 item endossé en B, ≥ 1 en C, ≥ 2 en D et ≥ 2 en E.
        </p>
      </div>
    </div>
  );
}
