import { useEffect, useState } from "react";
import { canAddSkill } from "@/src/businessRules";
import type { SkillMeta } from "@/src/domain/skills/mergeSkills";

export default function useAddedSkills (startingSkills: SkillMeta[] = [], resetKey: string | undefined): {
  addedSkills: SkillMeta[],
  addSkill: (skill: SkillMeta) => void,
  removeSkill: (index: number) => void,
  maxSkills: boolean
} {
  const [addedSkills, setAddedSkills] = useState<SkillMeta[]>([])
  const [maxSkills, setMaxSkills] = useState<boolean>(false)

  //INFINATE LOOP CREATED!!!!
  useEffect(() => {
    setAddedSkills(startingSkills)
  }, [resetKey])

  function addSkill (skill: SkillMeta): void {
    const canAdd = canAddSkill(addedSkills, skill)
    if (canAdd) {
      setAddedSkills(prev => [...prev, skill])
    } else {
      setMaxSkills(true)
    }
    return
  }

  function removeSkill (index: number): void {
    setAddedSkills(prev => prev.filter((_,i) => i !== index))
    if (maxSkills) setMaxSkills(false)
    return
  }

  return { addedSkills, addSkill, removeSkill, maxSkills }
}