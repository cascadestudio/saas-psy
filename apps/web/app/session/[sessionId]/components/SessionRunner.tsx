"use client";

import { useState } from "react";
import { Arrow } from "doodle-icons";
import ScaleFactory from "@/app/scale/[id]/components/ScaleFactory";
import ProgressBar from "./ProgressBar";
import IntroScreen from "./IntroScreen";
import SingleScaleQuestion from "./SingleScaleQuestion";
import ReviewScreen from "./ReviewScreen";

interface SessionRunnerProps {
  scale: any;
  patientFirstName: string;
  patientLastName: string;
  onSubmit: (
    responses: Record<string, any>,
    comments?: string,
  ) => Promise<void>;
}

type Step = "intro" | "question" | "review";

const AUTO_ADVANCE_DELAY_MS = 250;

export default function SessionRunner({
  scale,
  patientFirstName,
  patientLastName,
  onSubmit,
}: SessionRunnerProps) {
  if (scale.formType !== "single-scale") {
    return (
      <ScaleFactory
        scale={scale}
        psychologistEmail=""
        patientFirstname={patientFirstName}
        patientLastname={patientLastName}
        onSubmit={onSubmit}
      />
    );
  }

  return <SingleScaleRunner scale={scale} onSubmit={onSubmit} />;
}

interface SingleScaleRunnerProps {
  scale: any;
  onSubmit: (
    responses: Record<string, any>,
    comments?: string,
  ) => Promise<void>;
}

function SingleScaleRunner({ scale, onSubmit }: SingleScaleRunnerProps) {
  const intensityOptions: { value: number; label: string }[] =
    scale.answerScales?.intensity ?? [];
  const questions: string[] = scale.questions ?? [];
  const total = questions.length;

  const [step, setStep] = useState<Step>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleStart = () => {
    setStep("question");
    setCurrentIndex(0);
  };

  const handleSelect = (value: number) => {
    setResponses((prev) => ({ ...prev, [currentIndex]: value }));

    window.setTimeout(() => {
      if (currentIndex < total - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setStep("review");
      }
    }, AUTO_ADVANCE_DELAY_MS);
  };

  const handleBack = () => {
    if (step === "review") {
      setStep("question");
      setCurrentIndex(total - 1);
      return;
    }
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else {
      setStep("intro");
    }
  };

  const canGoBack = step !== "intro" && (step === "review" || currentIndex > 0);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload: Record<string, number> = {};
      for (const [idx, value] of Object.entries(responses)) {
        payload[`intensity_${idx}`] = value;
      }
      await onSubmit(payload, comments || undefined);
    } finally {
      setSubmitting(false);
    }
  };

  const answeredCount = Object.keys(responses).length;

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      <div className="mx-auto max-w-xl px-5 pt-6 pb-10 flex flex-col gap-8">
        {step !== "intro" && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={submitting || !canGoBack}
              aria-label="Retour"
              className="shrink-0 h-10 w-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Arrow.ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex-1">
              <ProgressBar
                current={step === "review" ? total : currentIndex}
                total={total}
              />
            </div>
          </div>
        )}

        {step === "intro" && (
          <IntroScreen
            scaleId={scale.id}
            title={scale.title}
            instructions={scale.instructions}
            estimatedTime={scale.estimatedTime}
            questionsCount={total}
            onStart={handleStart}
          />
        )}

        {step === "question" && (
          <SingleScaleQuestion
            questionText={questions[currentIndex]}
            options={intensityOptions}
            selectedValue={responses[currentIndex]}
            onSelect={handleSelect}
          />
        )}

        {step === "review" && (
          <ReviewScreen
            totalQuestions={total}
            answeredCount={answeredCount}
            comments={comments}
            onCommentsChange={setComments}
            onBack={handleBack}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
}
