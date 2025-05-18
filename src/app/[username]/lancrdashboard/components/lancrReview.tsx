type myProps = {
  nameTitle: string
}

export default function LancrReview ({ nameTitle }: myProps) {
  return (
    <div className="box-main w-72 hov-standrd hover:bg-gray-100">
      <div>
        J
      </div>
      <div>
        <p>Reviewer Name & Title:</p>
        <p>{nameTitle}</p>
      </div>
      <div>
        <p>Review:</p>
        <p>Did a great job with my website design. 10 out of 10 recommended</p>
      </div>
    </div>
  )
}