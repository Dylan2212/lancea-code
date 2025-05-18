import { X } from "lucide-react"
import "./lancrSkills.css"
import TitleInput from "../components/titleInput"

export default function LancrSkills () {
  return (
    <main className="w-full overflow-auto">
      <p className="text-2xl font-semibold m-5 flex items-center gap-4">Your Skills</p>
      <div className="w-3/4 mx-auto">
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Skills & Expertise</p>
          <p className="text-sm text-gray-500">Highlight the skills you want to be known for. These help clients quickly understand your strengths and expertise.</p>
          <TitleInput previewText="Ex: Graphic design"/>
          <div className="mt-6 mb-4">
            <p className="lancr-add-edit-sect-ttle">Your Skills</p>
            <div className="mt-2 flex gap-2 w-2/3">
              <p className="skll-w-dlt hov-standrd">Programming<X className="w-5 h-5 hov-standrd hover:text-red-600" /></p>
              <p className="skll-w-dlt hov-standrd">CSS<X className="w-5 h-5 hov-standrd hover:text-red-600" /></p>
              <p className="skll-w-dlt hov-standrd">Management<X className="w-5 h-5 hov-standrd hover:text-red-600" /></p>
              <p className="skll-w-dlt hov-standrd">Mowing<X className="w-5 h-5 hov-standrd hover:text-red-600" /></p>
              <p className="skll-w-dlt hov-standrd">Mulching<X className="w-5 h-5 hov-standrd hover:text-red-600" /></p>
              <p className="skll-w-dlt hov-standrd">Project Management<X className="w-5 h-5 hov-standrd hover:text-red-600" /></p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}