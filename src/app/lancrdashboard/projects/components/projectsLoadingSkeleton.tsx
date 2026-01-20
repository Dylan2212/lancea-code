export default function ProjectsLoadingSkeleton() {
  const fakeProjects = [1, 2, 3, 4]

  return (
    <>
      {fakeProjects.map((num) => (
        <div
          key={num}
          className="w-11/12 mx-auto md:w-[300px] lg:mx-0 mb-6"
        >
          <div className="relative border border-gray-400 rounded-lg shadow-md aspect-[4/3] bg-gray-200 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>

          {num > 1 && <div className="mt-2 space-y-2">
            <div className="relative h-6 bg-gray-200 rounded-md overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
            <div className="relative h-6 w-3/4 bg-gray-200 rounded-md overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>}
        </div>
      ))}
    </>
  )
}