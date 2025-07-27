"use client"

import { useRouter } from "next/navigation"
import PlainHeader from "../components/plainHeader"

export default function NoAccessPage() {
  const router = useRouter()

  return (
    <div className="bg-gray-50 max-h-dvh min-h-dvh flex flex-col">
      <PlainHeader/>
      <div className="flex flex-col flex-1 mb-20 items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-700 mb-6">
            You don’t have permission to view this page.<br/>
            You’ve been redirected here for security reasons.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-500 hov-standrd transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  )
}