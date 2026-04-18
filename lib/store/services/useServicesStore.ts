import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ServicesData } from "@/src/types"

type Store = {
  services: ServicesData[]
  setServices: (services: ServicesData[]) => void
  resetServices: () => void
  hasHydrated: boolean
}

const initialState = {
  services: []
}

export const useServicesStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,
      hasHydrated: false,

      setServices: (services) => set({ services }),

      resetServices: () => set(initialState),
    }),
    {
      name: "services-storage",
      onRehydrateStorage: () => () => {
        useServicesStore.setState({ hasHydrated: true })
      },
    }
  )
)