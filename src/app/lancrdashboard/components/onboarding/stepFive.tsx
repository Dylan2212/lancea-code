import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { socialConfig } from "@/src/app/[handle]/components/sociallinksBar"
import { normalizeUrl } from "@/utils/normalizeUrl"
import toast from "react-hot-toast"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { useUserStore } from "@/lib/store/useUserStore"
import { supabase } from "@/lib/supabaseClient"
import { SocialLinks } from "@/lib/store/socialLinksType"
import { findSocialPlatform } from "@/utils/findSocialPlatform"

type MyProps = {
  nextStep: () => void,
  previous: () => void
}

export default function StepFive ({ nextStep, previous }: MyProps) {
  const [inputValue, setInputValue] = useState("")
  const [addedLinks, setAddedLinks] = useState<{label: string, icon: React.ReactNode}[]>([])
  const setSocialLinks = useUserStore(state => state.setSocialLinks)
  const socialLinks = useUserStore(state => state.socialLinks)
  const userId = useOriginalUserStore(state => state.userId)

  useEffect(() => {
    const tempLinks = Object.keys(socialLinks).filter(key => socialLinks[key as keyof SocialLinks] !== "").map(platformName => socialConfig[platformName])
    setAddedLinks(tempLinks)
  }, [])

  function addSocialLink (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()

    const url = normalizeUrl(inputValue)
    const platform = findSocialPlatform(url)

    if (!platform) {
      toast.error("Not an accepted social media.")
      setInputValue("")
      return
    }

    const tempAddedLinks = [
      ...addedLinks.filter(link => link.label !== platform)
    ]

    setAddedLinks([...tempAddedLinks, socialConfig[platform]])
    setInputValue("")
    setSocialLinks({...socialLinks, [platform]: url})
  }

  async function next () {
    const { error } =  await supabase
      .from("users")
      .update({"socialLinks": socialLinks})
      .eq("id", userId)

    if (error) {
      toast.error("Could not save social links.")
      return
    }

    useOriginalUserStore.setState(state => ({
      ...state,
      socialLinks: socialLinks
    }))

    useUserStore.setState(state => ({
      ...state,
      socialLinks: socialLinks
    }))

    nextStep()
  }

  function previousStep () {
    useOriginalUserStore.setState(state => ({
      ...state,
      socialLinks: socialLinks
    }))
    previous()
  }

  function deleteLink (index: number, key: string) {
    setAddedLinks(prev => prev.filter((_, i) => i !== index))
    setSocialLinks({...socialLinks, [key]: ""})
  }

  return (
    <>
      <div className="w-11/12 space-y-1">
        <p className="font-semibold text-2xl text-gray-900">
          Social Links (Optional)
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Add links to your social profiles so visitors can easily connect and follow your work.
        </p>
      </div>
      <div className="space-y-6 mt-10 mb-14 w-full md:w-11/12 mx-auto">
        <form onSubmit={(e) => addSocialLink(e)}>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Add Social Links</label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="https://linkedin.com/in/emilywrites"
              className="w-[85%] shadow rounded-xl ring-1 ring-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-[#E9D5FF] focus:ring-2 focus:outline-none transition"
            />
            <button className="rounded-lg py-3 px-4 text-[#7E22CE] border-2 border-[#7E22CE] font-semibold shadow-md bg-white transition-all duration-200 ease-in-out hover:bg-gray-100">Add</button>
          </div>
        </form>
        <ul className="grid grid-cols-4 md:grid-cols-5 gap-y-8">
          {addedLinks.map((socialLink, index) => (
            <div key={socialLink.label} className="p-4 rounded-xl ring-2 w-fit relative ring-gray-200 bg-white">
              <a href={socialLinks[socialLink.label as keyof SocialLinks]} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                {socialLink.icon}
              </a>
              <X onClick={() => deleteLink(index, socialLink.label)} className="rounded-full w-7 h-7 bg-white border-2 border-gray-200 absolute -top-1/2 -right-1/2 translate-y-1/2 -translate-x-1/2 cursor-pointer hover:bg-red-600 hover:text-white transition-all ease-in-out duration-200" />
            </div>
          ))}
        </ul>
      </div>
      <div className="w-full flex flex-row-reverse justify-between">
        <button className="onboarding-btn" onClick={next}>Next</button>
        <button className="onboarding-btn" onClick={previousStep}>Previous</button>
      </div>
    </>
  )
}