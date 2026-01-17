"use client"
import useSkillsInput from "@/src/app/hooks/useSkillsInput";
import SkillsInput from "./skillsInput";
import SkillsResults from "./skillsResults";
import AddedSkills from "./addedSkills";
import { SkillMeta } from "@/src/domain/skills/mergeSkills";

type AddSkillsProps = {
  addSkill: (skill: SkillMeta) => void,
  removeSkill: (index: number) => void,
  addedSkills: SkillMeta[],
  maxSkills: boolean
}

export default function AddSkills ({ addSkill, removeSkill, addedSkills, maxSkills}: AddSkillsProps) {
  const { enteredSkill, input, onKeyDown, results, resultClicked, newInput, suggestedIndex, isFocused, onFocus, onBlur, ghostSuggestion } = useSkillsInput(addSkill)

  return (
    <div className="
      mt-16 mb-3 ml-2 relative p-3 rounded-2xl 
      border border-[#E9D5FF]
      shadow-[0_0_20px_-5px_rgba(126,34,206,0.15)]
      bg-white
    ">
      <p className="text-lg font-bold">Add Your Skills:</p>
      <p className={`text-xs text-gray-500`}>Add up to 5 skills</p>
      <div className="mt-6">
        <SkillsInput maxSkills={maxSkills} ghostSuggestion={ghostSuggestion} enteredSkill={enteredSkill} results={results} isFocused={isFocused} suggestedIndex={suggestedIndex} input={input} newInput={newInput} onBlur={onBlur} onFocus={onFocus} onKeyDown={onKeyDown}/>
        {results.length > 0 && isFocused ? (
          <SkillsResults resultClicked={resultClicked} results={results} suggestedIndex={suggestedIndex} isFocused={isFocused}/>
        ) : (
          <AddedSkills addedSkills={addedSkills} removeSkill={removeSkill}/>
        )}

      </div>
    </div>
  )
}