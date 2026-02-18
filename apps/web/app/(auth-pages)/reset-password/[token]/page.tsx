import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = {
  title: "Réinitialiser le mot de passe - Melya",
  description: "Créez un nouveau mot de passe pour votre compte",
};

interface ResetPasswordPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { token } = await params;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
