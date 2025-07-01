import { supabase } from "@/lib/supabaseClient"
import { notFound } from "next/navigation"
import LinksPage from "../components/linksPage"

type Params = {
  params: { id: string }
}

async function fetchByURLUsername (id: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    notFound()
    return null
  }
  return data
}

export default async function LancrLinksPage({ params }: Params) {
  const { id } = await params

  const userData = await fetchByURLUsername(id)

  return (
    <main>
      <LinksPage userData={userData}/>
    </main>
  )
}