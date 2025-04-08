import FreelancerHeader from "./components/lancerHeader"
import SocialLinksBar from "./components/socialLinksBar"

export default function LancrContact () {
  return (
    <>
      <FreelancerHeader/>
      <main className="contact-page">
        <div className="contact-container">
          <div className="contact-form">
            <h1 className="contact-heading">Get in Touch</h1>
            <form className="form-wrapper">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className="form-input" required />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-input" required />
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={5} className="form-textarea" required />
              <button type="submit" className="hov-standrd form-button">Send Message</button>
            </form>
          </div>
          <div className="contact-info box-support">
            <h2 className="info-heading">Contact Info</h2>
            <p className="contact-info-dtl-freelancer"><strong>Email:</strong> <span className="opt-contact-link-freelancer">anderson.dylan.522@gmail.com</span></p>
            <p className="contact-info-dtl-freelancer"><strong>Availability:</strong> Mon-Fri, 8:00am-5:00pm EST</p>
            <p className="contact-info-dtl-freelancer"><strong>Calendly: </strong><a className="opt-contact-link-freelancer" target="_blank" rel="noopener noreferrer">
              Book a call
            </a></p>
            <SocialLinksBar/>
          </div>
        </div>
      </main>
    </>
  )
}