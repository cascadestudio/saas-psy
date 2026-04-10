import type { Session } from "@/lib/api-client";

export const SESSION_STATUS_CONFIG: Record<
  Session["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline"; className?: string }
> = {
  SENT:{ label: "Envoyée", variant: "default", className: "bg-orange-100 text-orange-800" },
  STARTED: { label: "En cours", variant: "default", className: "bg-blue-100 text-blue-800" },
  COMPLETED: { label: "Complétée", variant: "outline", className: "bg-green-100 text-green-800" },
  EXPIRED: { label: "Expirée", variant: "destructive", className: "bg-gray-100 text-gray-800" },
  CANCELLED: { label: "Annulée", variant: "secondary", className: "bg-red-100 text-red-800" },
};
