import { SignUpForm } from "@/components/auth/sign-up-form";
import { SmtpMessage } from "../smtp-message";

export default function Signup() {
  return (
    <>
      <SignUpForm />
      <SmtpMessage />
    </>
  );
}
