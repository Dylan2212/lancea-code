import Link from "next/link"

export default function Footer () {
  return (
    <footer className="bg-gray-300 bottom-0 absolute w-screen text-center text-sm text-black py-8 mt-32">
      <p>&copy; {new Date().getFullYear()} Lancrly. Built for freelancers.</p>
      <div className="mt-2 space-x-4">
        <Link href="/privacy" className="hover:underline cursor-pointer inline-block">
          Privacy
        </Link>
        <Link href="/terms" className="hover:underline cursor-pointer inline-block">
          Terms
        </Link>
        <a href="mailto:dylan.anderson@lancrly.com" className="hover:underline">Contact</a>
      </div>
    </footer>
  )
}