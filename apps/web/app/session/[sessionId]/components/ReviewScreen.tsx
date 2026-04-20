"use client";

import { Button } from "@/components/ui/button";
import { Interfaces } from "doodle-icons";

interface ReviewScreenProps {
  totalQuestions: number;
  answeredCount: number;
  comments: string;
  onCommentsChange: (value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting?: boolean;
}

export default function ReviewScreen({
  totalQuestions,
  answeredCount,
  comments,
  onCommentsChange,
  onBack,
  onSubmit,
  submitting = false,
}: ReviewScreenProps) {
  const allAnswered = answeredCount === totalQuestions;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl font-normal text-gray-900 leading-tight">
          Vous avez terminé
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Vous avez répondu à{" "}
          <span className="font-medium text-gray-900">
            {answeredCount}/{totalQuestions}
          </span>{" "}
          questions.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="comments" className="text-sm font-medium text-gray-700">
          Commentaires additionnels{" "}
          <span className="text-gray-400 font-normal">(optionnel)</span>
        </label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => onCommentsChange(e.target.value)}
          placeholder="Si vous souhaitez ajouter des précisions, vous pouvez les écrire ici..."
          className="w-full min-h-[120px] p-3 rounded-xl border border-gray-200 bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Button
          className="w-full h-12 text-base"
          onClick={onSubmit}
          disabled={!allAnswered || submitting}
        >
          {submitting ? (
            <>
              <Interfaces.Sync className="h-4 w-4 animate-spin mr-2" />
              Envoi en cours...
            </>
          ) : (
            "Envoyer mes réponses"
          )}
        </Button>
        <Button
          variant="ghost"
          className="w-full h-12 text-base"
          onClick={onBack}
          disabled={submitting}
        >
          Revenir en arrière
        </Button>
      </div>
    </div>
  );
}
