import { SocialLinks } from "@/lib/store/useUserStore"
import Image from "next/image"
import "./linkspage.css"
import { AdditionalLink } from "@/lib/store/useAdditionalLinksStore"
import { SiInstagram, SiFacebook, SiX, SiLinkedin, SiMedium, SiYoutube, SiThreads, SiTiktok } from "react-icons/si"

type Props = {
  userData: {
    id: string,
    email: string,
    title: string,
    profileImage: string,
    socialLinks: SocialLinks,
    username: string,
    bio: string,
    additional_links: AdditionalLink[]
  }
}

export default function LinksPage ({ userData }: Props) {

  const additionalLinks = userData.additional_links

  const isEmptySocialLinks = Object.values(userData.socialLinks).every(value => value === "")

  const socialConfig: {
    [key: string]: {
      label: string,
      icon: React.ReactNode
    }
  } = {
    instagram: {
      label: "Instagram",
      icon: <SiInstagram size={24} color="#E4405F" />
    },
  
    facebook: {
      label: "Facebook",
      icon: <SiFacebook size={24} color="#1877F2" /> // Official blue
    },
  
    x: {
      label: "X (Twitter)",
      icon: <SiX size={24} color="#000000" />
    },
  
    linkedin: {
      label: "LinkedIn",
      icon: <SiLinkedin size={24} color="#0A66C2" />
    },
  
    youtube: {
      label: "YouTube",
      icon: <SiYoutube size={24} color="#FF0000" />
    },
  
    threads: {
      label: "Threads",
      icon: <SiThreads size={24} color="#000000" /> // Threads is mostly black
    },
  
    tiktok: {
      label: "TikTok",
      icon: <SiTiktok size={24} color="#010101" /> // Black or near black
    },
  
    medium: {
      label: "Medium",
      icon: <SiMedium size={24} color="#000000" /> // Medium is black
    }
  }

  const socialLinksBar = () => {
    if (isEmptySocialLinks) return
    return (
      <div className="
        flex box-support rounded-full gap-5 py-2 px-4 w-fit mt-5
        ">
        {Object.entries(userData.socialLinks).map(([platform, link]) => {
          if (!link || !socialConfig[platform]) return null
            const config = socialConfig[platform]

            return (
              <a key={platform} href={link} target="_blank" rel="noopener noreferrer"className="flex items-center gap-2 hover:underline">
                {config.icon}
              </a>
            )
         })}
      </div>)
  }


  return (
  <div className="div-container-for-middle-align bg-gradient-to-b from-[#f5f3ff] to-white">
    <div className="
        flex-1 flex relative
        lg:items-center
      ">
      <a href={`mailto:${userData.email}`} className="sm:hidden fixed links-page-contact-btn hov-standrd top-6 right-4">
        Contact
      </a>
      <main className="
      w-screen h-fit mt-8 p-4
      lg:w-[35rem] lg:max-w-2xl lg:h-fit lg:my-8 lg:border lg:rounded-lg lg:shadow-lg lg:bg-white
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
            <div className="grid gap-2">
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
          <h2 className="
            whitespace-pre-line mt-4 text-gray-700 w-5/6 mx-auto leading-tight pt-2 text-sm
            lg:text-base
            ">{userData.bio}</h2>
          <div className="w-5/6 mx-auto">{socialLinksBar()}</div>
        </section>
        {additionalLinks.length > 0 && <section className="border-t-2 mt-5">
          <ul>
            {
              additionalLinks.map((link) => (
                <li key={link.id} className="border-2 border-gray-600 rounded-full shadow-md text-lg flex items-center justify-center w-2/3 mx-auto my-3 py-2 hover:bg-gray-100">
                  <a target="_blank" className="w-full h-full text-center" href={link.url}>{link.link_title}</a>
                </li>
              ))
            }
          </ul>
        </section>}
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