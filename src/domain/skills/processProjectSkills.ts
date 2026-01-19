import splitSkills from "./splitSkills"
import { addPredefinedProjectSkills } from "@/src/dal/projects/predefinedSkills"
import { resolveOrCreateCustomSkills } from "./resolveOrCreateCustomSkills"
import { normalizeSkillsArr } from "./normalizeSkillsArr"
import { addProjectCustomSkills } from "@/src/dal/projects/customSkills"
import { SkillMeta } from "./mergeSkills"

export default async function processProjectSkills (projectId: string, skills: SkillMeta[]) {
  const normalSkills = normalizeSkillsArr(skills)
  const { predefined, custom } = splitSkills(normalSkills)

  const predefinedIds = predefined.map(skill => skill.id)
  const customIds = await resolveOrCreateCustomSkills(custom)

  if (customIds.length > 0) await addProjectCustomSkills(projectId, customIds)
  if (predefinedIds.length > 0) await addPredefinedProjectSkills(projectId, predefinedIds)
}