"use client";

import BaseQuestionnaire from "../BaseQuestionnaire";
import { QuestionnaireProps } from "@/app/types";
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

  const { anxiety, avoidance } = questionnaire.answerScales;

  const getDevDefaultValue = (questionIndex: number, scaleType: string) => {
    // Only apply default values in development
    if (process.env.NODE_ENV !== "development") return undefined;

    // Generate a random value between 0 and 3 (inclusive)
    return Math.floor(Math.random() * 4).toString();
  };

  return (
    <BaseQuestionnaire {...props}>
      <div className="space-y-8">
        {questionnaire.questions.map((question: any, index: number) => (
          <div key={index} className="border p-4 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">
                {index + 1}. {question.text}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Anxiety section */}
              <div>
                <h4 className="text-sm font-medium mb-2">Anxiété</h4>
                <RadioGroup
                  name={`anxiety_${index}`}
                  defaultValue={getDevDefaultValue(index, "anxiety")}
                >
                  {anxiety.map((scale: any) => (
                    <div
                      key={scale.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        id={`anxiety_${index}_${scale.value}`}
                        value={scale.value.toString()}
                        required
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
                <RadioGroup
                  name={`avoidance_${index}`}
                  defaultValue={getDevDefaultValue(index, "avoidance")}
                >
                  {avoidance.map((scale: any) => (
                    <div
                      key={scale.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        id={`avoidance_${index}_${scale.value}`}
                        value={scale.value.toString()}
                        required
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
