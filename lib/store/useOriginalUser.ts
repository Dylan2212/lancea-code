import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SocialLinks = {
  x: string,
  medium: string,
  threads: string,
  facebook: string,
  instagram: string,
  tiktok: string,
  whatsapp: string,
  youtube: string,
  linkedin: string
}

type OriginalUserState = {
  userId: string,
  email: string,
  username: string,
  title: string,
  profileImage: string,
  profileImageFile: File | null,
  has_seen_onboarding: boolean,
  setProfileImageFile: (file: File | null) => void,
  bio: string,
  handle: string,
  socialLinks: SocialLinks,
  isLive: boolean,
  setIsLive: (isLive: boolean) => void,
  reset: () => void,
  setHasSeenOnboarding: (seenOnboarding: boolean) => void,
  setProfileImage: (url: string) => void
}

export const useOriginalUserStore = create<OriginalUserState>()(
  persist(
    (set) => ({
      userId: "",
      email: "",
      username: "",
      title: "",
      handle: "",
      isLive: false,
      has_seen_onboarding: false,
      profileImageFile: null,
      profileImage: "",
      bio: "",
      socialLinks: {
        instagram: "",
        facebook: "",
        x: "",
        medium: "",
        threads: "",
        tiktok: "",
        whatsapp: "",
        youtube: "",
        linkedin: ""
      },
      setProfileImageFile: (file: File | null) => set({ profileImageFile: file }),
      setIsLive: (isLive: boolean) => set({ isLive }),
      setHasSeenOnboarding: (has_seen_onboarding: boolean) => set({has_seen_onboarding}),
      setProfileImage: (profileImage: string) => set({ profileImage }),
      reset: () =>
        set({
          userId: "",
          email: "",
          username: "",
          title: "",
          profileImage: "",
          profileImageFile: null,
          bio: "",
          handle: "",
          isLive: false,
          socialLinks: {
            instagram: "",
            facebook: "",
            x: "",
            medium: "",
            threads: "",
            tiktok: "",
            whatsapp: "",
            youtube: "",
            linkedin:""
          }
        })
    }),
    {
      name: "original-user-store"
    }
  )
)

export function useUserHydrated() {
  return useOriginalUserStore(state =>
    !!state.userId ||
    !!state.email ||
    !!state.username ||
    !!state.title ||
    !!state.profileImage ||
    !!state.bio ||
    !!state.handle ||
    Object.values(state.socialLinks).some(val => val.trim() !== "")
  )
}