"use server"
import { createClient } from "@/utils/supabase/server";

export default async function predefinedSkillNames (): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("predefined_skills")
    .select("normalized_name")

  if (error || !data) throw new Error("Could not load skills:", error)

  return data.map(row => row.normalized_name)
}