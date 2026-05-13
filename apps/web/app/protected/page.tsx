"use client";

import { redirect } from "next/navigation";
import { Interfaces } from "doodle-icons";
import { useUser } from "@/app/context/UserContext";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <Interfaces.Sync className="h-6 w-6 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <Interfaces.Info className="h-4 w-4" />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
