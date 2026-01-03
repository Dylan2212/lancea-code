import { useEffect, useState } from "react"
import useSkillsTrie from "./useSkillsTrie"

export default function useSkillsInput (addSkill: (skill: string) => void): {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  input: string,
  results: string[],
  newInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isFocused: boolean,
  onFocus: () => void,
  onBlur: () => void,
  suggestedIndex: number,
  resultClicked: (skill: string) => void
} {
  const [input, setInput]= useState<string>("")
  const [results, setResults] = useState<string[]>([])
  const [suggestedIndex, setSuggestedIndex] = useState<number>(-1)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const { skillsTrie } = useSkillsTrie()

  useEffect(() => {
    setSuggestedIndex(-1)
  }, [results])

  function searchTrie (prefix: string): string[] {
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

  function resultClicked (skill: string): void {
    addSkill(skill)
    resetInput()
    return
  }

  function onKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
    switch (e.key) {
      case "Enter":
        e.preventDefault()
        if (input === "") return
        addSkill(input)
        resetInput()
        break
      case "Tab":
        e.preventDefault()
        if (results.length <= 0) return
        const selectedResult = suggestedIndex > -1 ? results[suggestedIndex] : results[0]
        setInput(selectedResult)
        setResults(searchTrie(selectedResult))
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

  return { onKeyDown, input, newInput, results, isFocused, onFocus, onBlur, suggestedIndex, resultClicked }
}