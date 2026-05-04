import type { Session } from "@/lib/api-client";

export const SESSION_STATUS_CONFIG: Record<
  Session["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline"; className?: string }
> = {
  SENT: { label: "Envoyée", variant: "default", className: "bg-slate-100 text-slate-700" },
  STARTED: { label: "En cours", variant: "default", className: "bg-blue-100 text-blue-700" },
  COMPLETED: { label: "Complétée", variant: "outline", className: "bg-emerald-100 text-emerald-700" },
  EXPIRED: { label: "Expirée", variant: "destructive", className: "bg-amber-100 text-amber-700" },
  CANCELLED: { label: "Annulée", variant: "secondary", className: "bg-rose-100 text-rose-700" },
};
