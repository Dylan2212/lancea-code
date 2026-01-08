import { useEffect, useState } from "react";
import { canAddSkill } from "@/src/businessRules";
import type { SkillMeta } from "@/src/domain/skills/mergeSkills";

export default function useAddedSkills (startingSkills: SkillMeta[] = []): {
  addedSkills: SkillMeta[],
  addSkill: (skill: SkillMeta) => void,
  removeSkill: (index: number) => void
} {
  const [addedSkills, setAddedSkills] = useState<SkillMeta[]>([])

  useEffect(() => {
    setAddedSkills(startingSkills)
  }, [])

  function addSkill (skill: SkillMeta): void {
    setAddedSkills(prev => !canAddSkill(prev, skill) ? prev : [...prev, skill])
    return
  }

  function removeSkill (index: number): void {
    setAddedSkills(prev => prev.filter((_,i) => i !== index))
    return
  }

  return { addedSkills, addSkill, removeSkill }
}