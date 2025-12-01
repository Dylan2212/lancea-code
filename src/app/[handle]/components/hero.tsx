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
      <div className="
      relative z-10 text-center pt-24 px-4 w-full
      md:text-left md:w-1/2 md:px-16 md:pt-16
      ">
        <h1 className="text-3xl mb-1 text-center md:text-start md:text-4xl font-semibold text-gray-700 md:mb-0">
          Hello I&apos;m
        </h1>
        <h2 className="
        text-5xl w-full mb-2 font-extrabold text-[#7E22CE] mt-2 relative
        md:mx-0 md:text-6xl md:w-fit md:mb-0
        ">
          {userData.username}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 20"
            className="hidden md:block absolute left-0 w-full h-[14px] bottom-[-6px] opacity-80 pointer-events-none"
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
        <p className="
        text-xl text-gray-600 mt-1 mb-3
        md:mt-2 md:mb-0
        ">
          {userData.title}
        </p>
        <a
          href={`mailto:${userData.email}`}
          className="
          rounded-xl w-3/4 block px-3 min-w-20 mx-auto mt-4 mb-0 text-center py-2 bg-[#7E22CE] tracking-wide font-semibold text-lg text-white hover:bg-[#6B21A8] shadow-md hover:shadow-xl transition-all ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-[#581C87] focus:ring-offset-white focus:ring-offset-1
          md:mb-5 md:mt-8 md:w-32 md:mx-0 md:py-3
          ">
          Email Me
        </a>
        <SocialLinksBar userData={userData}/>
      </div>

      <div className="relative w-full md:w-1/2 lg:w-2/3 h-full flex justify-center items-center md:mt-0">
      <div>
        <div
          className="absolute inset-0 md:bg-none lg:bg-gradient-to-b lg:from-[#E9D5FF] lg:to-[#F3E8FF] lg:clip-path-none transition-all duration-300"
          style={{
            clipPath: "polygon(0% 0, 100% 0, 100% 100%, 20% 100%)",
          }}
        ></div>

        <style jsx>{`
          @media (max-width: 768px) {
            div[style] {
              clip-path: none !important;
            }
          }
        `}</style>
      </div>

        <div className="
        relative z-10 w-[240px] h-[240px]
        lg:w-[420px] lg:h-[420px]
        ">
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