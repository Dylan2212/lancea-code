"use client"
import AddBio from "../components/addBio"
import AdditionalLlinks from "../components/additionalLinks"
import SaveLancrSection from "../components/saveLancrSection"
import LancrSocialLinks from "../components/socialLinks"
import { useUserStore } from "@/lib/store/useUserStore"
import { useEffect, useRef, useState } from "react"
import { useOriginalUserStore, useUserHydrated } from "@/lib/store/useOriginalUser"
import { SocialLinks } from "@/lib/store/useOriginalUser"
import { useOriginalAdditionalLinksStore } from "@/lib/store/useOriginalAdditionalLinks"
import { useAdditionalLinksStore } from "@/lib/store/useAdditionalLinksStore"
import { AdditionalLink } from "@/lib/store/useAdditionalLinksStore"
import { supabase } from "@/lib/supabaseClient"
import toast from "react-hot-toast"
import useHandleCheck from "../../hooks/useHandleCheck"
import { Copy } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import Link from "next/link"
import { Globe, CircleSmall } from "lucide-react"
import { useChangeLiveStatus } from "../../hooks/useChangeLiveStatus"
import dynamic from "next/dynamic"
import { normalizeUrl } from "@/utils/normalizeUrl"

const Onboarding = dynamic(() => import('../components/onboarding'), { ssr: false })

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

  type PartialAdditionalLinkWithId = Partial<AdditionalLink> & { id: string }

  const profileImageFileRef = useRef<File | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    resetUserStoreFromOriginal()
    resetAdditionalLinksFromOriginal()
  }, [])

  const handle = useUserStore(state => state.handle)
  const username = useUserStore(state => state.username)
  const userId = useOriginalUserStore(state => state.userId)
  const seenOnboarding = useOriginalUserStore(state => state.has_seen_onboarding)
  const [userUrl, setUserUrl] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined" && handle) {
      setUserUrl(`${window.location.origin}/${handle}`)
    } else {
      setUserUrl("No Username. Add a username to get your custom link.")
    }
  }, [handle])


  const { isValid, isAvailable } = useHandleCheck(handle)
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

  function checkBioSectChanges (userData: BioData) {
    const { bio, title, handle, username } = useOriginalUserStore.getState()
    const originalUserData = { bio, title, handle, username }
    const changed: ChangedBioFields = {}

    for (const key in originalUserData) {
      const originalValue = originalUserData[key as keyof BioData]
      const newValue = userData[key as keyof BioData]

      if (originalValue !== newValue) {
        changed[key as keyof BioData] = newValue
      }
    }

    if (Object.keys(changed).length === 0) return null
    return changed
  }

  function checkSocialLinksChanges(newSocialLinks: SocialLinks) {
    const originalSocialLinks = useOriginalUserStore.getState().socialLinks
    const changed: ChangedSocialLinks = {}

    for (const key in newSocialLinks) {
      const rawValue = newSocialLinks[key as keyof SocialLinks]
      const normalizedValue = normalizeUrl(rawValue)
      const originalValue = originalSocialLinks[key as keyof SocialLinks]

      if (originalValue !== normalizedValue) {
        changed[key as keyof SocialLinks] = normalizedValue
      }
    }

    if (Object.keys(changed).length === 0) return null
    return changed
  }

  function checkAdditionalLinksChanges (newLinks: PartialAdditionalLinkWithId[]) {
    const originalLinks = useOriginalAdditionalLinksStore.getState().originalLinks
    const changed: {[id: string]: Partial<AdditionalLink>} = {}

    const originalMap = new Map(originalLinks.map(link => [link.id, link]))

    for (const link of newLinks) {
      const normalizedLink = { ...link }
    
      normalizedLink.url = normalizeUrl(link?.url)
    
      const original = originalMap.get(link.id)
      if (!original) {
        changed[link.id] = normalizedLink
        continue
      }
    
      const diff: Partial<AdditionalLink> = {}
    
      if (original.link_title !== normalizedLink.link_title) diff.link_title = normalizedLink.link_title
      if (original.url !== normalizedLink.url) diff.url = normalizedLink.url
      if (Object.keys(diff).length > 0) diff.id = normalizedLink.id
    
      if (Object.keys(diff).length > 0) {
        changed[link.id] = diff
      }
    }

    if (Object.keys(changed).length === 0) return null
    return changed
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

  function saveLinksToStore(links: PartialAdditionalLinkWithId[]) {
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

  async function saveAdditionalLinks (links: PartialAdditionalLinkWithId[]) {
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

  function changeToAcceptableLinksType (links: Partial<AdditionalLink>, userId: string): PartialAdditionalLinkWithId[] {
    const acceptableArray: PartialAdditionalLinkWithId[] = []

    for (const [key, value] of Object.entries(links) as [string, Partial<AdditionalLink>][]) {
      const link: PartialAdditionalLinkWithId = {
        id: value.id ?? key,
        user_id: userId,
      }

      if (value.link_title !== undefined) link.link_title = value.link_title
      if (value.url !== undefined) link.url = value.url

      acceptableArray.push(link)
    }

    return acceptableArray
  }

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    if (!isValid || !isAvailable) {
      toast.error("Please enter a valid and available handle.")
      setSaving(false)
      return
    }

    const { bio, username, title, changedProfileImage, handle, socialLinks, userId } = useUserStore.getState()
    const bioData = { bio, username, title, handle }
    const changedBio = checkBioSectChanges(bioData)
    const changedSocialLinks = checkSocialLinksChanges(socialLinks)

    const additionalLinksData = useAdditionalLinksStore.getState().links
    const changedAdditionalLinks = checkAdditionalLinksChanges(additionalLinksData)

    if (!changedSocialLinks && !changedBio && !changedProfileImage && !changedAdditionalLinks) {
      toast.error("Nothing to update.")
      setSaving(false)
      return
    }

    const updatedUserData: Data = {}

    if (changedBio) {
      Object.assign(updatedUserData, changedBio)
    }

    if (changedSocialLinks) {
      updatedUserData.socialLinks = {...socialLinks, ...changedSocialLinks}
    }

    if (changedProfileImage) {
      const file = profileImageFileRef.current
      const newUrl = await updateProfileImage(file, userId)
      if (newUrl) {
        updatedUserData.profileImage = newUrl
      }
    }

    if (changedAdditionalLinks) {
      const savableLinks = changeToAcceptableLinksType(changedAdditionalLinks, userId)
      const success = await saveAdditionalLinks(savableLinks)
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

  const isHydrated = useUserHydrated()

  return(
    <section className="w-full h-[calc(100dvh-4rem)] mt-[4rem] overflow-y-scroll relative" onSubmit={handleSubmit}>
      {!seenOnboarding && <Onboarding/>}
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
      <form action="">
        <AddBio profileImageFileRef={profileImageFileRef}/>
        <LancrSocialLinks/>
        <AdditionalLlinks/>
        <SaveLancrSection type="submit" saving={saving}/>
      </form>
    </section>
  )
}