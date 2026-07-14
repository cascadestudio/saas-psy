"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SendScaleSheet } from "@/components/SendScaleSheet";

interface ScaleSendButtonProps {
  scaleId: string;
}

export function ScaleSendButton({ scaleId }: ScaleSendButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        
        className="flex-shrink-0 ml-4 rounded-full text-base px-8"
        onClick={() => setOpen(true)}
      >
        Envoyer au patient
      </Button>
      <SendScaleSheet
        open={open}
        onOpenChange={setOpen}
        defaultScaleIds={[scaleId]}
      />
    </>
  );
}
