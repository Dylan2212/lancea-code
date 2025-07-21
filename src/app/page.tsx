"use client"
import { useRouter } from "next/navigation"
import { CircleUserRound, TextCursorInput, Link, Check } from "lucide-react"
import HeroPreviewCard from "./components/heroPreviewCard"
import NextLink from "next/link"
import Image from "next/image"

export default function Home() {
  const router = useRouter()

  return (
    <>
      <header className="h-20 flex justify-between items-center">
        <p className="ml-8 text-5xl font-semibold text-purple-600">Lancr</p>
        <button className="mr-8 bg-purple-600 text-white shadow-md rounded-full py-2 px-4 hov-standrd hover:bg-purple-500" onClick={() => router.push("/login")}>Log In / Sign Up</button>
      </header>
      <main className="">
        <section>
          <div className="flex justify-around items-center w-screen h-[82vh]">
            <div className="w-1/3">
              <h1 className="text-5xl font-semibold leading-tight">
                A link-in-bio page for all your freelancing links
              </h1>
              <h2 className="mt-5 text-lg text-gray-600">
                All your freelancing links in one simple, shareable page that makes you look legit.
              </h2>
              <button className="mt-8 text-lg border-2 border-purple-600 shadow-lg rounded-lg py-3 px-6 hov-standrd hover:bg-gray-100" onClick={() => router.push("/login")}>Create your free page</button>
            </div>
            <div className="perspective-1000">
              <HeroPreviewCard />
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-4xl text-center">Get Set Up In Minutes</h3>
          <div className="flex w-2/3 mx-auto justify-around items-center mt-14">
            <div className="w-56 h-32">
              <CircleUserRound className="w-10 h-10 mx-auto" />
              <p className="text-center text-gray-600 mt-3">Create your account</p>
            </div>
            <div className="w-56 h-32">
              <TextCursorInput className="w-10 h-10 mx-auto" />
              <p className="text-center text-gray-600 mt-3">Fill input fields with your information and save</p>
            </div>
            <div className="w-56 h-32">
              <Link className="w-10 h-10 mx-auto" />
              <p className="text-center mt-3 text-gray-600">Share the link to your page</p>
            </div>
          </div>
        </section>
        <section className="flex mt-32 justify-center gap-32">
          <div className="w-[280px] h-[560px] relative">
            <Image
              src="/anotherCard-portrait.png"
              alt="Mobile preview"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="text-4xl text-center">Why Freelancers Use Lancr</h3>
            <ul className="mt-6">
              <li>
                <div className="flex items-center gap-4">
                  <Check className="w-24 h-24 text-purple-600"/> 
                  <div>
                    <p className="font-semibold text-xl">Instant Setup</p>
                    <p className="text-gray-600">Launch your page in under 5 minutes -- no code needed</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4">
                  <Check className="w-24 h-24 text-purple-600"/> 
                  <div>
                    <p className="font-semibold text-xl">Portfolio-Ready</p>
                    <p className="text-gray-600">Add links to your best work, socials, or booking — everything in one place.</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4">
                  <Check className="w-24 h-24 text-purple-600"/> 
                  <div>
                    <p className="font-semibold text-xl">Simple & Professional Design</p>
                    <p className="text-gray-600">Display your all your information without clutter</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4">
                  <Check className="w-24 h-24 text-purple-600"/> 
                  <div>
                    <p className="font-semibold text-xl">Custom URL</p>
                    <p className="text-gray-600">Custom URL handle to keep shareable link on brand</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className="mt-32">
          <div className="border-2 border-purple-600 rounded-xl shadow-2xl h-60 p-6 w-1/2 mx-auto flex flex-col justify-around items-center">
            <p className="text-3xl text-center">Look Professional. Get Discovered.</p>
            <button className="mr-8 w-1/2 font-semibold bg-purple-600 text-white shadow-md rounded-full py-4 text-xl hov-standrd hover:bg-purple-500" onClick={() => router.push("/login")}>Create Your Free Page</button>
            <p>Sign up, set up, and share — all in under 5 minutes.</p>
          </div>
        </section>
      </main>
      <footer className="bg-gray-300 text-center text-sm text-black py-8 mt-32">
        <p>&copy; {new Date().getFullYear()} Lancr. Built for freelancers.</p>
        <div className="mt-2 space-x-4">
          <NextLink href="/privacy" className="hover:underline cursor-pointer inline-block">
            Privacy
          </NextLink>
          <NextLink href="/terms" className="hover:underline cursor-pointer inline-block">
            Terms
          </NextLink>
          <a href="mailto:hello@lancr.io" className="hover:underline">Contact</a>
        </div>
      </footer>
    </>
  )
}
