import { createClient } from "@/utils/supabase/server";

export async function getUserFavorites(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("favorite_questionnaires")
    .eq("id", userId)
    .single();

  if (error || !data) {
    console.error("Error fetching favorites:", error);
    return [];
  }

  return data.favorite_questionnaires || [];
}

export async function toggleFavorite(userId: string, questionnaireId: string) {
  const supabase = await createClient();

  // Get current favorites
  const { data: userData, error: fetchError } = await supabase
    .from("profiles")
    .select("favorite_questionnaires")
    .eq("id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching user profile:", fetchError);
    return { success: false };
  }

  const currentFavorites = userData?.favorite_questionnaires || [];
  let newFavorites: string[];
  let action: "add" | "remove";

  // Check if the questionnaire is already a favorite
  if (currentFavorites.includes(questionnaireId)) {
    // Remove from favorites
    newFavorites = currentFavorites.filter(
      (id: string) => id !== questionnaireId
    );
    action = "remove";
  } else {
    // Add to favorites
    newFavorites = [...currentFavorites, questionnaireId];
    action = "add";
  }

  // Update the user profile
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      favorite_questionnaires: newFavorites,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (updateError) {
    console.error("Error updating favorites:", updateError);
    return { success: false, action };
  }

  return { success: true, action };
}
