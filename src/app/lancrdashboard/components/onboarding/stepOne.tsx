import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"
import toast from "react-hot-toast"
import { ClipLoader } from "react-spinners"
import { Check, X } from "lucide-react"
import useHandleCheck from "@/src/app/hooks/useHandleCheck"

type MyProps = {
  nextStep: () => void
}

export default function StepOne ({ nextStep }: MyProps ) {
  const prefix = "lancrly.com/"
  const storeHandle = useOriginalUserStore(state => state.handle)
  const [showInvalidCharMessage, setShowInvalidCharMessage] = useState(false)
  const [saving, setSaving] = useState(false)
  const [maxCharacters, setMaxCharacters] = useState(false)
  const userId = useOriginalUserStore(state => state.userId)
  const [success, setSuccess] = useState(false)
  const [handle, setHandle] = useState(storeHandle)
  const {isAvailable, isValid, loading} = useHandleCheck(handle)

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

  async function submitUrl () {
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
      setTimeout(() => setSaving(false), 500)
      return
    }

    useOriginalUserStore.setState(state => ({
      ...state,
      handle: handle
    }))

    setTimeout(() => {
      setSaving(false)
      setSuccess(true)
    }, 500)
  }

  return (
    <>
      {!saving && !success && <><div>
        <p className="font-semibold text-2xl text-gray-900">Welcome to Lancrly!</p>
        <p className="text-gray-600 text-sm leading-relaxed">Let&apos;s set up your custom link — it&apos;s how clients will find your portfolio.</p>
        <div className="flex flex-col w-full justify-center items-center py-8">
          <label className="block w-full md:w-5/6 text-sm font-semibold text-gray-600 mb-1">Custom Url<span className="text-red-500">*</span></label>
          <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            submitUrl()
          }} className="relative w-full md:w-5/6">
            <input maxLength={30 + prefix.length} value={prefix + handle} onChange={(e) => handleInput(e)} className="w-full shadow rounded-xl ring-1 pr-14 ring-gray-200 bg-white mb-1 px-4 py-4 text-lg text-gray-900 placeholder-gray-400 focus:ring-[#E9D5FF] focus:ring-2 focus:outline-none transition" type="text" placeholder="lancrly.com/" />
            <>
              {loading && <div className="absolute right-4 top-1/2 -translate-y-1/2"><ClipLoader size={30} color="#7E22CE"/></div>}
              {!loading && isValid && isAvailable && <Check className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7E22CE] w-[30px] h-[30px]" />}
              {!loading && !isAvailable && <X className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7E22CE] w-[30px] h-[30px]" />}
              {!loading && !isValid && <X className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7E22CE] w-[30px] h-[30px]" />}
            </>
          </form>
          <p className={`max-characters ml-0 w-full md:w-5/6 ${maxCharacters && "text-red-600"}`}>
            Max: {handle.length}/{30} characters
          </p>
          {showInvalidCharMessage && (
            <p className="text-red-600 text-sm mt-1 w-full md:w-5/6"> Only letters, numbers, &quot;.&quot;, &quot;-&quot;, and &quot;_&quot; are allowed. &quot;-&quot; cannot be the first or last character.</p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-row-reverse justify-between">
        <button className="onboarding-btn" onClick={submitUrl}>Submit</button>
      </div></>}

      {saving && <div className="h-full w-full flex items-center justify-center">
        <ClipLoader color="#9CA3AF" size={40} cssOverride={{ borderWidth: "6px" }} />
      </div>}
      {success && (
        <div>
          <div className="flex flex-col items-center justify-center w-full space-y-3 animate-fade-in">
            <div className="bg-purple-50 rounded-full p-3">
              <Check className="w-14 h-14 text-[#7E22CE]" />
            </div>
            <p className="text-gray-900 font-semibold text-2xl">Success!</p>
            <p className="text-gray-600">Your custom link was successfully secured.</p>
          </div>
           <div className="w-full flex flex-row-reverse justify-between">
            <button className="onboarding-btn mt-10" onClick={nextStep}>Continue</button>
          </div>
        </div>
      )}
    </>
  )
}