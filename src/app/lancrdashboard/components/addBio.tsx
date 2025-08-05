"use client"
import Image from "next/image"
import TitleInput from "./titleInput"
import { useState, useEffect } from "react"
import { useUserStore } from "@/lib/store/useUserStore"
import useHandleCheck from "../../hooks/useHandleCheck"
import { useUserHydrated } from "@/lib/store/useOriginalUser"

//KEEP ADDITIONAL LINKS AND SOCIAL LINKS IF IT HAPPENDS
//TO THEM IN ORDER OF HOW THEY ARE TYPED
//DOES NOT NEED FIXED BEFORE LAUNCH

type Props = {
  profileImageFileRef: React.RefObject<File | null>
}

export default function AddBio ({ profileImageFileRef }: Props) {
  const [isMaxCharacters, setIsMaxCharacters] = useState(false)
  const [showInvalidCharMessage, setShowInvalidCharMessage] = useState(false)
  
  const isHydrated = useUserHydrated()
  const user = useUserStore(state => state)

  const { title, bio, username, handle, profileImage, changedProfileImage, setChangedProfileImage, setBio, setProfileImage, setHandle, setTitle, setUsername } = user

  const {isAvailable, isValid, loading} = useHandleCheck(handle)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (showInvalidCharMessage) {
      timer = setTimeout(() => setShowInvalidCharMessage(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [showInvalidCharMessage]);


  if (!user) return null

  function textAreaChange (e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length >= 150) setIsMaxCharacters(true)
    if (e.target.value.length < 150 && isMaxCharacters) setIsMaxCharacters(false)
    setBio(e.target.value)
  }

  function handleFileChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
      if (files && files[0]) {
      const file = files[0]

      profileImageFileRef.current = file

      const url = URL.createObjectURL(file);
      setProfileImage(url);
      
      if (!changedProfileImage) setChangedProfileImage(true)
    }
  }

function userHandleChange(e: React.ChangeEvent<HTMLInputElement>) {
  const newValue = e.target.value

  const isValid =
    /^[a-zA-Z0-9._-]+$/.test(newValue) &&
    !/^-|-$/.test(newValue)

  if (isValid) {
    setHandle(newValue);
    setShowInvalidCharMessage(false)
  } else {
    setShowInvalidCharMessage(true)
  }
}

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
                  {<Image unoptimized priority fill sizes="128px" className="w-fit h-fit object-cover object-center" src={profileImage ? `${profileImage}` : "/profileImage.jpg"} alt="Profile Image"/>}
                </div>
                <div className="w-1/2 h-8 relative flex justify-center items-center bg-white rounded-md hov-standrd hover:bg-gray-50">
                  <p>Upload a file</p>
                  <input className="w-full inset-0 hov-standrd h-full absolute opacity-0" type="file" name="profileImgUrl" id="profile-image" accept="image/*" onChange={handleFileChange}/>
                </div>
              </div>
            </div>
            <TitleInput loading={!isHydrated} required={true} previewText="John Doe" maxChar={80} inputName="username" displayMaxChar={true} type="text" labelTitle="Name" handleChange={(e) => setUsername(e.target.value)} value={username}/>
            <TitleInput loading={!isHydrated} required={true} previewText="Add your title" maxChar={45} inputName="title" displayMaxChar={true} type="text" labelTitle="Title" handleChange={(e) => setTitle(e.target.value)} value={title}/>
            <div className="relative mb-10">
              <div id="username">
                <TitleInput required={true} previewText="Jdoe2819" maxChar={30} inputName="handle" displayMaxChar={true} type="text" labelTitle="Username" handleChange={(e) => userHandleChange(e)} value={handle}/>
              </div>
              <div className="absolute bottom-[-1.5rem] left-3">
                {showInvalidCharMessage ? (
                  <p className="text-red-600 text-sm mt-1"> Only letters, numbers, &quot;.&quot;, &quot;-&quot;, and &quot;_&quot; are allowed. &quot;-&quot; cannot be the first or last character.</p>
                ) :
                <>{loading && <p>Checking...</p>}
                {!loading && isValid && isAvailable === true && <p>✅ Available</p>}
                {!loading && isValid && isAvailable === false && <p>❌ Taken</p>}
                {!loading && !isValid && <p>❌ Not valid</p>}</>}
              </div>
            </div>
            <div className="mt-6 mb-3 ml-2">
              <label className="block text-lg" htmlFor="lancr-bio">Bio:</label>
              <textarea className="text-area-lancr-add-edit" name="bio" id="lancr-bio" placeholder="Tell clients about yourself..." value={bio} onChange={textAreaChange}></textarea>
              <p className={`max-characters ${isMaxCharacters && "text-red-600"}`}>Max: {bio.length}/{150} characters</p>
            </div>
        </section>
      </div>
  )
}