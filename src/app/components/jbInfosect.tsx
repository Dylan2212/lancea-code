import { Brain, Flag } from "lucide-react";

export default function JbInfoSect () {
  return (
    <div className="jb-info-sect">
      <div className="jb-tp-info-sect">
        <p className="jb-info-ttl">Create door hangers for a lawn care company</p>
        <div className="cmpny-info-li ml-3 hover:cursor-pointer">
          <p className="sm-blck-txt text-sm">Great Lakes Landscaping</p>
          <p className="cmpny-rtng">4.9</p>
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="jb-tp-info-btns">
          <button className="jb-info-aply hov-standrd">Apply now</button>
          <button className="jb-info-save hov-standrd">Save job</button>
        </div>
      </div>
      <div className="jb-btm-info-sect">
        <div>
          <p className="jb-info-fl-desc-ttle">Job Description</p>
          <p className="jb-info-fl-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not</p>
        </div>
        <div className="hr-ln-jb-info"></div>
        <div className="jb-dtls-info-sect">
          <div className="jb-dtl-info-sect">
            <div className="jb-tp-dtl-info">
              <Brain />
              <p className="jb-tp-dtl-ps">Intermediate</p>
              <p className="jb-dtl-typ">Desired skill level boom box</p>
            </div>
            <div className="jb-tp-dtl-info">
              <Brain />
              <p className="jb-tp-dtl-ps">Intermediate</p>
              <p className="jb-dtl-typ">Desired skill level</p>
            </div>
            <div className="jb-tp-dtl-info">
              <Brain />
              <p className="jb-tp-dtl-ps">Intermediate</p>
              <p className="jb-dtl-typ">Desired skill level</p>
            </div>
            <div className="jb-tp-dtl-info">
              <Brain />
              <p className="jb-tp-dtl-ps">Intermediate</p>
              <p className="jb-dtl-typ">Desired skill level</p>
            </div>
          </div>
        </div>
        <div className="hr-ln-jb-info"></div>
        <div className="jb-info-sect-sklls">
          <p className="jb-info-skll-sect-ttl">Skills & Expertise</p>
          <div className="jb-info-sklls-sect-div">
            <p className="jb-skll-in-jb-info hov-standrd">Programming</p>
            <p className="jb-skll-in-jb-info hov-standrd">CSS</p>
            <p className="jb-skll-in-jb-info hov-standrd">Design</p>
            <p className="jb-skll-in-jb-info hov-standrd">MongoDB</p>
            <p className="jb-skll-in-jb-info hov-standrd">Leadership</p>
          </div>
        </div>
        <div className="hr-ln-jb-info"></div>
        <button className="report-btn hov-standrd"><Flag />Report Job</button>
      </div>
    </div>
  )
}