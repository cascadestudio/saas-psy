import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Inscription</h1>
        <p className="text-sm text text-foreground">
          Vous avez déjà un compte ?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Se connecter
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="vous@exemple.com" required />
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            type="password"
            name="password"
            placeholder="Votre mot de passe"
            minLength={6}
            required
          />
          <SubmitButton
            formAction={signUpAction}
            pendingText="Inscription en cours..."
          >
            S'inscrire
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
