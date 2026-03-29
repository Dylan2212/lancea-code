import type { ServiceEditorReturn } from "@/src/app/hooks/services/useServiceEditor"

type AddServiceProps = {
  serviceEditor: ServiceEditorReturn
}

export default function AddServiceCard ({ serviceEditor }: AddServiceProps) {
  const { title, setTitle, description, setDescription, price, setPrice } = serviceEditor

  return (
    <div className="w-[325px] h-[225px] rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 flex flex-col gap-6 transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.18)] hover:bg-white/70">
      <div className="grid gap-0">
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Add Service Title" className="font-semibold text-gray-800 text-lg m-0"/>
        <input type="text" placeholder="Add Pricing Details" value={price} onChange={(e) => setPrice(e.target.value)} className="font-medium text-gray-700 m-0 text-sm"/>
      </div>
      <div>
        <textarea placeholder="Tell clients about your service" value={description} onChange={(e) => setDescription(e.target.value)} className="line-clamp-4 text-sm"/>
        <span>More</span>
      </div>
    </div>
  )
}