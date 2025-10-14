import StepOne from "./stepOne"
import "./onboarding.css"
import { useState } from "react"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import StepTwo from "./stepTwo"
import StepThree from "./stepThree"

//TODO
//CONDITIONAL STATE AS EMPTY STRING OR ORIGINAL STORE VALUE... MAYBE JUST ORIGINAL STORE VALUE IF IT IS DEFAULT ""
//POST ONBOARDING TIP CARD

export default function OnboardingFlow () {
  const [currentStep, setCurrentStep] = useState(0)
  const setHasSeenOnboarding = useOriginalUserStore(state => state.setHasSeenOnboarding)

  const steps = [
    <StepOne nextStep={nextStep} key="stepOne" />,
    <StepTwo key="stepTwo" previousStep={previousStep} nextStep={nextStep} />,
    <StepThree key="stepThree" finishOnboarding={finishOnboarding} previous={previousStep} />
  ]

  function nextStep () {
    setCurrentStep(prev => prev + 1)
  }

  function previousStep () {
    setCurrentStep(prev => prev - 1)
  }

  function finishOnboarding () {
    setHasSeenOnboarding(true)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative bg-white rounded-xl shadow-xl p-5 w-11/12 max-w-[500px] z-10">
        {steps[currentStep]}
      </div>
    </div>
  )
}