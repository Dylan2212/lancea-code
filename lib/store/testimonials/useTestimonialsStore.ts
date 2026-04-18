import { create } from "zustand"
import { persist } from "zustand/middleware"
import { TestimonialData } from "@/src/types"

type Store = {
  testimonials: TestimonialData[]
  setTestimonials: (testimonials: TestimonialData[]) => void
  resetTestimonials: () => void
  hasHydrated: boolean
}

const initialState = {
  testimonials: []
}

export const useTestimonialsStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,
      hasHydrated: false,

      setTestimonials: (testimonials) => set({ testimonials }),

      resetTestimonials: () => set(initialState),
    }),
    {
      name: "testimonials-storage",
      onRehydrateStorage: () => () => {
        useTestimonialsStore.setState({ hasHydrated: true })
      },
    }
  )
)