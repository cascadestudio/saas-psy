"use client";

import BaseQuestionnaire, { QuestionnaireProps } from "../BaseQuestionnaire";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function InventaireDepressionDeBeck(props: QuestionnaireProps) {
  const { questionnaire } = props;

  if (!questionnaire?.answerScales?.intensity) {
    return <BaseQuestionnaire {...props} />;
  }

  const { intensity } = questionnaire.answerScales;

  return (
    <BaseQuestionnaire {...props}>
      <div className="space-y-8">
        <h2 className="text-lg font-medium">
          Évaluez l'intensité de vos symptômes pour chaque situation
        </h2>

        {questionnaire.questions.map((question, index) => (
          <div key={index} className="border p-4 rounded-md">
            <h3 className="font-medium mb-4">
              {index + 1}. {question}
            </h3>

            <div>
              <RadioGroup name={`intensity_${index}`}>
                {intensity.map((scale) => (
                  <div
                    key={scale.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      id={`intensity_${index}_${scale.value}`}
                      value={scale.value.toString()}
                    />
                    <Label htmlFor={`intensity_${index}_${scale.value}`}>
                      {scale.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        ))}
      </div>
    </BaseQuestionnaire>
  );
}
