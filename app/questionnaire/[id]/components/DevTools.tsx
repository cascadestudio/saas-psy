"use client";

import { useRouter, useParams } from "next/navigation";
import { QuestionnaireResults } from "./QuestionnaireResults";
import { useState } from "react";

type DevToolsProps = {
  formRef?: React.RefObject<HTMLFormElement | null>;
  questionnaireData?: {
    id: string;
    title: string;
  };
  patientInfo?: {
    firstname: string;
    lastname: string;
    psychologistEmail: string;
  };
};

const DevTools = ({
  formRef,
  questionnaireData,
  patientInfo,
}: DevToolsProps) => {
  const [showDevResults, setShowDevResults] = useState(false);
  const [mockSubmissionData, setMockSubmissionData] = useState<any>(null);

  if (process.env.NODE_ENV !== "development") return null;

  const handleDevResultsShortcut = () => {
    if (formRef?.current) {
      const formData = new FormData(formRef.current);
      const formEntries = Object.fromEntries(formData.entries());

      const submissionData = {
        questionnaireId: questionnaireData?.id,
        questionnaireTitle: questionnaireData?.title,
        patientFirstname: patientInfo?.firstname,
        patientLastname: patientInfo?.lastname,
        psychologistEmail: patientInfo?.psychologistEmail,
        formData: formEntries,
        scoreDetails: {
          total: 0,
          interpretation: "Dev mode interpretation",
        },
      };

      setMockSubmissionData(submissionData);
    }
    setShowDevResults(true);
  };

  if (showDevResults) {
    return <QuestionnaireResults data={mockSubmissionData} />;
  }

  return (
    <div className="fixed bottom-4 right-4 flex gap-2">
      <button
        onClick={handleDevResultsShortcut}
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
      >
        [DEV] Skip to Results
      </button>
    </div>
  );
};

export default DevTools;
