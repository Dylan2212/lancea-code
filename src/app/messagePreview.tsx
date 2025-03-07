import Image from "next/image"

export default function MessagePreview () {
  return (
    <div className="message-preview hov-standrd group">
      <Image
        src="/DylanHeadshot.png"
        alt="Freelancer Dylan profile picture"
        width={30}
        height={30}
        className="messaging-prfle-img"
      />
      <div className="msg-preview-dtls">
        <p className="messager-name hov-standrd group-hover:underline">Great Lakes Landscaping</p>
        <p className="msgs-prvw-time">Jan 4</p>
        <p className="msg-preview-text">Hey i wanted to check in on those doorhangers because i need them by tomorrow which is when we will be passing out our doorhangers so if you could hurry up plz do so</p>
      </div>
    </div>
  )
}