import type { SupabaseClient } from "@supabase/supabase-js";

export async function projectUserId (supabase: SupabaseClient, project_id: string) {  
  return await supabase
    .from("projects")
    .select("user_id")
    .eq("id", project_id)
    .single()
}