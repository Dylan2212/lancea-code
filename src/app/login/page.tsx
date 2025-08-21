'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Footer from '../components/footer'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let res
    if (mode === 'login') {
      res = await supabase.auth.signInWithPassword({ email, password })
    } else {
      res = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/loading` } })
      if (res.data.user?.identities?.length === 0) {
        toast.error("Email already registered.")
        return
      }
    }

    if (res.error) {
      toast.error(res.error.message)
    } else {
      const toPage = mode === "login" ? "/loading" : "/confirm-email"
      router.push(toPage)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resetEmail) {
      toast.error("Please enter your email.")
      return
    }
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/resetpassword`
    })
    if (error) {
      toast.error(`Error: ${error.message}`)
    } else {
      toast.success('Password reset email sent! Check your inbox.')
      setShowForgotPassword(false)
      setResetEmail('')
    }
  }

  return (
    <div className='max-h-dvh h-dvh overflow-hidden relative'>
      <header className="h-20 flex justify-between items-center">
        <p className="ml-8 text-5xl font-semibold text-purple-600">Lancrly</p>
      </header>

      <div className="w-11/12 sm:mb-16 sm:max-w-md mx-auto mt-10 p-6 border rounded bg-white shadow-lg">
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
            autoComplete="email"
          />
          <div className="relative w-full mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-2 pr-10 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={mode === 'login' ? "current-password" : "new-password"}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded text-white bg-purple-600 hover:bg-purple-700"
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>

          {mode === 'login' && !showForgotPassword && (
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-purple-600 underline text-sm"
            >
              Forgot Password?
            </button>
          )}
        </form>

        {/* Forgot Password form inline */}
        {showForgotPassword && (
          <form onSubmit={handleForgotPassword} className="mb-4 border p-4 rounded bg-purple-50">
            <p className="mb-2 text-purple-700 font-semibold">Reset your password</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mb-3 border rounded"
              value={resetEmail}
              autoComplete='email'
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
              >
                Send reset email
              </button>
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="flex-1 py-2 rounded border border-purple-600 text-purple-600 hover:bg-purple-100"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

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
            src="/googleicon.png"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700 font-medium">Continue with Google</span>
        </button>
      </div>
      <Footer/>
    </div>
  )
}