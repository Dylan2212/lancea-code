import { useState } from "react"
import React from "react"

export default function AddSkills () {
  const [inputValue, setInputValue] = useState("")
  //const [predefinedSkills, setPredefinedSkills] = useState<string[]>([])
  //const [customSkills, setCustomSkills] = useState<string[]>([])

  function addSkill () {

  }

  function pressedEnter (e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault()
    if (e.key === "Enter") {
      addSkill()
    }
  }

  return (
    <div   className="
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
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => pressedEnter(e)}
              value={inputValue}
              className="w-[85%] shadow rounded-xl ring-1 ring-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-[#E9D5FF] focus:ring-2 focus:outline-none transition"
            />
            <button onClick={addSkill} className="rounded-lg py-3 px-4 text-[#7E22CE] border-2 border-[#7E22CE] font-semibold shadow-md bg-white transition-all duration-200 ease-in-out hover:bg-gray-100">Add</button>
          </div>
        </div>
    </div>
  )
}