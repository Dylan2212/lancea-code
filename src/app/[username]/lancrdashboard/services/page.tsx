import PreviewServiceCard from "../components/previewServiceCard"
import "./lancrServices.css"

export default function LancrServices () {
  return (
    <main className="overflow-auto w-full">
      <p className="text-2xl font-semibold m-5 flex items-center gap-4">Your Services</p>
      <div className="grid grid-cols-3 gap-y-16 pb-12 mx-auto gap-x-3 mt-12">
        <PreviewServiceCard/>
        <PreviewServiceCard/>
        <PreviewServiceCard/>
      </div>
    </main>
  )
}