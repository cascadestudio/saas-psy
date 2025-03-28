import { createClient } from "@/utils/supabase/server";

export async function createUserProfile(
  userId: string,
  email: string,
  firstName?: string,
  lastName?: string
) {
  const supabase = await createClient();

  const { error } = await supabase.from("profiles").insert([
    {
      id: userId,
      email,
      first_name: firstName || null,
      last_name: lastName || null,
      favorite_questionnaires: [],
      updated_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Error creating user profile:", error);
    return false;
  }

  return true;
}
