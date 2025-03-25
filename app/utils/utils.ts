// Calculate total number of questions
export const questionCount = (questionnaire: any) => {
  if (questionnaire.id === "stai-anxiete-generalisee") {
    const q0 = questionnaire.questions[0];
    const q1 = questionnaire.questions[1];
    return (
      (typeof q0 === "object" && q0.items ? q0.items.length : 1) +
      (typeof q1 === "object" && q1.items ? q1.items.length : 1)
    );
  }
  return questionnaire.questions.length;
};
