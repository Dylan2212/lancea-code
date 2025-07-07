"use client"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") router.push("/lancrdashboard/overview")
  }, [status, router])

  return (
    <>
      <header>
        
      </header>
      <main className="w-full flex justify-around h-screen items-center">
        <button onClick={() => signIn("google", { callbackUrl: "/loading" })}>Log In/Sign Up</button>
      </main>
    </>
  )
}
