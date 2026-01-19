import type { SupabaseClient } from "@supabase/supabase-js"

export async function getPredefinedSkillsClient (supabase: SupabaseClient): Promise<{id: string, normalized_name: string, usage: number}[]> {

  const { data, error } = await supabase
    .from("predefined_skills")
    .select("*")

  if (error) throw error

  return data ?? []
}