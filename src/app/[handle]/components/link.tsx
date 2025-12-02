import { motion } from "framer-motion"

type MyProps = {
  link: string,
  title: string
}

export default function Link ({ link, title }:MyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      className="w-full flex justify-center"
    >
      <a rel="noopener noreferrer" target="_blank" href={link} className="rounded-2xl block text-lg w-11/12 md:w-2/3 border-[var(--accentColor)] text-center border-2 shadow-md cursor-pointer tracking-wide py-4 transition-all duration-300 ease-in-out hover:border-[var(--hoverColor)] hover:shadow-xl">
        {title}
      </a>
    </motion.div>
  )
}