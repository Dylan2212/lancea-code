import { create, type StoreApi, type UseBoundStore } from "zustand";
import type { SocialLinks } from "./socialLinksType";

type UserState = {
  userId: string;
  setUserId: (id: string) => void;

  socialLinks: SocialLinks;
  setSocialLinks: (links: SocialLinks) => void;

  email: string;
  setEmail: (email: string) => void;

  username: string;
  setUsername: (username: string) => void;

  title: string;
  setTitle: (title: string) => void;

  profileImage: string;
  setProfileImage: (profileImage: string) => void;

  profileImageFile: File | null;
  setProfileImageFile: (file: File | null) => void;

  changedProfileImage: boolean;
  setChangedProfileImage: (changedProfileImage: boolean) => void;

  bio: string;
  setBio: (bio: string) => void;

  handle: string;
  setHandle: (handle: string) => void;
};

// ✅ Define the store variable explicitly as possibly undefined
let store: UseBoundStore<StoreApi<UserState>> | undefined;

export const useUserStore =
  store ??
  (store = create<UserState>((set) => ({
    userId: "",
    email: "",
    username: "",
    title: "",
    handle: "",
    profileImageFile: null,
    bio: "",
    changedProfileImage: false,
    profileImage: "",
    socialLinks: {
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
    },
    setUserId: (id) => set({ userId: id }),
    setSocialLinks: (links) => set({ socialLinks: links }),
    setEmail: (email) => set({ email }),
    setUsername: (username) => set({ username }),
    setBio: (bio) => set({ bio }),
    setProfileImage: (url) => set({ profileImage: url }),
    setTitle: (title) => set({ title }),
    setProfileImageFile: (file) => set({ profileImageFile: file }),
    setHandle: (handle) => set({ handle }),
    setChangedProfileImage: (changedProfileImage) =>
      set({ changedProfileImage }),
  })));
