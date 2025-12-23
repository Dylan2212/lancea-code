"use client"
import { useState } from "react"
import React from "react"
import { toTitleCase } from "@/utils/titleCase";
import { Plus } from "lucide-react";
import useSkillsTrie from "@/src/app/hooks/useSkillsTrie";

export default function AddSkills () {
  const [inputValue, setInputValue] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [addedSkills, setAddedSkills] = useState<string[]>([])  
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [suggested, setSuggested] = useState<number>(-1)
  const { skillsTrie } = useSkillsTrie()

  //prevent duplicate skills

  function addSkill (autoSelected: string | null = null) {
    if (inputValue === "") return
    if (addedSkills.length === 5) return
    setAddedSkills(prev => [...prev, toTitleCase(!autoSelected ? inputValue : autoSelected)])
    setResults([])
    setInputValue("")
  }

  function removeSkill (index: number) {
    const arr = [...addedSkills]
    arr.splice(index, 1)
    setAddedSkills(arr)
  }

  function newInput (e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setInputValue(value)
    setSuggested(-1)
    setResults(value === "" ? [] : skillsTrie ? skillsTrie.search(value) : [])
  }

  function pressedEnter (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      if (inputValue === "") return
      addSkill(results.length > 0 ? results[suggested]: null)
    }

    if (e.key === "Tab") {
      e.preventDefault()
      if (results.length > 0) {
        setInputValue(results[suggested])
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSuggested(prev => Math.min(prev + 1, results.length - 1))
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      setSuggested(prev => Math.max(prev - 1, 0))
    }
  }

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
        <div className={`flex items-center gap-3 relative`}>
          <div className="relative w-[85%]">
            <input
              type="text"
              placeholder="Web design"
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setSuggested(-1)
                setIsFocused(false)
              }}
              onChange={newInput}
              onKeyDown={(e) => pressedEnter(e)}
              value={inputValue}
              style={{
              backgroundColor: "transparent",
            }}
              className={`w-full rounded-xl relative z-20 ring-1 ring-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-[#E9D5FF] focus:ring-2 focus:outline-none transition`}
            />

            {inputValue && isFocused && results[0] && (
              <span className="absolute left-4 top-[12px] text-gray-300 pointer-events-none">
                {results[suggested]}
              </span>
            )}
          </div>
          
            <button
            type="button"
            className={`
              relative rounded-lg py-3 px-4 text-[#7E22CE] border-2 border-[#7E22CE] 
              font-semibold shadow-md bg-white transition-all duration-200 ease-in-out hover:bg-gray-100
            `}
          >
            Add
          </button>
        </div>

        {results.length > 0 && isFocused ? (
          <ul onMouseDown={(e) => e.preventDefault()} className="mt-4 space-y-2 h-[288px]">
            {results.map((result, index) => (
              <li
                key={index}
                onClick={() => addSkill(result)}
                className={`
                  px-4 py-2 rounded-xl cursor-pointer w-[85%]
                  ${isFocused && index === suggested && "bg-gray-200 border-gray-200 shadow"}
                 text-gray-800 shadow-sm flex justify-between items-center
                  hover:bg-gray-200 hover:shadow
                  border border-gray-100 hover:border-gray-200
                  transition-all duration-150
                `}
              >
                <span>{toTitleCase(result)}</span>

                <Plus />
              </li>
            ))}
          </ul>
        ) : (
        <ul className="w-full flex flex-wrap gap-2 mt-4">
          {addedSkills.map((skill, index) => (
            <li
              key={index}
              className="
                inline-flex items-center
                text-center
                px-3 py-1 
                bg-gray-100 text-gray-800
                rounded-full
                border border-gray-300
                w-fit
                font-medium transition-all duration-300 ease-in-out
                text-sm
              "
            >
              <span className="mr-2">{skill}</span>

              <button
              type="button"
                onClick={() => removeSkill(index)}
                className="
                  text-gray-500 hover:text-red-600 font-bold
                  transition-all duration-300 ease-in-out
                "
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        )}

      </div>
    </div>
  )
}