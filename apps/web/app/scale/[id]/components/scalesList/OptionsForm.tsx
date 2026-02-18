"use client";

import BaseScale from "../BaseScale";
import { ScaleProps } from "@/app/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function OptionsForm(props: ScaleProps) {
  const { scale } = props;

  // Development helper function for random values
  const getDevDefaultValue = (questionIndex: number) => {
    if (process.env.NODE_ENV !== "development") return undefined;
    // Generate a random value for testing
    return Math.floor(Math.random() * 4).toString();
  };

  return (
    <BaseScale {...props}>
      <div className="space-y-8">
        {scale.questions.map((question: any, index: number) => (
          <div key={index} className="border p-4 rounded-md">
            <h3 className="font-medium mb-4">
              {index + 1}. {question.title}
            </h3>

            <div>
              <RadioGroup
                name={`option_${index}`}
                defaultValue={getDevDefaultValue(index)}
                required
              >
                {question.options.map((option: any) => (
                  <div
                    key={option.text}
                    className="flex items-start space-x-2 mb-2"
                  >
                    <RadioGroupItem
                      id={`option_${index}_${option.value}`}
                      value={option.value.toString()}
                      className="mt-1"
                    />
                    <Label
                      htmlFor={`option_${index}_${option.value}`}
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
    </BaseScale>
  );
}
