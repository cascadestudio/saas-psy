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
