"use server"
import { createClient } from "@/utils/supabase/server"
import type { SupabaseClient } from "@supabase/supabase-js"

export async function getCustomSkills (): Promise<{id: string, normalized_name: string, usage: number}[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("custom_skills")
    .select("*")

  if (error || !data) throw new Error("Could not load skills:", error)

  return data
}

export async function insertCustomSkills (supabase: SupabaseClient, newSkills: { id: string, normalized_name: string }[]) {

  const { error } = await supabase
    .from("custom_skills")
    .upsert(newSkills, { onConflict: "normalized_name" })

  if (error) console.log(error)
  if (error) throw new Error("Could not insert new skills:", error)
}

export async function addProjectCustomSkills (supabase: SupabaseClient, project_id: string, customIds: string[]) {
  const { error } = await supabase
    .from("project_custom_skills")
    .upsert(customIds.map(custom_skill_id => ({ project_id, custom_skill_id })), { onConflict: "custom_skill_id" })

  if (error) throw error
}