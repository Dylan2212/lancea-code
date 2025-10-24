import { SiInstagram, SiReddit, SiDiscord, SiPinterest, SiFacebook, SiGithub, SiX, SiLinkedin, SiMedium, SiYoutube, SiThreads, SiTiktok, SiWhatsapp } from "react-icons/si"
import { UserData } from "../page"
import { Link } from "lucide-react"

type MyProps = {
  userData: UserData
}

export const socialConfig: {
  [key: string]: {
    label: string,
    icon: React.ReactNode
  }
} = {
  instagram: {
    label: "instagram",
    icon: <SiInstagram size={24} color="#E4405F" />
  },

  facebook: {
    label: "facebook",
    icon: <SiFacebook size={24} color="#1877F2" />
  },

  x: {
    label: "x",
    icon: <SiX size={24} color="#000000" />
  },

  linkedin: {
    label: "linkedin",
    icon: <SiLinkedin size={24} color="#0A66C2" />
  },

  youtube: {
    label: "youtube",
    icon: <SiYoutube size={24} color="#FF0000" />
  },

  threads: {
    label: "threads",
    icon: <SiThreads size={24} color="#000000" />
  },

  tiktok: {
    label: "tiktok",
    icon: <SiTiktok size={24} color="#010101" />
  },

  medium: {
    label: "medium",
    icon: <SiMedium size={24} color="#000000" />
  },

  whatsapp: {
    label: "whatsapp",
    icon: <SiWhatsapp size={24} color="#000000" />
  },

  github: {
    label: "github",
    icon: <SiGithub size={24} color="#000000" />
  },

  discord: {
    label: "discord",
    icon: <SiDiscord size={24} color="#5865F2" />
  },

  pinterest: {
    label: "pinterest",
    icon: <SiPinterest size={24} color="#E60023" />
  },

  reddit: {
    label: "reddit",
    icon: <SiReddit size={24} color="#FF4500" />
  },

  unknown: {
    label: "unknown",
    icon: <Link size={24} />
  }
}

export default function SocialLinksBar ({ userData }: MyProps) {

  const isEmptySocialLinks = Object.values(userData.socialLinks).every(value => value === "")

  if (isEmptySocialLinks) return
  return (
    <div className="
      flex box-support rounded-md gap-5 py-2 px-4 w-fit mt-5
      ">
      {Object.entries(userData.socialLinks).map(([platform, link]) => {
        if (!link || !socialConfig[platform]) return null
          const config = socialConfig[platform]
          return (
            <a key={platform} href={`${link}`} target="_blank" rel="noopener noreferrer"className="flex items-center gap-2 hover:underline">
              {config.icon}
            </a>
          )
       })}
    </div>)
}