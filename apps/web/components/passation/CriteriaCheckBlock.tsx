import type { CriteriaCheck } from "@melya/core";

type Props = {
  criteriaCheck: CriteriaCheck;
  /** True quand le score total est ≥ au seuil de bascule défini par l'échelle. */
  aboveThreshold: boolean;
  /** Valeur du seuil affichée dans les messages contextualisés. */
  threshold: number;
};

const CONVERGENT_MESSAGE =
  "Score total et critères DSM-5 convergent. Les deux indicateurs évaluent des dimensions complémentaires : le score total mesure l'intensité globale des symptômes, le diagnostic provisoire vérifie la structure DSM-5 (présence de symptômes endossés dans chaque cluster requis).";

function divergenceMessage(
  aboveThreshold: boolean,
  met: boolean,
  threshold: number,
): string {
  if (aboveThreshold === met) return CONVERGENT_MESSAGE;
  if (!aboveThreshold && met) {
    return `Score total inférieur au seuil de ${threshold} mais structure DSM-5 satisfaite. La distribution des symptômes correspond aux critères du diagnostic provisoire malgré une intensité globale modérée.`;
  }
  return `Score total au-dessus du seuil de ${threshold} mais structure DSM-5 non satisfaite. Les symptômes sont présents en intensité mais distribués de façon insuffisante sur l'un des clusters requis.`;
}

export function CriteriaCheckBlock({
  criteriaCheck,
  aboveThreshold,
  threshold,
}: Props) {
  const { met, rows, endorsementThreshold } = criteriaCheck;
  const message = divergenceMessage(aboveThreshold, met, threshold);

  return (
    <div>
      <h2 className="text-lg font-sans font-semibold mb-3">
        Critères DSM-5 (par symptom-count)
      </h2>
      <div className="bg-muted-foreground/5 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              met ? "bg-brand-orange" : "bg-foreground/30"
            }`}
            aria-hidden
          />
          <p className="text-sm font-medium">
            {met
              ? "Critères atteints — diagnostic provisoire de TSPT"
              : "Critères non atteints"}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {rows.map((r) => (
            <div
              key={r.key}
              className="flex items-center justify-between rounded-md px-3 py-2 bg-muted/30"
            >
              <span className="flex items-center gap-2 text-muted-foreground">
                <span
                  className={`h-2 w-2 rounded-full shrink-0 ${
                    r.met
                      ? "bg-brand-orange"
                      : "border border-foreground/30 bg-transparent"
                  }`}
                  aria-hidden
                />
                <span>
                  <span className="font-semibold text-foreground">{r.key}</span>{" "}
                  · {r.label.replace(/\s*\([A-E]\)\s*$/, "")}
                </span>
              </span>
              <span className="tabular-nums font-semibold text-foreground">
                {r.count}
                <span className="text-muted-foreground font-normal">
                  {" "}
                  / ≥ {r.required}
                </span>
              </span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Un item est endossé s'il est coté ≥ {endorsementThreshold} («
          Modérément » ou plus). Diagnostic posé si ≥ 1 item endossé en B, ≥ 1
          en C, ≥ 2 en D et ≥ 2 en E.
        </p>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
        {message}
      </p>
    </div>
  );
}
