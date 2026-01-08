import type { SupabaseClient } from "@supabase/supabase-js"

export async function getPredefinedSkills (supabase: SupabaseClient): Promise<{id: string, normalized_name: string, usage: number}[]> {

  const { data, error } = await supabase
    .from("predefined_skills")
    .select("*")

  if (error) throw error

  return data ?? []
}

export async function addPredefinedProjectSkills (supabase: SupabaseClient, project_id: string, predefinedIds: string[]) {
  if (predefinedIds.length === 0) return

  const { error } = await supabase
    .from("project_skills")
    .upsert(predefinedIds.map(skill_id => ({ project_id, skill_id })), { ignoreDuplicates: true })

  if (error) throw error
}