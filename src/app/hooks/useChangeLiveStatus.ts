import { toast } from "react-hot-toast"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { supabase } from "@/lib/supabaseClient"

export function useChangeLiveStatus(userId: string) {
  const isLive = useOriginalUserStore(state => state.isLive)
  const setLiveInStore = useOriginalUserStore(state => state.setIsLive)

  const changeInLiveStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const is_live = e.target.value === "Online"

    if (is_live) {
      await supabase
        .from("users")
        .update({is_live: true})
        .eq("id", userId)

      toast.success("Your site is now live!")
      setLiveInStore(true)
    } else {
      await supabase
        .from("users")
        .update({is_live: false})
        .eq("id", userId)
        
      toast("Site is now hidden.")
      setLiveInStore(false)
    }
  }

  return { isLive, changeInLiveStatus }
}