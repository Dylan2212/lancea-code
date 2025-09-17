"use client"
import { UserContext } from "../components/layoutClient"
import { useContext } from "react"

export default function UserLinks () {
  const data = useContext(UserContext)
  const additionalLinks = data.additional_links

  if (!additionalLinks) return

  return (
    <>
      {additionalLinks.length > 0 && <section className="border-t-2 mt-5">
        <ul>
          {
            additionalLinks.map((link) => (
              <li key={link.id} className="border-2 border-gray-600 rounded-full shadow-md text-lg flex items-center justify-center w-2/3 mx-auto my-3 py-2 px-1 hover:bg-gray-100">
                <a target="_blank" className="w-full h-full text-center" href={link.url}>{link.link_title}</a>
              </li>
            ))
          }
        </ul>
      </section>}
    </>
  )
}