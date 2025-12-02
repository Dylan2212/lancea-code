"use client"
import Image from "next/image"
import type { ProjectData } from "../../lancrdashboard/projects/components/addProjectComponent"
import { motion } from "framer-motion"
import { SetStateAction } from "react"

type MyProps = {
  project: ProjectData,
  setFullProject: React.Dispatch<SetStateAction<{
    show: boolean,
    index: number
  }>>,
  index: number
}

export default function Project({ project, setFullProject, index }: MyProps) {
  if (!project.cover?.coverUrl) return null
  const isVideo = project.cover.coverUrl.split('.').pop()?.match(/mp4|mov|webm/i)


  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      onClick={() => setFullProject({show: true, index: index})}
      whileHover={{
        y: -8,
        boxShadow: `
          0px 14px 40px rgba(0, 0, 0, 0.28),
          0px 4px 10px rgba(0, 0, 0, 0.16)
        `,
        transition: { duration: 0.05, ease: "easeOut" }
      }}
      className="
        group relative rounded-xl overflow-hidden min-w-[325px] max-w-[325px] h-[350px] md:h-auto md:aspect-square
        border-2 shadow-md bg-white
        cursor-pointer hover:border-[var(--hoverColor)]
        transition-all duration-300
      "
    >
      <motion.div
        className="
          absolute inset-0 
          flex items-center justify-center 
          font-semibold text-white text-lg tracking-wide
          bg-black/70 z-20
        "
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        View Project
      </motion.div>
      {/* Media */}
      <div className="relative aspect-[4/3] w-full">
        {isVideo ? (
          <video
            src={project.cover.coverUrl}
            controls
            className="object-cover w-full h-full"
          />
        ) : (
          <Image
            alt="project cover"
            fill
            priority
            sizes="300px"
            className="object-cover"
            src={project.cover.coverUrl}
          />
        )}
      </div>

      {/* Title */}
      <p className="p-3 text-lg text-gray-800 font-semibold line-clamp-2">
        {project.title}
      </p>
      <div
        className="
          md:hidden
          absolute bottom-3 right-3
          text-[var(--mainColor)] text-sm font-medium
        "
      >
        Tap to view →
      </div>

    </motion.div>
  )
}