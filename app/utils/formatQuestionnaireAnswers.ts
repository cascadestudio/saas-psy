export function formatQuestionnaireAnswers(questionnaire: any, answers: any) {
  if (Object.keys(questionnaire.answerScales).length === 1) {
    const scaleName = Object.keys(questionnaire.answerScales)[0];
    const scale = questionnaire.answerScales[scaleName];

    return questionnaire.questions.map((question: any, index: any) => {
      const answerValue = answers[`${scaleName}_${index}`];
      const answerLabel =
        scale.find((s: any) => s.value.toString() === answerValue)?.label ||
        "Non répondu";

      return `${question} : ${answerLabel}`;
    });
  }

  // For multi-scale questionnaires like Liebowitz
  if (questionnaire.id === "echelle-d-anxiete-sociale-de-liebowitz") {
    return questionnaire.questions.map((question: any, index: any) => {
      const anxietyValue = answers[`anxiety_${index}`];
      const avoidanceValue = answers[`avoidance_${index}`];

      const anxietyLabel =
        questionnaire.answerScales.anxiety.find(
          (s: any) => s.value.toString() === anxietyValue
        )?.label || "Non répondu";

      const avoidanceLabel =
        questionnaire.answerScales.avoidance.find(
          (s: any) => s.value.toString() === avoidanceValue
        )?.label || "Non répondu";

      return `${question}:\n- Anxiété: ${anxietyLabel}\n- Évitement: ${avoidanceLabel}`;
    });
  }
}
