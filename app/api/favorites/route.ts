import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { questionnaireId } = await request.json();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }

    // Get current favorites
    const { data: userData } = await supabase
      .from("profiles")
      .select("favorite_questionnaires")
      .eq("id", user.id)
      .single();

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
    await supabase
      .from("profiles")
      .update({
        favorite_questionnaires: newFavorites,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    return NextResponse.json({ success: true, action });
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return NextResponse.json(
      { error: "Échec de la mise à jour des favoris" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("favorite_questionnaires")
      .eq("id", user.id)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      favorites: data.favorite_questionnaires || [],
    });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Échec de la récupération des favoris" },
      { status: 500 }
    );
  }
}
