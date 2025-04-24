import Link from "next/link"

export default function FreelancerHeader () {
  return (
    <header className="freelancer-header">
      <nav className="freelancer-nav">
        <Link className="hov-standrd freelancer-nav-txt" href={"/username/tplatesite"}>
          Home
        </Link>
        <Link className="hov-standrd freelancer-nav-txt" href={"/username/tplatesite/portfolio"}>
          Portfolio
        </Link>
        <Link className="hov-standrd freelancer-nav-txt" href={"/username/tplatesite/services"}>
          Services
        </Link>
        <Link className="hov-standrd freelancer-nav-txt" href={"/username/tplatesite/about"}>
          About
        </Link>
        <Link className="hov-standrd freelancer-nav-txt" href={"/username/tplatesite/contact"}>
          Contact
        </Link>
      </nav>
    </header>
  )
}