import { useState } from "react"
import StepOne from "./stepOne"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { supabase } from "@/lib/supabaseClient"


export default function OnboardingFlow () {
  const [currentStep, setCurrentStep] = useState(0)
  const setHasSeenOnboarding = useOriginalUserStore(state => state.setHasSeenOnboarding)

  const markIntroComplete = async () => {
    return
    const { data: { user } } = await supabase.auth.getUser()

    await supabase
      .from("users")
      .update({ has_seen_onboarding: true })
      .eq("id", user?.id)

    setHasSeenOnboarding(true)
  }

  const steps = [
    <StepOne key="stepOne" />
  ]

  function nextStep () {
    setCurrentStep(prev => prev + 1)
  }

  function prevStep () {
    setCurrentStep(prev => prev - 1)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative bg-white rounded-xl shadow-xl p-5 w-[500px] z-10">
        {steps[currentStep]}
        {currentStep !== 0 ? <button onClick={prevStep}>Prev</button> : null}
        {steps.length === currentStep + 1 ? <button onClick={() => markIntroComplete}>Finish</button> : <button onClick={nextStep}>Next</button>}
      </div>
    </div>
  )
}