import { CheckCircle, Rocket } from "lucide-react"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"

type MyProps = {
  finishOnboarding: () => void,
  previous: () => void
}

export default function FinalOnboarding ({ finishOnboarding, previous }: MyProps) {
  const isLive = useOriginalUserStore(state => state.isLive)
  const setIsLive = useOriginalUserStore(state => state.setIsLive)
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-10 animate-fade-in">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="bg-purple-50 rounded-full p-3">
          <CheckCircle className="w-14 h-14 text-[#7E22CE]" />
        </div>
        <p className="text-gray-900 font-semibold text-2xl">Your site is ready!</p>
        <p className="text-gray-600 text-base max-w-sm">
          Everything’s set up. You’re just one click away from making your portfolio public.
        </p>
      </div>

      {/* Go Live Toggle */}
      <div className="flex flex-col items-center space-y-4 w-full md:w-10/12">
        <div className="flex items-center justify-between bg-white shadow-sm ring-1 ring-gray-200 rounded-xl px-6 py-4 w-full">
          <div className="flex items-center space-x-3">
            <Rocket className="text-[#7E22CE] w-5 h-5" />
            <div>
              <p className="text-gray-900 font-semibold text-sm">Go Live</p>
              <p className="text-gray-600 text-xs">Make your portfolio visible to everyone.</p>
            </div>
          </div>
          <button
            onClick={() => setIsLive(isLive ? false : true)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              isLive ? "bg-[#7E22CE]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                isLive ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
            
      <div className="flex flex-col items-center text-center space-y-2">
        <p className="text-gray-600 text-sm max-w-xs">
          You can always change this later from your dashboard.
        </p>
      </div>
            
      {/* Buttons */}
      <div className="w-full flex flex-row-reverse justify-between">
        <button
          className="onboarding-btn hidden md:inline"
          onClick={finishOnboarding}
        >
          Go To Dashboard
        </button>
        <button
          className="onboarding-btn md:hidden"
          onClick={finishOnboarding}
        >
          Dashboard
        </button>
        <button className="onboarding-btn" onClick={previous}>
          Previous
        </button>
      </div>
    </div>
  )
}