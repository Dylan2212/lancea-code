import { supabase } from "./supabaseClient";
import { useUserStore } from "./store/useUserStore";

type SocialLinks = {
  instagram: string,
  facebook: string,
  x: string,
  medium: string,
  threads: string
}

export type User = {
  id: string,
  email: string,
  username: string
  socialLinks: SocialLinks
}

async function createUserInDB (email: string) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ email }])
    .select("id, email")
    .single()

  if (error) {
    console.error("error in create: " + error)
    return null
  }

  return data as User
}

export async function fetchUserData (email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single()

  if (error && error.code === "PGRST116") {
    const newUser = await createUserInDB(email)
    if (newUser) setStoreData(newUser)
    return newUser
  }

  if (!data) return null

  setStoreData(data)
  return data as User
}

function setStoreData (data: User) {
  const { setUserId, setSocialLinks, setEmail, setUsername } = useUserStore.getState()

  if (data.id) setUserId(data.id)
  if (data.socialLinks) setSocialLinks(data.socialLinks)
  if (data.email) setEmail(data.email)
  if (data.username) setUsername(data.username)
}