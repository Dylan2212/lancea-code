"use client"
import { useRouter } from "next/navigation"
import { CircleUserRound, TextCursorInput, Link, Check } from "lucide-react"
import Image from "next/image"
import Footer from "./components/footer"
import Hero from "./components/hero"

export default function Home() {
  const router = useRouter()

  return (
    <div className="relative pb-32">
      <header className="h-20 fixed w-dvw z-50 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.65)_20%,rgba(255,255,255,0.1)_100%)] shadow-[0_10px_25px_rgba(255,255,255,0.2)] backdrop-blur-md overflow-hidden flex justify-between items-center">
        <div className="flex items-center h-20 ml-4">
          <Image
            width={150}
            height={60}
            alt="Lancrly logo"
            src="/lancrly.png"
            className="object-contain"
          />
        </div>
        <button className="rounded-xl px-4 text-center py-2.5 mr-8 bg-[#7E22CE] font-medium font-sans text-white hover:bg-[#6B21A8] shadow-sm hover:shadow-md transition-all ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-[#E9D5FF] focus:ring-offset-white focus:ring-offset-1" onClick={() => router.push("/login")}>Log In</button>
      </header>
      <main className="overflow-hidden">
        <Hero/>
        <section className="relative z-40">
          <h3 className="text-4xl text-center mt-8">Set Up Your Freelance Portfolio in Minutes</h3>
          <div className="flex w-11/12 lg:w-2/3 mx-auto justify-around items-center mt-14">
            <div className="w-1/3 lg:w-56 h-32">
              <CircleUserRound className="w-10 h-10 mx-auto" />
              <p className="text-center text-gray-600 mt-3">Create your account</p>
            </div>
            <div className="w-1/3 lg:w-56 h-32">
              <TextCursorInput className="w-10 h-10 mx-auto" />
              <p className="text-center text-gray-600 mt-3">Fill input fields with your information and save</p>
            </div>
            <div className="w-1/3 lg:w-56 h-32">
              <Link className="w-10 h-10 mx-auto" />
              <p className="text-center mt-3 text-gray-600">Share the link to your page</p>
            </div>
          </div>
        </section>
        <section className="flex mt-24 h-[600px] max-h-[600px] min-h-[600px] lg:h-auto lg:mt-32 justify-end gap-32 xl:mr-32 relative z-10 md:w-auto w-full lg-ml-0">
          <div className="md:hidden absolute top-[18%] z-0 w-[80vw] max-w-[300px] -translate-x-[48%] pointer-events-none
            xs:flex xs:justify-center xs:left-24
          ">
            <Image
              src="/mobile2.svg"
              alt="Product mockup on mobile"
              width={2750}
              height={2580}
              className="w-full h-auto"
            />
          </div>
          <div className="absolute hidden z-0 pointer-events-none
          md:block md:w-[40vw] md:-translate-y-0 md:top-0 md:left-10
          lg:top-0 lg:-translate-y-32
          xl:left-32 xl:w-[30vw]
          ">
            <Image
              src="/finalmobile.svg"
              alt="Product mockup on mobile"
              width={2750}
              height={2580}
              className="w-full h-auto"
            />
          </div>
          <div className="relative z-10 md:mr-8">
            <h3 className="text-4xl text-center md:text-end lg:text-center">Why Freelancers Use Lancrly</h3>
            <ul className="md:mt-6 mt-12 min-h-[550px] h-[550px] max-h-[550px] lg:h-auto w-1/2 md:w-2/3 lg:w-5/6 xl:w-auto lg:mx-0 ml-auto mr-5 flex flex-col justify-around lg:block">
              <li>
                <div className="flex items-center gap-4 mb-5 md:mb-0">
                  <Check className="hidden md:block min-w-16 max-w-16 md:min-w-16 md:max-w-16 lg:min-w-24 lg:max-w-24 h-24 text-purple-600"/> 
                  <div>
                    <p className="font-semibold text-xl">Instant Setup</p>
                    <p className="text-gray-600">Launch your page in under 5 minutes -- no code needed</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4 mb-5 md:mb-0">
                  <Check className="hidden md:block min-w-16 max-w-16 md:min-w-16 md:max-w-16 lg:min-w-24 lg:max-w-24 h-24 text-purple-600"/> 
                  <div>
                    <p className="font-semibold text-xl">Portfolio-Ready</p>
                    <p className="text-gray-600">Add links to your best work, socials, or booking — everything in one place.</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4 mb-5 md:mb-0">
                  <Check className="hidden md:block min-w-16 max-w-16 md:min-w-16 md:max-w-16 lg:min-w-24 lg:max-w-24 h-24 text-purple-600"/> 
                  <div>
                    <p className="font-semibold text-xl">Simple & Professional Design</p>
                    <p className="text-gray-600">Display your all your information without clutter</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4 mb-5 md:mb-0">
                  <Check className="hidden md:block min-w-16 max-w-16 md:min-w-16 md:max-w-16 lg:min-w-24 lg:max-w-24 h-24 text-purple-600"/> 
                  <div>
                    <p className="font-semibold text-xl">Custom URL</p>
                    <p className="text-gray-600">Custom URL handle to keep shareable link on brand</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className="mt-32 lg:mt-20 relative z-10 pb-12">
          <div className="border-2 border-purple-600 rounded-xl shadow-2xl h-72 lg:h-60 p-6 w-11/12 md:w-2/3 lg:w-1/2 mx-auto flex flex-col justify-around items-center">
            <p className="text-3xl text-center">Look Professional. Get Discovered.</p>
            <button className="mx-auto w-5/6 xl:w-1/2 font-semibold bg-purple-600 text-white shadow-md rounded-full py-4 text-xl hov-standrd hover:bg-purple-500" onClick={() => router.push("/login")}>Create Your Free Page</button>
            <p className="text-center">Sign up, set up, and share — all in under 5 minutes.</p>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}
