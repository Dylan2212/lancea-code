import Image from "next/image"
import { UserData } from "../page"
import SocialLinksBar from "./sociallinksBar"
import React from "react"

type MyProps = {
  userData: Partial<UserData>
}

const Hero = React.forwardRef<HTMLElement, MyProps>((props, ref) => {
  const { userData } = props
  
  return (
    <section
      id="hero"
      ref={ref}
      className="relative md:bg-gradient-to-l md:from-[#E9D5FF] md:to-[white] lg:bg-none flex flex-col md:flex-row items-center justify-center h-svh md:h-screen overflow-hidden bg-white"
    >
      {/* Left content */}
      <div className="relative z-10 text-center pt-10 md:text-left md:w-1/2 px-8 md:px-16 md:pt-16">
        <h1 className="text-3xl text-center md:text-start md:text-4xl font-semibold text-gray-700">
          Hello I&apos;m
        </h1>
        <h2 className="text-5xl mx-auto md:mx-0 md:text-6xl font-extrabold text-[#7E22CE] mt-2 relative w-fit">
          {userData.username}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 20"
            className="absolute left-0 w-full h-[14px] bottom-[-6px] opacity-80 pointer-events-none"
            preserveAspectRatio="none"
          >
            <path
              d="M5 14 C 60 14, 140 16, 195 18"
              stroke="url(#markerGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <defs>
              <linearGradient id="markerGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7E22CE" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7E22CE" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </h2>
        <p className="text-xl text-gray-600 mt-2">
          {userData.title}
        </p>
        <button
          className="rounded-xl px-3 min-w-20 w-32 mt-4 md:mt-8 mb-0 md:mb-5 text-center py-3 bg-[#7E22CE] tracking-wide font-semibold text-lg text-white hover:bg-[#6B21A8] shadow-md hover:shadow-xl transition-all ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-[#581C87] focus:ring-offset-white focus:ring-offset-1">
          Hire Me
        </button>
        <SocialLinksBar userData={userData}/>
      </div>

      <div className="relative w-full md:w-1/2 lg:w-2/3 h-full flex justify-center items-center mt-10 md:mt-0">
        <div
          className="absolute inset-0 bg-gradient-to-b from-white to-[#E9D5FF] md:bg-none lg:bg-gradient-to-b lg:from-[#E9D5FF] lg:to-[#F3E8FF] lg:clip-path-none transition-all duration-300"
          style={{
            clipPath:
              "polygon(0% 0, 100% 0, 100% 100%, 20% 100%)",
          }}
        ></div>

        <style jsx>{`
          @media (max-width: 768px) {
            div[style] {
              clip-path: none !important;
            }
          }
        `}</style>

        <div className="relative z-10 w-[260px] h-[260px] lg:w-[420px] lg:h-[420px]">
          <Image
            fill
            unoptimized
            priority
            sizes="600px"
            src={userData.profileImage || "/default-profile.png"}
            alt={userData.username || "Freelancer profile picture"}
            className="object-cover object-center rounded-full"
          />
        </div>
      </div>
    </section>
  )
})

Hero.displayName = "Hero"

export default Hero