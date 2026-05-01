export const dynamic = 'force-dynamic'
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import type { UserData } from "./page";
import "./components/linkspage.css"
import UserLayoutClient from "./components/layoutClient";
import { getProjectsWithSkillsAdmin } from "@/src/dal/projects/projects";
import { mergeSkills } from "@/src/domain/skills/mergeSkills";
import { getUserServices } from "@/src/dal/services/getUserServices";
import { getUserTestimonials } from "@/src/dal/testimonials/getUserTestimonials";

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

  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData.session?.user

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

  const projectWithSkills = await getProjectsWithSkillsAdmin(data.id)
  const projects = mergeSkills(projectWithSkills)

  const services = await getUserServices(data.id)
  const testimonials = await getUserTestimonials(data.id)

  return {
    ...data,
    projects,
    services,
    testimonials
  }
}

export default async function Layout ({ children, params }: { children: React.ReactNode, params: Promise<{ handle: string }>}) {
  const { handle } = await params

  const userData: UserData = await fetchByURLUsername(handle)

  return (
    <main style={{
      "--mainColor": userData.colors.main,
      "--hoverColor": userData.colors.hover,
      "--accentColor": userData.colors.accent
    } as React.CSSProperties} className="relative">
      <UserLayoutClient userData={userData}>
        {children}
      </UserLayoutClient>
        {userData.subscription_status !== "active" && <a
          href="https://lancrly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex sticky left-1/2 -translate-x-1/2 z-50 bottom-5  mt-3 items-center gap-1 px-3 py-1 rounded-2xl bg-white border-2 border-[#E9D5FF] text-gray-600 text-sm font-medium shadow-md transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-xl hover:scale-105"
        >
          <span className="text-gray-500">Built with</span>
          <span className="font-bold text-[#7E22CE] underline underline-offset-4">
            Lancrly
          </span>
        </a>}
    </main>
  )
}