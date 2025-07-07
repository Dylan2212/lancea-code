"use client"
import AddBio from "../components/addBio"
import AdditionalLlinks from "../components/additionalLinks"
import SaveLancrSection from "../components/saveLancrSection"
import LancrSocialLinks from "../components/socialLinks"
import { useUserStore } from "@/lib/store/useUserStore"
import { useEffect, useRef } from "react"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { SocialLinks } from "@/lib/store/useUserStore"
import { useOriginalAdditionalLinksStore } from "@/lib/store/useOriginalAdditionalLinks"
import { useAdditionalLinksStore } from "@/lib/store/useAdditionalLinksStore"
import { AdditionalLink } from "@/lib/store/useAdditionalLinksStore"
import { supabase } from "@/lib/supabaseClient"
import toast from "react-hot-toast"
import useHandleCheck from "../../hooks/useHandleCheck"

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

  useEffect(() => {
    resetUserStoreFromOriginal()
    resetAdditionalLinksFromOriginal()
  }, [])

  const handle = useUserStore(state => state.handle)
  const username = useUserStore(state => state.username)

  const { isValid, isAvailable } = useHandleCheck(handle)

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

  function checkSocialLinksChanges (newSocialLinks: SocialLinks) {
    const originalSocialLinks = useOriginalUserStore.getState().socialLinks
    const changed: ChangedSocialLinks = {}

    for (const key in newSocialLinks) {
      const originalValue = originalSocialLinks[key as keyof SocialLinks]
      const newValue = newSocialLinks[key as keyof SocialLinks]

      if (originalValue !== newValue) {
        changed[key as keyof SocialLinks] = newValue
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
      const original = originalMap.get(link.id)

      if (!original) {
        changed[link.id] = link
        continue
      }

      const diff: Partial<AdditionalLink> = {}

      if (original.link_title !== link.link_title) diff.link_title = link.link_title
      if (original.url !== link.url) diff.url = link.url
      if (original.link_title !== link.link_title || original.url !== link.url) {
        diff.id = link.id
      }

      if (Object.keys(diff).length > 1) {
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

    if (!isValid || !isAvailable) {
      toast.error("Please enter a valid and available handle.")
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

    return
  }

  return(
    <main className="w-full overflow-auto" onSubmit={handleSubmit}>
      <p className="text-2xl font-semibold m-5 flex items-center gap-4">Welcome, {username === "" ? "New User": username}</p>
      <form action="">
        <AddBio profileImageFileRef={profileImageFileRef}/>
        <LancrSocialLinks/>
        <AdditionalLlinks/>
        <SaveLancrSection type="submit"/>
      </form>
    </main>
  )
}