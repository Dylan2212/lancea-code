import JbLiDtls from "./components/jbLiDtls"
import JbLiSkill from "./components/jbliskill"

export default function JobListing () {
  return (
    <div className="job-listing-tease group hov-standrd">
      <div  className="top-jb-li">
        <p className="sm-grey-txt">Posted 24 Minutes ago</p>
        <span className="jb-li-mt-heart">&#9825;</span>
      </div>
      <p className="listing-title">Create door hangers for a lawn care company</p>
      <div className="cmpny-info-li">
        <p className="sm-blck-txt">Great Lakes Landscaping</p>
        <p className="cmpny-rtng">4.9</p>
        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div className="jb-li-dtls">
        <JbLiDtls/>
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