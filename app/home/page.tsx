import { createClient } from "@/utils/supabase/server";

export default async function Instruments() {
  const supabase = await createClient();
  const { data: questionnaires } = await supabase
    .from("questionnaires")
    .select("*");

  console.log(questionnaires);

  return <pre>{JSON.stringify(questionnaires, null, 2)}</pre>;
}
