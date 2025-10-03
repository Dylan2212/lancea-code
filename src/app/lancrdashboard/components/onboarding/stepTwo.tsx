import "./onboarding.css"

type MyProps = {
  previousStep: () => void,
  finishOnboarding: () => void
}

export default function StepTwo ({ previousStep, finishOnboarding }: MyProps) {
  function finish () {
    previousStep()
  }
  return (
    <>
      <div>
        <p className="font-semibold text-2xl">Welcome to Lancrly! Let&apos;s create your custom portfolio URL so clients can easily find your work.</p>
      </div>
      <div className="mt-8 w-full flex flex-row-reverse justify-between">
        <button className="onboarding-btn" onClick={finishOnboarding}>Finish</button>
        <button className="onboarding-btn" onClick={finish}>Previous</button>
      </div>
    </>
  )
}