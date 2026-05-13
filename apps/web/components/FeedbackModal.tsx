"use client";

import { useEffect, useState } from "react";
import { Interfaces } from "doodle-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const TALLY_FORM_ID = "GxBy4Z";
const FIRST_VISIT_KEY = "melya_first_visit_at";
const DISMISSED_KEY = "melya_feedback_prompt_dismissed";
const AUTO_PROMPT_DELAY_DAYS = 7;

type FeedbackCTAProps = {
  userId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  hasSubmitted: boolean;
};

export function FeedbackCTA({
  userId,
  email,
  firstName,
  lastName,
  hasSubmitted,
}: FeedbackCTAProps) {
  const [open, setOpen] = useState(false);

  const params = new URLSearchParams({
    alignLeft: "1",
    hideTitle: "1",
    transparentBackground: "1",
    dynamicHeight: "1",
    userId,
    email,
    ...(firstName ? { firstName } : {}),
    ...(lastName ? { lastName } : {}),
  });
  const tallyUrl = `https://tally.so/embed/${TALLY_FORM_ID}?${params.toString()}`;

  useEffect(() => {
    if (hasSubmitted) return;

    const now = Date.now();
    const firstVisit = localStorage.getItem(FIRST_VISIT_KEY);
    if (!firstVisit) {
      localStorage.setItem(FIRST_VISIT_KEY, String(now));
      return;
    }
    if (localStorage.getItem(DISMISSED_KEY)) return;

    const elapsed = now - Number(firstVisit);
    if (elapsed >= AUTO_PROMPT_DELAY_DAYS * 24 * 60 * 60 * 1000) {
      setOpen(true);
      localStorage.setItem(DISMISSED_KEY, "1");
    }
  }, [hasSubmitted]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-brand-orange px-4 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:bg-brand-orange/90 hover:shadow-xl"
      >
        <Interfaces.Message className="h-4 w-4" fill="currentColor" />
        Donner mon avis
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Votre avis nous intéresse</DialogTitle>
            <DialogDescription>
              Aidez-nous à améliorer Melya en partageant votre expérience.
            </DialogDescription>
          </DialogHeader>
          <iframe
            src={tallyUrl}
            className="w-full h-[60vh] border-0"
            title="Formulaire de feedback Melya"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
