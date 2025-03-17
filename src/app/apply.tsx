import { CircleCheckBig, Brain, Upload, Pencil, Plus } from "lucide-react"

export default function Apply () {
  return (
    <div className="apply-main-divs">
      <div className="proposal-section">
        <div className="proposal-support-section box-support">
          <p className="proposal-supp-sect-ttle">Apply With</p>
          <div className="apply-opts">
            <div className="resume-apply-option hov-standrd">
              <div className="resume-select-upper">
                <p className="title-resume-apply-opt">Lancea Resume</p>
                <CircleCheckBig className="mr-3 text-purple-600"/>
              </div>
              <p>Dylan Anderson</p>
              <p>As a programmer I have built projects in C# and python that take in data and does stuff</p>
              <p>Python</p>
              <p>projects</p>
              <p>Education</p>
              <p>Certificates</p>
            </div>
            <div className="manual-apply-box hov-standrd">
              <p className="title-resume-apply-opt">Manually apply</p>
              <p className="under-manual-apply-title">Fill out relevant information manually</p>
            </div>
          </div>
        </div>
        <div className="proposal-support-section box-support">
          <p className="proposal-supp-sect-ttle">Job Details</p>
          <div>
            <div className="title-for-jb-in-prop">
              <p className="jb-title-in-prop">Design door hangers for lawn care promotion</p>
              <p className="posted-date-in-prop">Posted March 12, 2025</p>
            </div>
            <div className="relative">
              <p className="jb-desc-in-prop">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. act that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.</p>
              <p className="more-in-prop-jb-desc hov-standrd">more</p>
            </div>
          </div>
          <hr className="mb-8 w-11/12 m-auto"/>
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
          <hr className="mt-4 w-11/12 m-auto"/>
          <div className="jb-info-sect-sklls mt-8 mb-4">
            <p className="jb-title-in-prop">Skills & Expertise</p>
            <div className="jb-info-sklls-sect-div">
              <p className="jb-skll-in-jb-info hov-standrd">Programming</p>
              <p className="jb-skll-in-jb-info hov-standrd">CSS</p>
              <p className="jb-skll-in-jb-info hov-standrd">Design</p>
              <p className="jb-skll-in-jb-info hov-standrd">MongoDB</p>
              <p className="jb-skll-in-jb-info hov-standrd">Leadership</p>
            </div>
          </div>
        </div>
        <div className="proposal-support-section box-support">
          <p className="proposal-supp-sect-ttle">Payment terms</p>
          <div className="choose-hrly-rate">
            <p className="your-rate-in-prop">Your profile rate: $32.00</p>
            <p className="client-budget-in-prop">Clients budget: $12.00 - $45.00</p>
            <p>Hourly rate</p>
            <input className="input-hrly-rate no-spinner" type="number" name="hourly-rate-input" id="hourly-rate-input" placeholder="$32.00" />
          </div>
        </div>
        <div className="proposal-support-section box-support">
          <p className="proposal-supp-sect-ttle mb-6">Work samples</p>
          <div className="work-samples-div-in-prop">
            <div className="lancer-portfolio-sqr">
              <div className="img-placeholder">
                img placeholder
              </div>
              <p className="portfolio-title hov-standrd">Created door hanger for carpet company</p>
              <div className="portfolio-skills">
                <p className="jb-skll-smllr hov-standrd">Programming</p>
                <p className="jb-skll-smllr hov-standrd">CSS</p>
                <p className="jb-skll-smllr hov-standrd">Design</p>
                <p className="jb-skll-smllr hov-standrd">MongoDB</p>
                <p className="jb-skll-smllr hov-standrd">Leadership</p>
                <p className="jb-skll-smllr hov-standrd">+5 More</p>
              </div>
            </div>
            <div className="add-another-work-sample">
              <button className="btn-work-sample-add-in-prop hov-standrd"><Upload className="w-5 h-5 mr-2" /> Upload Work Sample</button>
              <button className="btn-work-sample-add-in-prop hov-standrd"><Pencil className="w-5 h-5 mr-2" /> Create new work sample</button>
            </div>
            <div className="add-another-work-sample">
              <button className="btn-work-sample-add-in-prop hov-standrd"><Upload className="w-5 h-5 mr-2" /> Upload Work Sample</button>
              <button className="btn-work-sample-add-in-prop hov-standrd"><Pencil className="w-5 h-5 mr-2" /> Create new work sample</button>
            </div>
          </div>
        </div>
        <div className="proposal-support-section box-support">
          <p className="proposal-supp-sect-ttle mb-6">Education/Certifications</p>
          <div className="mb-6">
          <div className="education-field">
            <div className="vert-bar"></div>
              <div className="education-info">
                <p className="text-lg font-semibold">Florida State University</p>
                <p className="text-gray-500">Bachelors in biomedical engineering</p>
              </div>
            </div>
            <div className="education-field">
              <div className="vert-bar"></div>
              <div className="education-info">
                <button className="add-education-btn-prop hov-standrd"><Plus />Add education</button>
              </div>
            </div>
          </div>
        </div>
        <div className="proposal-support-section box-support">
          <p className="proposal-supp-sect-ttle mb-6">Cover letter</p>
          <textarea className="cover-letter-text-field" placeholder="Enter text..." name="cover-letter" id="cover-letter"></textarea>
        </div>
        <div className="proposal-support-section box-support">
          <p className="proposal-supp-sect-ttle">Client questions</p>
          <div className="client-question-div-in-prop">
            <p className="question-title-in-prop">Have you worked in this industry before?</p>
            <div className="choices-in-question-prop">
              <button className="option-in-client-question-prop hov-standrd">Yes</button>
              <button className="option-in-client-question-prop hov-standrd">No</button>
            </div>
          </div>
          <div className="client-question-div-in-prop">
            <p className="question-title-in-prop">What is your approach for handling this project?</p>
            <textarea placeholder="Enter text..." className="answer-to-cient-question-text-field" name="answer-to-cient-question-text-field" id="answer-to-cient-question-text-field"></textarea>
          </div>
        </div>
        <button className="send-proposal-btn hov-standrd">Send proposal</button>
        <button className="cancel-proposal-btn hov-standrd">Cancel</button>
      </div>
      <div className="company-overview-cntnr box-main">
        <div className="comp-overview-in-prop-upper">
          <p className="comp-name-in-over-prop-upper">Great Lakes Landscaping</p>
          <p className="reviews-in-comp-over-prop-upper">5.0 &#9733; | 432 reviews</p>
        </div>
        <p className="about-title-comp-over-prop">About</p>
        <p className="about-desc-comp-over-prop">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.</p>
      </div>
    </div>
  )
}