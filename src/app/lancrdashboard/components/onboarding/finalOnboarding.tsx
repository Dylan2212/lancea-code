import { CheckCircle, Rocket, Briefcase } from "lucide-react"

type MyProps = {
  finishOnboarding: () => void,
  previous: () => void
}

export default function FinalOnboarding ({ finishOnboarding, previous }: MyProps) {

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-10 animate-fade-in">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="bg-purple-50 rounded-full p-3">
          <CheckCircle className="w-14 h-14 text-[#7E22CE]" />
        </div>
        <p className="text-gray-900 font-semibold text-2xl">All set!</p>
        <p className="text-gray-600 text-base max-w-sm">
          You’re all set! Your profile’s coming together nicely — here’s what you can do next to make it even better.
        </p>
      </div>
      <div className="flex flex-col space-y-4 w-full md:w-10/12">
        <div className="flex items-center space-x-3 bg-white shadow-sm ring-1 ring-gray-200 rounded-xl px-5 py-4">
          <Briefcase className="text-[#7E22CE] w-5 h-5" />
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Add projects</span> to showcase your work and experience.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-white shadow-sm ring-1 ring-gray-200 rounded-xl px-5 py-4">
          <Rocket className="text-[#7E22CE] w-5 h-5" />
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Make your site live</span> and share it with the world!
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row-reverse justify-between">
        <button className="onboarding-btn hidden md:inline" onClick={finishOnboarding}>Go To Dashboard</button>
        <button className="onboarding-btn md:hidden" onClick={finishOnboarding}>Dashboard</button>
        <button className="onboarding-btn" onClick={previous}>Previous</button>
      </div>
    </div>
  )
}