export const dynamic = 'force-dynamic'
import { notFound } from "next/navigation"
import LinksPage from "../components/linksPage"
import { createClient } from "@/utils/supabase/server"

type Params = {
  params: { handle: string }
}

export async function generateMetadata ({ params }: Params) {
  const { handle } = await params

  return {
    title: `${handle} | Lancrly`,
    description: `Portfolio for ${handle} on Lancrly`
  }
}

async function isAuthenticatedUser (id: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log(user)

  return user?.id === id
}

async function fetchByURLUsername (handle: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("users")
    .select("*, additional_links(*)")
    .eq("handle", handle)
    .maybeSingle()

  if (error) {
    console.error(error)
    notFound()
  }

  if (!data.is_live) {
    const inPreview = await isAuthenticatedUser(data.id)
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