"use client";

import BaseQuestionnaire, { QuestionnaireProps } from "./BaseQuestionnaire";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function EchelleDanxieteDeLiebowitch(props: QuestionnaireProps) {
  const { questionnaire } = props;

  if (
    !questionnaire?.answerScales?.anxiety ||
    !questionnaire?.answerScales?.avoidance
  ) {
    return <BaseQuestionnaire {...props} />;
  }

  return (
    <BaseQuestionnaire {...props}>
      <div className="space-y-8">
        <h2 className="text-lg font-medium">
          Évaluez votre niveau d'anxiété et d'évitement pour chaque situation
        </h2>

        {questionnaire.questions.map((question, index) => (
          <div key={index} className="border p-4 rounded-md">
            <h3 className="font-medium mb-4">
              {index + 1}. {question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Anxiety section */}
              <div>
                <h4 className="text-sm font-medium mb-2">Anxiété</h4>
                <RadioGroup name={`anxiety_${index}`}>
                  {questionnaire.answerScales.anxiety.map((scale) => (
                    <div
                      key={scale.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        id={`anxiety_${index}_${scale.value}`}
                        value={scale.value.toString()}
                      />
                      <Label htmlFor={`anxiety_${index}_${scale.value}`}>
                        {scale.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Avoidance section */}
              <div>
                <h4 className="text-sm font-medium mb-2">Évitement</h4>
                <RadioGroup name={`avoidance_${index}`}>
                  {questionnaire.answerScales.avoidance.map((scale) => (
                    <div
                      key={scale.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        id={`avoidance_${index}_${scale.value}`}
                        value={scale.value.toString()}
                      />
                      <Label htmlFor={`avoidance_${index}_${scale.value}`}>
                        {scale.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BaseQuestionnaire>
  );
}
