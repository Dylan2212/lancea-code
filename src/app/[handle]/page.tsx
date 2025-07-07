import { supabase } from "@/lib/supabaseClient"
import { notFound } from "next/navigation"
import LinksPage from "../components/linksPage"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

type Params = {
  params: { handle: string }
}

async function isAuthenticatedUser (email: string) {
  const session = await getServerSession(authOptions)
  return session?.user?.email === email ? true : false
}

async function fetchByURLUsername (handle: string) {

  const { data, error } = await supabase
    .from("users")
    .select("*, additional_links(*)")
    .eq("handle", handle)
    .maybeSingle()

  if (error) {
    console.log(error)
    notFound()
  }

  if (!data.is_live) {
    const inPreview = await isAuthenticatedUser(data.email)
    if (!inPreview) {
      notFound()
    }
  }

  return data
}

export default async function LancrLinksPage({ params }: Params) {
  const { handle } = await params

  const userData = await fetchByURLUsername(handle)

  return (
    <main>
      <LinksPage userData={userData}/>
    </main>
  )
}