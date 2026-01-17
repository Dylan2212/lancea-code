import splitSkills from "./splitSkills"
import { addPredefinedProjectSkills } from "@/src/dal/projects/predefinedSkills"
import { resolveOrCreateCustomSkills } from "./resolveOrCreateCustomSkills"
import { normalizeSkillsArr } from "./normalizeSkillsArr"
import { addProjectCustomSkills } from "@/src/dal/projects/customSkills"
import { SkillMeta } from "./mergeSkills"
import { createAdminClient } from "@/utils/supabase/server"

export default async function processProjectSkills (projectId: string, skills: SkillMeta[]) {
  const admin = createAdminClient()
  const normalSkills = normalizeSkillsArr(skills)
  const { predefined, custom } = splitSkills(normalSkills)

  const predefinedIds = predefined.map(skill => skill.id)
  const customIds = await resolveOrCreateCustomSkills(admin, custom)

  if (customIds.length > 0) await addProjectCustomSkills(admin, projectId, customIds)
  if (predefinedIds.length > 0) await addPredefinedProjectSkills(admin, projectId, predefinedIds)
}