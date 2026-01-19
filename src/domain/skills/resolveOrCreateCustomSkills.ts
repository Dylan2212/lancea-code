import { getCustomSkills, insertCustomSkillsAdmin } from "@/src/dal/skills/customSkills";
import { SkillMeta } from "./mergeSkills";

export async function resolveOrCreateCustomSkills (custom: SkillMeta[]): Promise<string[]> {
  const data = await getCustomSkills()
  const customSkillsMap = new Set(data.map(skill => skill.id))

  const skillsToAdd: { id: string, normalized_name: string }[] = []
  const customIds: string[] = []

  for (const skill of custom) {
    if (customSkillsMap.has(skill.id)) {
      customIds.push(skill.id)
    } else {
      skillsToAdd.push({
        id: skill.id,
        normalized_name: skill.name
      })
      customIds.push(skill.id)
    }
  }

  if (skillsToAdd.length > 0) await insertCustomSkillsAdmin(skillsToAdd)

  return customIds
}