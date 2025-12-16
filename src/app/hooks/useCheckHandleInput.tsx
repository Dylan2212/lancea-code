import { useEffect, useState } from "react"
import isValidHandle from "@/lib/isValidHandle"

export default function useCheckHandle (inputValue: string) {
  const [handle, setHandle] = useState(inputValue)
  const [maxCharacters, setMaxCharacters] = useState(false)
  const [showInvalidCharMessage, setShowInvalidCharMessage] = useState(false)

  useEffect(() => {
    const input = inputValue.split("/")[1]

    if (input === undefined) return
    setMaxCharacters(input.length >= 30)

    if (isValidHandle(input)) {
      setHandle(input)
      setShowInvalidCharMessage(false)
    } else {
      setShowInvalidCharMessage(true)
    }
  }, [inputValue])

  return {handle, showInvalidCharMessage, maxCharacters}
}