"use client"
import { brandColors } from "@/src/businessRules"
import type { OgData, Metadata } from "@/src/types"
import Image from "next/image"
import React from "react"

type OgDataProps = {
  ogMetaData: {
    ogTitle: string,
    ogDescription: string,
    ogImageUrl: string,
    ogImageFile: File | null
  }
  setOgMetaData: React.Dispatch<React.SetStateAction<OgData>>,
  saveMetaData: (updatedMetaData: Partial<Metadata>) => Promise<void>,
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function OgDataComponent ({ ogMetaData, setOgMetaData, saveMetaData, handleFileChange }: OgDataProps) {
  return (
    <div className="
      mt-16 mb-3 mx-auto w-5/6 relative p-3 rounded-2xl 
      border border-[#E9D5FF]
      shadow-[0_0_20px_-5px_rgba(126,34,206,0.15)]
      bg-white
    ">
      <p className="text-lg font-bold">Social Sharing</p>
      <p className="text-gray-500 mb-4">Customize how your portfolio appears when shared on social media.</p>

      {/* Editable fields */}
      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">OG Title</label>
          <input
            type="text"
            value={ogMetaData.ogTitle}
            onChange={e => setOgMetaData(prev => ({
              ...prev,
              ogTitle: e.target.value
            }))}
            className={`w-full px-3 py-2 rounded-lg ring-1 outline-none ring-gray-300 focus:ring-2 focus:ring-[${brandColors.accent}]`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">OG Description</label>
          <textarea
            value={ogMetaData.ogDescription}
            onChange={e => setOgMetaData(prev => ({
              ...prev,
              ogDescription: e.target.value
            }))}
            className={`w-full px-3 py-2 rounded-lg ring-1 outline-none ring-gray-300 resize-none focus:ring-2 focus:ring-[${brandColors.accent}]`}
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">OG Image URL</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e)}
            className={`w-full px-3 py-2 rounded-lg ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-[${brandColors.accent}]`}
          />
        </div>
      </div>

      {/* Social preview */}
      <div className="border rounded-xl w-11/12 max-w-[520px] mx-auto overflow-hidden bg-gray-50">
        <Image
          src={ogMetaData.ogImageUrl}
          alt="OG Preview"
          width={1200}
          height={630}
          className="w-full h-40 object-cover bg-gray-200"
        />

        <div className="p-4">
          <p className="text-sm font-semibold text-gray-900">{ogMetaData.ogTitle}</p>
          <p className="text-sm text-gray-600 mt-1">{ogMetaData.ogDescription}</p>
          <p className="text-xs text-gray-400 mt-2">lancrly.com/your-handle</p>
        </div>
      </div>
      <div className="mt-8 flex justify-end mr-4 mb-2">
        <button onClick={() => saveMetaData(ogMetaData)} className="lancrly-btn">Save</button>
      </div>
    </div>
  )
}