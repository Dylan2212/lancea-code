import { useUserStore } from "@/lib/store/useUserStore"
import { supabase } from "@/lib/supabaseClient"
import { useState, useEffect } from "react"

export default function useHandleCheck (handle: string) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const userId = useUserStore.getState().userId

  const isValid =  (() => {
    if (!handle) return false
    const reserved = ["admin", "api", "login", "signup", "logout", "settings"]
    
    if (reserved.includes(handle.toLowerCase())) return false
    
    return handle.length > 0 && handle.length <= 30 && !handle.includes(" ")
  })()

  useEffect(() => {
    if (!isValid) {
      setIsAvailable(null)
      return
    }

    const debounce = setTimeout(async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("handle", handle)
        .neq("id", userId)

      if (error) {
        console.log("Error checking handle: ", error)
        setIsAvailable(null)
      } else {
        setIsAvailable(data.length === 0)
      }

      setLoading(false)

    }, 500)

    return () => clearTimeout(debounce)

  }, [setIsAvailable, isValid, handle, userId])

  return {
    isValid,
    isAvailable,
    loading
  }
}