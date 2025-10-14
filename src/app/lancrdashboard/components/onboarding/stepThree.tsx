import { useState } from "react"
import Image from "next/image"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import toast from "react-hot-toast"
import { ClipLoader } from "react-spinners"
import { supabase } from "@/lib/supabaseClient"
import { useUserStore } from "@/lib/store/useUserStore"

type MyProps = {
  finishOnboarding: () => void,
  previous: () => void
}

export default function StepThree ({ finishOnboarding, previous }: MyProps) {
  const profileImgUrl = useOriginalUserStore(state => state.profileImage)
  const setProfileImgUrl = useOriginalUserStore(state => state.setProfileImage)
  const [file, setFile] = useState<File>()
  const [saving, setSaving] = useState(false)
  const userId = useOriginalUserStore(state => state.userId)

  function handleFileChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
      if (files && files[0]) {
      const file = files[0]

      const url = URL.createObjectURL(file)
      setProfileImgUrl(url)
      setFile(file)
    }
  }

  async function saveProfileImage () {
    if (!file) {
      toast.error("No file to save.")
      return
    }

    setSaving(true)

    const fileExtension = file.name.split('.').pop()
    const uploadPath = `avatars/${userId}.${fileExtension}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(uploadPath, file, {
        upsert: true,
        contentType: file.type,
      })

    if (uploadError || !uploadData) {
      console.error("Upload error:", uploadError)
      setSaving(false)
      return null
    }

    const { data: urlData } = supabase
      .storage
      .from("profile-images")
      .getPublicUrl(uploadPath)

    if (!urlData?.publicUrl) {
      console.error("Public URL generation failed")
      setSaving(false)
      return null
    }

    const publicUrl = `${urlData.publicUrl}?v=${Date.now()}`

    const {error} = await supabase
      .from("users")
      .update({"profileImage": publicUrl})
      .eq("id", userId)

    if (error) {
      toast.error("Could not save image.")
      setSaving(false)
      return
    }

    useOriginalUserStore.setState((state) => ({
      ...state,
      profileImage: publicUrl,
      profileImageFile: file,
    }))

    useUserStore.setState((state) => ({
      ...state,
      profileImage: publicUrl
    }))

    setSaving(false)
    finishOnboarding()
  }

  return (
    <>
      <div className="w-11/12 space-y-1">
        <p className="font-semibold text-2xl text-gray-900">
          Profile Image
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Upload a clear photo of yourself so clients can put a face to your name and build instant trust.
        </p>
      </div>
      <div className="space-y-6 mt-10 mb-14 w-full md:w-11/12 mx-auto flex flex-col items-center justify-center">
        {!saving ? <><div className="relative flex flex-col items-center justify-center w-40 h-40 outline-offset-4 bg-gray-50 outline-2 outline-dashed outline-[#E9D5FF] rounded-full overflow-hidden hover:outline-[#6B21A8] transition duration-200 ease-in-out">
          {profileImgUrl && <Image fill sizes="128px" className="w-full h-full object-cover object-center rounded-full" alt="User profile image" src={profileImgUrl}/>}
          <p className="text-gray-500 text-sm text-center px-4">Upload a file</p>
          <input
            className="absolute inset-0 opacity-0 cursor-pointer"
            type="file"
            required
            name="profileImgUrl"
            id="profile-image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <p className="text-gray-500 text-sm text-center">
          Recommended: clear headshot, at least 400x400px.
        </p></> : 
        <ClipLoader color="#9CA3AF" size={40} cssOverride={{ borderWidth: "6px" }} />
        }
      </div>
      <div className="w-full flex flex-row-reverse justify-between">
        <button className="onboarding-btn" onClick={saveProfileImage}>Finish</button>
        <button className="onboarding-btn" onClick={previous}>Previous</button>
      </div>
    </>
  )
}