export const MAX_SKILLS = 5

export function canAddSkill (currSkills: string[], adding: string) {
    if (currSkills.length === MAX_SKILLS) return false
    if (currSkills.includes(adding)) return false
    return true
}