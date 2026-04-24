"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Interfaces } from "doodle-icons";

export type PatientRowData = {
  id: string;
  name: string;
  hasActive: boolean;
};

export function PatientRow({
  patient,
  href,
  onRowClick,
  onSendClick,
}: {
  patient: PatientRowData;
  href?: string;
  onRowClick?: () => void;
  onSendClick?: (e: React.MouseEvent) => void;
}) {
  const rowClassName =
    "flex items-center justify-between p-3 border-t border-border/50 first:border-t-0 hover:bg-background/50 transition-colors";
  const inner = (
    <>
      <div className="flex items-center gap-2">
        <p className="font-medium">{patient.name}</p>
        {patient.hasActive && (
          <Badge variant="secondary" className="text-xs">
            Passation en cours
          </Badge>
        )}
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost-brand"
              size="icon-sm"
              onClick={onSendClick}
              className="flex-shrink-0"
            >
              <Interfaces.Send className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Envoyer une échelle</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={rowClassName}>
        {inner}
      </Link>
    );
  }
  return (
    <button onClick={onRowClick} className={`w-full ${rowClassName}`}>
      {inner}
    </button>
  );
}
