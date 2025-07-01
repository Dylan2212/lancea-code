import { create } from "zustand";

export type AdditionalLink = {
  id: string,
  link_title: string,
  url: string,
  user_id?: string
}

type PartialAdditionalLinkWithId = Partial<AdditionalLink> & { id: string }

type Store = {
  links: PartialAdditionalLinkWithId[],
  setLinks: (links: PartialAdditionalLinkWithId[]) => void
  updateLink: (id: string, updatedField: Partial<AdditionalLink>) => void
}

export const useAdditionalLinksStore = create<Store>()(
    (set) => ({
      links: [],
      setLinks: links => set({ links }),
      updateLink: (id, updatedField) => {
        set((state) => ({
          links: state.links.map(link => (
            link.id === id ? { ...link, ...updatedField } : link
          ))
        }))
      }
    }),
)