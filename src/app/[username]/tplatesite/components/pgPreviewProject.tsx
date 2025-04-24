import Link from "next/link"

export default function PgPreviewProject () {
  return (
    <div>
      <div className="mpgs-prvw-portfolio-img-cntnr">
        {/* image placeholder */}
      </div>
      <div className="mpgs-portfolio-text-cntnr">
        <p className="mpgs-portfolio-title hov-standrd">Created door hanger for carpet company</p>
        <p className="mpgs-portfolio-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
      <div className="mpgs-portfolio-skills">
        <p className="jb-skll-smllr hov-standrd">Programming</p>
        <p className="jb-skll-smllr hov-standrd">CSS</p>
        <p className="jb-skll-smllr hov-standrd">Design</p>
        <p className="jb-skll-smllr hov-standrd">MongoDB</p>
        <p className="jb-skll-smllr hov-standrd">Leadership</p>
        <p className="jb-skll-smllr hov-standrd">+5 More</p>
      </div>
      <Link className="mpgs-potfolio-full-cta hov-standrd" href={"/username/tplatesite/portfolio/project"}>
        View Full Project
      </Link>
    </div>
  )
}