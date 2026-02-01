type ProgressProps = {
  currentStep: number,
  maxSteps: number
}

export default function ProgressBar ({ currentStep, maxSteps }: ProgressProps) {
  const progress = Math.round(currentStep/maxSteps * 100)
  return (
    <div className="w-full">
      <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-violet-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-gray-500">
        {progress}% complete
      </p>
    </div>
  )
}