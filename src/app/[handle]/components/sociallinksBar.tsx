import { SiInstagram, SiFacebook, SiX, SiLinkedin, SiMedium, SiYoutube, SiThreads, SiTiktok, SiWhatsapp } from "react-icons/si"
import { UserData } from "../page"

type MyProps = {
  userData: UserData
}

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
  },
  whatsapp: {
    label: "WhatsApp",
    icon: <SiWhatsapp size={24} color="#000000" /> // Medium is black
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