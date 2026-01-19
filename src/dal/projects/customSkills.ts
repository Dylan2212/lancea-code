import { createAdminClient } from "@/utils/supabase/server"

export async function addProjectCustomSkills (project_id: string, customIds: string[]) {
  if (customIds.length === 0) return
  const admin = createAdminClient()

  const { error } = await admin
    .from("project_custom_skills")
    .upsert(customIds.map(custom_skill_id => ({ project_id, custom_skill_id })), { onConflict: "custom_skill_id" })

  if (error) throw error
}

export async function deleteCustomProjectSkillsAdmin (project_id: string, customIds: string[]) {
  if (customIds.length === 0) return
  const admin = createAdminClient()

  const { error } = await admin
    .from("project_skills")
    .delete()
    .eq("project_id", project_id)
    .in("skill_id", customIds)

  if (error) throw error
}