import { useEffect, useState } from "react"

export default function useCheckHandle (inputValue: string) {
  const [handle, setHandle] = useState(inputValue)
  const [maxCharacters, setMaxCharacters] = useState(false)
  const [showInvalidCharMessage, setShowInvalidCharMessage] = useState(false)

  useEffect(() => {
    const input = inputValue.split("/")[1]

    if (input === undefined) return

    if (input.length === 30) {
      setMaxCharacters(true)
    }

    if (maxCharacters && input.length < 30) {
      setMaxCharacters(false)
    }

    if (input === "") {
      setHandle("")
      setShowInvalidCharMessage(false)
      return
    }

    const isValid =
      /^[a-zA-Z0-9._-]+$/.test(input) &&
      !/^-|-$/.test(input)

    if (isValid) {
      setHandle(input)
      setShowInvalidCharMessage(false)
    } else {
      setShowInvalidCharMessage(true)
    }
  }, [handle, showInvalidCharMessage, maxCharacters, inputValue])

  return {handle, showInvalidCharMessage, maxCharacters}
}