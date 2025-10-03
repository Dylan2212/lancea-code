import StepOne from "./stepOne"
import "./onboarding.css"
import { useState } from "react"
import useHandleCheck from "@/src/app/hooks/useHandleCheck"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"

export default function OnboardingFlow () {
  const [handle, setHandle] = useState("")
  const {isAvailable, isValid, loading} = useHandleCheck(handle)
  const setHasSeenOnboarding = useOriginalUserStore(state => state.setHasSeenOnboarding)

  const steps = [
    <StepOne nextStep={nextStep} key="stepOne" handle={handle} setHandle={setHandle} isValid={isValid} isAvailable={isAvailable} loading={loading} />
  ]

  function nextStep () {
    setHasSeenOnboarding(true)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative bg-white rounded-xl shadow-xl p-5 w-11/12 max-w-[500px] z-10">
        {steps[0]}
      </div>
    </div>
  )
}