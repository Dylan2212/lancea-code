import MessagePreview from "./messagePreview"
import Image from "next/image"
import { EllipsisVertical, SendHorizontal, Paperclip } from "lucide-react"

export default function MessagesPg () {
  return (
    <div className="messages-pg">
      <div className="all-msgs">
        <div className="top-preview-messages">
          <p className="msgs-sect-title">Messages</p>
          <p className="unread-counter-title">(0) Unread messages</p>
          <div className="message-filters">
            <button className="message-filter selected-message-filter">All</button>
            <button className="message-filter">Unread</button>
            <button className="message-filter">Favorites</button>
            <button className="message-filter">Archived</button>
            <button className="message-filter">Spam/Blocked</button>
          </div>
        </div>
        <div className="bottom-preview-messages">
          <MessagePreview/>
          <MessagePreview/>
          <MessagePreview/>
          <MessagePreview/>
          <MessagePreview/>
          <MessagePreview/>
          <MessagePreview/>
          <MessagePreview/>
          <MessagePreview/>
          <MessagePreview/>
          <MessagePreview/>
          <MessagePreview/>
          <MessagePreview/>
        </div>
      </div>
      <div className="opened-convo">
        <div className="open-convo-info-banner">
          <p className="open-convo-banner-name">Great Lakes Landscaping</p>
          <EllipsisVertical className="hov-standrd text-gray-500" />
        </div>
        <div className="opened-convo-main">
          <div className="convo-line-seperator">
            <div className="flex-1 border-t border-gray-400"></div>
            <span className="text-gray-500 text-sm">March 3, 2025</span>
            <div className="flex-1 border-t border-gray-400"></div>
          </div>
          <div className="messages-opened-convo">
            <div className="opened-convo-msg">
              <div>
                <Image
                  src="/DylanHeadshot.png"
                  alt="Freelancer Dylan profile picture"
                  width={80}
                  height={80}
                  className="opened-msg-prfle-img"
                />
              </div>
              <div>
                <div className="msngr-send-info">
                  <p className="msgr-name">You</p>
                  <p className="msg-sent-time">2:23 PM</p>
                </div>
                <p className="msg-in-opened-msg">Yes i can be available then</p>
              </div>
            </div>
            <div className="opened-convo-msg">
              <div>
                <Image
                  src="/DylanHeadshot.png"
                  alt="Freelancer Dylan profile picture"
                  width={80}
                  height={80}
                  className="opened-msg-prfle-img"
                />
              </div>
              <div>
                <div className="msngr-send-info">
                  <p className="msgr-name">Great Lakes Landscaping</p>
                  <p className="msg-sent-time">2:19 PM</p>
                </div>
                <p className="msg-in-opened-msg">Are you available for an interview tomorrow at 6pm EST?</p>
              </div>
            </div>
            <div className="opened-convo-msg">
              <div className="img-msg-div">
                <Image
                  src="/DylanHeadshot.png"
                  alt="Freelancer Dylan profile picture"
                  width={80}
                  height={80}
                  className="opened-msg-prfle-img"
                />
              </div>
              <div className="msg">
                <div className="msngr-send-info">
                  <p className="msgr-name">You</p>
                  <p className="msg-sent-time">2:28 PM</p>
                </div>
                <p className="msg-in-opened-msg">Oh also i forgot to tell you that i am in fact a non binary trans helicopter that reproducres asexually but during work hours and that is a protected class so fuck you</p>
              </div>
            </div>
          </div>
        </div>
        <div className="your-message-cntnr">
          <textarea className="your-msg-text-field" placeholder="Write a message" name="type-message" id="type-message"></textarea>
          <div className="bottom-your-msg">
            <Paperclip className="paperclip"/>
            <SendHorizontal />
          </div>
        </div>
      </div>
    </div>
  )
}