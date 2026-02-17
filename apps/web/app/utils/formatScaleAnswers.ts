import { QuestionGroup, BDIQuestion } from "@/app/types";

export function formatScaleAnswers(scale: any, answers: any) {
  // For multi-scale forms like Liebowitz
  if (scale.id === "echelle-d-anxiete-sociale-de-liebowitz") {
    return scale.questions.map((question: any, index: any) => {
      const anxietyValue = answers[`anxiety_${index}`];
      const avoidanceValue = answers[`avoidance_${index}`];

      const anxietyLabel =
        scale.answerScales.anxiety.find(
          (s: any) => s.value.toString() === anxietyValue
        )?.label || "Non répondu";

      const avoidanceLabel =
        scale.answerScales.avoidance.find(
          (s: any) => s.value.toString() === avoidanceValue
        )?.label || "Non répondu";

      return `${question}:\n- Anxiété: ${anxietyLabel}\n- Évitement: ${avoidanceLabel}`;
    });
  }

  // Add special handling for STAI scale
  if (scale.id === "stai-anxiete-generalisee") {
    console.log("STAI scale handling activated");
    return (scale.questions as QuestionGroup[]).flatMap(
      (group, groupIndex) => {
        return group.items.map((question, questionIndex) => {
          const answerValue =
            answers[`intensity_${groupIndex}_${questionIndex}`];
          const answerLabel =
            scale.answerScales.intensity.find(
              (s: any) => s.value.toString() === answerValue
            )?.label || "Non répondu";

          console.log(questionIndex + 1, question, answerLabel);
          return `${questionIndex + 1}. ${question} : ${answerLabel}`;
        });
      }
    );
  }

  // Add special handling for BDI scale
  if (scale.id === "inventaire-de-depression-de-beck") {
    console.log("BDI scale handling activated");
    return (scale.questions as BDIQuestion[]).map((question, index) => {
      const answerValue = answers[`bdi_${index}`];
      if (!answerValue) {
        return `${index + 1}. ${question.title} : Non répondu`;
      }

      const selectedOption = question.options.find(
        (option) => option.value.toString() === answerValue
      );

      if (!selectedOption) {
        return `${index + 1}. ${question.title} : Non répondu`;
      }

      return `${index + 1}. ${question.title} : ${selectedOption.text} (${selectedOption.value})`;
    });
  }

  // Default case: single-scale forms
  const scaleName = Object.keys(scale.answerScales)[0];
  const answerScale = scale.answerScales[scaleName];

  return scale.questions.map((question: any, index: any) => {
    const answerValue = answers[`${scaleName}_${index}`];
    const answerLabel =
      answerScale.find((s: any) => s.value.toString() === answerValue)?.label ||
      "Non répondu";

    return `${question} : ${answerLabel}`;
  });
}
