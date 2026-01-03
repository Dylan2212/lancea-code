"use client"
import useSkillsInput from "@/src/app/hooks/useSkillsInput";
import useAddedSkills from "@/src/app/hooks/useAddedSkills";
import SkillsInput from "./skillsInput";
import SkillsResults from "./skillsResults";
import AddedSkills from "./addedSkills";

//NEED TO ADD SKILLS TO SUPABASE
//DO WE WANT ID TO EITHER CUSTOM OR PREDEFINED?
//SHALL WE ORGANIZE HERE?
//API
//DAL
//NEED PROJECT ID TO ADD SKILL

export default function AddSkills () {
  const { addedSkills, removeSkill, addSkill } = useAddedSkills()
  const { input, onKeyDown, results, resultClicked, newInput, suggestedIndex, isFocused, onFocus, onBlur } = useSkillsInput(addSkill)

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
        <SkillsInput results={results} isFocused={isFocused} suggestedIndex={suggestedIndex} input={input} newInput={newInput} onBlur={onBlur} onFocus={onFocus} onKeyDown={onKeyDown}/>
        {results.length > 0 && isFocused ? (
          <SkillsResults resultClicked={resultClicked} results={results} suggestedIndex={suggestedIndex} isFocused={isFocused}/>
        ) : (
          <AddedSkills addedSkills={addedSkills} removeSkill={removeSkill}/>
        )}

      </div>
    </div>
  )
}