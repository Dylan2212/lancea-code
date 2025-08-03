'use client'
import Link from "next/link"
import PlainHeader from "../components/plainHeader"

export default function ConfirmEmailPage() {

  return (
    <div className="bg-gray-50 max-h-dvh min-h-dvh flex flex-col">
      <PlainHeader/>
    
      <main className="flex flex-col items-center justify-center p-6 flex-1 mb-20">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-purple-700">Confirm Your Email</h1>
          <p className="mb-6 text-gray-700">
            Thanks for signing up! Please check your inbox for a confirmation email.
            Click the link inside to activate your account.
          </p>
          <p className="text-sm text-gray-500">
            If you don’t see the email, check your spam folder or{' '}
            <Link href="/login" className="text-purple-600 underline hover:text-purple-800">
              try signing up again
            </Link>.
          </p>
        </div>
      </main>
    </div>
  )
}
