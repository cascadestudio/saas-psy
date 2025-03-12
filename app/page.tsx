import { createClient } from "@/utils/supabase/server";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const supabase = await createClient();
  const { data: questionnaires } = await supabase
    .from("questionnaires")
    .select("*");
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <HomeClient />
      </main>
    </>
  );
}
