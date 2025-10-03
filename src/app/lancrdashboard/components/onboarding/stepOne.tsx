import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"
import toast from "react-hot-toast"
import { ClipLoader } from "react-spinners"

type MyProps = {
  handle: string,
  setHandle: React.Dispatch<React.SetStateAction<string>>,
  isValid: boolean,
  isAvailable: boolean | null,
  loading: boolean,
  nextStep: () => void
}

export default function StepOne ({ handle, setHandle, nextStep, isAvailable, isValid, loading }: MyProps ) {
  const prefix = "lancrly.com/"
  const [showInvalidCharMessage, setShowInvalidCharMessage] = useState(false)
  const [saving, setSaving] = useState(false)
  const [maxCharacters, setMaxCharacters] = useState(false)
  const userId = useOriginalUserStore(state => state.userId)

  function handleInput (e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value.split("/")[1]

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
  }

  async function finishStep () {
    if (!isAvailable || !isValid || !handle) {
      toast.error("Create a valid and available handle")
      return
    }

    setSaving(true)

    const { error } = await supabase
      .from("users")
      .update({"handle": handle, "has_seen_onboarding": true})
      .eq("id", userId)

    if (error) {
      console.error("There was an error saving your custom link: " + error)
      toast.error("There was an error saving your custom link")
      setSaving(false)
      return
    }

    useOriginalUserStore.setState(state => ({
      ...state,
      handle: handle
    }))

    setSaving(false)
    nextStep()
  }

  return (
    <>
      {!saving ? <><div>
        <p className="font-semibold text-2xl">Welcome to Lancrly! Let&apos;s create your custom portfolio URL so clients can easily find your work.</p>
        <input maxLength={30 + prefix.length} value={prefix + handle} onChange={(e) => handleInput(e)} className="p-4 text-gray-600 border-2 mt-12 rounded-xl text-lg w-2/3 mb-1" type="text" placeholder="lancrly.com/" />
        {showInvalidCharMessage ? (
          <p className="text-red-600 text-sm mt-1"> Only letters, numbers, &quot;.&quot;, &quot;-&quot;, and &quot;_&quot; are allowed. &quot;-&quot; cannot be the first or last character.</p>
          ) : maxCharacters ? <p className="text-red-600 text-sm mt-1">Max character limit reached</p> :
          <>{loading && <p>Checking...</p>}
          {!loading && isValid && isAvailable === true && <p>✅ Available</p>}
          {!loading && isValid && isAvailable === false && <p>❌ Taken</p>}
          {!loading && !isValid && <p>❌ Not Valid</p>}</>
        }
      </div>
      <div className="mt-8 w-full flex flex-row-reverse justify-between">
        <button className="onboarding-btn" onClick={finishStep}>Next</button>
      </div></> :
      <div className="h-full w-full flex items-center justify-center">
        <ClipLoader color="#22C55E"   size={40}
        cssOverride={{ borderWidth: "6px" }} /> 
      </div>}
    </>
  )
}