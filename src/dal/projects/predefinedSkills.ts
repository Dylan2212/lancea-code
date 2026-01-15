import type { SupabaseClient } from "@supabase/supabase-js";

export async function addPredefinedProjectSkills (supabase: SupabaseClient, project_id: string, predefinedIds: string[]) {
  if (predefinedIds.length < 0) return

  const { error } = await supabase
    .from("project_skills")
    .upsert(predefinedIds.map(skill_id => ({ project_id, skill_id })), { ignoreDuplicates: true })

  if (error) console.log(error)
  if (error) throw error
}

export async function deletePredefinedProjectSkills (supabase: SupabaseClient, project_id: string, predefinedIds: string[]) {
  if (predefinedIds.length < 0) return

  const { error } = await supabase
    .from("project_skills")
    .delete()
    .eq("project_id", project_id)
    .in("skill_id", predefinedIds)

  if (error) throw error
}