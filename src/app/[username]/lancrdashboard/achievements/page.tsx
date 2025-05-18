import AchievementCard from "../../components/achievementCard"
import TitleInput from "../components/titleInput"

export default function LancrAchievements () {
  return (
    <main className="w-full overflow-auto">
      <p className="text-2xl font-semibold m-5 flex items-center gap-4">Your Achievements</p>
      <div className="w-3/4 mx-auto">
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Achievements</p>
          <p className="text-sm text-gray-500">Showcase any awards, recognitions, or notable accomplishments that demonstrate your credibility and impact.</p>
          <TitleInput previewText="Ex: 500 products sold"/>
          <TitleInput previewText="Ex: yuup"/>
          <div className="mt-6 mb-4">
            <p className="lancr-add-edit-sect-ttle">Your Achievements:</p>
            <div className="mt-2 flex gap-2 w-2/3">
              <AchievementCard/>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}