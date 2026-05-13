"use client";

import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PERSISTENT_CONSIGNE_MODAL_THRESHOLD = 200;

interface AnswerOption {
  value: number;
  label: string;
}

interface SingleScaleQuestionProps {
  questionText: string;
  questionPrompt?: string;
  subLabel?: string;
  persistentConsigne?: string;
  options: AnswerOption[];
  selectedValue?: number;
  onSelect: (value: number) => void;
  onSkip?: () => void;
}

export default function SingleScaleQuestion({
  questionText,
  questionPrompt,
  subLabel,
  persistentConsigne,
  options,
  selectedValue,
  onSelect,
  onSkip,
}: SingleScaleQuestionProps) {
  const hasLongConsigne =
    !!persistentConsigne &&
    persistentConsigne.length > PERSISTENT_CONSIGNE_MODAL_THRESHOLD;

  const consigneTrigger = hasLongConsigne ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="[&_svg]:fill-none"
        >
          <Info className="h-4 w-4" />
          Voir la consigne
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Consigne</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 text-base text-gray-700 leading-relaxed">
          {persistentConsigne!.split(/\n\n+/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  ) : null;

  return (
    <div className="flex flex-col gap-6">
      {persistentConsigne && !hasLongConsigne && (
        <p className="text-gray-700 leading-relaxed">{persistentConsigne}</p>
      )}
      <div className="flex flex-col gap-2">
        {(subLabel || consigneTrigger) && (
          <div className="flex items-center justify-between gap-3">
            {subLabel ? (
              <p className="text-sm font-medium uppercase tracking-wide text-brand-orange">
                {subLabel}
              </p>
            ) : (
              <span />
            )}
            {consigneTrigger}
          </div>
        )}
        {questionPrompt ? (
          <>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              {questionText}
            </p>
            <h2 className="font-body text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
              {questionPrompt}
            </h2>
          </>
        ) : (
          <h2 className="font-body text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
            {questionText}
          </h2>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`w-full min-h-[64px] px-5 py-4 rounded-2xl border text-left text-base transition-all duration-150 active:scale-[0.98] ${
                isSelected
                  ? "border-brand-orange bg-brand-orange/5 text-gray-900"
                  : "border-gray-200 bg-white text-gray-900 hover:border-gray-300"
              }`}
            >
              {option.label}
            </button>
          );
        })}
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="self-center mt-2 text-sm text-gray-500 underline underline-offset-4 hover:text-gray-700"
          >
            Passer
          </button>
        )}
      </div>
    </div>
  );
}
