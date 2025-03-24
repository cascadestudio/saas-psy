"use client";

import BaseQuestionnaire, {
  QuestionnaireProps,
  QuestionGroup,
} from "../BaseQuestionnaire";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function STAIQuestionnaire(props: QuestionnaireProps) {
  const { questionnaire } = props;

  if (!questionnaire?.answerScales?.intensity) {
    return <BaseQuestionnaire {...props} />;
  }

  const { intensity } = questionnaire.answerScales;

  return (
    <BaseQuestionnaire {...props}>
      <div className="space-y-12">
        {(questionnaire.questions as QuestionGroup[]).map(
          (questionGroup, groupIndex) => (
            <div key={groupIndex} className="space-y-8">
              <h2 className="text-xl font-medium">{questionGroup.title}</h2>
              {questionGroup.items.map((question, questionIndex) => (
                <div key={questionIndex} className="border p-4 rounded-md">
                  <h3 className="font-medium mb-4">
                    {questionIndex + 1}. {question}
                  </h3>
                  <div>
                    <RadioGroup
                      name={`intensity_${groupIndex}_${questionIndex}`}
                    >
                      {intensity.map((scale) => (
                        <div
                          key={scale.value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            id={`intensity_${groupIndex}_${questionIndex}_${scale.value}`}
                            value={scale.value.toString()}
                            required
                          />
                          <Label
                            htmlFor={`intensity_${groupIndex}_${questionIndex}_${scale.value}`}
                          >
                            {scale.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </BaseQuestionnaire>
  );
}
