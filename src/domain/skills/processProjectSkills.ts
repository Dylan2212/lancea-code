import splitSkills from "./splitSkills"
import type { predefinedSkill } from "./types"
import predefinedSkillsToIds from "./predefinedSkillsToIds"

export default async function processProjectSkills (projectId: string, skills: string[], predefinedSkills: predefinedSkill[]) {
  const predefinedSkillsMap = new Map(predefinedSkills.map(skill => [skill.normalized_name, skill.id]))
  const { predefined, custom } = splitSkills(skills, predefinedSkillsMap)

  const predefinedIds = predefinedSkillsToIds(predefined, predefinedSkillsMap)
  const customIds = customSkillsToIds(custom)

  updateProjectCustomSkills(customIds)
  updateProjectPredefinedSkills(predefinedIds)
}