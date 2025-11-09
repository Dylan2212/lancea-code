import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient()
  const { handle } = await req.json();
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("handle", handle)
    .maybeSingle();
  return Response.json({ available: !data });
}