"use client"
import { fetchUserData } from "@/lib/fetchUserData"
import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { ClipLoader } from "react-spinners"
import Image from "next/image"

export default function Loading () {
  const router = useRouter()

  useEffect(() => {

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push("/")
        console.log("Not session")
        return
      }

      const uid = session.user.id
      const email = session.user.email

      if (!uid) {
        console.error("No user ID found in session.")
        return
      }

      try {
        await fetchUserData(uid, email)
        router.push(`/lancrdashboard/profile`)
      } catch (err) {
        console.error("Failed to fetch data: " + err)
      }
    }

    init()

  }, [router])

  return (
    <div className="flex items-center justify-center h-dvh w-screen bg-white">
      <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
        <ClipLoader color="#d8b4fe" size={150} />
        <div className="absolute flex items-center h-20 ml-4">
          <Image
            width={150}
            height={60}
            alt="Lancrly logo"
            src="/lancrly.png"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}