import Image from "next/image"
import { Quote } from "lucide-react"
import SocialLinksBar from "./components/socialLinksBar"
import TplateSiteCTA from "./components/tsiteCTA"

export default function LancerHomePage () {
  return (
      <main className="freelancer-home-page-main">
        <section className="freelancer-hero-section">
          <div className="freelancer-hero-main">
            <div className="freelancer-hero-left-div">
              <h1 className="freelancer-hero-ttle">Dylan Anderson<br/>Marketing for lawn care businesses</h1>
              <p className="freelancer-subhead-hero">Creating marketing materials for lawn care businesses for over 5 years. Specifically tailored to each companys unique offers and skills. Want to work together?</p>
              <button className="hov-standrd freelancer-hero-view-wrk-btn">View Work</button>
              <button className="hov-standrd freelancer-hero-contact-btn">Contact</button>
            </div>
            <div className="double-wrapper-img">
              <div className="freelancer-hero-img-wrapper">
                <Image alt="freelancer hero image" width={100} height={100} src="/LancerHero.png" className="freelancer-hero-img"/>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="freelancer-section-title">What I Offer</h2>
          <div className="freelancer-services-on-home">
            <div className="freelancer-service-card box-main">
              <div className="img-placeholder-freelancer-service"></div>
              <p className="service-card-ttle">Web Design</p>
              <p className="service-card-desc">Custom website design tailored to your brand, offering a seamless user experience and mobile-responsive layouts. Custom website design tailored to your brand, offering a seamless user experience and mobile-responsive layouts.</p>
              <p className="service-card-pricing"><span className="service-card-detail-descriptor">Pricing:</span> Starting at $750</p>
              <p className="service-card-duration"><span className="service-card-detail-descriptor">Estimated duration:</span> 2-3 weeks</p>
            </div>
            <div className="freelancer-service-card box-main">
              <div className="img-placeholder-freelancer-service"></div>
              <p className="service-card-ttle">Service title</p>
              <p className="service-card-desc">service description</p>
              <p className="service-card-pricing">service price</p>
              <p className="service-card-duration">service typical time to deliver</p>
            </div>
          </div>
        </section>
        <section className="freelancer-home-reviews">
          <div className="review-on-freelancer-home">
            <div className="top-review-freelancer-home">
              <Image alt="reviewer image" width={50} height={50} src="/DylanHeadshot.png" className="reviewer-img-on-freelancer-home"/>
              <p className="reviewer-name-on-freelancer-home">Sam Walton &mdash; CEO of Braindash</p>
            </div>
            <div className="bottom-of-review-freelancer-home">
              <Quote className="rotate-180 fill-black" />
              <p className="freelancer-home-review">Dylan did an amazing job designing my website. It looks very professional and our customers love it. 100% recommended.</p>
              <Quote className="fill-black" />
            </div>
          </div>
        </section>
        <section>
          <div className="about-freelancer-home-container">
            <div className="freelancer-about-image-home">
              image
            </div>
            <div className="about-socials-freelancer-home">
              <h2 className="freelancer-about-section-title">About Me</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.<br/><br/>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
              <SocialLinksBar/>
            </div>
          </div>
        </section>
        <section className="freelancer-home-reviews">
          <div className="review-on-freelancer-home">
            <div className="top-review-freelancer-home">
              <Image alt="reviewer image" width={50} height={50} src="/DylanHeadshot.png" className="reviewer-img-on-freelancer-home"/>
              <p className="reviewer-name-on-freelancer-home">Sam Walton &mdash; CEO of Braindash</p>
            </div>
            <div className="bottom-of-review-freelancer-home">
              <Quote className="rotate-180 fill-black" />
              <p className="freelancer-home-review">Dylan did an amazing job designing my website. It looks very professional and our customers love it. 100% recommended.</p>
              <Quote className="fill-black" />
            </div>
          </div>
        </section>
        <TplateSiteCTA/>
      </main>
  )
}