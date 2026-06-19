"use client"
import { brandColors } from "@/src/businessRules"
import type { SearchData, Metadata } from "@/src/types"
import React from "react"



type SearchDataProps = {
  searchMetaData: SearchData,
  setSearchMetaData: React.Dispatch<React.SetStateAction<SearchData>>,
  saveMetaData: (updatedMetaData: Partial<Metadata>) => Promise<void>
}


export default function SearchData ({ searchMetaData, setSearchMetaData, saveMetaData }: SearchDataProps) {

  return (
    <div className="
      mt-16 mb-3 relative p-3 rounded-2xl w-5/6 mx-auto
      border border-[#E9D5FF]
      shadow-[0_0_20px_-5px_rgba(126,34,206,0.15)]
      bg-white
    ">
      <p className="text-lg font-bold">Search</p>
      <p className="text-gray-500 mb-4">Customize your search appearance.</p>

      {/* Editable fields */}
      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={searchMetaData.searchTitle}
            onChange={e => setSearchMetaData(prev => ({
              ...prev,
              searchTitle: e.target.value
            }))}
            className={`w-full px-3 py-2 rounded-lg outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-[${brandColors.accent}]`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={searchMetaData.searchDescription}
            onChange={e => setSearchMetaData(prev => ({
              ...prev,
              searchDescription: e.target.value
            }))}
            className={`w-full px-3 py-2 resize-none rounded-lg ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-[${brandColors.accent}]`}
            rows={3}
          />
        </div>
      </div>

      {/* Search preview */}
      <div className="border rounded-xl p-4 bg-gray-50">
        <p className="text-sm text-[#1a0dab] font-medium">{searchMetaData.searchTitle}</p>
        <p className="text-xs text-[#006621]">lancrly.com/your-handle</p>
        <p className="text-sm text-gray-700 mt-1">{searchMetaData.searchDescription}</p>
      </div>
      <div className="mt-8 flex justify-end mr-4 mb-2">
        <button onClick={() => saveMetaData(searchMetaData)} className="lancrly-btn">Save</button>
      </div>
    </div>
  )
}