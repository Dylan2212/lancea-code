type DisplayTestimonialProps = {
  body: string,
  name: string
}

export function DisplayTestimonial ({ body, name }: DisplayTestimonialProps) {
  return (
    <div className="relative w-[325px] mx-auto p-8 bg-gray-50 rounded-xl">
      <span className="absolute top-8 left-0 text-6xl text-gray-200 select-none leading-none">
        “
      </span>

      <span className="absolute top-8 right-0 text-6xl text-gray-200 select-none leading-none">
        ”
      </span>

      <p className="text-lg text-gray-800 italic text-center relative line-clamp-4 z-10">
        {body}
      </p>

      <p className="mt-6 text-sm text-center font-medium text-gray-500">
        — {name}
      </p>
    </div>
  )
}