import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { SocialLinks } from "./socialLinksType"

type OriginalUserState = {
  userId: string
  email: string
  username: string
  title: string
  profileImage: string
  premium: boolean
  profileImageFile: File | null
  has_seen_onboarding: boolean
  onboardingIndex: number
  setOnboardingIndex: (onboardingIndex: number) => void
  setProfileImageFile: (file: File | null) => void
  bio: string
  handle: string
  socialLinks: SocialLinks
  isLive: boolean
  setIsLive: (isLive: boolean) => void
  reset: () => void
  setHasSeenOnboarding: (seenOnboarding: boolean) => void
  setOriginalProfileImage: (url: string) => void
  /** hydration flag to avoid SSR mismatch */
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

// ✅ singleton reference
export const useOriginalUserStore =
  create<OriginalUserState>()(
    persist(
      (set) => ({
        userId: "",
        email: "",
        username: "",
        title: "",
        handle: "",
        isLive: false,
        premium: false,
        has_seen_onboarding: false,
        profileImageFile: null,
        profileImage: "",
        bio: "",
        onboardingIndex: 0,
        _hasHydrated: false,
        socialLinks: {
          instagram: "",
          facebook: "",
          x: "",
          medium: "",
          threads: "",
          tiktok: "",
          whatsapp: "",
          youtube: "",
          linkedin: "",
          reddit: "",
          discord: "",
          github: "",
          pinterest: "",
        },

        // setters
        setProfileImageFile: (file: File | null) => set({ profileImageFile: file }),
        setIsLive: (isLive: boolean) => set({ isLive }),
        setHasSeenOnboarding: (has_seen_onboarding: boolean) => set({ has_seen_onboarding }),
        setOriginalProfileImage: (profileImage: string) => set({ profileImage }),
        setOnboardingIndex: (onboardingIndex: number) => set({ onboardingIndex }),
        setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),

        reset: () =>
          set({
            userId: "",
            email: "",
            username: "",
            title: "",
            handle: "",
            isLive: false,
            premium: false,
            has_seen_onboarding: false,
            profileImageFile: null,
            profileImage: "",
            bio: "",
            onboardingIndex: 0,
            socialLinks: {
              instagram: "",
              facebook: "",
              x: "",
              medium: "",
              threads: "",
              tiktok: "",
              whatsapp: "",
              youtube: "",
              linkedin: "",
              reddit: "",
              discord: "",
              github: "",
              pinterest: "",
            },
          }),
      }),
      {
        name: "original-user-store",
        onRehydrateStorage: () => (state) => {
          // 👇 fires after persisted store is loaded
          state?.setHasHydrated(true)
        },
      }
    )
  )