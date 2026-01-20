import { create } from "zustand"
import { persist } from "zustand/middleware"

type AdditionalLink = {
  id: string,
  link_title: string,
  url: string
}

type OriginalStore = {
  originalLinks: AdditionalLink[],
  setOriginalLinks: (links: AdditionalLink[]) => void,
  reset: () => void
}

export const useOriginalAdditionalLinksStore = create<OriginalStore>()(
  persist(
    (set) => ({
      originalLinks: [],
      setOriginalLinks: (links) => set({ originalLinks: links }),
      reset: () => set({ originalLinks: [] })
    }),
    {
      name: "original-additional-links-storage",
    }
  )
)