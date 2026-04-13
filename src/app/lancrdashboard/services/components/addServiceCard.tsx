import type { ServiceEditorReturn } from "@/src/app/hooks/services/useServiceEditor"

type AddServiceProps = {
  serviceEditor: ServiceEditorReturn
}

export default function AddServiceCard ({ serviceEditor }: AddServiceProps) {
  const { title, setTitle, description, setDescription, price, setPrice } = serviceEditor

  return (
    <div className="w-[325px] h-[225px] rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 flex flex-col gap-6 transition-all hover:shadow-[0_12px_40px_rgba(126,34,206,0.15)] hover:bg-white/70">
      <div className="grid gap-0">
        <input required type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Add Service Title" className="font-semibold text-gray-800 text-lg mb-1 pl-1 rounded-sm hover:bg-gray-50 focus:outline-[#E9D5FF]"/>
        <input required type="text" placeholder="Add Pricing Details" value={price} onChange={(e) => setPrice(e.target.value)} className="font-medium text-gray-700 m-0 text-sm pl-1 rounded-sm hover:bg-gray-50 focus:outline-[#E9D5FF]"/>
      </div>
      <div>
        <textarea required rows={5} placeholder="Tell clients about your service" value={description} onChange={(e) => setDescription(e.target.value)} className="text-sm resize-none w-full pl-1 rounded-sm hover:bg-gray-50 focus:outline-[#E9D5FF] overflow-y-auto
      [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-neutral-300/60
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-button]:hidden
      [&::-webkit-scrollbar-button]:h-0
      [&::-webkit-scrollbar-button]:w-0"/>
      </div>
    </div>
  )
}