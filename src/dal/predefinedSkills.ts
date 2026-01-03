"use server"
import { createClient } from "@/utils/supabase/server";

export default async function getPredefinedSkills (): Promise<{id: string, normalized_name: string, usage: number}[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("predefined_skills")
    .select("*")

  if (error || !data) throw new Error("Could not load skills:", error)

  return data
}