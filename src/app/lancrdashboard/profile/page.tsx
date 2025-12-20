"use client"
import AddBio from "../components/addBio"
import AdditionalLlinks from "../components/additionalLinks"
import SaveLancrSection from "../components/saveLancrSection"
import LancrSocialLinks from "../components/socialLinks"
import { useUserStore } from "@/lib/store/useUserStore"
import { useEffect, useRef, useState } from "react"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { SocialLinks } from "@/lib/store/socialLinksType"
import { useOriginalAdditionalLinksStore } from "@/lib/store/useOriginalAdditionalLinks"
import { useAdditionalLinksStore } from "@/lib/store/useAdditionalLinksStore"
import { AdditionalLink } from "@/lib/store/useAdditionalLinksStore"
import { supabase } from "@/lib/supabaseClient"
import toast from "react-hot-toast"
import { Copy } from "lucide-react"
import 'react-loading-skeleton/dist/skeleton.css'
import Link from "next/link"
import { Globe, CircleSmall } from "lucide-react"
import { useChangeLiveStatus } from "../../hooks/useChangeLiveStatus"
import Skeleton from "react-loading-skeleton"
import OnboardingFlow from "../components/onboarding/onboardingFlow"
import { checkObjChanges } from "@/src/app/lancrdashboard/profile/utils/checkObjChanges"
import { checkAdditionalLinksChanges } from "./utils/checkAdditionalLinkChanges"

export default function LancrHome () {
  type BioData = {
    bio: string;
    username: string;
    title: string;
    handle: string;
  }

  type ChangedBioFields = Partial<BioData>
  type ChangedSocialLinks = Partial<SocialLinks>

  type Data = ChangedBioFields & {
    socialLinks?: ChangedSocialLinks
    profileImage?: string
  }

  const profileImageFileRef = useRef<File | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    resetUserStoreFromOriginal()
    resetAdditionalLinksFromOriginal()
  }, [])

  const handle = useOriginalUserStore(state => state.handle)
  const userId = useOriginalUserStore(state => state.userId)
  const seenOnboarding = useOriginalUserStore(state => state.has_seen_onboarding)
  const [userUrl, setUserUrl] = useState("")
  const { bio, title, username, socialLinks } = useOriginalUserStore.getState()
  const originalUserData = { bio, title, handle, username }
  const originalSocialLinks = socialLinks
  const originalAdditionalLinks = useOriginalAdditionalLinksStore(state => state.originalLinks)

  useEffect(() => {
    if (typeof window !== "undefined" && handle) {
      setUserUrl(`${window.location.origin}/${handle}`)
    } else {
      setUserUrl("No Username. Add a username to get your custom link.")
    }
  }, [handle])


  const { isLive, changeInLiveStatus } = useChangeLiveStatus(userId)

  function resetUserStoreFromOriginal() {
    const original = useOriginalUserStore.getState()
    useUserStore.setState({ ...original })
  }

  function resetAdditionalLinksFromOriginal () {
    const original = useOriginalAdditionalLinksStore.getState().originalLinks
    const setLinks = useAdditionalLinksStore.getState().setLinks
    setLinks(original)
  }

  async function saveToDb (data: Data, id: string) {
    const { error } = await supabase
      .from("users")
      .update(data)
      .eq("id", id)

    if (error) {
      console.log(error)
      toast.error("Data failed to update")
      return false
    }

    useOriginalUserStore.setState(state => ({
      ...state,
      ...data,
      socialLinks: {
        ...state.socialLinks,
        ...data.socialLinks
      }
    }))

    resetUserStoreFromOriginal()

    return true
  }

  async function updateProfileImage (file: File | null, id: string): Promise<string | null> {
    if (!file) return null

    const fileExtension = file.name.split('.').pop()
    const uploadPath = `avatars/${id}.${fileExtension}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(uploadPath, file, {
        upsert: true,
        contentType: file.type,
      })

    if (uploadError || !uploadData) {
      console.error("Upload error:", uploadError)
      return null
    }

    const { data: urlData } = supabase
      .storage
      .from("profile-images")
      .getPublicUrl(uploadPath)

    if (!urlData?.publicUrl) {
      console.error("Public URL generation failed");
      return null;
    }

    const publicUrl = `${urlData.publicUrl}?v=${Date.now()}`

    useUserStore.setState((state) => ({
      ...state,
      profileImage: publicUrl,
      changedProfileImage: false
    }));

    useOriginalUserStore.setState((state) => ({
      ...state,
      profileImage: publicUrl,
      profileImageFile: file,
      socialLinks: { ...state.socialLinks },
    }));

    return publicUrl
  }

  function saveLinksToStore(links: AdditionalLink[]) {
    useAdditionalLinksStore.setState((state) => {
      const updatedLinks = state.links.map(existing => {
        const updated = links.find(link => link.id === existing.id)
        return updated ? { ...existing, ...updated } : existing
      })

      const newLinks = links.filter(link => !state.links.some(e => e.id === link.id))

      return { links: [...updatedLinks, ...newLinks] }
    })

    useOriginalAdditionalLinksStore.setState((state) => {
      const updatedLinks = state.originalLinks.map(existing => {
        const updated = links.find(link => link.id === existing.id)
        return updated ? { ...existing, ...updated } : existing
      })

      const newLinks = links.filter(link => !state.originalLinks.some(e => e.id === link.id))

      return { originalLinks: [...updatedLinks, ...newLinks] }
    })
  }

  async function saveAdditionalLinks (links: AdditionalLink[]) {
    const { error } = await supabase
      .from("additional_links")
      .upsert(links)

    if (error) {
      console.log(error)
      toast.error("Failed to save additional links")
      return false
    }

    saveLinksToStore(links)
    return true
  }

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    //const hasChanged = checkForChanges()

    const { bio, username, title, changedProfileImage, handle, socialLinks, userId } = useUserStore.getState()
    const additionalLinks = useAdditionalLinksStore.getState().links

    const changedBio = checkObjChanges({ bio, username, title, handle }, originalUserData)
    const changedSocialLinks = checkObjChanges(socialLinks, originalSocialLinks)
    const changedAdditionalLinks = checkAdditionalLinksChanges(additionalLinks, originalAdditionalLinks, userId)

    if (Object.keys(changedSocialLinks).length === 0 && Object.keys(changedBio).length === 0 && !changedProfileImage && changedAdditionalLinks.length === 0) {
      toast.error("Nothing to update.")
      setSaving(false)
      return
    }

    const updatedUserData: Data = {}
    Object.assign(updatedUserData, changedBio)
    updatedUserData.socialLinks = {...socialLinks, ...changedSocialLinks}

    if (changedProfileImage) {
      const file = profileImageFileRef.current
      const newUrl = await updateProfileImage(file, userId)
      if (newUrl) {
        updatedUserData.profileImage = newUrl
      }
    }

    if (changedAdditionalLinks) {
      const success = await saveAdditionalLinks(changedAdditionalLinks)
      if (!changedBio && !changedProfileImage && !changedSocialLinks && success) {
        toast.success("Data Saved!")
      }
    }

    if (changedBio || changedSocialLinks || changedProfileImage) {
      const success = await saveToDb(updatedUserData, userId)
      if (success) toast.success("Data saved!")
    }

    setSaving(false)
    return
  }

  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(userUrl);
      } else {
        // Fallback for mobile browsers
        const textArea = document.createElement("textarea");
        textArea.value = userUrl;
        textArea.style.position = "fixed"; // Prevent scrolling to bottom
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (!successful) throw new Error("Fallback copy failed");
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  const isHydrated = useOriginalUserStore((s) => s._hasHydrated)

  return(
    <section className="w-full h-[calc(100dvh-4rem)] mt-[4rem] overflow-y-scroll relative" onSubmit={handleSubmit}>
      {isHydrated && !seenOnboarding && <OnboardingFlow/>}
      {isHydrated ? (<p className="text-2xl font-semibold m-5 flex items-center gap-4">Welcome, {username === "" ? "New User": username}</p>) : (<p className="text-2xl font-semibold m-5 flex items-center gap-4">Welcome, <Skeleton height={25} width={200}/></p>) }
      <div className="mt-3 mx-3 flex justify-between">
        <Link className="flex gap-2 border shadow-md rounded-full w-fit px-4 py-2 md:hidden" onClick={() => !handle && toast.error("Add required fields to preview your site.")} href={handle ? `/${handle}` : "#"} target={handle ? "_blank" : undefined} rel={handle ? "noopener noreferrer" : undefined}><Globe />Preview Site</Link>
        <div className="flex bg-gray-100 rounded-full py-2 px-4 items-center text-sm md:hidden">
          <label htmlFor="is-live-selector">Your Site Is:</label>
          <select value={isHydrated && isLive ? "Online" : "Hidden"} onChange={(e) => changeInLiveStatus(e)} name="is-live-selector" id="is-live-selector" className="bg-transparent [cursor:pointer!important] focus:outline-none focus:ring-0 focus:border-transparent">
            <option value="Online">Online</option>
            <option value="Hidden">Hidden</option>
          </select>
          <CircleSmall
            className={`h-4 w-4
              ${isHydrated && isLive && "fill-green-500 text-green-500"}`}
          />
        </div>
      </div>
      {isLive &&<div className="
      w-11/12 flex flex-col md:flex-row gap-3 mt-5 p-2
      lg:w-3/4 md:items-center lg:gap-5 mx-auto lg:mt-10 box-support py-2">
        <p className="font-semibold">Sharable Link:</p>
        <span className="text-gray-600">{userUrl}</span>
        <button onClick={copyLink} className="px-3 w-24 text-sm border border-gray-500 items-center py-1 bg-white text-gray-500 rounded hover:bg-gray-100 hov-standrd">
          {copied ? <p className="flex gap-2"><Copy className="w-4 h-4"/> Copied</p> : <p className="flex gap-2"><Copy className="w-4 h-4"/> Copy</p>}
        </button>
      </div>}
      <form className="pb-16 lg:pb-0" action="">
        <AddBio profileImageFileRef={profileImageFileRef}/>
        <LancrSocialLinks/>
        <AdditionalLlinks/>
        <SaveLancrSection type="submit" saving={saving}/>
      </form>
    </section>
  )
}