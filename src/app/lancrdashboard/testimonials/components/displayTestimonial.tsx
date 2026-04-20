import { useShowMore } from "@/src/app/hooks/useShowMore"

type DisplayTestimonialProps = {
  text: string,
  name: string
}

export function DisplayTestimonial ({ text, name }: DisplayTestimonialProps) {
  const { isExpanded, setIsExpanded, body, isLong } = useShowMore(117, text)

  return (
    <div className="relative w-fit mx-auto px-8 py-4">
      <span className="absolute top-3 left-0 text-6xl text-gray-300 select-none leading-none">
        “
      </span>

      <span className="absolute top-3 right-0 text-6xl text-gray-300 select-none leading-none">
        ”
      </span>

      <p className="text-lg p-1 text-gray-800 italic text-center relative z-10">
        {body}
      </p>
      {isLong && <p className="text-sm text-[#7E22CE] cursor-pointer hover:text-[#6B21A8] transition-all duration-200" onClick={() => setIsExpanded(!isExpanded)}>Show {isExpanded ? "less" : "more"}</p>}

      <p className="mt-6 text-sm text-center font-medium text-gray-500">
        — {name}
      </p>
    </div>
  )
}