"use client"
import { useColorManager } from "../../hooks/branding/useColorsManager"
import toast from "react-hot-toast"

export default function Page () {
  const { setMain, setHover, setAccent, main, hover, accent, saveColors, returnToDefault } = useColorManager()

  return (
    <section className="pt-16 w-screen lg:w-full pb-12">
      <h1 className="text-2xl font-semibold m-5 mb-0">Branding</h1>
      <h2 className="ml-5 text-sm max-w-[75%]">Personalize your portfolio colors.</h2>
      <div className="flex flex-col gap-6 w-5/6 mx-auto mt-16 mb-3 relative p-5 rounded-2xl 
      border border-[#E9D5FF]
      shadow-[0_0_20px_-5px_rgba(126,34,206,0.15)]
      lg:w-2/3 lg:ml-2 lg:mr-0
      bg-white">
        <div className="flex flex-col gap-2">
          <label htmlFor="mainColor" className="text-sm font-medium text-gray-700">Main Color</label>
          <input
            id="mainColor"
            type="color"
            value={main}
            onChange={(e) => setMain(e.target.value)}
            className="h-10 w-full rounded border border-gray-300 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="accentColor" className="text-sm font-medium text-gray-700">Accent Color</label>
          <input
            id="accentColor"
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="h-10 w-full rounded border border-gray-300 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="hoverColor" className="text-sm font-medium text-gray-700">Hover Color</label>
          <input
            id="hoverColor"
            type="color"
            value={hover}
            onChange={(e) => setHover(e.target.value)}
            className="h-10 w-full rounded border border-gray-300 cursor-pointer"
          />
        </div>
        <div className="flex gap-6 justify-end">
          <button className="lancrly-btn" onClick={returnToDefault}>Set To Default</button>
          <button className="lancrly-btn" onClick={async () => {
            const success = await saveColors()
            if (success) toast.success("Portfolio Colors Saved!")
            if (!success) toast.error("Issue saving portfolio colors.")
          }}>Save Colors</button>
        </div>
      </div>
    </section>
  )
}