import { supabase } from "./supabaseClient";
import { useUserStore } from "./store/useUserStore";
import { useAdditionalLinksStore } from "./store/useAdditionalLinksStore";
import { useOriginalUserStore } from "./store/useOriginalUser";
import { useOriginalAdditionalLinksStore } from "./store/useOriginalAdditionalLinks";
import { AdditionalLink } from "./store/useAdditionalLinksStore";
import { SocialLinks } from "./store/socialLinksType";
import { useProjectsStore } from "./store/useProjectsStore";
import { ProjectData } from "@/src/app/lancrdashboard/projects/add+editproject/page";

export type User = {
  id: string,
  email: string,
  username: string
  socialLinks: SocialLinks,
  bio: string,
  title: string,
  profileImage: string,
  handle: string,
  is_live: boolean,
  has_seen_onboarding?: boolean,
  premium: boolean,
  subscription_status: "active" | "inactive",
  stripe_customer_id: string
}

async function createUserInDB (uid: string, email: string | undefined) {
  const res = await fetch("/api/createStripeUser", {
    method: "POST",
    body: JSON.stringify({ uid, email })
  })

  const { stripeId } = await res.json()

  const { error } = await supabase
    .from("users")
    .upsert([{ id: uid, email, stripe_customer_id: stripeId }])

  if (error) {
    console.log("Could not create user: " + JSON.stringify(error))
    throw error
  }
}

export async function fetchUserData (uid: string, email: string | undefined) {
  const { data, error } = await supabase
    .from("users")
    .select("*, additional_links(*), projects(*)")
    .eq("id", uid)
    .maybeSingle()

  if (error) {
    console.log("Something went wrong fetching data")
  }

  if (!data) {
    await createUserInDB(uid, email)

    await new Promise((res) => setTimeout(res, 500))

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", uid)
      .single()
      
    setStoreData(data, null, null)
    return data as User
  }

  setStoreData(data, data.additional_links, data.projects)
  return data as User
}

function setStoreData (user: User, links: AdditionalLink[] | null, projects: ProjectData[] | null) {
  const { setUserId, setSocialLinks, setEmail, setUsername, setBio, setTitle, setProfileImage, setHandle } = useUserStore.getState()
  const { setLinks } = useAdditionalLinksStore.getState()
  const { setProjects } = useProjectsStore.getState()
  const { setOriginalLinks } = useOriginalAdditionalLinksStore.getState()
  const { handle } = useOriginalUserStore.getState()

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

  if (projects) {
    setProjects(projects)
  }

  useOriginalUserStore.setState({
    userId: user.id || "",
    email: user.email || "",
    username: user.username || "",
    bio: user.bio || "",
    title: user.title || "",
    profileImage: user.profileImage || "",
    has_seen_onboarding: user.has_seen_onboarding || false,
    handle: user.handle || handle || "",
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