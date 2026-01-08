import { useEffect, useState } from "react"
import useSkillsTrie from "./useSkillsTrie"
import { SkillMeta } from "@/src/domain/skills/mergeSkills"
import { v4 as uuid } from "uuid"

export default function useSkillsInput (addSkill: (skill: SkillMeta) => void): {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  input: string,
  results: SkillMeta[],
  newInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isFocused: boolean,
  onFocus: () => void,
  onBlur: () => void,
  suggestedIndex: number,
  resultClicked: (skill: SkillMeta) => void,
  ghostSuggestion: string | null,
  enteredSkill: () => void
} {
  const [input, setInput]= useState<string>("")
  const [results, setResults] = useState<SkillMeta[]>([])
  const [suggestedIndex, setSuggestedIndex] = useState<number>(-1)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const { skillsTrie } = useSkillsTrie()

  useEffect(() => {
    setSuggestedIndex(-1)
  }, [results])

  const ghostSuggestion = (() => {
    if (!isFocused || !input || results.length === 0) return null

    const suggestion = suggestedIndex > -1 ? results[suggestedIndex] : results[0]

    return input + suggestion.name.slice(input.length)
  })()

  function searchTrie (prefix: string): SkillMeta[] {
    if (prefix === "" || !skillsTrie) return []
    return skillsTrie.search(prefix)
  }

  function onFocus (): void {
    setIsFocused(true)
  }

  function onBlur (): void {
    setSuggestedIndex(-1)
    setIsFocused(false)
    return
  }

  function newInput (e: React.ChangeEvent<HTMLInputElement>): void {
    setInput(e.target.value)
    setResults(searchTrie(e.target.value))
    return
  }

  function resetInput (): void {
    setResults([])
    setInput("")
    return
  }

  function resultClicked (skill: SkillMeta): void {
    addSkill(skill)
    resetInput()
    return
  }

  function enteredSkill () {
    if (!results[0] || results[0].name !== input) {
      addSkill({type: "custom", id: uuid(), name: input})
    } else {
      addSkill(results[0])
    }
    resetInput()
  }

  function onKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
    switch (e.key) {
      case "Enter":
        e.preventDefault()
        if (input === "") return
        if (suggestedIndex > -1) {
          addSkill(results[suggestedIndex])
        } else {
          enteredSkill()
        }
        resetInput()
        break
      case "Tab":
        e.preventDefault()
        if (results.length <= 0) return
        const selectedResult = suggestedIndex > -1 ? results[suggestedIndex] : results[0]
        setInput(selectedResult.name)
        setResults(searchTrie(selectedResult.name))
        break
      case "ArrowUp":
        e.preventDefault()
        setSuggestedIndex(prev => Math.max(prev - 1, -1))
        break
      case "ArrowDown":
        e.preventDefault()
        if (results.length === 0) return
        setSuggestedIndex(prev => Math.min(prev + 1, results.length - 1))
        break
    }
    return
  }

  return { enteredSkill, ghostSuggestion, onKeyDown, input, newInput, results, isFocused, onFocus, onBlur, suggestedIndex, resultClicked }
}