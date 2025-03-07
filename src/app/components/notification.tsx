import { BriefcaseBusiness, X } from "lucide-react"

export default function Notification () {
  return (
    <li className="notifications-list-item">
      <p className="notifaction-time-date">5m</p>
      <BriefcaseBusiness className="briefcase" />
      <div className="notification-text">
        <p><span className="link-to-job-from-notif hov-standrd">&ldquo;Creating door hangers fompaign&rdquo;</span></p>
      </div>
      <X className="hov-standrd delete-notification"/>
    </li>
  )
}