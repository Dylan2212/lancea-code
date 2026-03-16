import { create } from "zustand";
import type { SocialLinks } from "./socialLinksType";
import { syncTabs } from "zustand-sync-tabs"

const initialState = {
  syncBio: "",
  syncEmail: "",
  syncHandle: "",
  syncTitle: "",
  syncUserId: "",
  syncUsername: "",
  syncHydrated: false,
  syncProfileImage: "",
  syncChangedProfileImage: false,
  syncProfileImageFile: null as File | null,
  syncSocialLinks: {
    instagram: "",
    facebook: "",
    x: "",
    medium: "",
    threads: "",
    tiktok: "",
    whatsapp: "",
    youtube: "",
    linkedin: "",
    reddit: "",
    discord: "",
    github: "",
    pinterest: "",
  } as SocialLinks,
}

type LiveSyncStore = {
  syncUserId: string;
  setSyncUserId: (syncUserId: string) => void;

  syncSocialLinks: SocialLinks;
  setSyncSocialLinks: (links: SocialLinks) => void;

  syncEmail: string;
  setSyncEmail: (syncEmail: string) => void;

  syncUsername: string;
  setSyncUsername: (syncUsername: string) => void;

  syncTitle: string;
  setSyncTitle: (syncTitle: string) => void;

  syncProfileImage: string;
  setSyncProfileImage: (syncProfileImage: string) => void;

  syncProfileImageFile: File | null;
  setSyncProfileImageFile: (syncProfileImageFile: File | null) => void;

  syncChangedProfileImage: boolean;
  setSyncChangedProfileImage: (syncChangedProfileImage: boolean) => void;

  syncBio: string;
  setSyncBio: (syncBio: string) => void;

  syncHandle: string;
  setSyncHandle: (syncHandle: string) => void;

  syncHydrated: boolean;
  setSyncHydrated: () => void;

  resetSyncState: () => void;
}

export const useLiveSyncStore = create<LiveSyncStore>()(
  syncTabs(
    (set) => ({
      ...initialState,

      setSyncEmail: (syncEmail) => set({ syncEmail }),
      setSyncHydrated: () => set({ syncHydrated: true }),
      setSyncBio: (syncBio) => set({ syncBio }),
      setSyncChangedProfileImage: (syncChangedProfileImage) => set({ syncChangedProfileImage }),
      setSyncHandle: (syncHandle) => set({ syncHandle }),
      setSyncProfileImage: (syncProfileImage) => set({ syncProfileImage }),
      setSyncTitle: (syncTitle) => set({ syncTitle }),
      setSyncUserId: (syncUserId) => set({ syncUserId }),
      setSyncSocialLinks: (links) => set({ syncSocialLinks: links }),
      setSyncProfileImageFile: (syncProfileImageFile) => set({ syncProfileImageFile }),
      setSyncUsername: (syncUsername) => set({ syncUsername }),

      resetSyncState: () => set(initialState),
    }),
    { name: "live-sync-storage" }
  )
)