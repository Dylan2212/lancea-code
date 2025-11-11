import { motion } from "framer-motion"
import { CircleUserRound, TextCursorInput, Link } from "lucide-react"

const steps = [
  {
    icon: <CircleUserRound className="w-8 h-8 text-[#7E22CE]" />,
    title: "Sign Up in Seconds",
    desc: "Create your free Lancrly account — no card required"
  },
  {
    icon: <TextCursorInput className="w-8 h-8 text-[#7E22CE]" />,
    title: "Add Your Work & Bio",
    desc: "Fill in your projects, bio, and social links — we’ll handle the design."
  },
  {
    icon: <Link className="w-8 h-8 text-[#7E22CE]" />,
    title: "Go Live Instantly",
    desc: "Publish your portfolio with one click and share your custom link anywhere."
  }
]

export default function StepsSection() {
  return (
    <section className="relative z-40 py-10">
      <h3 className="text-4xl font-semibold text-center text-gray-900 mb-16">
        Build Your Freelance Portfolio — <span className="text-[#7E22CE]">In Minutes</span>
      </h3>

      <div className="flex flex-col md:flex-row w-11/12 lg:w-3/4 mx-auto justify-between items-center gap-10">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex flex-col items-center text-center max-w-xs"
          >
            <motion.div
              style={{ scale: 1.05, boxShadow: "0 0 20px rgba(126, 34, 206, 0.3)" }}
              className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md border border-purple-200"
            >
              {step.icon}
            </motion.div>
            <h4 className="mt-4 text-lg font-semibold text-gray-800">{step.title}</h4>
            <p className="text-gray-600 mt-2 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}