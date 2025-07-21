"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Email/password sign up
  async function handleSignUp() {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
        options: {
          emailRedirectTo: `${window.location.origin}/loading`
        }
    });
    setLoading(false);
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email to confirm your account!")
    }
  }

  // Email/password login
  async function handleLogin() {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setLoading(false);
    if (error) {
      setMessage(error.message);
    } else {
      router.push("/loading")
    }
  }

  // Google OAuth login
  function handleGoogleLogin() {
    supabase.auth.signInWithOAuth({
      provider: "google",
        options: {
          redirectTo: `${window.location.origin}/loading`
        }
    });
  }

  return (
    <>
      <header className="h-20 flex justify-between items-center">
        <p className="ml-8 text-5xl font-semibold text-purple-600">Lancr</p>
      </header>
      <div className="max-w-md mx-auto mt-10 p-6 border rounded">
        <h2 className="text-2xl font-bold mb-4">Login or Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex gap-2 mb-4">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Log In
          </button>
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="flex-1 border border-purple-600 text-purple-600 py-2 rounded hover:bg-purple-100"
          >
            Sign Up
          </button>
        </div>

        <div className="text-center mb-4">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 transition-colors duration-200 shadow-sm"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.4H272v95.4h146.9c-6.3 33.7-25.4 62.3-54.4 81.4v67.5h87.9c51.5-47.5 81.1-117.3 81.1-193.9z"
              fill="#4285F4"
            />
            <path
              d="M272 544.3c73.7 0 135.7-24.5 180.9-66.7l-87.9-67.5c-24.4 16.4-55.6 26.2-93 26.2-71.5 0-132.1-48.3-153.9-113.3H27.7v70.9C72.9 485.1 166.8 544.3 272 544.3z"
              fill="#34A853"
            />
            <path
              d="M118.1 323.1c-5-14.8-7.9-30.5-7.9-46.6s2.9-31.8 7.9-46.6v-70.9H27.7c-15.7 31.5-24.7 66.7-24.7 104.1s9 72.6 24.7 104.1l90.4-44z"
              fill="#FBBC05"
            />
            <path
              d="M272 107.7c39.9 0 75.7 13.7 103.9 40.7l77.9-77.9C405.8 24.7 344 0 272 0 166.8 0 72.9 59.2 27.7 148.2l90.4 70.9c21.7-65 82.3-113.4 153.9-113.4z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </>
  );
}