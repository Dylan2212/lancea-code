type DisplayServiceCardProps = {
  title: string,
  price: string,
  description: string
}

export default function DisplayServiceCard ({ title, price, description }: DisplayServiceCardProps) {
  return (
    <div className="w-[325px] h-[225px] rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 flex flex-col gap-6 transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.18)] hover:bg-white/70">
      <div className="grid gap-0">
        <p className="font-semibold text-gray-800 text-lg m-0">{title}</p>
        <p className="font-medium text-gray-700 m-0 text-sm">{price}</p>
      </div>
      <div>
        <p className="line-clamp-4 text-sm">{description}</p>
        <span>More</span>
      </div>
    </div>
  )
}