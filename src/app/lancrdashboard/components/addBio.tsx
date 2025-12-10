"use client"
import Image from "next/image"
import TitleInput from "./titleInput"
import { useState, useEffect } from "react"
import { useUserStore } from "@/lib/store/useUserStore"
import TiptapEditor from "../tiptap/tiptapeditor"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"


type Props = {
  profileImageFileRef: React.RefObject<File | null>
}

export default function AddBio ({ profileImageFileRef }: Props) {
  const [showInvalidCharMessage, setShowInvalidCharMessage] = useState(false)
  const title = useUserStore(state => state.title)
  const setTitle = useUserStore(state => state.setTitle)
  const username = useUserStore(state => state.username)
  const setUsername = useUserStore(state => state.setUsername)
  const profileImage = useUserStore(state => state.profileImage)
  const changedProfileImage = useUserStore(state => state.changedProfileImage)
  const setProfileImage = useUserStore(state => state.setProfileImage)
  const setChangedProfileImage = useUserStore(state => state.setChangedProfileImage)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (showInvalidCharMessage) {
      timer = setTimeout(() => setShowInvalidCharMessage(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [showInvalidCharMessage]);


  function handleFileChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
      if (files && files[0]) {
      const file = files[0]

      profileImageFileRef.current = file

      if (profileImage) URL.revokeObjectURL(profileImage)
      const url = URL.createObjectURL(file);
      setProfileImage(url)
      //useUserStore.setState(state => ({
      //  ...state,
      //  "profileImage": url
      //}))

      if (!changedProfileImage) setChangedProfileImage(true)
    }
  }

  const isHydrated = useOriginalUserStore(state => state._hasHydrated)

  return (
      <div className="div-for-lancr-dashboard-sects">
        <section className="lancr-add-edit-sect box-support">
          <div id="bio-sect">
            <p className="lancr-add-edit-sect-ttle">Bio</p>
            <p className="text-sm text-gray-500">Add basic information so viewers now more about you.</p>
          </div>
            <div className="w-11/12 lg:w-3/4 mt-4 mx-auto">
              <p className="text-lg">Profile Image:</p>
              <div className="w-full mx-auto h-72 bg-gray-100 border-gray-400 border rounded-md flex items-center gap-3 justify-center flex-col">
                <div className="w-32 h-32 rounded-full border overflow-hidden relative border-black">
                  {<Image key={profileImage} unoptimized priority fill sizes="128px" className="w-fit h-fit object-cover object-center" src={profileImage ? `${profileImage}` : "/profileImage.jpg"} alt="Profile Image"/>}
                </div>
                <div className="w-1/2 h-8 relative flex justify-center items-center bg-white rounded-md hov-standrd hover:bg-gray-50">
                  <p>Upload a file</p>
                  <input className="w-full inset-0 hov-standrd h-full absolute opacity-0" type="file" name="profileImgUrl" id="profile-image-in-bio" accept="image/*" onChange={handleFileChange}/>
                </div>
              </div>
            </div>
            <TitleInput loading={!isHydrated} required={true} previewText="John Doe" maxChar={80} inputName="username" displayMaxChar={true} type="text" labelTitle="Name" handleChange={(e) => setUsername(e.target.value)} value={username}/>
            <TitleInput loading={!isHydrated} required={true} previewText="Add your title" maxChar={70} inputName="title" displayMaxChar={true} type="text" labelTitle="Title" handleChange={(e) => setTitle(e.target.value)} value={title}/>
            <div className="mt-6 mb-3 ml-2">
              <label className="block text-lg" htmlFor="lancr-bio">Bio:</label>
              <div className="w-11/12 lg:w-5/6">
                <TiptapEditor/>
              </div>
            </div>
        </section>
      </div>
  )
}