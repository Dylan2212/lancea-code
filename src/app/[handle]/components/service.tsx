type DisplayServiceCardProps = {
  title: string,
  price: string,
  description: string
}

export default function DisplayServiceCardPortfolio ({ title, price, description }: DisplayServiceCardProps) {
  return (
    <div className={`w-[325px] h-[225px] rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 flex flex-col gap-6 transition-all group-hover:shadow-[var(--mainColor)] group-hover:bg-white/70 hover:shadow-[0_12px_40px_var(--accentColor)] hover:bg-white/70  ease-in-out duration-200`}>
      <div className="grid gap-0">
        <p className="font-semibold text-gray-800 text-lg m-0">{title}</p>
        <p className="font-medium text-gray-700 m-0 text-sm">{price}</p>
      </div>
      <div className="relative min-h-[calc(theme(lineHeight.5)*5.2)] max-h-[calc(theme(lineHeight.5)*5.2)]">
  <p
    className="
      text-sm leading-5 pb-3
      max-h-[calc(theme(lineHeight.5)*5.2)]
      overflow-y-auto pr-2

      [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-neutral-300/60
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-button]:hidden
      [&::-webkit-scrollbar-button]:h-0
      [&::-webkit-scrollbar-button]:w-0
    "
  >
    {description}
  </p>

  <div
    className="
      pointer-events-none
      absolute bottom-0 left-0 right-0 h-6
      bg-gradient-to-t from-white to-transparent
    "
  />
</div>


    </div>
  )
}