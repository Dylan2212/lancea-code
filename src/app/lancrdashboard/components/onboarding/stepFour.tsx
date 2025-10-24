import TipTapEditor from "../tiptapeditor"
import { useUserStore } from "@/lib/store/useUserStore"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { supabase } from "@/lib/supabaseClient"
import toast from "react-hot-toast"

type MyProps = {
  nextStep: () => void,
  previous: () => void
}

export default function StepFour ({ nextStep, previous }: MyProps) {
  const bio = useUserStore(state => state.bio)
  const userId = useOriginalUserStore(state => state.userId)

  function previousStep () {
    useOriginalUserStore.setState(state => ({
      ...state,
      bio: bio
    }))

    previous()
  }

  async function next () {
    const { error } = await supabase
      .from("users")
      .update({"bio": bio})
      .eq("id", userId)

    if (error) {
      toast.error("Could not save bio.")
      return
    }

    useOriginalUserStore.setState(state => ({
      ...state,
      bio: bio
    }))

    nextStep()
  }

  return (
    <>
      <div className="w-11/12 space-y-1">
        <p className="font-semibold text-2xl text-gray-900">
          Bio (Optional)
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Write a short bio that highlights who you are, what you do, and what makes your work stand out.
        </p>
      </div>
      <div className="space-y-6 mt-10 mb-14 w-full md:w-11/12 mx-auto flex flex-col items-center justify-center">
        <div className="w-full">
          <TipTapEditor/>
        </div>
      </div>
      <div className="w-full flex flex-row-reverse justify-between">
        <button className="onboarding-btn" onClick={next}>Next</button>
        <button className="onboarding-btn" onClick={previousStep}>Previous</button>
      </div>
    </>
  )
}