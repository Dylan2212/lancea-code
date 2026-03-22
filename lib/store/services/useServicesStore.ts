import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ServicesData } from "@/src/types"

type Store = {
  services: ServicesData[]
  setServices: (services: ServicesData[]) => void,
  hasHydrated: boolean
}

export const useServicesStore = create<Store>()(
  persist(
    (set) => ({
      services: [],
      hasHydrated: false,
      setServices: (services) => set({ services }),
    }),
    {
      name: "projects-storage",
      onRehydrateStorage: () => () => {
        useServicesStore.setState({ hasHydrated: true })
      },
    }
  )
)