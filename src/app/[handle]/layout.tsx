export const dynamic = 'force-dynamic'
import Image from "next/image";
import UserPageNavigation from "./components/navigation";
import SocialLinksBar from "./components/sociallinksBar";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { UserData } from "./page";
import "./components/linkspage.css"
import UserLayoutClient from "./components/layoutClient";

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
    <div className="div-container-for-middle-align bg-gradient-to-b from-[#f9f8ff] to-white">
      <div className="
          flex-1 w-full flex relative
          lg:items-center lg:justify-center
        ">
        <a href={`mailto:${userData.email}`} className="sm:hidden fixed links-page-contact-btn hov-standrd top-6 right-4">
          Contact
        </a>
        <main className="
        w-screen h-fit mt-8 p-4
        lg:w-auto lg:min-w-[35rem] lg:max-w-[975px] lg:h-fit lg:my-8 lg:border lg:rounded-lg lg:shadow-lg lg:bg-white
        ">
          <section className="relative pt-6">
            <a href={`mailto:${userData.email}`} className="hidden lg:inline links-page-contact-btn hov-standrd top-0 right-4">
              Contact
            </a>
            <div className="
              flex flex-col justify-center gap-2 items-center
              lg:flex-row lg:justify-start lg:gap-5 mt-4">
              <div className="
              min-w-32 min-h-32 max-w-32 max-h-32 shadow-lg relative rounded-full overflow-hidden
              lg:min-w-24 lg:min-h-24 lg:max-w-24 lg:max-h-24 lg:border
              ">
                <Image sizes="96px" className="object-cover object-center" fill alt="profile image" src={`${userData.profileImage ? userData.profileImage : "/profileImage.jpg"}`}/>
              </div>
              <div className="grid gap-2 w-full">
                <p className="
                  text-xl leading-none text-center w-2/3 mx-auto
                  lg:text-start lg:w-auto lg:mx-0
                  ">{userData.username}</p>
                <h1 className="
                  text-gray-500 leading-none text-center mx-auto w-2/3
                    lg:text-start lg:mx-0 lg:w-auto
                  ">{userData.title}</h1>
              </div>
            </div>
            <div className="
              bio-container whitespace-pre-line mt-4 text-gray-700 w-5/6 mx-auto leading-tight pt-2 text-sm
              lg:text-base
              " dangerouslySetInnerHTML={{__html: userData.bio}}></div>
            <div className="w-5/6">
              <SocialLinksBar userData={userData}/>
            </div>
          </section>
          <UserPageNavigation handle={userData.handle}/>
          <UserLayoutClient userData={userData}>
            {children}
          </UserLayoutClient>
        </main>
      </div>

      <footer className="py-2 mb-2 lg:mb-0 w-full text-center">
        <p className="text-lg">
          Powered by <a className="text-purple-600 underline cursor-pointer" href="http://localhost:3000/">Lancrly</a>
        </p>
      </footer>
    </div>
  )
}