//import { ProjectData } from "./addProjectComponent"

import RichTextEditor from "../../tiptap/tiptapeditor";

//type MyProps = {
//  projectData: ProjectData,
//  onUpdate: <K extends keyof ProjectData>(name: K, value: ProjectData[K]) => void
//}

export default function ProjectDescription () {
  return (
    <div className="
      mt-16 mb-3 ml-2 relative p-3 rounded-2xl 
      border border-[#E9D5FF]
      shadow-[0_0_20px_-5px_rgba(126,34,206,0.15)]
      bg-white
    ">
      <RichTextEditor/>
    </div>
  )
}

             // <label className="block text-lg" htmlFor="project-description">Description:<span className="text-red-500">*</span></label>
             // <textarea maxLength={1000} value={projectData.description} required className="lancr-add-edit-text-input h-40 resize-none" onChange={(e) => onUpdate("description", e.target.value)} name="project-description" id="project-description"></textarea>
             // <p className={`max-characters ${projectData.description?.length === 1000 && "text-red-600"}`}>
             //   Max: {projectData.description?.length}/{1000} characters
             // </p>