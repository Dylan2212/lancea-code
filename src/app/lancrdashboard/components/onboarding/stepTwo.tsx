import { supabase } from "@/lib/supabaseClient"
import "./onboarding.css"
import { useUserStore } from "@/lib/store/useUserStore"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import toast from "react-hot-toast"
import { useState } from "react"

type MyProps = {
  previousStep: () => void,
  finishOnboarding: () => void
}

export default function StepTwo ({ previousStep, finishOnboarding }: MyProps) {
  const { setTitle, setUsername } = useUserStore()
  const [tempTitle, setTempTitle] = useState("")
  const [tempUsername, setTempUsername] = useState("")
  const userId = useOriginalUserStore(state => state.userId)

  async function finish () {
    const testTitle = tempTitle.replace(/\s+/g, '')
    const testUsername = tempUsername.replace(/\s+/g, '')

    if (testTitle === "" || testUsername === "") {
      toast.error("Name and Title are required fields.")
      return
    }

    const { error } = await supabase
      .from("users")
      .update({"title": tempTitle, "username": tempUsername})
      .eq("id", userId)

    if (error) {
      console.error(error)
      toast.error("Something went wrong.")
      return
    }

    useOriginalUserStore.setState(state => ({
      ...state,
      title: tempTitle,
      username: tempUsername
    }))

    setTitle(tempTitle)
    setUsername(tempUsername)

    finishOnboarding()
  }

  function prev () {
    previousStep()
  }

  return (
    <>
      <div className="w-11/12 space-y-1">
        <p className="font-semibold text-2xl text-gray-900">
          Basic Info
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Add your name and professional title so clients instantly know who you are and what you do.
        </p>
      </div>
      <div className="space-y-6 mt-10 mb-14 w-full md:w-11/12 mx-auto">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Name<span className="text-red-500">*</span></label>
          <input
            type="text"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            placeholder="John Doe"
            className="w-full shadow rounded-xl ring-1 ring-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-[#E9D5FF] focus:ring-2 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Title<span className="text-red-500">*</span></label>
          <input
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            placeholder="Product Designer"
            className="w-full shadow rounded-xl ring-1 ring-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-[#E9D5FF] focus:ring-2 focus:outline-none transition"
          />
        </div>
      </div>
      <div className="w-full flex flex-row-reverse justify-between">
        <button className="onboarding-btn" onClick={finish}>Finish</button>
        <button className="onboarding-btn" onClick={prev}>Previous</button>
      </div>
    </>
  )
}