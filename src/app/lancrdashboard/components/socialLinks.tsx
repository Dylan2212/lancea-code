"use client"
import { SocialLinks } from "@/lib/store/socialLinksType";
import { useUserStore } from "@/lib/store/useUserStore";
import { useState } from "react";
import { v4 as uuidv4} from "uuid";
import { X } from "lucide-react"
import { socialConfig } from "../../[handle]/components/sociallinksBar";
import { findSocialPlatform } from "@/utils/findSocialPlatform";
import { normalizeUrl } from "@/utils/normalizeUrl";
import toast from "react-hot-toast";


export default function LancrSocialLinks () {
  const socialLinks = useUserStore(state => state.socialLinks)
  const setSocialLinks = useUserStore(state => state.setSocialLinks)
  const [inputValue, setInputValue] = useState("")

  function addSocialLink () {
    const url = normalizeUrl(inputValue)
    const platform = findSocialPlatform(url)

    if (!platform) {
      toast.error("Not an accepted social media.")
      setInputValue("")
      return
    }

    setInputValue("")
    setSocialLinks({...socialLinks, [platform]: url})
  }

  return (
        <div className="div-for-lancr-dashboard-sects">
          <section className="lancr-add-edit-sect box-support">
            <div id="social-section">
              <p className="lancr-add-edit-sect-ttle">Add Social Links</p>
              <p className="text-sm text-gray-500">Add links to your social profiles so potential clients can explore more of your work and connect with you on other platforms.</p>
            </div>
            <div className="flex items-center gap-3 my-8">
              <input
                type="text"
                value={inputValue}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addSocialLink()
                  }  
                }}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="https://linkedin.com/in/emilywrites"
                className="w-[85%] shadow rounded-xl ring-1 ring-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-[#E9D5FF] focus:ring-2 focus:outline-none transition"
              />
              <button type="button" onClick={addSocialLink} className="rounded-lg py-3 px-4 text-[#7E22CE] border-2 border-[#7E22CE] font-semibold shadow-md bg-white transition-all duration-200 ease-in-out hover:bg-gray-100">Add</button>
            </div>
            <ul className="flex gap-8 ml-4 w-[85%] flex-wrap">
              {Object.keys(socialLinks).map((key) => {
                const value = socialLinks[key as keyof SocialLinks]
                if (value === "") return
                return (<div key={uuidv4()} className="p-4 rounded-xl ring-2 w-fit relative ring-gray-200 bg-white">
                  <a href={value} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                    {socialConfig[key].icon}
                  </a>
                  <X onClick={() => setSocialLinks({...socialLinks, [key]: ""})} className="rounded-full w-7 h-7 bg-white border-2 border-gray-200 absolute -top-1/2 -right-1/2 translate-y-1/2 -translate-x-1/2 cursor-pointer hover:bg-red-600 hover:text-white transition-all ease-in-out duration-200" />
                </div>)
              })}
            </ul>
          </section>
        </div>
  )
}