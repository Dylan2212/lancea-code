"use client"
import { signIn } from "next-auth/react"

export default function Home() {

  return (
    <>
      <main className="w-full flex justify-around h-screen items-center">
        <button onClick={() => signIn("google", { callbackUrl: "/loading" })}>Log In/Sign Up</button>
      </main>
    </>
  )
}
