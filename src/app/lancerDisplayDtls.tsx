import JbLiDtls from "./components/jbLiDtls"
import JbLiSkill from "./components/jbliskill"
import Image from "next/image"

export default function LancerDisplayDtls () {
  return (
    <div className="job-listing-tease group hov-standrd">
      <span className="mt-heart">&#9825;</span>
      <div className="lancer-dsply-tp">
        <Image
          src="/DylanHeadshot.png"
          alt="Freelancer Dylan profile picture"
          width={90}
          height={90}
          className="lancer-dsply-circle"
        />
        <div className="lancer-dsply-tp-r">
          <p className="lancer-dsply-name">Dylan Anderson</p>
          <p className="lancer-dsply-ttle">PPC ads | Marketing | Advertising | Home services</p>
        </div>
      </div>
      <div className="jb-li-dtls">
        <JbLiDtls/>
        <JbLiDtls/>
        <JbLiDtls/>
      </div>
      <p className="jb-li-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not</p>
      <p className="jb-li-desc-vewmr hov-standrd">view more</p>
      <div className="jb-li-sklls-sect">
        <div className="jb-li-skl-cntnr no-scrll-bar">
          <JbLiSkill/>
          <JbLiSkill/>
          <JbLiSkill/>
          <JbLiSkill/>
        </div>
        <span className="rght-arrw">&rsaquo;</span>
      </div>
    </div>
  )
}