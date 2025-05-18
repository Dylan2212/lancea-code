import TextAreaInput from "../components/textAreaInput";
import TitleInput from "../components/titleInput";

export default function About () {
  return (
    <main className="w-full overflow-auto">
      <p className="text-2xl font-semibold m-5 flex items-center gap-4">About You</p>
      <div className="w-3/4 mx-auto">
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Profile Picture</p>
          <p className="text-sm text-gray-500">A professional photo makes your profile more personal and credible.</p>
          <div className="mx-auto w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600">
            Upload (will need library or sum)
          </div>
        </section>
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Profile Headline</p>
          <p className="text-sm text-gray-500">This is the main title that appears at the top of your profile. Keep it short, clear, and aligned with the services you offer.</p>
          <TitleInput previewText="Profile headline"/>
        </section>
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">About You</p>
          <p className="text-sm text-gray-500 mb-5">Share a brief introduction about yourself—your background, passions, and what makes you unique as a freelancer.rence between a view and a conversion.</p>
          <TextAreaInput previewText="Introduce yourself to potential clients here…" />
        </section>
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Availability</p>
          <p className="text-sm text-gray-500">Set your working hours and time zone so clients know when you’re available to collaborate.</p>
          <input type="text" placeholder="timezone react third party needed" />
          <div>
            <div className="flex">
              <p>Weekdays:</p>
              <select name="weekday-am-time" id="weekday-am-time">
                <option value="1:00 AM">1:00 AM</option>
                <option value="2:00 AM">2:00 AM</option>
                <option value="3:00 AM">3:00 AM</option>
                <option value="4:00 AM">4:00 AM</option>
                <option value="5:00 AM">5:00 AM</option>
                <option value="6:00 AM">6:00 AM</option>
                <option value="7:00 AM">7:00 AM</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 AM">12:00 AM</option>
              </select>
              <select name="weekday-am-time" id="weekday-am-time">
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="9:00 PM">9:00 PM</option>
                <option value="10:00 PM">10:00 PM</option>
                <option value="11:00 PM">11:00 PM</option>
                <option value="12:00 PM">12:00 PM</option>
              </select>
            </div>
            <div className="flex">
              <p>Weekends:</p>
              <select name="weekday-am-time" id="weekday-am-time">
                <option value="1:00 AM">1:00 AM</option>
                <option value="2:00 AM">2:00 AM</option>
                <option value="3:00 AM">3:00 AM</option>
                <option value="4:00 AM">4:00 AM</option>
                <option value="5:00 AM">5:00 AM</option>
                <option value="6:00 AM">6:00 AM</option>
                <option value="7:00 AM">7:00 AM</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 AM">12:00 AM</option>
              </select>
              <select name="weekday-am-time" id="weekday-am-time">
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="9:00 PM">9:00 PM</option>
                <option value="10:00 PM">10:00 PM</option>
                <option value="11:00 PM">11:00 PM</option>
                <option value="12:00 PM">12:00 PM</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}