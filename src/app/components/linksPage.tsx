import { SocialLinks } from "@/lib/store/useUserStore"

type Props = {
  userData: {
    id: string,
    email: string,
    lancrTitle: string,
    profileImage: string,
    socialLinks: SocialLinks,
    username: string
  }
}

export default function LinksPage ({ userData }: Props) {
  return (
  <>
    <header>
      <p>image</p>
      <p>{userData.username}</p>
      <p>short bio</p>
    </header>
    <main>
      <ul>
        <li>
          <p>Link name</p>
          <p>link url</p>
        </li>
      </ul>
    </main>
  </>
  )
}