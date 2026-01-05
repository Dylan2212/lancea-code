"use server"
import { createClient } from "@/utils/supabase/server";

export async function getPredefinedSkills (): Promise<{id: string, normalized_name: string, usage: number}[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("predefined_skills")
    .select("*")

  if (error || !data) throw new Error("Could not load skills:", error)

  return data
}

export async function addPredefinedProjectSkills (project_id: string, predefinedIds: string[]) {
  if (predefinedIds.length === 0) return

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  console.log('USER IN addPredefinedProjectSkills:', user?.id)

  const { error } = await supabase
    .from("project_skills")
    .upsert(predefinedIds.map(skill_id => ({ project_id, skill_id })), { ignoreDuplicates: true })

  if (error) console.log(error)
  if (error) throw new Error("Could not add project skills:", error)
}