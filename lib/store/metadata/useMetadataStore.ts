import { create } from "zustand"
import { persist } from "zustand/middleware"

type Store = {
  ogTitle: string
  setOgTitle: (ogTitle: string) => void

  ogDescription: string
  setOgDescription: (ogDescription: string) => void

  ogImageUrl: string
  setOgImageUrl: (ogImageUrl: string) => void

  ogImageFile: File | null
  setOgImageFile: (ogImageFile: File | null) => void

  searchTitle: string
  setSearchTitle: (searchTitle: string) => void

  searchDescription: string
  setSearchDescription: (searchDescription: string) => void

  reset: () => void
  hasHydrated: boolean
}

const initialState = {
  ogTitle: "",
  ogDescription: "",
  ogImageUrl: "",
  ogImageFile: null,

  searchTitle: "",
  searchDescription: "",

  hasHydrated: false,
}

export const useMetadataStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,

      setOgTitle: (ogTitle) => set({ ogTitle }),
      setOgDescription: (ogDescription) => set({ ogDescription }),
      setOgImageUrl: (ogImageUrl) => set({ ogImageUrl }),
      setOgImageFile: (ogImageFile) => set({ ogImageFile }),

      setSearchTitle: (searchTitle) => set({ searchTitle }),
      setSearchDescription: (searchDescription) => set({ searchDescription }),

      reset: () => set(initialState),
    }),
    {
      name: "metadata-storage",
      onRehydrateStorage: () => () => {
        useMetadataStore.setState({ hasHydrated: true })
      },
    }
  )
)