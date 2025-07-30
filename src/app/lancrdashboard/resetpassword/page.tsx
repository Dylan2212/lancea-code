'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Password updated. Redirecting to dashboard...')
      setTimeout(() => router.push('/lancrdashboard/overview'), 2000)
    }
  }

  return (
    <div className='bg-gray-50 flex flex-col flex-1 w-dvw'>    
      <div className="flex items-center justify-center flex-1 mb-20 md:mb-0 lg:mb-0">
        <form
          onSubmit={handleUpdate}
          className="w-full max-w-sm bg-white border border-gray-200 shadow-lg rounded-2xl p-8"
        >
          <h2 className="text-xl font-semibold text-purple-600 mb-6 text-center">
            Set a New Password
          </h2>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              required
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-purple-600"
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-medium py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Set New Password
          </button>

          {message && (
            <p className="mt-4 text-sm text-green-600 text-center">{message}</p>
          )}
          {error && (
            <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  )
}