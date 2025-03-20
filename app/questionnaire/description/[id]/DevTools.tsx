"use client";

import { useRouter } from "next/navigation";

const DevTools = () => {
  if (process.env.NODE_ENV !== "development") return null;
  const router = useRouter();

  const handleDevShortcut = () => {
    router.push("/questionnaire");
  };

  const handleDevResultsShortcut = () => {
    router.push("/results");
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
        <button
          onClick={handleDevResultsShortcut}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          [DEV] Skip to Results
        </button>
      </div>
    </div>
  );
};

export default DevTools;
