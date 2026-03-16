import { SkillMeta } from "./domain/skills/mergeSkills"

export const MAX_SKILLS = 5

export function canAddSkill (currSkills: SkillMeta[], adding: SkillMeta) {
    const currSkillsArr = currSkills.map(skill => skill.name)
    if (currSkillsArr.length === MAX_SKILLS) return false
    if (currSkillsArr.includes(adding.name)) return false
    return true
}

export const lancrlyPortfolioColors = {
  main: "#7E22CE",
  hover: "#6B21A8",
  accent: "#E9D5FF",
  text: "",
  bg: ""
}

export const brandColors = {
  main: "#7E22CE"
}