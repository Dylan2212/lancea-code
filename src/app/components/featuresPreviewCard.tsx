'use client'

import Image from "next/image"

export default function FeaturesPreviewCard() {
  return (
    <div className="relative w-full flex justify-start items-center">
      <div className="relative w-[360px] aspect-[4/3] rounded-xl border border-gray-300 bg-white shadow-md overflow-hidden">
        {/* Browser-style top bar */}
        <div className="absolute top-0 left-0 z-10 w-full h-6 bg-gray-200 flex items-center px-3 space-x-2">
          <span className="w-3 h-3 bg-red-400 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
        </div>

        {/* Screenshot */}
        <Image
          src="/cardPage2.png"
          alt="Links page example"
          fill
          sizes="360px"
          className="object-contain object-top z-0 mt-6 pb-4"
        />
      </div>
    </div>
  )
}