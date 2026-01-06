import { createClient } from "@/utils/supabase/server"

export async function getProjectsWithSkills (userId: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from("projects")
    .select(`
      *,
      project_skills(skill_id, predefined_skills(normalized_name)),
      project_custom_skills(custom_skill_id, custom_skills(*))
    `)
    .eq("user_id", userId)

  return data
}