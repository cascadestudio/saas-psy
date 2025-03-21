"use client";

import { useRouter, useParams } from "next/navigation";

const DevTools = () => {
  const params = useParams();
  const questionnaireId = params.id as string;

  if (process.env.NODE_ENV !== "development") return null;
  const router = useRouter();

  const handleDevShortcut = () => {
    router.push(`/questionnaire/${questionnaireId}`);
  };

  return (
    <div className="fixed bottom-4 right-4 flex gap-2">
      <div className="fixed bottom-4 right-4 flex gap-2">
        <button
          onClick={handleDevShortcut}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
        >
          [DEV] Skip to Questionnaire
        </button>
      </div>
    </div>
  );
};

export default DevTools;
