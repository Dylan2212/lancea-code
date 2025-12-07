import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient()
  const { handle, userId } = await req.json();
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("handle", handle)
    .maybeSingle();

  return data?.id === userId ? Response.json({ available: true}) : Response.json({ available: !data });
}