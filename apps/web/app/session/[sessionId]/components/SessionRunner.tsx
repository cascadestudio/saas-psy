"use client";

import { useMemo, useState } from "react";
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

interface QuestionStep {
  key: string;
  questionText: string;
  subLabel?: string;
  options: { value: number; label: string }[];
}

type Phase = "intro" | "question" | "review";

const AUTO_ADVANCE_DELAY_MS = 250;
const SUPPORTED_FORM_TYPES = new Set([
  "single-scale",
  "options",
  "dual-scale",
  "grouped-items",
]);

function buildSteps(scale: any): QuestionStep[] {
  const formType = scale.formType;
  const questions = scale.questions ?? [];

  if (formType === "single-scale") {
    const options = toOptions(scale.answerScales?.intensity);
    return (questions as string[]).map((text, idx) => ({
      key: `intensity_${idx}`,
      questionText: text,
      options,
    }));
  }

  if (formType === "options") {
    return (questions as { title: string; options: { value: number; text: string }[] }[]).map(
      (q, idx) => ({
        key: `bdi_${idx}`,
        questionText: q.title,
        options: q.options.map((o) => ({ value: o.value, label: o.text })),
      }),
    );
  }

  if (formType === "dual-scale") {
    const anxiety = toOptions(scale.answerScales?.anxiety);
    const avoidance = toOptions(scale.answerScales?.avoidance);
    const steps: QuestionStep[] = [];
    (questions as { text: string }[]).forEach((q, idx) => {
      steps.push({
        key: `anxiety_${idx}`,
        questionText: q.text,
        subLabel: "Anxiété ressentie",
        options: anxiety,
      });
      steps.push({
        key: `avoidance_${idx}`,
        questionText: q.text,
        subLabel: "Évitement de la situation",
        options: avoidance,
      });
    });
    return steps;
  }

  if (formType === "grouped-items") {
    const options = toOptions(scale.answerScales?.intensity);
    const steps: QuestionStep[] = [];
    (questions as { title: string; items: string[] }[]).forEach(
      (group, groupIdx) => {
        group.items.forEach((item, itemIdx) => {
          steps.push({
            key: `intensity_${groupIdx}_${itemIdx}`,
            questionText: item,
            subLabel: group.title,
            options,
          });
        });
      },
    );
    return steps;
  }

  return [];
}

function toOptions(
  raw: { value: number; label: string }[] | undefined,
): { value: number; label: string }[] {
  return raw ?? [];
}

export default function SessionRunner({
  scale,
  patientFirstName,
  patientLastName,
  onSubmit,
}: SessionRunnerProps) {
  if (!SUPPORTED_FORM_TYPES.has(scale.formType)) {
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

  return <Runner scale={scale} onSubmit={onSubmit} />;
}

interface RunnerProps {
  scale: any;
  onSubmit: (
    responses: Record<string, any>,
    comments?: string,
  ) => Promise<void>;
}

function Runner({ scale, onSubmit }: RunnerProps) {
  const steps = useMemo(() => buildSteps(scale), [scale]);
  const total = steps.length;

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleStart = () => {
    setPhase("question");
    setCurrentIndex(0);
  };

  const handleSelect = (value: number) => {
    const step = steps[currentIndex];
    setResponses((prev) => ({ ...prev, [step.key]: value }));

    window.setTimeout(() => {
      if (currentIndex < total - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setPhase("review");
      }
    }, AUTO_ADVANCE_DELAY_MS);
  };

  const handleBack = () => {
    if (phase === "review") {
      setPhase("question");
      setCurrentIndex(total - 1);
      return;
    }
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else {
      setPhase("intro");
    }
  };

  const canGoBack =
    phase !== "intro" && (phase === "review" || currentIndex > 0);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onSubmit(responses, comments || undefined);
    } finally {
      setSubmitting(false);
    }
  };

  const answeredCount = Object.keys(responses).length;
  const currentStep = steps[currentIndex];

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      <div className="mx-auto max-w-xl px-5 pt-6 pb-10 flex flex-col gap-8">
        {phase !== "intro" && (
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
                current={phase === "review" ? total : currentIndex}
                total={total}
              />
            </div>
          </div>
        )}

        {phase === "intro" && (
          <IntroScreen
            scaleId={scale.id}
            title={scale.title}
            instructions={scale.instructions}
            estimatedTime={scale.estimatedTime}
            questionsCount={total}
            onStart={handleStart}
          />
        )}

        {phase === "question" && currentStep && (
          <SingleScaleQuestion
            subLabel={currentStep.subLabel}
            questionText={currentStep.questionText}
            options={currentStep.options}
            selectedValue={responses[currentStep.key]}
            onSelect={handleSelect}
          />
        )}

        {phase === "review" && (
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
