import StepOne from "./stepOne"
import "./onboarding.css"
import { useEffect, useState } from "react"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import StepTwo from "./stepTwo"
import StepThree from "./stepThree"
import StepFour from "./stepFour"
import FinalOnboarding from "./finalOnboarding"
import StepFive from "./stepFive"
import StepSix from "./stepSix"
import ProgressBar from "./progressBar"
import { finishOnboarding } from "@/src/application/onboarding/finishOnboarding"
import { useLiveSyncStore } from "@/lib/store/liveSyncStore"
import useProjectsManager from "@/src/app/hooks/useProjectsManager"
import { useLiveSyncProjects } from "@/lib/store/liveSyncProjects"

export default function OnboardingFlow () {
  const savedIndex = useOriginalUserStore(state => state.onboardingIndex)
  const [currentStep, setCurrentStep] = useState<number>(savedIndex)
  const setOnboardingIndex = useOriginalUserStore(state => state.setOnboardingIndex)
  const { projects } = useProjectsManager()

  const steps = [
    <StepOne nextStep={nextStep} key="stepOne" />,
    <StepTwo key="stepTwo" previousStep={previousStep} nextStep={nextStep} />,
    <StepThree key="stepThree" nextStep={nextStep} previous={previousStep} />,
    <StepFour key="stepFour" nextStep={nextStep} previous={previousStep}/>,
    <StepFive key="stepFive" previous={previousStep} nextStep={nextStep} />,
    <StepSix key="stepSix" previousStep={previousStep} nextStep={nextStep}/>,
    <FinalOnboarding key="finalStep" finishOnboarding={finishOnboarding} previous={previousStep}/>
  ]

  useEffect(() => {
    const originalState = useOriginalUserStore.getState()
    useLiveSyncStore.setState((state) => ({
      ...state,
      syncHandle: originalState.handle,
      syncTitle: originalState.title,
      syncEmail: originalState.email,
      syncProfileImage: originalState.profileImage,
      syncBio: originalState.bio,
      syncUsername: originalState.username,
      syncUserId: originalState.userId,
      syncSocialLinks: originalState.socialLinks
    }))

    useLiveSyncProjects.setState((state) => ({
      ...state,
      syncProjects: projects
    }))
  })

  function nextStep () {
    setCurrentStep(prev => prev + 1)
    setOnboardingIndex(savedIndex + 1)
  }

  function previousStep () {
    setCurrentStep(prev => prev - 1)
    setOnboardingIndex(savedIndex - 1)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50"></div>
      <div id="scroll-container" className="relative flex flex-col gap-3 bg-white rounded-xl shadow-xl p-5 w-11/12 max-w-[500px] max-h-[95vh] overflow-y-auto z-10 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  [&::-webkit-scrollbar-thumb]:rounded-full
  hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
  [scrollbar-width:thin]
  [scrollbar-color:theme(colors.gray.300)_transparent]
  [&::-webkit-scrollbar-button]:hidden">
        <ProgressBar currentStep={currentStep} maxSteps={steps.length} />
        {steps[currentStep]}
      </div>
    </div>
  )
}