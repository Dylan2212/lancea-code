import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"

export default function PortfolioProject () {
  return (
    <div className="lancr-main-portfolio-project-cntnr grid box-main">
    <div className="img-cntnr-main-lancr-project"></div>
    <div className="dsply-dtls-lancr-main-project">
      <p className="text-lg ml-2">SEO for a fortune 500 company</p>
      <p className="ml-2 text-gray-600 line-clamp-3 mb-1">I did seo key word research and inputed all the highest ranking keyowrds onto the website to ensure the highest ranking via organic results on google and other search engines.</p>
      <div className="lancr-main-portfolio-sklls-cntnr">
        <p className="jb-skll-in-jb-info hov-standrd">Programming</p>
        <p className="jb-skll-in-jb-info hov-standrd">CSS</p>
        <p className="jb-skll-in-jb-info hov-standrd">Design</p>
        <p className="jb-skll-in-jb-info hov-standrd">MongoDB</p>
        <p className="jb-skll-in-jb-info hov-standrd">Leadership</p>
        <p className="jb-skll-in-jb-info hov-standrd">Programming</p>
        <p className="jb-skll-in-jb-info hov-standrd">CSS</p>
        <p className="jb-skll-in-jb-info hov-standrd">Design</p>
        <p className="jb-skll-in-jb-info hov-standrd">MongoDB</p>
        <p className="jb-skll-in-jb-info hov-standrd">Leadership</p>
      </div>
    </div>
    <div className="flex items-center justify-end mr-3 gap-2">
      <Link className="lancr-main-project-edit-dlt-btns" href="/username/lancrdashboard/portfolio/addEditProject"><Pencil className="h-5 w-5" />Edit</Link>
      <Link className="lancr-main-project-edit-dlt-btns" href="/"><Trash2 className="h-5 w-5" />Delete</Link>
    </div>
  </div>
  )
}