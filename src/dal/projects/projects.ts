import { createAdminClient } from "@/utils/supabase/server"
import type { SupabaseClient } from "@supabase/supabase-js"

export async function getProjectsWithSkillsAdmin (userId: string) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_skills(skill_id, predefined_skills(normalized_name)),
      project_custom_skills(custom_skill_id, custom_skills(*))
    `)
    .eq("user_id", userId)

  if (error) throw error
  return data
}

export async function createEmptyProject (supabase: SupabaseClient, projectId: string, userId: string): Promise<string> {
  const { data, error } = await supabase
    .from("projects")
    .insert({ "user_id": userId, "id": projectId })
    .select("id")
    .single()

  if (error) throw error

  return data.id
}