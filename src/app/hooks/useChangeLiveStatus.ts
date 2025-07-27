import { useState } from "react"
import { toast } from "react-hot-toast"
import { supabase } from "@/lib/supabaseClient"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
//NOT STAYING CORRECT ON REFRESH
export function useChangeLiveStatus(userId: string) {
  const isLiveSetter = useOriginalUserStore(state => state.isLive)
  const [isLive, setIsLive] = useState(isLiveSetter)

  const changeInLiveStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const is_live = e.target.value === "Online"

    const { error } = await supabase
      .from("users")
      .update({ is_live })
      .eq("id", userId)

    if (error) {
      console.error(error)
      return
    }

    if (is_live) toast.success("Your site is now live!")
    setIsLive(is_live)
  }

  return { isLive, changeInLiveStatus }
}