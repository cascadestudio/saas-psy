import { Interfaces } from "doodle-icons";
import type { ScoreAlert, ScoreAlertSeverity } from "@melya/core";

const SEVERITY_STYLES: Record<
  ScoreAlertSeverity,
  { container: string; icon: string; title: string }
> = {
  critical: {
    container: "border-red-300 bg-red-50",
    icon: "text-red-600",
    title: "text-red-900",
  },
  warning: {
    container: "border-amber-300 bg-amber-50",
    icon: "text-amber-600",
    title: "text-amber-900",
  },
  info: {
    container: "border-sky-300 bg-sky-50",
    icon: "text-sky-600",
    title: "text-sky-900",
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
            className={`flex items-start gap-3 rounded-lg border p-4 ${styles.container}`}
          >
            <Interfaces.Caution
              className={`h-5 w-5 shrink-0 mt-0.5 ${styles.icon}`}
            />
            <div className="space-y-1">
              <p className={`text-sm font-semibold ${styles.title}`}>
                {SEVERITY_LABEL[alert.severity]}
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {alert.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
