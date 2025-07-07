import { supabase } from "./supabaseClient";
import { useUserStore } from "./store/useUserStore";
import { useAdditionalLinksStore } from "./store/useAdditionalLinksStore";
import { useOriginalUserStore } from "./store/useOriginalUser";
import { useOriginalAdditionalLinksStore } from "./store/useOriginalAdditionalLinks";
import { AdditionalLink } from "./store/useAdditionalLinksStore";

type SocialLinks = {
  instagram: string,
  facebook: string,
  x: string,
  medium: string,
  threads: string,
  tiktok: string
}

export type User = {
  id: string,
  email: string,
  username: string
  socialLinks: SocialLinks,
  bio: string,
  title: string,
  profileImage: string,
  handle: string,
  is_live: boolean
}

async function createUserInDB (email: string) {
  const { error } = await supabase
    .from("users")
    .insert([{ email }])

  if (error) {
    console.log("Could not create user: " + JSON.stringify(error))
    throw error
  }
}

export async function fetchUserData (email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*, additional_links(*)")
    .eq("email", email)
    .maybeSingle()

  if (error) {
    console.log("Something went wrong fetching data")
  }

  if (!data) {
    await createUserInDB(email)

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single()
      
    setStoreData(data, null)
    return data as User
  }

  setStoreData(data, data.additional_links)
  return data as User
}

function setStoreData (user: User, links: AdditionalLink[] | null) {
  const { setUserId, setSocialLinks, setEmail, setUsername, setBio, setTitle, setProfileImage, setHandle } = useUserStore.getState()
  const { setLinks } = useAdditionalLinksStore.getState()
  const { setOriginalLinks } = useOriginalAdditionalLinksStore.getState()

  if (user.id) setUserId(user.id)
  if (user.socialLinks) setSocialLinks(user.socialLinks)
  if (user.email) setEmail(user.email)
  if (user.username) setUsername(user.username)
  if (user.bio) setBio(user.bio)
  if (user.title) setTitle(user.title)
  if (user.profileImage) setProfileImage(user.profileImage)
  if (user.handle) setHandle(user.handle)

  if (links) {
    setLinks(links)
    setOriginalLinks(links)
  }

  useOriginalUserStore.setState({
    userId: user.id || "",
    email: user.email || "",
    username: user.username || "",
    bio: user.bio || "",
    title: user.title || "",
    profileImage: user.profileImage || "",
    handle: user.handle || "",
    isLive: user.is_live || false,
    socialLinks: user.socialLinks || {
      instagram: "",
      facebook: "",
      x: "",
      medium: "",
      threads: "",
      tiktok: ""
    }
  })    
}