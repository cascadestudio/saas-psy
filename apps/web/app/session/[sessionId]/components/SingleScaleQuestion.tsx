"use client";

interface AnswerOption {
  value: number;
  label: string;
}

interface SingleScaleQuestionProps {
  questionText: string;
  questionPrompt?: string;
  subLabel?: string;
  sectionIntro?: string;
  options: AnswerOption[];
  selectedValue?: number;
  onSelect: (value: number) => void;
}

export default function SingleScaleQuestion({
  questionText,
  questionPrompt,
  subLabel,
  sectionIntro,
  options,
  selectedValue,
  onSelect,
}: SingleScaleQuestionProps) {
  return (
    <div className="flex flex-col gap-6">
      {sectionIntro && (
        <div className="rounded-2xl border border-brand-orange/20 bg-brand-orange/5 px-4 py-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            {sectionIntro}
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2">
        {subLabel && (
          <p className="text-sm font-medium uppercase tracking-wide text-brand-orange">
            {subLabel}
          </p>
        )}
        <h2 className="font-body text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
          {questionText}
        </h2>
        {questionPrompt && (
          <p className="text-base text-gray-600 leading-relaxed">
            {questionPrompt}
          </p>
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
      </div>
    </div>
  );
}
