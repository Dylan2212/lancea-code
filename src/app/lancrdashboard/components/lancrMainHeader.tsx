"use client"

import Link from "next/link"
import Image from "next/image"
import { Globe, ChevronDown, CircleSmall } from "lucide-react"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { supabase } from "@/lib/supabaseClient"
import { useState, useEffect, useRef } from "react"
import { signOut } from "next-auth/react"

export default function LancrMainHeader () {
  const [isDown, setIsDown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handle = useOriginalUserStore(state => state.handle)
  const userId = useOriginalUserStore(state => state.userId)
  const profileImage = useOriginalUserStore(state => state.profileImage)
  const isLive = useOriginalUserStore(state => state.isLive)
  const setIsLive = useOriginalUserStore.getState().setIsLive

  async function changeInLiveStatus (e: React.ChangeEvent<HTMLSelectElement>) {
    const is_live = e.target.value === "Online" ? true : false

    const { error } = await supabase
      .from("users")
      .update({is_live: is_live})
      .eq("id", userId)

    if (error) {
      console.log(error)
      return
    }

    setIsLive(is_live)
    return
  }

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

  function logOutUser () {
    signOut({ callbackUrl: "/"})
  }

  return (
    <header className="lancr-main-header">
      <p className="ml-12 text-4xl font-inter font-bold text-purple-600">Lancr</p>
      <div className="flex mr-10 items-center w-fit gap-8 justify-between">
        <Link className="lancr-view-site-btn hov-standrd" href={`/${handle}`} target="_blank" rel="noopener noreferrer"><Globe />Preview Site</Link>
        <div className="flex gap-2 bg-gray-100 rounded-full py-2 px-4 items-center">
          <label htmlFor="is-live-selector">Your site is:</label>
          <select defaultValue={isLive ? "Online" : "Hidden"} onChange={(e) => changeInLiveStatus(e)} name="is-live-selector" id="is-live-selector" className="bg-transparent focus:outline-none focus:ring-0 focus:border-transparent">
            <option value="Online">Online</option>
            <option value="Hidden">Hidden</option>
          </select>
          <CircleSmall
            className={`h-4 w-4 
              ${isLive && "fill-green-500 text-green-500"}`}
          />        </div>
          <div className="relative" ref={dropdownRef}>
            <div onClick={showDropDown} className="rounded-full py-2 px-4 hover:bg-gray-100 hov-standrd flex items-center gap-2">
              <Image className="img-in-lancr-main-header" src={profileImage ? `${profileImage}` : "/profileImage.jpg"} width={40} height={40} alt="freelancer profile picture"/>
              <p className="text-sm text-gray-500">@{handle}</p>
              <ChevronDown />
            </div>
            {isDown && (
              <div className="absolute right-0 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <Link href="/lancrdashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <button onClick={logOutUser} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
  )
}