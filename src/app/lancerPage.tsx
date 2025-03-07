import Image from "next/image"
import LancerDisplayDtls from "./lancerDisplayDtls"
import SearchBar from "./searchBar"
import { Ellipsis, ChevronLeft, ChevronRight, Star, CalendarDays,CircleUserRound } from "lucide-react"

export default function LancerPage () {
  return (
    <>
      <SearchBar/>
      <div className="jb-main">
        <div>
          <div className="jb-dsply-ctgry">
            <p className="jb-dsply-cat">Best Matches</p>
            <p className="jb-dsply-cat">Saved</p>
          </div>
          <div className="hr-ln-jb-li">
            <hr className="hr-abs-jb-li"/>
            <hr className="no-show"/>
          </div>
          <p className="jb-dsply-cat-desc">Browse freelancers that best match your search criteria</p>
          <div className="hr-ln-jb-li-2"></div>
          <div className="lancers">
            <LancerDisplayDtls/>
            <LancerDisplayDtls/>
            <LancerDisplayDtls/>
            <LancerDisplayDtls/>
          </div>
        </div>
        <div className="jb-info-sect">
          <div className="lancer-info-tp">
            <p className="opt-hrly-rate">$32/hr</p>
            <div className="lancer-info-tp-dtls">
              <Image
                src="/DylanHeadshot.png"
                alt="Freelancer Dylan profile picture"
                width={80}
                height={80}
                className="lancer-listing-prfle-img"
              />
              <div className="lancer-main-dtls-info">
                <p className="lancer-name-info">Dylan Anderson</p>
                <p className="rting-rspnd-info"><svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>5.0 &#40;132&#41; | Usually responds in: 4 hours</p>
                <p className="lancer-ttle-info">Paid ads specialist | Meta ads | Google ads | Blockchaing lover</p>
              </div>
            </div>
            <div className="lancer-info-ctas">
              <button className="jb-info-aply hov-standrd">Message</button>
              <button className="jb-info-save hov-standrd">Save</button>
              <button className="round-btn hov-standrd"><Ellipsis /></button>
            </div>
          </div>
          <div className="jb-btm-info-sect">
            <div className="slctr-wrapper">
              <div className="lancer-btm-info-sect-slctr">
                <p className="sect-slctr hov-standrd active-sect-slctr">About</p>
                <p className="sect-slctr hov-standrd">Reviews</p>
                <p className="sect-slctr hov-standrd">Portfolio</p>
                <p className="sect-slctr hov-standrd">Reviews</p>
                <p className="sect-slctr hov-standrd">Skills</p>
                <p className="sect-slctr hov-standrd">Certifications</p>
                <p className="sect-slctr hov-standrd">Education</p>
              </div>
            </div>
            <div className="about-lancer-info-btm">
              <p className="jb-info-fl-desc-ttle">About Dylan A.</p>
              <p className="about-info-btm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content hemaking it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).<br></br><br></br>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content hemaking it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)</p>
              <p className="lancer-about-view-mr hov-standrd">View more</p>
            </div>
            <hr className="hr-line" />
            <p className="jb-info-fl-desc-ttle">Reviews (28)</p>
            <div className="lancer-reviews-btm">
              <div className="lancer-review-btm">
                <p className="review-ttle">Created door hanger design for lawn care campaign</p>
                <div>
                  <div className="flex items-center">
                    <p className="review-date"><CalendarDays />December 20, 2021</p>
                    <Star className="text-yellow-500 fill-current w-4 h-4 ml-3 mr-1"/>
                    <p className="text-sm">4.85</p>
                  </div>
                  <p className="review-desc">&quot;It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).&quot;</p>
                  <p className="reviewer-name"><CircleUserRound className="w-5 h-5"/>Joshua Anderson</p>
                </div>
              </div>
              <div className="lancer-review-btm">
                review 2
              </div>
            </div>
            <div className="review-num-pg-mover">
              <ChevronLeft className="review-mover-num"/>
              <p className="review-mover-num mover-num-slctd">1</p>
              <p className="review-mover-num">2</p>
              <p className="review-mover-num">3</p>
              <p className="review-mover-num">4</p>
              <p className="review-mover-num">5</p>
              <p>...</p>
              <ChevronRight className="review-mover-num"/>
            </div>
            <hr className="hr-line" />
            <p className="jb-info-fl-desc-ttle">Portfolio</p>
            <div className="lancer-reviews-btm">
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
              <div className="lancer-portfolio-sqr">
                <div className="img-placeholder">
                  img placeholder
                </div>
                <p>Title</p>
                <div>Skills</div>
              </div>
            </div>
            <div className="review-num-pg-mover">
              <ChevronLeft className="review-mover-num"/>
              <p className="review-mover-num mover-num-slctd">1</p>
              <p className="review-mover-num">2</p>
              <ChevronRight className="review-mover-num"/>
            </div>
            <hr className="hr-line" />
            <p className="jb-info-fl-desc-ttle">Skills</p>
            <div className="lancer-info-sklls-sect-div">
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
            <hr className="hr-line" />
            <p className="jb-info-fl-desc-ttle">Education & Certifications</p>
            <div className="mb-8">
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
                  <p className="text-lg font-semibold">Six Sigma Green Belt</p>
                  <p className="text-gray-500">Certified by AESC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}