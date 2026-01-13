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