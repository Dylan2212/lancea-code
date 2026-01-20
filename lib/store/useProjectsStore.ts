import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ProjectData } from "@/src/app/lancrdashboard/projects/add+editproject/page"

type Store = {
  projects: ProjectData[]
  setProjects: (projects: ProjectData[]) => void,
  hasHydrated: boolean
}

export const useProjectsStore = create<Store>()(
  persist(
    (set) => ({
      projects: [],
      hasHydrated: false,
      setProjects: (projects) => set({ projects }),
    }),
    {
      name: "projects-storage",
      onRehydrateStorage: () => () => {
        useProjectsStore.setState({ hasHydrated: true })
      },
    }
  )
)

