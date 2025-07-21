'use client'

import Image from "next/image"
import { motion } from "framer-motion"

export default function HeroPreviewCard() {
  return (
    <div className="relative w-full flex justify-center items-center perspective-1000">
      {/* Soft background glow */}
      <div className="absolute w-[460px] h-[320px] bg-gradient-to-br from-gray-50 to-gray-300 rounded-2xl blur-2xl opacity-60 -z-10" />

      {/* Preview card with 3D rotation */}
      <motion.div
        initial={{ rotateY: -15 }}
        animate={{ rotateY: -15 }}
        className="relative w-[400px] aspect-[4/3] rounded-xl border bg-white shadow-xl overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Browser top bar */}
        <div className="absolute top-0 left-0 z-10 w-full h-6 bg-gray-200 flex items-center px-3 space-x-2">
          <span className="w-3 h-3 bg-red-400 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
        </div>

        {/* Screenshot */}
        <Image
          src="/cardPage.png"
          alt="Example links page"
          fill
          sizes="400px"
          className="object-contain object-top z-0 mt-6 pb-5"
        />
      </motion.div>
    </div>
  )
}
