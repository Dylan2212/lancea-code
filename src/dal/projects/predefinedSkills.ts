import { createAdminClient } from "@/utils/supabase/server";

export async function addPredefinedProjectSkills (project_id: string, predefinedIds: string[]) {
  if (predefinedIds.length < 0) return
  const admin = createAdminClient()

  const { error } = await admin
    .from("project_skills")
    .upsert(predefinedIds.map(skill_id => ({ project_id, skill_id })), { ignoreDuplicates: true })

  if (error) throw error
}

export async function deletePredefinedProjectSkillsAdmin (project_id: string, predefinedIds: string[]) {
  if (predefinedIds.length < 0) return
  const admin = createAdminClient()

  const { error } = await admin
    .from("project_skills")
    .delete()
    .eq("project_id", project_id)
    .in("skill_id", predefinedIds)

  if (error) throw error
}