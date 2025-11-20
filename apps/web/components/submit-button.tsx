"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
  isLoading?: boolean;
};

export function SubmitButton({
  children,
  pendingText = "Envoi en cours...",
  isLoading,
  ...props
}: Props) {
  const { pending } = useFormStatus();
  
  // Use external isLoading if provided, otherwise use form pending state
  const loading = isLoading !== undefined ? isLoading : pending;

  return (
    <Button type="submit" aria-disabled={loading} disabled={loading} {...props}>
      {loading ? pendingText : children}
    </Button>
  );
}
