import type { SupabaseClient } from "@supabase/supabase-js"

export async function addProjectCustomSkills (supabase: SupabaseClient, project_id: string, customIds: string[]) {
  if (customIds.length === 0) return

  const { error } = await supabase
    .from("project_custom_skills")
    .upsert(customIds.map(custom_skill_id => ({ project_id, custom_skill_id })), { onConflict: "custom_skill_id" })

  if (error) throw error
}

export async function deleteCustomProjectSkills (supabase: SupabaseClient, project_id: string, customIds: string[]) {
  if (customIds.length === 0) return

  const { error } = await supabase
    .from("project_skills")
    .delete()
    .eq("project_id", project_id)
    .in("skill_id", customIds)

  if (error) throw error
}