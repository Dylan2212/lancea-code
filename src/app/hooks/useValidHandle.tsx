import { useUserStore } from "@/lib/store/useUserStore"
import { useState, useEffect } from "react"

export default function useValidHandle (handle: string) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const userId = useUserStore.getState().userId

  const isValid =  (() => {
    if (!handle) return false
    const reserved = ["admin", "api", "login", "signup", "logout", "settings"]
    
    if (reserved.includes(handle.toLowerCase())) {
      return false
    }
    
    return handle.length > 0 && handle.length <= 30 && !handle.includes(" ")
  })()

  useEffect(() => {
    if (!isValid) {
      setIsAvailable(null)
      setLoading(false)
      return
    }

    setLoading(true)

    const debounce = setTimeout(async () => {
      try {
        const res = await fetch("/api/check-handle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ handle }),
        })

        const data = await res.json()

        if (!res.ok) throw new Error(data.error || "Failed to check handle")

        setIsAvailable(data.available)

        setLoading(false)

      } catch (error) {
        console.log("Error checking handle: ", error)
        setIsAvailable(null)
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(debounce)

  }, [setIsAvailable, isValid, handle, userId])

  return {
    isValid,
    isAvailable,
    loading
  }
}