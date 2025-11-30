type MyProps = {
  bgTitle: string,
  mainTitle: string
}

export default function TitleText ({ bgTitle, mainTitle }: MyProps) {
  return (
    <div className="relative w-full text-center py-10">
      <span className="absolute left-1/2 -translate-x-1/2 -top-2 
                        text-8xl md:text-9xl font-extrabold 
                        text-gray-200 opacity-30 whitespace-nowrap 
                        pointer-events-none select-none">
        {bgTitle}
      </span>
      <h2 className="relative text-4xl md:text-5xl font-bold 
                     text-[#7E22CE] tracking-tight">
        {mainTitle}
      </h2>
    </div>
  )
}