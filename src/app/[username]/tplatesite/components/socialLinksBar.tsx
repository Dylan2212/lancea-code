import Image from "next/image"

export default function SocialLinksBar () {
  return (
    <div className="social-links-in-freelancer-about-home-pg">
      <Image className="social-link-freelancer" alt="Facebook icon" width={25} height={25} src="/facebook.svg"/>
      <Image className="social-link-freelancer" alt="Instagram icon" width={25} height={25} src="/instagram.svg"/>
      <Image className="social-link-freelancer" alt="Youtube icon" width={25} height={25} src="/youtube.svg"/>
      <Image className="social-link-freelancer" alt="X icon" width={25} height={25} src="/x.svg"/>
      <Image className="social-link-freelancer" alt="LinkedIn icon" width={25} height={25} src="/linkedin.svg"/>
    </div>
  )
}