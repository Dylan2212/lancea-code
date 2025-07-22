'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let res
    if (mode === 'login') {
      res = await supabase.auth.signInWithPassword({ email, password })
    } else {
      res = await supabase.auth.signUp({ email, password, options: {emailRedirectTo: 'http://localhost:3000/auth/callback?next=/loading'}})
    }


    if (res.error) {
      alert(res.error.message)
    } else {
      window.location.href = mode === "login" ? "/loading" : "/confim-email" // or redirect wherever you want after login/signup
    }
  }

  return (
    <>
      <header className="h-20 flex justify-between items-center">
        <p className="ml-8 text-5xl font-semibold text-purple-600">Lancr</p>
      </header>

      <div className="max-w-md mx-auto mt-10 p-6 border rounded">
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'login' ? 'Log In' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded text-white bg-purple-600 hover:bg-purple-700"
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle link */}
        <div className="text-sm text-center mb-4">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-purple-600 underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-purple-600 underline"
              >
                Log In
              </button>
            </>
          )}
        </div>

        <div className="text-center my-4">OR</div>

        {/* Google OAuth */}
        <button
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `${window.location.origin}/loading`,
              },
            })
          }
          className="w-full flex items-center justify-center gap-2 border border-[#dadce0] rounded px-4 py-2 bg-white hover:bg-gray-100 transition-colors duration-200 shadow-sm h-10"
          aria-label="Continue with Google"
        >
          <Image
            width={18}
            height={18}
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700 font-medium">Continue with Google</span>
        </button>
      </div>
    </>
  )
}