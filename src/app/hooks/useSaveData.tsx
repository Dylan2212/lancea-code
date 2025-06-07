import { supabase } from "@/lib/supabaseClient"
import type { User } from "../../../lib/fetchUserData"
import toast from "react-hot-toast"

export default function useSaveData () {

  type UpdateUserData = Partial<Omit<User, "id">>

  const saveData = async (userId: string, dataToUpdate: UpdateUserData) => {
    const { error } = await supabase
      .from("users")
      .update(dataToUpdate)
      .eq("id", userId)
    
    if (error) {
      toast.error("Failed to save changes")
      return false
    }
    toast.success("Changes saved!")
    return true
  }

  return { saveData }
}