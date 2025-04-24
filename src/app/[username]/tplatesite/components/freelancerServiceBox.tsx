import Link from "next/link"

export default function FreelancerServiceBox () {
  return (
    <div className="freelancer-service-card box-main">
      <div className="img-placeholder-freelancer-service"></div>
      <p className="service-card-ttle">Web Design</p>
      <p className="service-card-desc">Custom website design tailored to your brand, offering a seamless user experience and mobile-responsive layouts. Custom website design tailored to your brand, offering a seamless user experience and mobile-responsive layouts.</p>
      <p className="service-card-pricing"><span className="service-card-detail-descriptor">Pricing:</span> Starting at $750</p>
      <p className="service-card-duration"><span className="service-card-detail-descriptor">Estimated duration:</span> 2-3 weeks</p>
      <Link href={"/username/tplatesite/services/dservice"}>
        View Service
      </Link>
    </div>
  )
}