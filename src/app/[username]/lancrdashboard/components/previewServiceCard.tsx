import EditDeleteBtns from "./editDeleteBtns";

export default function PreviewServiceCard () {
  return (
    <div className="lancr-preview-service-card box-main">
      <div className="img-placeholder-freelancer-service"></div>
      <p className="service-card-ttle">Web Design</p>
      <p className="service-card-desc">Custom website design tailored to your brand, offering a seamless user experience and mobile-responsive layouts. Custom website design tailored to your brand, offering a seamless user experience and mobile-responsive layouts.</p>
      <EditDeleteBtns/>
    </div>
  )
}