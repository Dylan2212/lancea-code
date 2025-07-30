import { toast } from "react-hot-toast"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"

export function useChangeLiveStatus() {
  const isLive = useOriginalUserStore(state => state.isLive)
  const setLiveInStore = useOriginalUserStore(state => state.setIsLive)

  const changeInLiveStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const is_live = e.target.value === "Online"

    if (is_live) {
      toast.success("Your site is now live!")
      setLiveInStore(true)
    } else {
      toast("Site is now hidden.")
      setLiveInStore(false)
    }
  }

  return { isLive, changeInLiveStatus }
}