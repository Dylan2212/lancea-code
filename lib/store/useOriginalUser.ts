import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SocialLinks = {
  x: string,
  medium: string,
  threads: string,
  facebook: string,
  instagram: string,
  tiktok: string
}

type OriginalUserState = {
  userId: string,
  email: string,
  username: string,
  title: string,
  profileImage: string,
  profileImageFile: File | null,
  setProfileImageFile: (file: File | null) => void,
  bio: string,
  handle: string,
  socialLinks: SocialLinks
}

export const useOriginalUserStore = create<OriginalUserState>()(
  persist(
    (set) => ({
      userId: "",
      email: "",
      username: "",
      title: "",
      handle: "",
      profileImageFile: null,
      setProfileImageFile: (file: File | null) => set({ profileImageFile: file }),
      profileImage: "",
      bio: "",
      socialLinks: {
        instagram: "",
        facebook: "",
        x: "",
        medium: "",
        threads: "",
        tiktok: ""
      }
    }),
    {
      name: "original-user-store" // This is the key used in localStorage
    }
  )
)