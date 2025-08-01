"use client"
import { useRouter } from "next/navigation"
import { CircleUserRound, TextCursorInput, Link, Check } from "lucide-react"
import NextLink from "next/link"
import Image from "next/image"

export default function Home() {
  const router = useRouter()

  return (
    <>
      <header className="h-20 flex justify-between items-center">
        <p className="ml-8 text-3xl lg:text-5xl font-semibold text-purple-600">Lancrly</p>
        <button className="mr-8 bg-purple-600 text-white shadow-md rounded-full py-2 px-4 hov-standrd hover:bg-purple-500" onClick={() => router.push("/login")}>Log In / Sign Up</button>
      </header>
      <main className="">
        <section>
          <div className="relative flex w-dvw lg:h-[82vh] h-[72vh] min-h-[625px] overflow-hidden
            md:min-h-[550px] md:max-h-[650px] md:items-center
            lg:ml-5
            xl:ml-32
          ">
            <div className="z-10 w-5/6 mx-auto flex flex-col max-h-[750px] xs:max-h-none justify-between pb-12
            md:w-1/2 md:ml-8 md:mr-0 md:block
            lg:w-1/2 lg:pb-0
            xl:w-1/3
            ">
              <h1 className="text-4xl text-center font-semibold leading-tight
              md:text-start
              lg:text-5xl
              ">
                A link-in-bio page for all your freelancing links
              </h1>
              <div>
                <h2 className="md:mt-5 mb-3 lg:mb-0 text-lg text-gray-600">
                  All your freelancing links in one simple, shareable page that makes you look legit.
                </h2>
                <button
                  className="md:mt-8 text-lg border-2 border-purple-600 shadow-lg rounded-lg py-3 px-6 hov-standrd hover:bg-gray-100"
                  onClick={() => router.push("/login")}
                >
                  Create your free page
                </button>
              </div>
            </div>

            {/* Mockup container */}
            <div>
              <div className="
              absolute right-[25%] top-1/4 -translate-y-12 w-full z-0 pointer-events-none
              xs:w-650px xs:flex xs:justify-center xs:right-0
              md:translate-y-52 md:top-0 md:translate-x-20 md:w-[74dvw] md:block
              lg:top-[10%] lg:-translate-y-0 lg:right-0 lg:w-[70dvw] lg:translate-x-20
              ">
                <Image
                  priority
                  src="/tryMock.svg"
                  alt="Product mockup on laptop"
                  width={2750}
                  height={2580}
                  className="w-[150%] max-w-[600px] md:w-full md:max-w-none h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="relative z-40">
          <h3 className="text-4xl text-center">Get Set Up In Minutes</h3>
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
          xl:left-48 xl:w-[30vw]
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
        <section className="mt-32 lg:mt-20 relative z-10">
          <div className="border-2 border-purple-600 rounded-xl shadow-2xl h-72 lg:h-60 p-6 w-11/12 md:w-2/3 lg:w-1/2 mx-auto flex flex-col justify-around items-center">
            <p className="text-3xl text-center">Look Professional. Get Discovered.</p>
            <button className="mx-auto w-5/6 xl:w-1/2 font-semibold bg-purple-600 text-white shadow-md rounded-full py-4 text-xl hov-standrd hover:bg-purple-500" onClick={() => router.push("/login")}>Create Your Free Page</button>
            <p className="text-center">Sign up, set up, and share — all in under 5 minutes.</p>
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
