"use client"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"

export default function HeroImage() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const rotateX = useTransform(mouseY, [0, 1], isMobile ? [0, 0] : [15, -15])
  const rotateY = useTransform(mouseX, [0, 1], isMobile ? [0, 0] : [-15, 15])

  const smoothRotateX = useSpring(rotateX, { stiffness: 120, damping: 20 })
  const smoothRotateY = useSpring(rotateY, { stiffness: 120, damping: 20 })

  useEffect(() => {
    if (isMobile) return
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY, isMobile])

  return (
    <div
      ref={ref}
      className="relative flex justify-center lg:justify-end items-center w-full lg:w-11/12 xl:w-3/4 max-w-[500px] lg:pr-24"
      style={{ perspective: 1000 }}
    >
      {/* Accent shapes */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-purple-300/40 rounded-full blur-3xl -z-10"
        style={{
          x: useTransform(mouseX, [0, 1], [-20, 20]),
          y: useTransform(mouseY, [0, 1], [-10, 10]),
        }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-24 h-24 bg-indigo-400/40 rounded-full blur-2xl -z-10"
        style={{
          x: useTransform(mouseX, [0, 1], [15, -15]),
          y: useTransform(mouseY, [0, 1], [10, -10]),
        }}
      />

      {/* Product image */}
      <motion.div
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
          // Give mobile a static 3D tilt
          ...(isMobile && {
            rotateX: -6,
            rotateY: 12,
            scale: 1.05,
          }),
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="relative"
      >
        <Image
          src="/mock.png"
          alt="Lancrly mobile mockup"
          width={280}
          height={700}
          className="rounded-[2rem] shadow-2xl border border-gray-200 bg-white"
        />
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-purple-200/20 to-transparent blur-xl -z-10" />
      </motion.div>
    </div>
  )
}
