import { useState } from "react"

export default function StepOne () {
  const prefix = "lancrly.com/"
  const [handle, setHandle] = useState("")

  function handleInput (e: React.ChangeEvent<HTMLInputElement>) {
    setHandle(e.target.value)
  }

  return (
    <div>
      <p className="font-semibold text-2xl">Thanks for signing up to Lancrly! Let&apos;s start building your portfio.</p>
      <input value={prefix + handle} onChange={(e) => handleInput(e)} className="p-4 text-gray-600 border-2 mt-12 rounded-xl text-lg" type="text" placeholder="lancrly.com/" />
    </div>
  )
}