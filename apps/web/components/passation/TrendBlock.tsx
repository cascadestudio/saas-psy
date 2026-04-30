import { Finance } from "doodle-icons";

type Props = {
  currentScore: number;
  previousScore: number;
  previousCompletedAt: string | Date;
  higherIsBetter: boolean;
};

export function TrendBlock({
  currentScore,
  previousScore,
  previousCompletedAt,
  higherIsBetter,
}: Props) {
  const diff = currentScore - previousScore;
  const absDiff = Math.abs(diff);
  const pct = previousScore
    ? Math.abs(Math.round((diff / previousScore) * 100))
    : 0;

  const direction: "up" | "down" | "stable" =
    diff > 0 ? "up" : diff < 0 ? "down" : "stable";
  const isImprovement =
    (diff < 0 && !higherIsBetter) || (diff > 0 && higherIsBetter);

  const previousDate = new Date(previousCompletedAt).toLocaleDateString(
    "fr-FR",
    { day: "numeric", month: "long", year: "numeric" },
  );

  let icon: React.ReactNode;
  let color: string;
  let label: string;

  if (direction === "stable") {
    icon = (
      <span className="inline-block w-4 h-0.5 bg-gray-500 rounded shrink-0" />
    );
    color = "text-gray-600";
    label = "Score stable depuis la dernière passation";
  } else {
    const Icon = direction === "up" ? Finance.TrendUp : Finance.TrendDown;
    color = isImprovement ? "text-emerald-600" : "text-red-600";
    icon = <Icon className={`h-4 w-4 shrink-0 fill-current ${color}`} />;
    const verb = isImprovement ? "Amélioration" : "Aggravation";
    const sign = diff > 0 ? "+" : "−";
    label = `${verb} de ${sign}${absDiff} pts (${pct}%) depuis la dernière passation`;
  }

  return (
    <div>
      <h2 className="text-lg font-sans font-semibold mb-3">Évolution</h2>
      <div className="border rounded-lg p-6 space-y-2">
        <div className={`flex items-center gap-2 ${color}`}>
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Passation précédente le {previousDate} : score de{" "}
          <span className="font-semibold tabular-nums">{previousScore}</span>
        </p>
      </div>
    </div>
  );
}
