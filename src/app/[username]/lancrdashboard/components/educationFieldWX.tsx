import { X } from "lucide-react"
import "./educationFieldWX.css"

export default function EducationFieldWithX () {
  return (
    <div className="education-field">
      <X className="w-8 h-8 mr-4 hov-standrd hover:text-red-600" />
      <div className="vert-bar"></div>
      <div className="education-info">
        <p className="text-lg font-semibold">Florida State University</p>
        <p className="text-gray-500">Bachelors in biomedical engineering</p>
      </div>
    </div>
  )
}