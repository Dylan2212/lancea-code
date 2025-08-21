import { create } from "zustand"
import { ProjectData } from "@/src/app/lancrdashboard/projects/addproject/page"

type Store = {
  projects: ProjectData[],
  setProjects: (projects: ProjectData[]) => void
}

export const useProjectsStore = create<Store>()(
    (set) => ({
      projects: [],
      setProjects: projects => set({ projects }),
    }),
)