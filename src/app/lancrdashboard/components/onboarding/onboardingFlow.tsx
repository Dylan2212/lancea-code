import StepOne from "./stepOne"
import "./onboarding.css"
import { useState } from "react"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import StepTwo from "./stepTwo"
import StepThree from "./stepThree"
import StepFour from "./stepFour"
import FinalOnboarding from "./finalOnboarding"
import StepFive from "./stepFive"
import StepSix from "./stepSix"
import { supabase } from "@/lib/supabaseClient"
import toast from "react-hot-toast"

export default function OnboardingFlow () {
  const savedIndex = useOriginalUserStore(state => state.onboardingIndex)
  const [currentStep, setCurrentStep] = useState(savedIndex)
  const setHasSeenOnboarding = useOriginalUserStore(state => state.setHasSeenOnboarding)
  const setOnboardingIndex = useOriginalUserStore(state => state.setOnboardingIndex)
  const userId = useOriginalUserStore(state => state.userId)

  const steps = [
    <StepOne nextStep={nextStep} key="stepOne" />,
    <StepTwo key="stepTwo" previousStep={previousStep} nextStep={nextStep} />,
    <StepThree key="stepThree" nextStep={nextStep} previous={previousStep} />,
    <StepFour key="stepFour" nextStep={nextStep} previous={previousStep}/>,
    <StepFive key="stepFive" previous={previousStep} nextStep={nextStep} />,
    <StepSix key="stepSix" previousStep={previousStep} nextStep={nextStep}/>,
    <FinalOnboarding key="finalStep" finishOnboarding={finishOnboarding} previous={previousStep}/>
  ]

  function nextStep () {
    setCurrentStep(prev => prev + 1)
    setOnboardingIndex(savedIndex + 1)
  }

  function previousStep () {
    setCurrentStep(prev => prev - 1)
    setOnboardingIndex(savedIndex - 1)
  }

  async function finishOnboarding () {
    const { error } = await supabase
      .from("users")
      .update({"has_seen_onboarding": true})
      .eq("id", userId)

    if (error) {
      toast.error("Could not complete onboarding.")
      return
    }

    setOnboardingIndex(0)
    setHasSeenOnboarding(true)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50"></div>
      <div id="scroll-container" className="relative bg-white rounded-xl shadow-xl p-5 w-11/12 max-w-[500px] max-h-[500px] overflow-y-auto z-10 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  [&::-webkit-scrollbar-thumb]:rounded-full
  hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
  [scrollbar-width:thin]
  [scrollbar-color:theme(colors.gray.300)_transparent]
  [&::-webkit-scrollbar-button]:hidden">
        {steps[currentStep]}
      </div>
    </div>
  )
}