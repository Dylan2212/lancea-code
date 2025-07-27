export const dynamic = 'force-dynamic'
import { notFound } from "next/navigation"
import LinksPage from "../components/linksPage"
import { createClient } from "@/utils/supabase/server"
import { supabase } from "@/lib/supabaseClient"

export async function generateMetadata ({ params }: { params: { handle: string } }) {
  const { handle } = params

  const { data } = await supabase
    .from("users")
    .select("handle")
    .eq("handle", handle)
    .maybeSingle()

  if (data) {
    return {
      title: `${handle} | Lancrly`,
      description: `Portfolio for ${handle} on Lancrly`
    }
  } else {
    return {
    title: `Lancrly 404`,
    description: `Could not find page`
    }
  }


}

async function isAuthenticatedUser (id: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

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
    notFound()
  }

  if (!data) {
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
  const { handle } = params

  const userData = await fetchByURLUsername(handle)

  return (
    <main>
      <LinksPage userData={userData}/>
    </main>
  )
}
