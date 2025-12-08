"use client"
import { useState, useMemo } from "react"
import React from "react"
import { Trie } from "@/utils/trie/trie"
import skills from "@/data/skills.json";

export default function AddSkills () {
  const [inputValue, setInputValue] = useState("")
  const [results, setResults] = useState<string[]>([])
  //const [predefinedSkills, setPredefinedSkills] = useState<string[]>([])
  //const [customSkills, setCustomSkills] = useState<string[]>([])
  const skillsTrie = useMemo(() => {
    const t = new Trie()
    t.insertMany(skills)
    return t
  }, [])

  function addSkill () {
    // logic to add a skill (empty in your original snippet)
  }

  function newInput (e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setInputValue(value)
    setResults(value === "" ? [] : skillsTrie.search(value.toLowerCase()))
  }

  function pressedEnter (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="
      mt-16 mb-3 ml-2 relative p-3 rounded-2xl 
      border border-[#E9D5FF]
      shadow-[0_0_20px_-5px_rgba(126,34,206,0.15)]
      bg-white
    ">
      <p className="text-lg">Add Your Skills:</p>
      <div className="mt-6">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Web design"
            onChange={newInput}
            onKeyDown={(e) => pressedEnter(e)}
            value={inputValue}
            className="w-[85%] shadow rounded-xl ring-1 ring-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-[#E9D5FF] focus:ring-2 focus:outline-none transition"
          />
          <button 
            onClick={addSkill} 
            className="rounded-lg py-3 px-4 text-[#7E22CE] border-2 border-[#7E22CE] font-semibold shadow-md bg-white transition-all duration-200 ease-in-out hover:bg-gray-100"
          >
            Add
          </button>
        </div>
        <ul>{results.map((result, index) => <p key={index}>{result}</p>)}</ul>
      </div>
    </div>
  )
}