"use client";

import { useRouter, useParams } from "next/navigation";

type DevToolsProps = {
  getFormData?: () => FormData | null;
};

const DevTools = ({ getFormData }: DevToolsProps) => {
  const params = useParams();
  const questionnaireId = params.id as string;

  if (process.env.NODE_ENV !== "development") return null;
  const router = useRouter();

  const handleDevResultsShortcut = () => {
    if (getFormData) {
      const formData = getFormData();
      if (formData) {
        const formObject = Object.fromEntries(formData.entries());
        // Encode the form data to pass it safely in the URL
        const encodedData = encodeURIComponent(JSON.stringify(formObject));
        router.push(`/results?data=${encodedData}`);
        return;
      }
    }
    router.push("/results");
  };

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
