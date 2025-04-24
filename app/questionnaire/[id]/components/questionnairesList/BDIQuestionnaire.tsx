"use client";

import BaseQuestionnaire from "../BaseQuestionnaire";
import { QuestionnaireProps } from "@/app/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function BDIQuestionnaire(props: QuestionnaireProps) {
  const { questionnaire } = props;

  // Development helper function for random values
  const getDevDefaultValue = (questionIndex: number) => {
    if (process.env.NODE_ENV !== "development") return undefined;
    // Generate a random value for testing
    return Math.floor(Math.random() * 4).toString();
  };

  return (
    <BaseQuestionnaire {...props}>
      <div className="space-y-8">
        <h2 className="text-lg font-medium">
          Choisissez l'énoncé qui décrit le mieux comment vous vous êtes
          senti(e) au cours des deux dernières semaines
        </h2>

        {questionnaire.questions.map((question: any, index: number) => (
          <div key={index} className="border p-4 rounded-md">
            <h3 className="font-medium mb-4">{index + 1}.</h3>

            <div>
              <RadioGroup
                name={`bdi_${index}`}
                defaultValue={getDevDefaultValue(index)}
              >
                {question.options.map((option: any) => (
                  <div
                    key={option.text}
                    className="flex items-start space-x-2 mb-2"
                  >
                    <RadioGroupItem
                      id={`bdi_${index}_${option.value}`}
                      value={option.value.toString()}
                      required
                      className="mt-1"
                    />
                    <Label
                      htmlFor={`bdi_${index}_${option.value}`}
                      className="text-sm"
                    >
                      {option.text}
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
