import splitSkills from "./splitSkills"

type predefinedSkill = {
  id: string,
  normalized_name: string,
  usage: number
}

export default async function processProjectSkills (projectId: string, skills: string[], predefinedSkills: predefinedSkill[]) {
  const { predefined, custom } = splitSkills(skills, new Set(predefinedSkills.map(skill => skill.normalized_name)))

  const predefinedIds = predefinedSkillsToIds(predefined)
  const customIds = customSkillsToIds(custom)

  updateProjectCustomSkills(customIds)
  updateProjectPredefinedSkills(predefinedIds)
}