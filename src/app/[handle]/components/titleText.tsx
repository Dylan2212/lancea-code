type MyProps = {
  bgTitle: string,
  mainTitle: string
}

export default function TitleText ({ bgTitle, mainTitle }: MyProps) {
  return (
    <div className="relative w-full py-12 md:py-16 flex flex-col items-center justify-center">

      {/* Background Title */}
      <span
        className="absolute top-1/2 -translate-y-1/2
                   text-7xl md:text-8xl lg:text-9xl
                   font-extrabold text-gray-200 opacity-30
                   whitespace-nowrap select-none pointer-events-none
                   leading-none"
      >
        {bgTitle}
      </span>

      {/* Foreground Title */}
      <h2
        className="relative z-10
                   text-4xl md:text-5xl lg:text-6xl
                   font-bold text-[#7E22CE] tracking-tight leading-tight"
      >
        {mainTitle}
      </h2>

    </div>
  )
}