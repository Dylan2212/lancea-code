'use client'

import { useRouter } from 'next/navigation'
import PlainHeader from '../components/plainHeader'

export default function ErrorPage() {
  const router = useRouter()

  return (
    <div className='bg-gray-50 flex flex-col h-screen'>
      <PlainHeader/>
      <div className="flex-1 flex flex-col items-center justify-center mb-20 px-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-purple-600 mb-4">
          Uh-oh. Something went wrong.
        </h1>
        <p className="text-gray-600 text-center mb-6 max-w-md">
          This page didn’t load properly. Let’s get you back to the homepage.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-500 transition"
        >
          Return Home
        </button>
      </div>
    </div>
  )
}