import splitSkills from "./splitSkills"
import predefinedSkillsToIds from "./predefinedSkillsToIds"
import { getPredefinedSkills, addPredefinedProjectSkills } from "@/src/dal/predefinedSkills"
import { resolveOrCreateCustomSkills } from "./resolveOrCreateCustomSkills"
import { normalizeSkillsArr } from "./normalizeSkillsArr"
import { addProjectCustomSkills } from "@/src/dal/customSkills"

export default async function processProjectSkills (projectId: string, skills: string[]) {
  const predefinedSkills = await getPredefinedSkills()
  const predefinedSkillsMap = new Map(predefinedSkills.map(skill => [skill.normalized_name, skill.id]))

  const normalSkills = normalizeSkillsArr(skills)
  const { predefined, custom } = splitSkills(normalSkills, predefinedSkillsMap)

  const predefinedIds = predefinedSkillsToIds(predefined, predefinedSkillsMap)
  const customIds = await resolveOrCreateCustomSkills(custom)

  await addProjectCustomSkills(projectId, customIds)
  await addPredefinedProjectSkills(projectId, predefinedIds)
}