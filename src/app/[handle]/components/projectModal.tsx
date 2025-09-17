"use client"

import { useEffect } from "react"
import Modal from "react-modal"
import "./linkspage.css"
import { X, Trophy } from "lucide-react"
import { ProjectData } from "../../lancrdashboard/projects/add+editproject/page"
import UserProjectGallery from "./userProjectGallery"

type Props = {
  onClose: () => void
  project: ProjectData
}

// MAKE DISPLAY FOR DETAILS
// ADD COVER
// ADD VIEW ALL WITH GALLERY
// ADD CHARACTER LIMITS TO PROJECT DATA
// SOME LABELS IN ADD EDIT POINT TO WRONG HTML

export default function ProjectModal({ onClose, project }: Props) {
  useEffect(() => {
    Modal.setAppElement("body")
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white h-fit max-h-[80%] w-11/12 overflow-x-hidden rounded-lg flex flex-col relative
      lg:h-[450px] lg:justify-between lg:flex-row
      xl:w-2/3
      ">
        <X
          onClick={() => onClose()}
          className="absolute right-1 top-1 cursor-pointer rounded-md w-8 h-8 transition-all ease-in-out duration-300 hover:bg-red-500 hover:text-white"
        />

        <div className="w-11/12 mx-auto pt-8 flex justify-center items-center
        lg:mx-0 lg:w-1/2
        ">
          <UserProjectGallery
            cover={project.cover?.coverUrl}
            images={project.uploaded_urls}
          />
        </div>
        <div className="w-11/12 mx-auto h-11/12 flex flex-col mt-1
        lg:mt-10 lg:mx-0 lg:w-1/2
        ">
          <div className="flex-1 overflow-y-auto pb-10 will-change-transform">
            <p className="text-xl">{project.title}</p>

            <p className="whitespace-pre-line w-11/12 mt-3 text-gray-700
            lg:text-sm
            ">
              {project.description}
            </p>

            {project.results?.length !== 0 && <><p className="text-xl mt-8">Results Achieved</p>
            <div className="mb-5">
              {project.results?.map((result, index) => (
                <div
                  className="border-2 flex gap-4 items-center mt-2 rounded-lg shadow-sm p-4 w-11/12
                  
                  "
                  key={index}
                >
                  <Trophy className="text-orange-300 w-10 h-10" />
                  <p className="text-gray-700">{result}</p>
                </div>
              ))}
            </div></>}

            {project.link !== "" && <><p className="text-xl mt-8 mb-3">Link</p>
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="border-2 mt-5 block max-w-[98%] truncate shadow-lg overflow-ellipsis rounded-md text-blue-600 underline cursor-pointer p-3"
              href={project.link}
            >
              {project.link}
            </a></>}
          </div>
        </div>
      </div>
    </div>
  )
}