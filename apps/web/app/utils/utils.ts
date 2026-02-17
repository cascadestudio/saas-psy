// Calculate total number of questions
export const questionCount = (scale: any) => {
  if (scale.id === "stai-anxiete-generalisee") {
    const q0 = scale.questions[0];
    const q1 = scale.questions[1];
    return (
      (typeof q0 === "object" && q0.items ? q0.items.length : 1) +
      (typeof q1 === "object" && q1.items ? q1.items.length : 1)
    );
  }
  return scale.questions.length;
};

// Extract example questions from a scale
export const getExampleQuestions = (scale: any) => {
  return scale.questions.slice(0, 5).flatMap((question: any) => {
    if (typeof question === "string") {
      return question;
    } else if (question.items && question.items.length > 0) {
      return question.items.slice(0, 2);
    }
    return [];
  });
};
