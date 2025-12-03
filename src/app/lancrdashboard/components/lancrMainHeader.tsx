"use client"

import Link from "next/link"
import Image from "next/image"
import { Globe, ChevronDown, CircleSmall, Trash2, LogOut, Lock } from "lucide-react"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { supabase } from "@/lib/supabaseClient"
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react"
import 'react-loading-skeleton/dist/skeleton.css'
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useChangeLiveStatus } from "../../hooks/useChangeLiveStatus"
import Skeleton from "react-loading-skeleton"

type Props = {
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>
}

export default function LancrMainHeader ({ setShowDeleteModal }: Props) {
  const [isDown, setIsDown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const handle = useOriginalUserStore(state => state.handle)
  const profileImage = useOriginalUserStore(state => state.profileImage)
  const userId = useOriginalUserStore(state => state.userId)

  const { isLive, changeInLiveStatus } = useChangeLiveStatus(userId)


    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsDown(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [])

  function showDropDown () {
    const newIsDown = isDown ? false : true
    setIsDown(newIsDown)
  }

  async function logOutUser () {
    const { error } = await supabase.auth.signOut()
    localStorage.clear()

    if (error) {
      console.error("Logout error: " + error.message)
    } else {
      router.push("/")
    }
  }

  const isHydrated = useOriginalUserStore(state => state._hasHydrated)

  return (
    <header className="lancr-main-header">
      <Link href={"/lancrdashboard/profile"} className="
      text-2xl ml-2 font-inter font-bold text-purple-600
      lg:ml-12 lg:text-4xl
      ">Lancrly</Link>
      <div className="flex md:mr-3 items-center w-fit md:gap-5 lg:gap-8 justify-between">
        <Link className="hidden bg-gray-100 md:py-2 md:rounded-full md:px-4 md:flex md:gap-2 md:hov-standrd" onClick={() => !handle && toast.error("Add required fields to preview your site.")} href={handle ? `/${handle}` : "#"} target={handle ? "_blank" : undefined} rel={handle ? "noopener noreferrer" : undefined}><Globe />Preview Site</Link>
        <div className="hidden md:flex md:flex-row md:gap-2 md:bg-gray-100 md:rounded-full md:py-2 md:px-4 md:items-center">
          <label htmlFor="is-live-selector">Your site is:</label>
          <select value={isHydrated && isLive ? "Online" : "Hidden"} onChange={(e) => changeInLiveStatus(e)} name="is-live-selector" id="is-live-selector" className="bg-transparent [cursor:pointer!important] focus:outline-none focus:ring-0 focus:border-transparent">
            <option value="Online">Online</option>
            <option value="Hidden">Hidden</option>
          </select>
          <CircleSmall
            className={`h-4 w-4 
              ${isHydrated && isLive && "fill-green-500 text-green-500"}`}
          />
        </div>
          <div className="relative mr-2 lg:mr-0" ref={dropdownRef}>
            <div onClick={showDropDown} className="relative rounded-full py-2 px-4 hover:bg-gray-100 hov-standrd flex items-center gap-2">
              <Image className="img-in-lancr-main-header object-cover object-center" fill src={profileImage ? `${profileImage}` : "/profileImage.jpg"} sizes="128px" alt="freelancer profile picture"/>
              <p className="text-sm text-gray-500 ml-8">@{isHydrated ? handle : <Skeleton height={20} width={80}/>}</p>
              <ChevronDown />
            </div>
            {isDown && (
              <div className="absolute right-0 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button onClick={() => setShowDeleteModal(true)} className="flex items-center gap-3 text-red-600 px-4 py-2 text-sm hover:bg-gray-100">
                  <Trash2 className="h-4 w-4" /> Delete Account
                </button>
                <Link className="w-full text-left px-4 py-2 text-sm text-gray-700 flex gap-3 items-center hover:bg-gray-100" href={"/lancrdashboard/resetpassword"}>
                  <Lock className="h-4 w-4" />Reset Password
                </Link>
                <button onClick={logOutUser} className="w-full text-left px-4 py-2 text-sm text-gray-700 flex gap-3 items-center hover:bg-gray-100">
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
  )
}