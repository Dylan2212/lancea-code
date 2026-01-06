import { useEffect, useState } from "react";
import { canAddSkill } from "@/src/businessRules";

export default function useAddedSkills (startingSkills: string[] = []): {
  addedSkills: string[],
  addSkill: (skill: string) => void,
  removeSkill: (index: number) => void
} {
  const [addedSkills, setAddedSkills] = useState<string[]>([])

  useEffect(() => {
    setAddedSkills(startingSkills)
  }, [])

  function addSkill (skill: string): void {
    setAddedSkills(prev => !canAddSkill(prev, skill) ? prev : [...prev, skill])
    return
  }

  function removeSkill (index: number): void {
    setAddedSkills(prev => prev.filter((_,i) => i !== index))
    return
  }

  return { addedSkills, addSkill, removeSkill }
}