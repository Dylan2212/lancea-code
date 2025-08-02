import { toast } from "react-hot-toast"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { supabase } from "@/lib/supabaseClient"

export function useChangeLiveStatus(userId: string) {
  const isLive = useOriginalUserStore(state => state.isLive)
  const setLiveInStore = useOriginalUserStore(state => state.setIsLive)

  const changeInLiveStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const is_live = e.target.value === "Online"

    if (is_live) {
      toast.success("Your site is now live!")
      await supabase
        .from("users")
        .update({is_live: true})
        .eq("id", userId)
      
      setLiveInStore(true)
    } else {
      toast("Site is now hidden.")
      await supabase
        .from("users")
        .update({is_live: false})
        .eq("id", userId)
      setLiveInStore(false)
    }
  }

  return { isLive, changeInLiveStatus }
}