"use client";

import { useRouter, useParams } from "next/navigation";

const DevTools = () => {
  const params = useParams();
  const questionnaireId = params.id as string;

  if (process.env.NODE_ENV !== "development") return null;
  const router = useRouter();

  const handleDevResultsShortcut = () => {
    router.push("/results");
  };

  return (
    <div className="fixed bottom-4 right-4 flex gap-2">
      <div className="fixed bottom-4 right-4 flex gap-2">
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
