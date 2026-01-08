import { SkillMeta } from "./mergeSkills"

export default function splitSkills (skills: SkillMeta[]): {
  predefined: SkillMeta[],
  custom: SkillMeta[]
} {
  const custom: SkillMeta[] = []
  const predefined: SkillMeta[] = []

  skills.forEach(skill => {
    if (skill.type === "predefined") {
      predefined.push(skill)
    } else {
      custom.push(skill)
    }
  })

  return { predefined, custom }
}