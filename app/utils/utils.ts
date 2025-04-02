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

// Extract example questions from a questionnaire
export const getExampleQuestions = (questionnaire: any) => {
  return questionnaire.questions.slice(0, 5).flatMap((question: any) => {
    if (typeof question === "string") {
      return question;
    } else if (question.items && question.items.length > 0) {
      return question.items.slice(0, 2);
    }
    return [];
  });
};
