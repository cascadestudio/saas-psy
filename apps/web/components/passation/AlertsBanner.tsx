import { Interfaces } from "doodle-icons";
import type { ScoreAlert, ScoreAlertSeverity } from "@melya/core";

const SEVERITY_STYLES: Record<
  ScoreAlertSeverity,
  { container: string; color: string }
> = {
  critical: {
    container: "border-destructive/30 bg-destructive/5",
    color: "text-destructive",
  },
  warning: {
    container: "border-amber-300 bg-amber-50",
    color: "text-amber-600",
  },
  info: {
    container: "border-sky-300 bg-sky-50",
    color: "text-sky-600",
  },
};

const SEVERITY_LABEL: Record<ScoreAlertSeverity, string> = {
  critical: "Alerte critique",
  warning: "Point de vigilance",
  info: "Information",
};

export function AlertsBanner({ alerts }: { alerts: ScoreAlert[] }) {
  if (alerts.length === 0) return null;
  return (
    <div className="space-y-2">
      {alerts.map((alert, i) => {
        const styles = SEVERITY_STYLES[alert.severity];
        return (
          <div
            key={i}
            className={`flex items-center gap-5 rounded-lg border p-4 ${styles.container}`}
          >
            <Interfaces.Caution
              className={`h-8 w-8 shrink-0 [&_path]:fill-current ${styles.color}`}
            />
            <div className="space-y-1">
              <p className={`text-sm font-semibold ${styles.color}`}>
                {SEVERITY_LABEL[alert.severity]}
              </p>
              <p className={`text-sm leading-relaxed ${styles.color}`}>
                {alert.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
