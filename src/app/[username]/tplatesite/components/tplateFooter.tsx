import SocialLinksBar from "./socialLinksBar";

export default function TplateFooter () {
  return (
    <footer className="bg-gray-200 py-14 grid grid-cols-2">
      <section>
        <div>
          <h2>Quick Links</h2>
          <ul>
             <li>Home</li>
             <li>About</li>
             <li>Services</li>
             <li>Web Design</li>
             <li>SEO</li>
             <li>Portfolio</li>
             <li>Contact</li>
          </ul>
        </div>
      </section>
      <section>
        <div>
          <p>Dylan Anderson</p>
          <p>I create web designs that make your website top tier cuh</p>
          <SocialLinksBar/>
        </div>
      </section>
      <p>© 2025 [Freelancer Name]. All rights reserved.</p>
    </footer>
  )
}