import { create } from "zustand";
import { SocialLinks } from "./useOriginalUser";


type UserState = {
  userId: string,
  setUserId: (id: string) => void,

  socialLinks: SocialLinks,
  setSocialLinks: (links: SocialLinks) => void,

  email: string,
  setEmail: (email: string) => void,

  username: string,
  setUsername: (username: string) => void

  title: string,
  setTitle: (title: string) => void,

  profileImage: string,
  setProfileImage: (profileImage: string) => void,

  profileImageFile: File | null,
  setProfileImageFile: (file: File | null) => void,

  changedProfileImage: boolean,
  setChangedProfileImage: (changedProfileImage: boolean) => void

  bio: string,
  setBio: (bio: string) => void,

  handle: string,
  setHandle: (handle: string) => void
}

export const useUserStore = create<UserState>()(
    (set) => ({
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
        linkedin: ""
      },
      setUserId: (id) => set({ userId: id }),
      setSocialLinks: (links) => set({ socialLinks: links }),
      setEmail: (email) => set({ email }),
      setUsername: (username) => set({ username }),
      setBio: (bio) => set({ bio }),
      setProfileImage: (profileImage) => set({ profileImage }),
      setTitle: (title) => set({ title }),
      setProfileImageFile: (file) => set({profileImageFile: file}),
      setHandle: (handle) => set({ handle}),
      setChangedProfileImage: (changedProfileImage) => set({ changedProfileImage })
    }),
)