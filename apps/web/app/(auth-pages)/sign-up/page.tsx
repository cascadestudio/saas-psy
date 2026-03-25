import { Suspense } from "react";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata = {
  title: "Inscription - Melya",
  description: "Créez votre compte Melya gratuitement",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <Suspense>
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}
