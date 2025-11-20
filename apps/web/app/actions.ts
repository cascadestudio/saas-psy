"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { api, ApiError } from "@/lib/api-client";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const firstName = formData.get("firstName")?.toString();
  const lastName = formData.get("lastName")?.toString();

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "L'email et le mot de passe sont requis"
    );
  }

  try {
    await api.auth.register({
      email,
      password,
      firstName,
      lastName,
    });

    return encodedRedirect(
      "success",
      "/sign-in",
      "Inscription réussie ! Vous pouvez maintenant vous connecter."
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return encodedRedirect("error", "/sign-up", error.message);
    }
    return encodedRedirect(
      "error",
      "/sign-up",
      "Une erreur est survenue lors de l'inscription"
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "L'email et le mot de passe sont requis"
    );
  }

  try {
    await api.auth.login(email, password);
    return redirect("/");
  } catch (error) {
    if (error instanceof ApiError) {
      return encodedRedirect("error", "/sign-in", error.message);
    }
    return encodedRedirect(
      "error",
      "/sign-in",
      "Email ou mot de passe incorrect"
    );
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "L'email est requis");
  }

  // TODO: Implement password reset in NestJS API
  return encodedRedirect(
    "success",
    "/forgot-password",
    "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Le mot de passe et sa confirmation sont requis"
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Les mots de passe ne correspondent pas"
    );
  }

  // TODO: Implement password reset in NestJS API
  return encodedRedirect(
    "success",
    "/protected/reset-password",
    "Mot de passe mis à jour"
  );
};

export const signOutAction = async () => {
  api.auth.logout();
  return redirect("/sign-in");
};
