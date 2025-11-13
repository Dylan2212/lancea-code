import Image from "next/image"
import { UserData } from "../page"
import SocialLinksBar from "./sociallinksBar"

type MyProps = {
  userData: Partial<UserData>
}

export default function Hero ({ userData }: MyProps) {
  return (
    <section
      id="hero"
      className="relative flex flex-col md:flex-row items-center justify-center h-dvh overflow-hidden bg-white"
    >
      {/* Left content */}
      <div className="relative z-10 text-center md:text-left md:w-1/2 px-8 md:px-16 md:pt-16">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-700">
          Hello I&apos;m
        </h1>
        <h2 className="text-5xl md:text-6xl font-extrabold text-[#406882] mt-2">
          {userData.username}
        </h2>
        <p className="text-xl text-gray-600 mt-2">
          {userData.title}
        </p>
        <button className="mt-6 bg-[#406882] hover:bg-[#517C99] text-white px-6 py-3 rounded-lg text-lg transition-all shadow-md hover:shadow-lg">
          Hire Me
        </button>
        <SocialLinksBar userData={userData}/>
      </div>

      <div className="relative md:w-2/3 h-full flex justify-center items-center mt-10 md:mt-0">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#2E516A] to-[#406882] md:clip-path-none transition-all duration-300"
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

        <div className="relative z-10 w-[500px] h-[500px]">
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
}