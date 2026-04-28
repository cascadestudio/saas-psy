"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScaleProps } from "@/app/types";
import { QuestionGroup, OptionsQuestion } from "@/app/types";

type ScalePreviewProps = Pick<ScaleProps, "scale">;

const PREVIEW_COUNT = 3;

export default function ScalePreview({ scale }: ScalePreviewProps) {
  const [open, setOpen] = useState(false);
  const previewQuestions = scale.questions.slice(0, PREVIEW_COUNT);
  const hasMore = scale.questions.length > PREVIEW_COUNT;

  return (
    <div className="space-y-4">
      {scale.instructions && (
        <p className="text-sm text-muted-foreground">
          {scale.instructions}
        </p>
      )}
      <div className="space-y-3">
        {previewQuestions.map((question, index) => (
          <QuestionItem key={index} question={question} index={index} scale={scale} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <Button
            className="rounded-full bg-black text-white hover:bg-black/80"
            onClick={() => setOpen(true)}
          >
            <span style={{ fontFeatureSettings: '"calt" 0, "liga" 0, "clig" 0' }}>
              Voir toutes les questions ({scale.questions.length})
            </span>
          </Button>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto border-none">
          <DialogHeader>
            <DialogTitle className="font-body">{scale.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {scale.instructions && (
              <p className="text-sm text-muted-foreground">
                {scale.instructions}
              </p>
            )}
            {scale.questions.map((question, index) => (
              <QuestionItem key={index} question={question} index={index} scale={scale} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function QuestionItem({
  question,
  index,
  scale,
}: {
  question: any;
  index: number;
  scale: ScalePreviewProps["scale"];
}) {
  // Options-style: question with options (e.g. Y-BOCS)
  if (typeof question === "object" && "title" in question && "options" in question) {
    const q = question as OptionsQuestion;
    return (
      <div className="bg-muted-foreground/5 rounded-md p-3">
        <p className="text-sm font-medium mb-2">
          {index + 1}. {q.title}
        </p>
        <div className="space-y-1 pl-4">
          {q.options.map((opt, i) => (
            <p key={i} className="text-xs text-muted-foreground">
              {opt.text}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // STAI-style: question groups
  if (typeof question === "object" && "title" in question && "items" in question) {
    const group = question as QuestionGroup;
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium">{group.title}</p>
        {group.items.map((item, i) => (
          <div key={i} className="bg-muted-foreground/5 rounded-md p-3">
            <p className="text-sm">
              {i + 1}. {item}
            </p>
            {scale.answerScales?.intensity && (
              <div className="flex flex-wrap gap-2 mt-2">
                {scale.answerScales.intensity.map((opt) => (
                  <span
                    key={opt.value}
                    className="text-xs text-muted-foreground bg-muted-foreground/10 px-2 py-0.5 rounded-full"
                  >
                    {opt.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Dual scale (Liebowitz): question with text property
  if (typeof question === "object" && "text" in question) {
    return (
      <div className="bg-muted-foreground/5 rounded-md p-3">
        <p className="text-sm">
          {index + 1}. {question.text}
        </p>
        {scale.answerScales?.anxiety && scale.answerScales?.avoidance && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Anxiété</p>
              <div className="flex flex-wrap gap-1">
                {scale.answerScales.anxiety.map((opt) => (
                  <span
                    key={opt.value}
                    className="text-xs text-muted-foreground bg-muted-foreground/10 px-2 py-0.5 rounded-full"
                  >
                    {opt.label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Évitement</p>
              <div className="flex flex-wrap gap-1">
                {scale.answerScales.avoidance.map((opt) => (
                  <span
                    key={opt.value}
                    className="text-xs text-muted-foreground bg-muted-foreground/10 px-2 py-0.5 rounded-full"
                  >
                    {opt.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Simple string question
  return (
    <div className="bg-muted-foreground/5 rounded-md p-3">
      <p className="text-sm">
        {index + 1}. {question as string}
      </p>
      {scale.answerScales?.intensity && (
        <div className="flex flex-wrap gap-2 mt-2">
          {scale.answerScales.intensity.map((opt) => (
            <span
              key={opt.value}
              className="text-xs text-muted-foreground bg-muted-foreground/10 px-2 py-0.5 rounded-full"
            >
              {opt.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
