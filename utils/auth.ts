import { createClient } from "@/utils/supabase/server";

export async function createUserProfile(
  userId: string,
  email: string,
  firstName?: string,
  lastName?: string
) {
  const supabase = await createClient();
  console.log("Creating profile for user:", userId, email);

  const { error, data } = await supabase.from("profiles").insert([
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

// export async function ensureUserProfile(userId: string, email: string) {
//   const supabase = await createClient();

//   // Check if profile exists
//   const { data, error: fetchError } = await supabase
//     .from("profiles")
//     .select("id")
//     .eq("id", userId)
//     .single();

//   // If profile doesn't exist, create it
//   if (fetchError || !data) {
//     return createUserProfile(userId, email);
//   }

//   return true;
// }
