import { CircleSmall, Banknote, Clock } from "lucide-react"
import PgPreviewProject from "./components/pgPreviewProject"

export default function DedicatedServiceLancr () {
  return (
    <>
      <div className="w-3/4 mx-auto mt-16">
        <h1 className="text-5xl ml-5">Landing Page Design</h1>
        <p className="text-lg text-gray-700 w-96 mb-20 mt-2 ml-5">Great for customers who want the perfect landing page to convert the maximum number of visitors as possible.</p>
      </div>
      <section className="included-dserive-freelancer">
        <p className="dservice-freelancer-ttle">Whats Included</p>
        <ul>
          <li className="dservice-item-freelancer"><CircleSmall className="dservice-freelancer-li-check" />5-page custom website</li>
          <li className="dservice-item-freelancer"><CircleSmall className="dservice-freelancer-li-check" />5-page custom website</li>
          <li className="dservice-item-freelancer"><CircleSmall className="dservice-freelancer-li-check" />5-page custom website</li>
          <li className="dservice-item-freelancer"><CircleSmall className="dservice-freelancer-li-check" />5-page custom website</li>
          <li className="dservice-item-freelancer"><CircleSmall className="dservice-freelancer-li-check" />5-page custom website</li>
        </ul>
      </section>
      <section className="pricing-timeline-dservice-freelancer">
        <div className="pricing-delivery-freelancer-dservice">
          <Banknote className="pricing-delivery-icon-freelancer" />
          <p className="pd-dservice-freelancer-ttle">Pricing</p>
          <p className="pd-dservice-freelancer-desc">Starting at $250/month</p>
          <p className="pd-dservice-freelancer-icon-note">Varies by scope</p>
        </div>
        <div>
          <Clock className="pricing-delivery-icon-freelancer" />
          <p className="pd-dservice-freelancer-ttle">Estimated delivery</p>
          <p className="pd-dservice-freelancer-desc">4-5 days</p>
          <p className="pd-dservice-freelancer-icon-note">Varies by scope</p>
        </div>
      </section>
      <section className="mb-28">
        <p className="dservice-section-heading">Whats Included</p>
        <div className="freelancer-dservice-steps-container">
          <div className="step-container-freelancer-dservice">
            <p className="step-freelancer-dservice">Step 1</p>
            <div className="w-full">
              <p className="step-ttle-freelancer-dservice">Submit a Request</p>
              <p className="step-desc-freelancer-dservice">Fill out the contact form or book a free intro call with me.</p>
            </div>
          </div>
          <div className="step-container-freelancer-dservice">
            <p className="step-freelancer-dservice">Step 2</p>
            <div className="w-full">
              <p className="step-ttle-freelancer-dservice">Get a Custom Proposal</p>
              <p className="step-desc-freelancer-dservice">Ill review your needs and send you a personalized plan within 24–48 hours.</p>
            </div>
          </div>
          <div className="step-container-freelancer-dservice">
            <p className="step-freelancer-dservice">Step 3</p>
            <div className="w-full">
              <p className="step-ttle-freelancer-dservice">Project Begins</p>
              <p className="step-desc-freelancer-dservice">Once approved, Ill get to work and keep you updated along the way. Once approved, Ill get to work and keep you updated along the way.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-28">
        <h2 className="dservice-section-heading">Why Choose Me</h2>
        <div className="dservice-freelance-choose-sect">
          <div className="point-dservice-freelancer-choose">
            <p className="point-number-freelancer-choose">1</p>
            <p className="point-ttle-freelancer-choose">Reason to choose</p>
            <p className="point-desc-freelancer-choose">explanation of point</p>
          </div>
          <div className="point-dservice-freelancer-choose">
            <p className="point-number-freelancer-choose">2</p>
            <p className="point-ttle-freelancer-choose">Reason to choose</p>
            <p className="point-desc-freelancer-choose">explanation of point</p>
          </div>
          <div className="point-dservice-freelancer-choose">
            <p className="point-number-freelancer-choose">3</p>
            <p className="point-ttle-freelancer-choose">Reason to choose</p>
            <p className="point-desc-freelancer-choose">explanation of point</p>
          </div>
        </div>
      </section>
      <section className="w-screen flex justify-around mb-12">
        <PgPreviewProject/>
        <PgPreviewProject/>
        <PgPreviewProject/>
      </section>
      <section className="mb-28 mt-28">
        <div className="dservice-freelancer-call-to-action box-main">
          <h2>Ready to work bish</h2>
          <p>Lets bring your ideas to life — together.</p>
          <button className="hov-standrd">Book This Service</button>
        </div>
      </section>
    </>
  )
}