import { SkillMeta } from "./mergeSkills";

export function normalizeSkillsArr (skills: SkillMeta[]): SkillMeta[] {
  return skills.map(skill => ({type: skill.type, id: skill.id, name:skill.name.trim().toLowerCase().replace(/\s+/g, " ")}))
}