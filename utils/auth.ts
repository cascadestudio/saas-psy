import { adminClient } from "@/utils/supabase/admin";

export async function createUserProfile(
  userId: string,
  email: string,
  firstName?: string,
  lastName?: string
) {
  console.log("Creating profile for user:", userId, email);

  const { error, data } = await adminClient.from("profiles").insert([
    {
      id: userId,
      email,
      first_name: firstName || null,
      last_name: lastName || null,
      favorite_questionnaires: [],
      updated_at: new Date().toISOString(),
    },
  ]);

  console.log("Insert response data:", data);

  if (error) {
    console.error("Error creating user profile:", error);
    return false;
  }

  console.log("Profile created successfully");
  return true;
}
