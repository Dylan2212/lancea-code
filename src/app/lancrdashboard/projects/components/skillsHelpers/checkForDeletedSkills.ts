import { SkillMeta } from "@/src/domain/skills/mergeSkills"

export function checkForDeletedSkills (currSkills: SkillMeta[], startingSkills: SkillMeta[]): SkillMeta[] {
  const currSet = new Set(currSkills)
  return startingSkills.filter(skill => !currSet.has(skill))
}