import { AdditionalLink } from "@/lib/store/useAdditionalLinksStore"
import React from "react"
import TitleText from "./titleText"
import Link from "./link"

const LinksSection = React.forwardRef<HTMLSpanElement, {links: AdditionalLink[]}>(({ links }, ref) => {
  return (
    <section
    id="links"
    ref={ref}
    className="w-full py-20 bg-white flex justify-center px-6"
    >
      <div className="max-w-3xl w-full text-center flex justify-center items-center flex-col gap-10">
        <TitleText mainTitle="My Links" bgTitle="Links"/>
        {links.map((link) => (
          <Link key={link.id} title={link.link_title} link={link.url}/>
        ))}
      </div>
    </section>
  )
})

LinksSection.displayName = "LinksSection"
export default LinksSection