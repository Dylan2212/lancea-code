"use client"

import useCheckHandle from "../hooks/useCheckHandleInput"
import { useState } from "react"
import useValidHandle from "../hooks/useValidHandle"
import { X, Check } from "lucide-react"
import { ClipLoader } from "react-spinners"
import { useRouter } from "next/navigation"
import HeroImage from "./heroImage"
import { useUserStore } from "@/lib/store/useUserStore"

export default function Hero () {
  const prefix = "lancrly.com/"
  const [input, setInput] = useState("")
  const { handle, showInvalidCharMessage, maxCharacters } = useCheckHandle(input)
  const { isAvailable, isValid, loading } = useValidHandle(handle)
  const setHandle = useUserStore(state => state.setHandle)
  const router = useRouter()

  function submitUrl () {
    setHandle(handle)
    router.push("/signup")
  }

  return (
    <section>
      <div className="relative pt-20 bg-[linear-gradient(to_bottom,#E9D5FF_20%,white_90%)] flex w-dvw h-fit min-h-[625px] flex-col
        md:min-h-[550px]
        lg:h-[92vh] lg:items-center lg:flex-row
      ">
        <div className="z-10 w-full mx-auto flex flex-col max-h-[750px] xs:max-h-none justify-between
        md:w-2/3 md:mx-auto
        lg:pb-0 lg:flex-row lg:pl-8 lg:block lg:mr-0 lg:pt-14
        xl:pl-16 xl:pt-28 xl:w-7/12
        ">
          <h1 className="text-4xl text-center font-sans font-extrabold mt-8 mb-4
          md:text-5xl
          lg:text-start lg:text-6xl lg:my-0
          xl:text-7xl
          ">
            Build your freelance portfolio in minutes
          </h1>
          <div>
            <h2 className="text-lg font-sans text-gray-600 w-5/6 text-center mx-auto mb-3
            lg:mt-5 lg:w-2/3 lg:mx-0 lg:text-start lg:mb-0
            ">
              Create a professional link-in-bio portfolio to share your work, connect your socials, and impress potential clients.
            </h2>
            <div className="flex flex-col w-11/12 justify-center py-8 mx-auto
            lg:mx-0
            ">
              <div className="flex flex-col gap-5 items-center
              lg:flex-row lg:items-start
              ">
                <div className="w-full lg:w-5/6">
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    submitUrl()
                  }} className="relative">
                    <input maxLength={30 + prefix.length} value={prefix + handle} onChange={(e) => setInput(e.target.value)} className="w-full font-sans shadow rounded-xl ring-1 pr-14 ring-gray-200 bg-white mb-1 px-4 py-5 text-lg text-gray-600 placeholder-gray-400 focus:ring-[#E9D5FF] focus:ring-2 focus:outline-none transition" type="text" placeholder="lancrly.com/" />
                    <>
                      {loading && <div className="absolute right-4 top-1/2 -translate-y-1/2"><ClipLoader size={30} color="#7E22CE"/></div>}
                      {!loading && isValid && isAvailable && <Check className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7E22CE] w-[30px] h-[30px]" />}
                      {!loading && !isAvailable && <X className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7E22CE] w-[30px] h-[30px]" />}
                      {!loading && !isValid && <X className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7E22CE] w-[30px] h-[30px]" />}
                    </>
                  </form>
                  <p className={`max-characters font-sans ml-1 w-full text-xs text-gray-500 md:w-5/6 ${maxCharacters && "text-red-600"}`}>
                    Max: {handle.length}/{30} characters
                  </p>
                  {showInvalidCharMessage && (
                    <p className="text-red-600 text-sm font-sans mt-1 w-full md:w-5/6"> Only letters, numbers, &quot;.&quot;, &quot;-&quot;, and &quot;_&quot; are allowed. &quot;-&quot; cannot be the first or last character.</p>
                  )}
                </div>
                <button onClick={submitUrl} className="rounded-xl w-full mx-auto font-sans text-xl font-semibold py-5 text-center mr-8 bg-[#7E22CE] text-white hover:bg-[#6B21A8] shadow-sm hover:shadow-md transition-all ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-[#E9D5FF] focus:ring-offset-white focus:ring-offset-1
                lg:w-48 lg:text-lg lg:font-medium
                ">Claim Your Page</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mx-auto w-7/12 mb-20 mt-8
        lg:w-1/3 lg:mt-0 lg:pt-20
        xl:mx-0 xl:mb-0 xl:w-1/2 xl:pt-10
        ">
          <HeroImage/>
        </div>
      </div>
    </section>
  )
}