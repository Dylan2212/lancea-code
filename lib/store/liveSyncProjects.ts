import { create } from "zustand"
import { syncTabs } from "zustand-sync-tabs"
import type { ProjectData } from "@/src/app/lancrdashboard/projects/add+editproject/page"

const initialState = {
  syncProjects: [] as ProjectData[],
}

type Store = {
  syncProjects: ProjectData[]
  setSyncProjects: (projects: ProjectData[]) => void
  resetSyncProjects: () => void
}

export const useLiveSyncProjects = create<Store>()(
  syncTabs(
    (set) => ({
      ...initialState,

      setSyncProjects: (syncProjects) => set({ syncProjects }),

      resetSyncProjects: () => set(initialState),
    }),
    {
      name: "projects-storage",
    }
  )
)