"use client"
import { fetchUserData } from "@/lib/fetchUserData"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function Loading () {

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {

    const getData = async () => {
      if (status === "unauthenticated") {
        router.push("/")
      }
        
      const email = session?.user?.email
      const name = session?.user?.name

      if (!email || !name) return

      try {
        await fetchUserData(email)
        router.push(`/lancrdashboard/overview`)
      } catch (err) {
        console.error("Failed to fetch data: " + err)
      }
    }

    getData()

  }, [session, status, router])

  return (
    <>
    Loading...
    </>
  )
}