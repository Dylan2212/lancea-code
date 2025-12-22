'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const handle = searchParams.get("handle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const res = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/loading?handle=${handle}` } })
    
    if (res.data.user?.identities?.length === 0) {
        toast.error("Email already registered.")
        return
    }

    if (res.error) {
      toast.error(res.error.message)
    } else {
      const toPage = "/confirm-email"
      router.push(toPage)
    }
  }

  return (
    <div className='relative pb-8'>
      <header className="h-20 fixed w-dvw z-50 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.65)_20%,rgba(255,255,255,0.1)_100%)] shadow-[0_10px_25px_rgba(255,255,255,0.2)] backdrop-blur-md overflow-hidden">
        <div className="flex items-center h-20 ml-4">
          <Link href="/">
            <Image
              width={150}
              height={60}
              alt="Lancrly logo"
              src="/lancrly.png"
              className="object-contain"
            />
          </Link>
        </div>
      </header>
      <h1 className="relative text-5xl w-[95%] mx-auto pt-24 break-words text-center font-sans font-extrabold tracking-tight text-gray-900 mb-3">
        {handle
          ? `Claim /${handle} on Lancrly today`
          : "Claim your Lancrly page"}
      </h1>
        
      <h2 className="relative text-lg font-sans text-gray-600 text-center mx-auto mb-10 max-w-md">
        Sign up for free — it only takes a minute.
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 20"
            className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-[80%] opacity-80"
          >
            <path
              d="M5 14 C 60 14, 140 16, 195 18"
              stroke="url(#markerGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <defs>
              <linearGradient id="markerGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
      </h2>

      <div className="w-11/12 sm:max-w-md mx-auto p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_10px_40px_-10px_rgba(126,34,206,0.25),0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_45px_-10px_rgba(126,34,206,0.35),0_6px_12px_rgba(0,0,0,0.08)] transition-all duration-300 backdrop-blur-sm">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 font-sans text-center">
          Sign Up
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#E9D5FF] focus:outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 pr-10 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#E9D5FF] focus:outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-sans font-semibold text-white bg-[#7E22CE] hover:bg-[#6B21A8] shadow-md hover:shadow-lg transition-all duration-200"
          >
            Sign Up
          </button>
        </form>
        
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>
        
        {/* Google OAuth */}
        <button
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: `${window.location.origin}/loading?handle=${handle}`,
              },
            })
          }
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl px-4 py-3 bg-white hover:bg-gray-50 transition-all shadow-sm"
          aria-label="Continue with Google"
        >
          <Image
            width={20}
            height={20}
            src="/googleicon.png"
            alt="Google logo"
          />
          <span className="text-sm text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>
        <div className='w-full text-sm flex justify-center items-center mt-5 gap-1'>
          <p className='text-gray-500'>Already have an account?</p>
          <Link className='underline text-[#7E22CE] hover:text-[#6B21A8] transition-all duration-200 ease-in-out' href="/login">Log in</Link>
        </div>
      </div>
    </div>
  )
}