/**
 * Returns a French human-readable relative time like "aujourd'hui",
 * "il y a 3 jours", "il y a 6 semaines", "il y a 4 mois", "il y a 2 ans".
 */
export function relativeTimeFr(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const ms = Date.now() - d.getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  if (days < 1) return "aujourd'hui";
  if (days === 1) return "hier";
  if (days < 7) return `il y a ${days} jours`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `il y a ${weeks} semaine${weeks > 1 ? "s" : ""}`;

  const months = Math.floor(days / 30);
  if (months < 12) return `il y a ${months} mois`;

  const years = Math.floor(days / 365);
  return `il y a ${years} an${years > 1 ? "s" : ""}`;
}

export function formatDateLongFr(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
