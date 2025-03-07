import Notification from "./components/notification"

export default function Notifications () {
  return (
    <div className="notifications-div">
      <p className="notifications-title">Notifications</p>
      <ul className="notifications-list">
        <Notification/>
        <Notification/>
      </ul>
    </div>
  )
}