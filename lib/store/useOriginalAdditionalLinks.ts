import { create } from "zustand"
import { persist } from "zustand/middleware"

type AdditionalLink = {
  id: string,
  link_title: string,
  url: string
}

type PartialAdditionalLinkWithId = Partial<AdditionalLink> & { id: string }

type OriginalStore = {
  originalLinks: PartialAdditionalLinkWithId[],
  setOriginalLinks: (links: PartialAdditionalLinkWithId[]) => void,
  reset: () => void
}

export const useOriginalAdditionalLinksStore = create<OriginalStore>()(
  persist(
    (set) => ({
      originalLinks: [],
      setOriginalLinks: (links) => set({ originalLinks: links }),
      reset: () => set({ originalLinks: [] }) // ✅ clear state + persist storage
    }),
    {
      name: "original-additional-links-storage", // localStorage key name
    }
  )
)