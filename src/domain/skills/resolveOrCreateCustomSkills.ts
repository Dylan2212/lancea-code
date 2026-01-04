import { getCustomSkills, insertCustomSkills } from "@/src/dal/customSkills";
import { v4 as uuid } from "uuid";

export async function resolveOrCreateCustomSkills (custom: string[]): Promise<string[]> {
  const data = await getCustomSkills()
  const customSkillsMap = new Map(data.map(skill => [skill.normalized_name, skill.id]))

  const skillsToAdd: { id: string, normalized_name: string }[] = []
  const customIds: string[] = []

  for (const skill of custom) {
    if (customSkillsMap.has(skill)) {
      customIds.push(customSkillsMap.get(skill) as string)
    } else {
      const id = uuid()
      skillsToAdd.push({
        id,
        normalized_name: skill
      })
      customIds.push(id)
    }
  }

  if (skillsToAdd.length > 0) await insertCustomSkills(skillsToAdd)

  return customIds
}