import { create } from "zustand";
import { persist } from "zustand/middleware";

type SocialLinks = {
  x: string,
  medium: string,
  threads: string
  facebook: string,
  instagram: string
}

type UserState = {
  userId: string,
  setUserId: (id: string) => void,

  socialLinks: SocialLinks,
  setSocialLinks: (links: SocialLinks) => void,

  email: string,
  setEmail: (email: string) => void,

  username: string,
  setUsername: (username: string) => void

  hasHydrated: boolean,
  setHasHydrated: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: "",
      email: "",
      username: "",
      socialLinks: {
        instagram: "",
        facebook: "",
        x: "",
        medium: "",
        threads: "",
      },
      setUserId: (id) => set({ userId: id }),
      setSocialLinks: (links) => set({ socialLinks: links }),
      setEmail: (email) => set({ email }),
      setUsername: (username) => set({ username }),
      hasHydrated: false,
      setHasHydrated: () => set({ hasHydrated: true })
    }),
    {
      name: "user-store",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated()
      }
    }
  )
)