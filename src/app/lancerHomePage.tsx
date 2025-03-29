import Image from "next/image"
export default function LancerHomePage () {
  return (
    <>
      <header className="freelancer-header">
        <nav className="freelancer-nav">
          <button className="hov-standrd freelancer-nav-txt">Home</button>
          <button className="hov-standrd freelancer-nav-txt">Portfolio</button>
          <button className="hov-standrd freelancer-nav-txt">Services</button>
          <button className="hov-standrd freelancer-nav-txt">About</button>
          <button className="hov-standrd freelancer-nav-txt">Contact</button>
        </nav>
      </header>
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
            <div className="freelancer-service-card">
              <div className="img-placeholder-freelancer-service"></div>
              <p className="service-card-ttle">Web Design</p>
              <p className="service-card-desc">Custom website design tailored to your brand, offering a seamless user experience and mobile-responsive layouts. Custom website design tailored to your brand, offering a seamless user experience and mobile-responsive layouts.</p>
              <p className="service-card-pricing"><span className="service-card-detail-descriptor">Pricing:</span> Starting at $750</p>
              <p className="service-card-duration"><span className="service-card-detail-descriptor">Estimated duration:</span> 2-3 weeks</p>
            </div>
            <div className="freelancer-service-card">
              <div className="img-placeholder-freelancer-service"></div>
              <p className="service-card-ttle">Service title</p>
              <p className="service-card-desc">service description</p>
              <p className="service-card-pricing">service price</p>
              <p className="service-card-duration">service typical time to deliver</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}