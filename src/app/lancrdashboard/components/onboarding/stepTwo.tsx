import "./onboarding.css"
//import { useUserHydrated } from "@/lib/store/useOriginalUser"
//import { useUserStore } from "@/lib/store/useUserStore"

type MyProps = {
  previousStep: () => void,
  finishOnboarding: () => void
}

export default function StepTwo ({ previousStep, finishOnboarding }: MyProps) {
  //const isHydrated = useUserHydrated()
  //const { username, title, setTitle, setUsername } = useUserStore()

  function finish () {
    previousStep()
  }

  return (
    <>
      <div className="w-11/12 space-y-1">
        <p className="font-semibold text-2xl text-gray-900">
          Basic Info
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Add your name and professional title so clients instantly know who you are and what you do.
        </p>
      </div>
      <div className="space-y-6 mt-10 mb-14 w-11/12 mx-auto">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full shadow rounded-xl ring-1 ring-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-[#E9D5FF] focus:ring-2 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Title</label>
          <input
            type="text"
            placeholder="Product Designer"
            className="w-full shadow rounded-xl ring-1 ring-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-[#E9D5FF] focus:ring-2 focus:outline-none transition"
          />
        </div>
      </div>
      <div className="w-full flex flex-row-reverse justify-between">
        <button className="onboarding-btn" onClick={finishOnboarding}>Finish</button>
        <button className="onboarding-btn" onClick={finish}>Previous</button>
      </div>
    </>
  )
}