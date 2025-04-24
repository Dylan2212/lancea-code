import TplateHeros from "../components/tplateHero"
import SocialLinksBar from "../components/socialLinksBar"
import "./aboutFreelancer.css"
import EducationField from "@/app/[username]/tplatesite/components/educationField"
import AchievementCard from "../components/achievementCard"
import TplateSiteCTA from "../components/tsiteCTA"
import Link from "next/link"

export default function FreelancerAboutTsite () {
  return (
    <>
      <TplateHeros/>
      <main>
        <section>
          <div className="about-freelancer-home-container">
            <div className="freelancer-about-image-home">
              image
            </div>
            <div className="about-socials-freelancer-home">
              <p className="overflow-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.<br/><br/>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
              <div className="mt-20">
                <p>32 Reviews | 4.6 &#9733; | <Link className="underline text-purple-600" href={"/"}>View all</Link></p>
              </div>
              <SocialLinksBar/>
            </div>
          </div>
        </section>
        <section className="flex justify-around mb-12">
          <div className="about-freelancer-cat-div">
            <p className="about-freelancer-cat-div-ttle">Skills</p>
            <div className="lancer-info-sklls-sect-div">
              <p className="jb-skll-in-jb-info hov-standrd">Programming</p>
              <p className="jb-skll-in-jb-info hov-standrd">CSS</p>
              <p className="jb-skll-in-jb-info hov-standrd">Design</p>
              <p className="jb-skll-in-jb-info hov-standrd">MongoDB</p>
              <p className="jb-skll-in-jb-info hov-standrd">Leadership</p>
              <p className="jb-skll-in-jb-info hov-standrd">Mowing</p>
              <p className="jb-skll-in-jb-info hov-standrd">Lawn Care</p>
              <p className="jb-skll-in-jb-info hov-standrd">Fatherhood</p>
              <p className="jb-skll-in-jb-info hov-standrd">Management</p>
              <p className="jb-skll-in-jb-info hov-standrd">Listening</p>
            </div>
          </div>
          <div className="about-freelancer-cat-div">
            <p className="about-freelancer-cat-div-ttle">Acheivments</p>
            <AchievementCard/>
            <AchievementCard/>
            <AchievementCard/>
          </div>
          <div className="about-freelancer-cat-div">
            <p className="about-freelancer-cat-div-ttle">Education & Certifications</p>
            <EducationField/>
            <EducationField/>
            <EducationField/>
          </div>
        </section>
        <TplateSiteCTA/>
      </main>
    </>
  )
}