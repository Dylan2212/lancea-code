"use client"

import LancrSocialLinks from "../components/socialLinks"

export default function LancrHome () {
  return(
    <main className="w-full overflow-auto">
      <p className="text-2xl font-semibold m-5 flex items-center gap-4">Welcome, Dylan</p>
      <LancrSocialLinks/>
    </main>
  )
}