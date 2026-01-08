import splitSkills from "./splitSkills"
import { addPredefinedProjectSkills } from "@/src/dal/predefinedSkills"
import { resolveOrCreateCustomSkills } from "./resolveOrCreateCustomSkills"
import { normalizeSkillsArr } from "./normalizeSkillsArr"
import { addProjectCustomSkills } from "@/src/dal/customSkills"
import type { SupabaseClient } from "@supabase/supabase-js"
import { SkillMeta } from "./mergeSkills"

export default async function processProjectSkills (supabase: SupabaseClient, projectId: string, skills: SkillMeta[]) {

  const normalSkills = normalizeSkillsArr(skills)
  const { predefined, custom } = splitSkills(normalSkills)

  const predefinedIds = predefined.map(skill => skill.id)
  const customIds = await resolveOrCreateCustomSkills(supabase, custom)

  if (customIds.length > 0) await addProjectCustomSkills(supabase, projectId, customIds)
  if (predefinedIds.length > 0) await addPredefinedProjectSkills(supabase, projectId, predefinedIds)
}