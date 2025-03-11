import { createClient } from "@/utils/supabase/server";
import HomeClient from "./HomeClient";
export default async function Instruments() {
  const supabase = await createClient();
  const { data: questionnaires } = await supabase
    .from("questionnaires")
    .select("*");

  return <HomeClient />;
}
