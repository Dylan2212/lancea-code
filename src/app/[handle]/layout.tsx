export const dynamic = 'force-dynamic'
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import type { UserData } from "./page";
import "./components/linkspage.css"
import UserLayoutClient from "./components/layoutClient";

//ADD VARIABLE COLORS, EX: PRIMARY, HOVER, ACCENT, BG

export async function generateMetadata ({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from("users")
    .select("*")
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
    .select("*, additional_links(*), projects(*)")
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

export default async function Layout ({ children, params }: { children: React.ReactNode, params: Promise<{ handle: string }>}) {
  const { handle } = await params

  const userData: UserData = await fetchByURLUsername(handle)

  return (
    <main id="freelancermain">
      <UserLayoutClient userData={userData}>
        {children}
      </UserLayoutClient>
    </main>
  )
}