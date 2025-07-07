import { SocialLinks } from "@/lib/store/useUserStore"
import Image from "next/image"
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


  return (
  <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-100">
    <div className="flex-1 items-center flex">
      <main className="max-w-2xl max-h-[92vh] overflow-auto h-fit p-4 box-main bg-white">
        <section className="relative pt-6">
          <a href={`mailto:${userData.email}`} className="border-2 shadow-md px-4 py-2 hov-standrd hover:bg-gray-100 rounded-full border-gray-600 absolute top-0 right-4">
            Contact
          </a>
          <div className="flex gap-5 items-center mt-4">
            <div className="min-w-24 min-h-24 max-w-24 max-h-24 relative border rounded-full overflow-hidden">
              <Image sizes="96px" className="object-cover object-center" fill alt="profile image" src={`${userData.profileImage}`}/>
            </div>
            <div className="grid">
              <p className="text-xl">{userData.username}</p>
              <h1 className="text-lg leading-tight mt-2">{userData.title}</h1>
            </div>
          </div>
          <h2 className="whitespace-pre-line mt-4 text-gray-600">{userData.bio}</h2>
          {!isEmptySocialLinks && <div className="flex box-support rounded-full gap-5 py-2 px-4 w-fit mt-5">
            {Object.entries(userData.socialLinks).map(([platform, link]) => {
              if (!link || !socialConfig[platform]) return null
              const config = socialConfig[platform]

              return (
                <a key={platform} href={link} target="_blank" rel="noopener noreferrer"className="flex items-center gap-2 hover:underline">
                  {config.icon}
                </a>
              )
            })}
          </div>}
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

    <footer className="py-2 bg-gray-50 w-full text-center">
      <p>
        Powered by <a className="text-purple-600 underline cursor-pointer" href="http://localhost:3000/">Lancr</a>
      </p>
    </footer>
  </div>
  )
}